import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';
import { StyleSheet } from "react-native";

export const STitle = styled.Text`
    color: ${theme.colors.white};
    margin-left: 6px;
    margin-top: 6px;
    max-width: 220px;
    opacity: 0.8;
`

export const SImage = styled.Image`
    width: 220px;
    height: 140px;
    margin-horizontal: 6px;
`

export const styles = StyleSheet.create({
    shimmerVideo:{
        height: 140,
        width: 220,
        marginRight: 9
    },
    })