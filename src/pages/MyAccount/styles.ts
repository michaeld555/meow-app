import styled from 'styled-components/native';
import { StyleSheet } from "react-native";

export const SContent = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const styles = StyleSheet.create({
    background:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
      width: 180,
      height: 180,
      marginBottom: 20,
      borderRadius: 25
    },
    container:{
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      marginBottom: 0,
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
    containerImage:{
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%',
      marginBottom: 30,
    },
    btnImage:{
      marginTop: 100,
    },
  })