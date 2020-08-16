import React, { useState, FormEvent } from 'react';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Select from '../../components/Select';
import Input from '../../components/Input'; 

import './styles.css';

const TeacherList: React.FC = () => {

  const [ teachers, setTeachers ] = useState([])

  const [ subject, setSubject ] = useState('')
  const [ weekDay, setWeekDay ] = useState('')
  const [ time, setTime ] = useState('')

  async function searchTeachers(e: FormEvent){
    e.preventDefault()

    const response = await api.get('/classes', {
      params:{
        subject,
        week_day: weekDay,
        time
      }
    })

    setTeachers(response.data)
    
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title='Estes os proffys disponiveis'>
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name='subject' 
            label='Materia'
            value={subject}
            onChange={(e) => { setSubject(e.target.value)}}
            options={[
              { value:'Matemática', label:'Matemática' },
              { value:'Física', label:'Física' },
              { value:'Química', label:'Química' },
              { value:'Biologia', label:'Biologia' },
              { value:'Lingua Portuguesa', label:'Lingua Portuguesa' },
            ]}
          />
          <Select
            name='week-day' 
            label='Dia da semana'
            value={weekDay}
            onChange={(e) => { setWeekDay(e.target.value)}}
            options={[
              { value:'0', label:'Segunda-feira' },
              { value:'1', label:'Terça-feira' },
              { value:'2', label:'Quarta-feira' },
              { value:'3', label:'Quinta-feira' },
              { value:'4', label:'Sexta-feira' },
              { value:'5', label:'Sábado' },
            ]}
          />
          <Input
          name='time'
          label='Hora'
          type='time'
          value={time}
          onChange={(e) => { setTime(e.target.value)}}
          />

          <button type= 'submit'> Buscar </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>  
  );
}

export default TeacherList;