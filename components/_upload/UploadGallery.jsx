import React, { useEffect, useState } from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Modal} from 'react-native'
import { _uploadImageVehicle, _searchByPlateNumber} from '../../assets/api/ApiRequest';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import { _apprehendVehicle } from '../../assets/api/ApiRequest';

function UploadGallery({route, navigation}) {
  const { formData, imageUrl } = route.params;
  const [LTOVehicleInformation, setLTOVehicleInformation] = useState(null)
  const [vehiclePlateNumber, setVehiclePlateNumber] = useState(null)
  const [vehicleImageUrl, setVehicleImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);


  const fetchVehicleInformation = async() => {
  const res = await _uploadImageVehicle(formData)
  const vehicleData = res.results[0];
  setVehiclePlateNumber(vehicleData.plate);
    if (res.results && res.results.length > 0) {
      const srchPlateApi = await _searchByPlateNumber(
          vehicleData.plate,
          vehicleData.model_make[0].make,
          vehicleData.model_make[0].model,
          vehicleData.color[0].color
        )
        if(srchPlateApi.hasOwnProperty("message")){
          setLTOVehicleInformation(null);
        }else{
          console.log(srchPlateApi);
          setLTOVehicleInformation(srchPlateApi)
        } 
    } else {
      setLTOVehicleInformation(null);
    }
    setVehicleImageUrl({uri:imageUrl})
    setIsLoading(false);
}

const modalConfirmationForApprehend = () => {
  setModalVisible(true)
}

const ApprehendVehicle = async(id) => {
  const response = await _apprehendVehicle(id)
  console.log(response);
}

  useEffect(() => {
    fetchVehicleInformation();
},[])

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#BFE7F5'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
       >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want to Apprehend this</Text>
            <Text style={styles.modalText}> Vehicle?</Text>
            <View style={{flexDirection:'row', marginVertical:20}} gap={5} >
              <TouchableOpacity onPress={() => ApprehendVehicle(LTOVehicleInformation.data.id)}>
                <View style={{borderWidth:1, borderColor:'green', padding:2, borderRadius:5}}>
                  <View style={{backgroundColor:'green', paddingVertical:10, paddingHorizontal:30,borderRadius:5}}>
                    <Text style={{color:'#fff', fontFamily: 'Pridi-Bold', fontSize:15}}>Apprehend</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View style={{borderWidth:1, borderColor:'red', padding:2, borderRadius:5}}>
                  <View style={{backgroundColor:'red', paddingVertical:10, paddingHorizontal:30,borderRadius:5}}>
                    <Text style={{color:'#fff', fontFamily: 'Pridi-Bold', fontSize:15}}>Cancel</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>   
        </View>
      </Modal>

      {isLoading ? (
         <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
            <LottieView style={{width:50, height:50}} source={require('../../assets/json/loading.json')} autoPlay loop />
            <Text>Loading....</Text>
        </View>
      ) : (
      <View style={styles.vehicleInformationCard}>
        <View style={{flex:1}}>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={{position:'absolute',zIndex:1, marginTop:10, marginStart:5}}>
              <Text><Ionicons name="chevron-back-sharp" size={30} color="#fff" /></Text>
          </TouchableOpacity>
         
          <Image style={{ height: '100%', width: '100%', borderRadius:5}} source={vehicleImageUrl} resizeMode="cover" />
        </View>
        {LTOVehicleInformation ? (
              <View style={{flex:1, paddingHorizontal:10, marginTop:20}}>
                <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}} >
                <View style={{flex:1}}>
                  <Text style={{fontSize:18, fontFamily:'Pridi-Bold', color:'#000'}}>Capture Plate# : 
                  <Text style={{fontSize:23, fontFamily:'Pridi-Bold', color:'#000'}}>  {vehiclePlateNumber} </Text>
                  </Text>
                <View style={{width:'100%', height:2, backgroundColor:'#000'}}/>
                  <Text style={{fontSize:20, fontFamily:'Pridi-Bold', color:'#000'}}>LTO Vehicle Information</Text>
                  <Text style={styles.vehicleInformationText}>Registered Plate# :
                    <Text style={styles.vehicleValue}> {LTOVehicleInformation.data.plate_number}</Text>
                  </Text>
                  <Text style={styles.vehicleInformationText}>Vehicle Make : 
                    <Text style={styles.vehicleValue}> {LTOVehicleInformation.data.vehicle_make} </Text>
                  </Text>
                  <Text style={styles.vehicleInformationText}>Vehicle Model : 
                    <Text style={styles.vehicleValue}> {LTOVehicleInformation.data.model} </Text>
                  </Text>
                  <Text style={styles.vehicleInformationText}>Vehicle Type : 
                    <Text style={styles.vehicleValue}> {LTOVehicleInformation.data.type} </Text>
                  </Text>
                  <Text style={styles.vehicleInformationText}>Vehicle Color :
                    <Text style={styles.vehicleValue}> {LTOVehicleInformation.data.color}  </Text>
                  </Text>
                  <Text style={styles.vehicleInformationText}>Date Registered :
                    <Text style={styles.vehicleValue}>  {LTOVehicleInformation.data.date_of_last_registration} </Text>
                  </Text>
                  <Text style={styles.vehicleInformationText}>Registration Status:
                  <Text style={{ fontFamily: 'Pridi-Bold', color: LTOVehicleInformation.status == 0 ? 'green' : 'red'}}> 
                    {LTOVehicleInformation.status == 0 ? ' Updated ' : ' Expired'}
                  </Text>
                  </Text>
                  <View style={{flex:1, flexDirection:'row', marginTop:10}} gap={5}>
                    <TouchableOpacity onPress={() => modalConfirmationForApprehend()}>
                      <View style={{borderColor:'#29A8EB', borderWidth:1, padding:2, borderRadius:5}}>
                        <View style={{backgroundColor:'#29A8EB', padding:8, borderRadius:5}}>
                          <Text style={{fontFamily: 'Pridi-Bold', color:'#fff', letterSpacing:1, fontSize:16}}>Apprehend</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <View style={{borderColor:'#29A8EB', borderWidth:1, padding:2, borderRadius:5}}>
                        <View style={{backgroundColor:'#29A8EB', padding:8, borderRadius:5}}>
                          <Text style={{fontFamily: 'Pridi-Bold', color:'#fff', letterSpacing:1, fontSize:16}}>Save to Record</Text>
                        </View>
                      </View>
                    </TouchableOpacity>  
                  </View>
                </View>
                </ScrollView>
              </View>
            ) : (
              <View style={{flex:1}}>
                <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                  <Text style={{fontSize:18, fontFamily:'Pridi-Bold', color:'#000'}}>Captured Plate# :</Text>
                  <Text style={{fontSize:23, fontFamily:'Pridi-Bold', color:'#000'}}> {vehiclePlateNumber}</Text>
                  <LottieView style={{width:200, height:200}} source={require('../../assets/json/not_found.json')} autoPlay loop />
                  <Text style={{fontFamily:'Pridi-Bold',fontSize:17,color:'#E10017', letterSpacing:1}}>Record Not Found!</Text>
                </View>
              </View>
             )  
            } 
        </View>
       ) 
      }
    </SafeAreaView>
  )}
 const styles = StyleSheet.create({
  vehicleInformationCard: {
    flex:1,
    shadowColor: '#469DD5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.50,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white', 
    borderWidth:1,
    borderColor:'#f2f2f2',
    borderRadius:5,
    margin:15

  },
  vehicleInformationText:{
    fontFamily:'Pridi-Regular',
    fontSize:16,
    color:'#000',
  },
    vehicleValue:{
    fontFamily: 'Pridi-Bold',
    fontSize:17,
    color:'#000'
  },

  // ==========================
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 18,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize:18,
    textAlign: 'center',
    fontFamily: 'Pridi-Bold',
    color:'#000'
  },
 })
 
export default UploadGallery