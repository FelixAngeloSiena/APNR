import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../_dashboard/Dashboard';
import UploadGallery from '../_upload/UploadGallery';
import SplashScreen from '../_splashscreen/SplashScreen';
import Record from '../_records/Record';
import RecordDetails from '../_records/RecordDetails';


const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="UploadGallery" component={UploadGallery} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Record" component={Record} />
        <Stack.Screen name="RecordDetails" component={RecordDetails} />
      </Stack.Navigator>
  </NavigationContainer>
  )
}

export default StackNavigator