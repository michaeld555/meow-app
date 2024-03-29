import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';
import { StyleSheet } from "react-native";

export const STitle = styled.Text`
    color: ${theme.colors.white};
    margin-left: 6px;
    margin-top: 6px;
    max-width: 290px;
`

export const SImage = styled.Image`
    width: 290px;
    height: 140px;
    margin-horizontal: 6px;
`
export const styles = StyleSheet.create({
    shimmerVideo:{
        height: 140,
        width: 290,
        marginRight: 9
    },
    })