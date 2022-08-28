import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveLogin = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('UserData', jsonValue)
  } catch (e) {
      alert(e);
  }
}


const getLogin = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('UserData')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    
  } catch(e) {
    alert(e);
  }
}

const getToken= async () => {
  try {
    const jsonValue: any = await AsyncStorage.getItem('UserData')
    
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    
  } catch(e) {
    alert(e);
  }
}



const token = '284|yJvbEf835mj1AG2qV8Gz4PKDvI01BL0gzhzJdORs';

const meowApi = 

  axios.create({
    baseURL: 'https://meowfansub.me/api/',
    headers: { Authorization: `Bearer ${token}` },
    params: {}
  });
  


export { meowApi, saveLogin, getLogin };
