import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import HeaderPage from '../../components/HeaderPage';

import api from '../../services/api';

import styles from './styles'

const TeacherList: React.FC = () => {

  const [ isFiltersVisible, setIsFiltersVisible ] = useState(false)

  const [ favorites, setFavorites ] = useState<number[]>([])

  const [ teachers, setTeachers ] = useState([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const favoritedTeachers = JSON.parse(response)
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        })

        setFavorites(favoritedTeachersIds)
      }
    })
  }

  function handleFilterVisible(){    
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFiltersSubmit() {

    loadFavorites()

    const response = await api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setIsFiltersVisible(false)

    setTeachers(response.data)
  }

  return (
    <View style={styles.container}>
      <HeaderPage title='Proffys disponíveis' 
      headerRight = {(
        <BorderlessButton onPress={handleFilterVisible}>
          <Feather name='filter' size={20} color='#fff' />
        </BorderlessButton>
      )}>

       {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor='#c1bccc'
              style={styles.input}
              placeholder= 'Qual a matéria?'
              value={subject}
              onChangeText={text => setSubject(text)}
              />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  placeholderTextColor='#c1bccc' 
                  style={styles.input}
                  placeholder='Qual o dia?'
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor='#c1bccc' 
                  style={styles.input}
                  placeholder='Qual hora?'
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>

            <RectButton 
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>

          </View>
       )}
      </HeaderPage>
      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}

      </ScrollView>
    </View>
  );
}

export default TeacherList;