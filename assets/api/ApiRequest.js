import axios from "axios";

const configWithApiKey = {
  headers: {
    "Content-Type": "multipart/form-data",
    "accept": "application/json",
    "X-Api-Key": "c9e21179-c1f8-4f08-854a-efc4f304eddc",
  },
}

const configWithToken = {
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": "Token 0267f919db6c251178e48e1f7a15b638c962e3cc",
    'X-Api-Key': 'c9e21179-c1f8-4f08-854a-efc4f304eddc',
  },
}

const _uploadImageVehicle = async(formDataImage) => {
  try {
    const response = await axios.post("https://api.platerecognizer.com/v1/plate-reader/", formDataImage, configWithToken);
      return response.data
      } catch (error) {
        console.log(error);
        throw error;
      }
  }

const _searchByPlateNumber = async(platenumber, vehicle_make, model, color) => {
  const data = { 
    "platenumber" : platenumber,
    "vehicle_make" : vehicle_make,
    "model" : model,
    "color" : color
  }
  try{
    const response = await axios.post("https://platerecognition.bmqbuilders.com/api/search/platenumber", data, configWithApiKey);
    return response.data;
  }catch(error){
    console.log(error.message);
    throw error
  }
}

const _vehicleRecognizedRecord = async () => {
  try {
    const response = await axios.post(
      "https://platerecognition.bmqbuilders.com/api/history",
      {},
      configWithApiKey
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const _vehicleRecordDetails = async(id) => {
  try {
    const response = await axios.get(`https://platerecognition.bmqbuilders.com/api/history/${id}`,configWithApiKey);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

const _apprehendVehicle = async(id) => {
  const configWithApiKey = {
    headers: {
      "accept": "application/json",
      "X-Api-Key": "c9e21179-c1f8-4f08-854a-efc4f304eddc",
    },
  }
  try {
    const response = await axios.post(`https://platerecognition.bmqbuilders.com/api/vehicle/${id}/apprehend`, null, configWithApiKey);
    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export {
   _uploadImageVehicle, 
  _searchByPlateNumber,
  _vehicleRecognizedRecord,
  _vehicleRecordDetails,
  _apprehendVehicle
  };