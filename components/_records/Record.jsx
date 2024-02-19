import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { _vehicleRecognizedRecord } from '../../assets/api/ApiRequest';
import DatePicker from 'react-native-date-picker'

const Record = ({navigation}) => {
  const [vehicleRecordList, setVehicleRecordList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openEndDatePicker, setOpenEndDatePicker] = useState(false);

  const fetchVehicleRecognizedRecords = async () => {
    try {
      const res = await _vehicleRecognizedRecord();
      console.log(res);
      setVehicleRecordList(res.data);
    } catch (error) {
      console.error('Error fetching vehicle records:', error);
    }
  };



  useEffect(() => {
    fetchVehicleRecognizedRecords();
  }, []);

  return (
    <SafeAreaView>

      <DatePicker
        modal
        open={openStartDatePicker}
        date={startDate}
        mode="date"
        onConfirm={(date) => {
          console.log(date);
          setStartDate(date);
          setOpenStartDatePicker(false);
        }}
        onCancel={() => {
          setOpenStartDatePicker(false);
        }}
        style={{ width: 300, height: 100 }}
      />

      <DatePicker
        modal
        open={openEndDatePicker}
        date={endDate}
        mode="date"
        onConfirm={(date) => {
          if (date >= startDate) {
            setEndDate(date);
            setOpenEndDatePicker(false);
          } else {
            // Show an alert or take any other action to notify the user
            alert('End date cannot be earlier than start date');
            setOpenEndDatePicker(false);
          }
      
        }}
        onCancel={() => {
          setOpenEndDatePicker(false);
        }}
        style={{ width: 300, height: 100 }}
      />

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => setOpenStartDatePicker(true)}>
          <Text>Select Start Date</Text>
          <View style={styles.input}>
            <Text>{startDate.toDateString()}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }} onPress={() => setOpenEndDatePicker(true)}>
          <Text>Select End Date</Text>
          <View style={styles.input}>
            <Text>{endDate.toDateString()}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
      <TextInput
        onChangeText={text => onChangeText(text)}
       style={styles.input}
       placeholder='Search by Keyword'
      />
      </View>

      <TouchableOpacity style={styles.btnSearch}>
          <Text style={{textAlign:'center',color:'#fff'}}>Search...</Text>
      </TouchableOpacity>

      {/* Display fetched vehicle records */}
      {vehicleRecordList.map((record) => (
        <View key={record.id} style={styles.vehicleInformationCard}>
          <View style={{flex:1}}>
          <Text>id:# {record.id}</Text>
            <Text>Plate:# {record.captured.plate_number}</Text>
            <Text>Model: {record.captured.model}</Text>
            <Text>Date Captured: {record.captured.created_at}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('RecordDetails', { id: record.id })}>
          <View>
            <Text>See Details</Text>
          </View>
          </TouchableOpacity>
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btnSearch:{
    backgroundColor:'blue',
    marginHorizontal:10,
    paddingVertical:10,
    marginBottom:20
  },
  vehicleInformationCard: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white', 
    padding: 20,
    borderWidth:1,
    borderColor:'#f2f2f2',
    borderRadius:5,
    marginHorizontal:10,
    marginVertical:5,
    flexDirection:'row'
  },
});

export default Record;
