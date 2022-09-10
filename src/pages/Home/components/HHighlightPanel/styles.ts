import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';
import { StyleSheet } from "react-native";

export const SContainer = styled.View`
    height: 780px
`;

export const SImageBackground = styled.ImageBackground`
    height: 560px;
    justify-content: space-between;
`;

export const SHighlightTitle = styled.Text`
    color: ${theme.colors.white}; 
    font-size: 22px;
    font-weight: 700;
    text-align: center;
    margin-left: 40px;
    margin-right: 40px;
`;

export const SHighlightSubtitle = styled.Text`
    color: ${theme.colors.white}; 
    font-size: 12px;
    text-align: center;
    font-weight: 500;
    margin-top: 12px;
    margin-left: 40px;
    margin-right: 40px;
`;

export const styles = StyleSheet.create({
    shimmerText:{
        borderRadius: 20,
        height: 5,
        width: 150,
        marginTop: 9
    },
    shimmerVideo:{
        height: 560,
        width: '100%',
    },
    })