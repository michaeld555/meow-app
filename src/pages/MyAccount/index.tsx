import { StackHeaderProps } from '@react-navigation/stack';
import { HGradientBackground } from 'components/HGradientBackground';
import { HPrimaryButton, GPrimaryButton } from 'components/HPrimaryButton';
import React, { ReactNode, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { RouterKey } from '../../routes/routes-keys';
import { SContent, styles } from './styles';
import { saveLogin, getLogin } from '../../services';
import { validateEmail, validateName, validatePassword } from "../../functions/functions";
import { Keyboard, BackHandler, Alert } from 'react-native'
import { LoaderModal } from "components/LoaderModal";
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends StackHeaderProps {
  children: ReactNode;
}

export function UserPage({ navigation }: Props) {

  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [loginResponse, setLoginResponse] = useState(false);
  const [textName, setTextName] = useState(false);
  const [textEmail, setTextEmail] = useState(false);
  const [modalHide, setModalHide] = useState(false);
  const [image, setImage]: any = useState(`https://uploaddeimagens.com.br/images/004/018/351/full/icon.png?1662944284`);
  const [imageBase, setImageBase]: any = useState();
  const [token, setToken]: any = useState();
  const [userEmail, setUserEmail]: any = useState();
  const [userName, setUsername]: any = useState();
  const [userPhoto, setUserPhoto]: any = useState();
  const [userId, setUserId]: any = useState();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    getToken()
  }, [])

  async function getToken() {
      try {
      const jsonValue = await AsyncStorage.getItem('userData')
      const datae = jsonValue != null ? JSON.parse(jsonValue) : null;
      setToken(datae.token)
      setUserEmail(datae.email)
      setUsername(datae.name)
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
        
      meowApi.get( 
          `user/${userId}`,
        ).then(function (response: any) {
          if(response.data.data.photo_url !== null){
              setImage(response.data.data.photo_url);
              //setLoading(false);
          } else {
              setUserPhoto(`https://uploaddeimagens.com.br/images/004/018/351/full/icon.png?1662944284`);
              //setLoading(false);
          }
          
          
        }).catch(console.log);
  }, [token, isFocused])

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageBase(result)
    }
  };

  async function handleSignIn() {

      fetch('https://meowfansub.me/api/user/13', {
        method: 'POST',
        body: JSON.stringify({
          url_image: `${imageBase.base64}`,
        }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}` 
        }
        })
          .then( (response) => response.json() )
          .then(function (json: any) {
            
          })
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
  const styleEmail = textEmail == false ? styles.input : styles.inputError;

  return (
    <HGradientBackground>
        <SContent style={styles.background}>
          <View style={styles.containerImage}>

            <Image
            style={styles.image}
            source={{ uri: image }}
            />

            <GPrimaryButton 
            style={styles.btnImage}
            title="ESCOLHER" 
            width={110}
            onPress={ pickImage }
            />

          </View>
          <View style={styles.container}>

          { textName && 
              <Text style={styles.errorText}>Nome invalido</Text>
          }
          <TextInput
            style={styleName}
            placeholder="Nome"
            autoCorrect={false}
            value={userName}
            onChangeText={(text: any)=> {setName(text), setTextName(false)}}
            />

            { textEmail && !loginResponse && 
              <Text style={styles.errorText}>Email invalido</Text>
            }
            { textEmail && loginResponse && 
              <Text style={styles.errorText}>Email já Cadastrado</Text>
            }
            <TextInput
            style={styleEmail}
            placeholder="Email"
            autoCorrect={false}
            value={userEmail}
            onChangeText={(text: any)=> {setEmail(text), setTextEmail(false), setLoginResponse(false)}}
            />

            <HPrimaryButton 
            title="SALVAR" 
            width={300}
            onPress={() => {validateInputs()} }
            />

          </View>
          
        </SContent>
        <LoaderModal
        showModal={modalHide}
        />
    </HGradientBackground>
    
  );
};