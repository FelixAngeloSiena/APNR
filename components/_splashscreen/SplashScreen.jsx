import React, { useEffect } from 'react'
import { SafeAreaView, Image, Text, View } from 'react-native'

const SplashScreen = ({navigation}) => {

useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Dashboard');
    }, 3000)
})

  return (
    <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <Image
            style={{width:'50%', height:'50%', resizeMode:'contain'}}
            source={require('../../assets/images/logo.png')}
        />
 
     
      
    </SafeAreaView>
  )
}

export default SplashScreen