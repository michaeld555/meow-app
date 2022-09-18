import { StackHeaderProps } from '@react-navigation/stack';
import { HGradientBackground } from 'components/HGradientBackground';
import { HPrimaryButton, CPrimaryButton } from 'components/HPrimaryButton';
import React, { ReactNode, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Image, ToastAndroid, Platform, TouchableOpacity, Text } from 'react-native';
import { SContent, styles } from './styles';
import { validateEmail, validateName, validatePassword } from "../../functions/functions";
import { Keyboard, BackHandler, Alert } from 'react-native'
import { LoaderModal } from "components/LoaderModal";
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { HBody } from "../../components/HBody";
import { Ionicons } from "@expo/vector-icons";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

interface Props extends StackHeaderProps {
  children: ReactNode;
}

export function ChangePassword({ navigation }: Props) {

  const [name, setName]: any = useState();
  const [email, setEmail]: any= useState();
  const [loginResponse, setLoginResponse] = useState(false);
  const [textName, setTextName] = useState(false);
  const [textEmail, setTextEmail] = useState(false);
  const [modalHide, setModalHide] = useState(false);
  const [token, setToken]: any = useState();
  const [userId, setUserId]: any = useState();
  const [loading, setLoading]: any = useState(true);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    getToken()
  }, [isFocused])

  async function getToken() {
      try {
      const jsonValue = await AsyncStorage.getItem('userData')
      const datae = jsonValue != null ? JSON.parse(jsonValue) : null;
      setToken(datae.token)
      setUserId(datae.id)
      } catch(e) {
      // error reading value
      }
  }

  const meowApi = 

    axios.create({
        baseURL: 'https://meowfansub.me/api/',
        headers: { Authorization: `Bearer ${token}` },
        params: {}
    });

    React.useEffect(() => {
      if(userId != null){
        meowApi.get( 
          `user/${userId}`,
        ).then(function (response: any) {
          if(response.data.data.photo_url !== null){
              setLoading(false);
          } else {
              setLoading(false);
          }
          
          
        }).catch(console.log);
      }
      
  }, [userId, isFocused])

  const onBackPress = useCallback(
    () => {
      if(isFocused){
        navigation.goBack();
        return true
      }
      return false
    }, [isFocused],
  )

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [])


  async function handleSignIn() {

      fetch(`https://meowfansub.me/api/user/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
          name: `${name}`,
          email: `${email}`,
        }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}` 
        }
        })
          .then( (response) => response.json() )
          .then(function (json: any) {
            setModalHide(false);
            if (Platform.OS === 'android') {
              ToastAndroid.show('Perfil alterado com Sucesso', ToastAndroid.LONG)
            }
          }).catch(() => {
            setModalHide(false);
            ToastAndroid.show('Erro ao atualizar Perfil, tente novamente.', ToastAndroid.LONG)
          });
  }

  function validateInputs(){

    var valitedEmail = validateEmail(email);
    var valitedName = validateName(name);
    if(!valitedEmail){
      setTextEmail(true)
    }
    if(!valitedName){
      setTextName(true)
    }
    if(valitedEmail && valitedName){
      Keyboard.dismiss();
      setModalHide(true);
      handleSignIn();
    }

    

  }

  const styleName = textName == false ? styles.input : styles.inputError;

  return (
    <HBody
    customHeaderContent={
      <View style={styles.Header}>
        <TouchableOpacity style={{height: 50, width: 50}} onPress={() => { navigation.goBack() }}>
          <Ionicons name="arrow-back" size={40} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.hText}>           Alterar Senha</Text>
      </View>
      
    }
    >
        <SContent style={styles.background}>

        <Text style={styles.Text}>Insira a nova senha para altera-lá</Text>
          { textName && 
              <Text style={styles.errorText}>Nome invalido</Text>
          }
          <TextInput
            style={styleName}
            placeholder="Senha"
            autoCorrect={false}
            value={name}
            onChangeText={(text: any)=> {setName(text), setTextName(false)}}
            />

            <CPrimaryButton 
            style={styles.btn}
            title="Alterar Senha" 
            width={200}
            onPress={ () => {} }
            />
          
        </SContent>
        <LoaderModal
        showModal={modalHide}
        />
    </HBody>
    
  );
};