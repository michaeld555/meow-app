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
      marginTop: 150,
    },
    input:{
      backgroundColor: '#FFF',
      width: '85%',
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
    btn:{
      marginTop: 200,
    },
    Text:{
      color: '#FFF',
      fontSize: 17,
      width: '85%',
      marginBottom: 22,
    },
    hText:{
      color: '#FFF',
      fontSize: 23,
      fontWeight: 'bold',
      width: '85%',
      marginBottom: 22,
      paddingTop: 5,
      
    },
    Header:{
      flex:1,
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 23,
    }
  })