import axios from 'axios';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const [token, setToken] = useState([]);

const saveLogin = async (value: any) => {
  try {
    await AsyncStorage.setItem('userData', value)
  } catch (e) {
    // saving error
  }

}


const getLogin = () => {
  try {
    const value = AsyncStorage.getItem('userData')
    if(value !== null) {
      console.log(value)
      return true;
    }
    else{
      return false;
    }
  } catch(e) {
    // error reading value
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
