import { StackHeaderProps } from '@react-navigation/stack';
import { HGradientBackground } from 'components/HGradientBackground';
import { HPrimaryButton } from 'components/HPrimaryButton';
import React, { ReactNode, useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { RouterKey } from '../../routes/routes-keys';
import { SContent } from './styles';
import { saveLogin, getLogin } from '../../services';
import { HLoadingDots } from "components/HLoadingDots";
import { validateEmail, validateName, validatePassword } from "../../functions/functions";
import { Keyboard, ToastAndroid, Platform, BackHandler, Alert } from 'react-native'
import * as AuthSession from 'expo-auth-session';
import { LoaderModal } from "components/LoaderModal";
import { useIsFocused } from '@react-navigation/native';
interface Props extends StackHeaderProps {
  children: ReactNode;
}

export function SignInPage({ navigation }: Props) {

  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [loginResponse, setLoginResponse] = useState(false);
  const [textEmail, setTextEmail] = useState(false);
  const [textPassword, setTextPassword] = useState(false);
  const [modalHide, setModalHide] = useState(false);
  const isFocused = useIsFocused();

  /* React.useEffect(() => {
    
    const backAction = () => {
      Alert.alert("Não vaii 😭", "Tem certeza que já quer ir embora?", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Sair", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    BackHandler.removeEventListener('hardwareBackPress', backAction);

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isFocused]); */

  async function handleSignIn() {
      
      fetch('https://meowfansub.me/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
        }),
        headers: {
          'Content-type': 'application/json'
        }
        })
          .then((response) => response.json())
          .then(function (json: any) {
            login(json)
          })
  }



  function login(date: any){
    setModalHide(false);
    if(date.success == true){
      saveLogin(date.data.token);
      navigation.navigate(RouterKey.PrivateRoutes);
    }
    else {
      setLoginResponse(true)
      setTextPassword(true)
      setTextEmail(true)
    }
    
  }

  function returnRegister(){
    navigation.navigate(RouterKey.RegisterPage);
}

function validateInputs(){

  var valitedEmail = validateEmail(email);
  var valitedPassword = validatePassword(password)
  if(!valitedEmail){
    setTextEmail(true)
  }
  if(!valitedPassword){
    setTextPassword(true)
  }
  if(valitedEmail && valitedPassword){
    Keyboard.dismiss();
    setModalHide(true);
    handleSignIn();
  }

}

async function loginSocial(){
  const CLIENT_ID = '1028943297487-0qskrdjgm2bqlr7khfe22fkcv33mu6lq.apps.googleusercontent.com';
  const REDIRECT_URI = 'https://auth.expo.io/@michaeld555/meow-fansub-app';
  const RESPONSE_TYPE = 'token';
  const SCOPE = encodeURI('profile email');

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

  const response = await AuthSession.startAsync({ authUrl })

  if(response.type == 'success'){
    setModalHide(true);
    const tokenUser = response.params.access_token;
    loginGoogle(tokenUser)
  } else {
    if (Platform.OS === 'android') {
      ToastAndroid.show('Finalize seu login para entrar com o Google', ToastAndroid.LONG)
    } else {
      alert('Finalize seu login para entrar com o Google');
    }
  }

}

async function loginGoogle(token: any){
  const userResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${token}`);
  const userInfo = await userResponse.json();

    fetch('https://meowfansub.me/api/auth/login/social', {
      method: 'POST',
      body: JSON.stringify({
        email: `${userInfo.email}`,
        name: `${userInfo.name}`,
        google_id: `${userInfo.id}`,
      }),
      headers: {
        'Content-type': 'application/json'
      }
      })
        .then((response) => response.json())
        .then(function (json: any) {
          login(json)
        })
}

const styleEmail = textEmail == false ? styles.input : styles.inputError;
const stylePassword = textPassword == false ? styles.input : styles.inputError;

  

  return (
    <HGradientBackground>
        <SContent style={styles.background}>
          <View>
            <Image
            style={styles.image}
            source={require('../../../assets/logo-secundary.png')}
            />
          </View>
          <View style={styles.container}>

            { textEmail && !loginResponse && 
              <Text style={styles.errorText}>Email invalido</Text>
            }
            { textEmail && loginResponse && 
              <Text style={styles.errorText}>Credenciais Invalidas</Text>
            }
            <TextInput
            style={styleEmail}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={(text: any)=> {setEmail(text), setTextEmail(false), setLoginResponse(false)}}
            />

            { textPassword && !loginResponse && 
                <Text style={styles.errorText}>Senha invalida</Text>
            }
            <TextInput
            style={stylePassword}
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={(text: any)=> {setPassword(text), setTextPassword(false), setLoginResponse(false)}}
            secureTextEntry={true}
            />

            <HPrimaryButton 
            title="LOGIN" 
            width={300}
            onPress={() => validateInputs()}
            />

            <TouchableOpacity onPress={returnRegister} style={styles.btnRegister}>
              <Text style={styles.registerText}>Criar conta gratuita</Text>
            </TouchableOpacity>

            <View style={styles.btnSocial}>
            <TouchableOpacity
            onPress={() => {loginSocial(), setTextEmail(false), setTextPassword(false), setLoginResponse(false)}}
            style={{
                borderWidth:1,
                borderColor:'rgba(0,0,0,0.2)',
                alignItems:'center',
                justifyContent:'center',
                width:70,
                height:70,
                backgroundColor:'#fff',
                borderRadius:50,
                marginRight: 20,
              }}
              >
                <Image
                style={styles.icon}
                source={require('../../../assets/icon-google.png')}
                />
          </TouchableOpacity>

            </View>

          </View>
          
        </SContent>

        <LoaderModal
        showModal={modalHide}
        />

    </HGradientBackground>

    
    
  );
};

const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 222,
    height: 222,
  },
  container:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  input:{
    backgroundColor: '#FFF',
    width: '90%',
    height: 45,
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnRegister:{
    marginTop: 15,
    marginBottom: 20,
  },
  registerText:{
    color: '#FFF',
    fontSize: 17,
  },
  icon:{
    width: 40,
    height: 40,
  },
  btnSocial:{
    flex: 1,
    flexDirection: 'row'
  },
  errorText:{
    color: '#FF3D00',
    fontSize: 15,
    width: '88%',
  },
  inputError:{
    backgroundColor: '#FFF',
    width: '90%',
    height: 45,
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
    borderColor: '#FF3D00',
    borderWidth: 1,
  },
})