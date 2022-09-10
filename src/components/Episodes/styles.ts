import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';
import { StyleSheet } from "react-native";

export const STitle = styled.Text`
    color: ${theme.colors.white};
    margin-left: 6px;
    margin-top: 1px;
    max-width: 220px;
    /* opacity: 0.8; */
    font-size: 20px;
    margin-left: 6px;
`

export const SImage = styled.Image`
    width: 180px;
    height: 100px;
    margin-horizontal: 6px;
    margin-bottom: 16px;

`

export const SubTitle = styled.Text`
    color: ${theme.colors.white};
    margin-left: 6px;
    margin-top: 1px;
    max-width: 220px;
    opacity: 0.8; 
    font-size: 10px;
`

export const styles = StyleSheet.create({
shimmerDescription:{
    borderRadius: 20,
    height: 10,
    width: 150
},
shimmerText:{
    borderRadius: 20,
    height: 5,
    width: 150,
    marginTop: 9
},
shimmerVideo:{
    height: 100,
    width: 190,
    marginRight: 9
},
})