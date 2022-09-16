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

interface Props extends StackHeaderProps {
  children: ReactNode;
}

export function UserPage({ navigation }: Props) {

  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [loginResponse, setLoginResponse] = useState(false);
  const [textName, setTextName] = useState(false);
  const [textEmail, setTextEmail] = useState(false);
  const [textPassword, setTextPassword] = useState(false);
  const [modalHide, setModalHide] = useState(false);
  const [image, setImage] = useState(`https://uploaddeimagens.com.br/images/004/018/351/full/icon.png?1662944284`);
  const isFocused = useIsFocused();

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
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function handleSignIn() {

      fetch('https://meowfansub.me/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          url_image: `${email}`,
        }),
        headers: {
          'Content-type': 'application/json'
        }
        })
          .then((response) => response.json())
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