import React, {useEffect, useState} from 'react'
import { Text, View } from 'react-native'
import { _vehicleRecordDetails } from '../../assets/api/ApiRequest'

function RecordDetails({route}) {
  const [recordDetails, setRecordDetails] = useState({})
  const { id } = route.params;

  const fetchVehicleRecordsDetails = async () => {
    try {
      const res = await _vehicleRecordDetails(id);
      console.log(res);

    } catch (error) {
      console.error('Error fetching vehicle records:', error);
    }
  };

  useEffect(() => {
    fetchVehicleRecordsDetails();
  }, []);

  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default RecordDetails