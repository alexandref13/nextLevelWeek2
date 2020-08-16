import { Request, Response } from 'express'

import db from '../database/connection';
import ConvertHourToMinutes from '../utils/ConvertHourToMinutes';

interface ScheduleItem {
  week_day: number,
  from: string, 
  to: string,
}

export default class ClassController{
  async store(req: Request, res: Response) {
    const { 
      name, 
      avatar, 
      whatsapp, 
      bio, 
      subject, 
      cost, 
      schedule 
    } = req.body;
  
    const trx = await db.transaction()
  
    try{
      const insertedUsersIds = await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      })
    
      const user_id = insertedUsersIds[0]
    
      const insertedClassesIds = await trx('classes').insert({
        subject, 
        cost,
        user_id
      })
    
      const class_id = insertedClassesIds[0];
    
      const class_schedule = schedule.map((scheduleItem: ScheduleItem )=> {
        return{
          class_id,
          week_day: scheduleItem.week_day,
          from: ConvertHourToMinutes(scheduleItem.from),
          to: ConvertHourToMinutes(scheduleItem.to)
        }
      })
    
      await trx('classes_schedule').insert(class_schedule)
    
      await trx.commit()
    
      return res.status(201).json({
        name, 
        avatar, 
        whatsapp, 
        bio, 
        subject, 
        cost, 
        schedule 
      })
    } catch (err){
  
      await trx.rollback()
  
      return res.status(400).json({ error: 'Unespected error while creating new class! '})
    }
  }

  async index (req: Request, res: Response){
    const filters = req.query

    const subject = filters.subject as string 
    const week_day = filters.week_day as string
    const time = filters.time as string
  

    if(!filters.subject || !filters.week_day || !filters.time){
      return res.status(400).json({ error: ' Missing filters to search classes'})
    }
     
    const timeInMinutes = ConvertHourToMinutes(time)

    const classes = await db('classes')
      .whereExists(function(){
        this.select('classes_schedule.*')
          .from('classes_schedule')
          .whereRaw('`classes_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`classes_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`classes_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`classes_schedule`.`to` > ??', [timeInMinutes])
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return res.json(classes)    
  }
}