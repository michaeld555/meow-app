import { StackHeaderProps } from '@react-navigation/stack';
import { HGradientBackground } from 'components/HGradientBackground';
import { HPrimaryButton, GPrimaryButton } from 'components/HPrimaryButton';
import React, { ReactNode, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Image, ToastAndroid, Platform, TouchableOpacity, Text } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

interface Props extends StackHeaderProps {
  children: ReactNode;
}

export function UserPage({ navigation }: Props) {

  const [name, setName]: any = useState();
  const [email, setEmail]: any= useState();
  const [loginResponse, setLoginResponse] = useState(false);
  const [textName, setTextName] = useState(false);
  const [textEmail, setTextEmail] = useState(false);
  const [modalHide, setModalHide] = useState(false);
  const [image, setImage]: any = useState();
  const [imageBase, setImageBase]: any = useState({base64: null});
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
      setEmail(datae.email)
      setName(datae.name)
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
              setImage(response.data.data.photo_url);
              setLoading(false);
          } else {
            setImage(`https://uploaddeimagens.com.br/images/004/018/351/full/icon.png?1662944284`);
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

  async function mergeDate(email: any, name: any) {
    try {
      const USER = {
      name: name,
      email: email,
    }
      await AsyncStorage.mergeItem('userData', JSON.stringify(USER))
    } catch(e) {
      console.log(e);
    }
  }

  async function handleSignIn() {

      fetch(`https://meowfansub.me/api/user/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
          url_image: `${imageBase.base64}`,
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
            mergeDate(email, name);
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
  const styleEmail = textEmail == false ? styles.input : styles.inputError;

  return (
    <HGradientBackground>
        <SContent style={styles.background}>
          <View style={styles.containerImage}>

            { !loading  && 
              <Image
              style={styles.image}
              source={{ uri: image }}
              />

              
            }

            { loading  && 
              <ShimmerPlaceHolder style={styles.image}/>
            }

            { !loading  &&
            <GPrimaryButton 
            style={styles.btnImage}
            title="ESCOLHER" 
            width={110}
            onPress={ pickImage }
            />
            }
          </View>
          <View style={styles.container}>

          { textName && 
              <Text style={styles.errorText}>Nome invalido</Text>
          }
          <TextInput
            style={styleName}
            placeholder="Nome"
            autoCorrect={false}
            value={name}
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
            value={email}
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