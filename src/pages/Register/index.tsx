import { StackHeaderProps } from '@react-navigation/stack';
import { HGradientBackground } from 'components/HGradientBackground';
import { HPrimaryButton } from 'components/HPrimaryButton';
import React, { ReactNode, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { RouterKey } from '../../routes/routes-keys';
import { SContent } from './styles';
import { saveLogin, getLogin } from '../../services';
import { validateEmail, validateName, validatePassword } from "../../functions/functions";
import { Keyboard, BackHandler, Alert } from 'react-native'
import { LoaderModal } from "components/LoaderModal";
import { useIsFocused } from '@react-navigation/native';
interface Props extends StackHeaderProps {
  children: ReactNode;
}

export function RegisterPage({ navigation }: Props) {

  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [loginResponse, setLoginResponse] = useState(false);
  const [textName, setTextName] = useState(false);
  const [textEmail, setTextEmail] = useState(false);
  const [textPassword, setTextPassword] = useState(false);
  const [modalHide, setModalHide] = useState(false);
  const isFocused = useIsFocused();

  const onBackPress = useCallback(
    () => {
      if(isFocused){
        navigation.navigate(RouterKey.SignInPage);
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

      fetch('https://meowfansub.me/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
          name: `${name}`,
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
      setLoginResponse(true);
      setTextEmail(true);
    }
    
  }

  function returnLogin(){
      navigation.navigate(RouterKey.SignInPage);
  }

  function validateInputs(){

    var valitedEmail = validateEmail(email);
    var valitedName = validateName(name);
    var valitedPassword = validatePassword(password)
    if(!valitedEmail){
      setTextEmail(true)
    }
    if(!valitedName){
      setTextName(true)
    }
    if(!valitedPassword){
      setTextPassword(true)
    }
    if(valitedEmail && valitedName && valitedPassword){
      Keyboard.dismiss();
      setModalHide(true);
      handleSignIn();
    }

    

  }

  const styleName = textName == false ? styles.input : styles.inputError;
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

            { textPassword && 
                <Text style={styles.errorText}>Senha invalida</Text>
            }
            <TextInput
            style={stylePassword}
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={(text: any)=> {setPassword(text), setTextPassword(false)}}
            secureTextEntry={true}
            />

            <HPrimaryButton 
            title="REGISTRAR" 
            width={300}
            onPress={() => validateInputs() }
            />

            <TouchableOpacity onPress={returnLogin} style={styles.btnRegister}>
              <Text style={styles.registerText}>Retornar para Login</Text>
            </TouchableOpacity>

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
    marginBottom: 50,
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
  },
  registerText:{
    color: '#FFF',
    fontSize: 17,
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