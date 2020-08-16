import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native'

import HeaderPage from '../../components/HeaderPage';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const Favorites: React.FC = () => {

  const [ favorites, setFavorites ] = useState([])

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const favoritedTeachers = JSON.parse(response)

        setFavorites(favoritedTeachers)
      }
    })
  }

  useFocusEffect(() => {
    loadFavorites()
  })


  return (
    <View style={styles.container}>
      <HeaderPage title='Meus proffys favoritos'/>
      <ScrollView 
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
      {favorites.map( (teacher: Teacher) => (
        <TeacherItem
          key={teacher.id}
          teacher={teacher}
          favorited
        />
      ))}
        
      </ScrollView>    
    </View>
  );
}

export default Favorites;