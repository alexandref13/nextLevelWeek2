import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles  from  './styles';

import giveClassesBgImages from '../../assets/images/give-classes-background.png'

const GiveClasses: React.FC = () => {

  const navigation = useNavigation()

  function handleGoBackPage(){
    navigation.goBack()
  }

  return(
    <View style={styles.container}>
      <ImageBackground 
        resizeMode='contain'
        source={giveClassesBgImages}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>Para começar, você precisa se cadastrar como professor na nossa plataforma web</Text>
      </ImageBackground>

      <RectButton 
        style={styles.okButton}
        onPress={handleGoBackPage}  
      >
        <Text style={styles.okButtonText}>Tudo bem!</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;