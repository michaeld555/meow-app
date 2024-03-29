import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';
import { StyleSheet } from "react-native";

export const STitle = styled.Text`
    color: ${theme.colors.white};
    margin-left: 6px;
    margin-top: 6px;
    max-width: 210px;
`

export const SImage = styled.Image`
    height: 290px;
    width: 210px;
    margin-horizontal: 6px;
`
export const styles = StyleSheet.create({
    shimmerVideo:{
        height: 290,
        width: 210,
        marginRight: 9
    },
    })