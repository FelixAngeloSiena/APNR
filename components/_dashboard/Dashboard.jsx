import React from 'react'
import { View, Text, Button, Image, SafeAreaView,ImageBackground,  StyleSheet, TouchableOpacity } from 'react-native'
import { launchImageLibrary, launchCamera} from 'react-native-image-picker';
import { _uploadImageVehicle } from '../../assets/api/ApiRequest';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
const FormDataImage = new FormData();
import ImageResizer from '@bam.tech/react-native-image-resizer';

const Dashboard = ({navigation}) => {
  const options = {
    storageOptions : {
      path: "image"
    }
  };

const HandleSnapshot = async() => {
    const res = await launchCamera(options);
    ImageResizer.createResizedImage(
      res.assets[0].uri,
      640,
      480,
      'JPEG', 
      80,
      0,
      null,
    ).then((resizedImageUri) => {
      const FormDataCapture = new FormData();
      FormDataCapture.append('upload',{
        uri: resizedImageUri.uri,
        type: 'image/jpeg',
        name: resizedImageUri.name,
      })
      FormDataCapture.append('detection_mode', 'vehicle')
      FormDataImage.append("mmc","true")
      navigation.navigate("UploadGallery", {
        formData:FormDataCapture,
        imageUrl:res.assets[0].uri
      })
    }).catch((err) => {
      console.error('Image resizing error: ', err);
    });
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../../assets/images/background.png')}
      resizeMode="cover"
    >
      <View style={styles.container}>
      <View style={{flex:1}}>
      </View>
      <View style={{flex:3, alignItems:'center'}}>
        <Image
          style={{width:'85%', height:'85%', resizeMode:'contain'}}
          source={require('../../assets/images/lto_logo.png')}
          />
      </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => HandleSnapshot()} style={styles.btnStyles}>
            <Text style={styles.buttonText}>
              <AntDesign name="videocamera" size={22} color="#fff" /> Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginBottom:30  
  },  
  projTitle:{
    textAlign:'center',
    fontFamily:'Pridi-Bold',
    fontSize:30,
    color:'#E60023',
    marginVertical:-10
  },  
  logoContainer:{
      flex:2,
      justifyContent:'center'
    },
    btnContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyles: {
      backgroundColor: '#E10017',
      width:'90%',
      paddingVertical:10,
      borderRadius: 5,
      marginVertical:5,
      borderRadius: 5,
      borderWidth:1,
      borderColor:'#1E2F97'
    },
    buttonText: {
      color: '#fff',
      fontFamily:'Pridi-Regular',
      fontSize: 20,
      textAlign:'center'
    },
})
export default Dashboard