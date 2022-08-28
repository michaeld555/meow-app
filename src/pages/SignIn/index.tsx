import { StackHeaderProps } from '@react-navigation/stack';
import { HGradientBackground } from 'components/HGradientBackground';
import { HPrimaryButton } from 'components/HPrimaryButton';
import React, { ReactNode, useState } from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { RouterKey } from '../../routes/routes-keys';
import { SContent } from './styles';
import { saveLogin, getLogin } from '../../services';
interface Props extends StackHeaderProps {
  children: ReactNode;
}

export function SignInPage({ navigation }: Props) {

  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [loginResponse, setLoginResponse] = useState([]);

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
            setLoginResponse(json);
            //alert(loginResponse)
            login(json)
            console.log(loginResponse)
          })
  }

  function login(date: any){
    if(date.success == true){
      //alert(date.data.token)
      saveLogin(date.data);
      navigation.navigate(RouterKey.PrivateRoutes);
      const teste = getLogin();
      //alert(teste)
    }
    else {
      alert(date.message)
    }
    
  }

  

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
            <TextInput
            style={styles.input}
            placeholder="Email"
            autoCorrect={false}
            onChangeText={(text: any)=> {setEmail(text)}}
            />

            <TextInput
            style={styles.input}
            placeholder="Senha"
            autoCorrect={false}
            onChangeText={(text: any)=> {setPassword(text)}}
            />

            <HPrimaryButton 
            title="LOGIN" 
            width={300}
            onPress={() => handleSignIn()} //TODO: Mudar tela de login e deixar funcional
            />

            <TouchableOpacity onPress={() =>{}} style={styles.btnRegister}>
              <Text style={styles.registerText}>Criar conta gratuita</Text>
            </TouchableOpacity>

            <View style={styles.btnSocial}>
            <TouchableOpacity
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
                source={{ uri: `https://cdn.icon-icons.com/icons2/1584/PNG/512/3721671-google_108054.png`}}
                />
          </TouchableOpacity>

            </View>

          </View>
          
        </SContent>
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
  }
})