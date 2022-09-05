import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';
import { StyleSheet } from "react-native";

export const SContent = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`;

export const STitle = styled.Text`
    color: ${theme.colors.white};
    width: 100%;
    font-size: 20px; 
    padding-top: 5px;
    padding-left: 24px; 
    padding-bottom: 16px;
    font-weight: 700;
`;

export const mylist = StyleSheet.create({
    loaderView: {
        margin: 0,
        borderRadius: 20,
        padding: 0,
        alignSelf: "center",
        height: 400,
        width: 200,
      },
    emptyView: {
        marginTop: 120,
        borderRadius: 20,
        padding: 0,
        alignSelf: "center",
        height: 200,
        width: 200,
      },
    Title: {
        color: '#FFF',
        fontSize: 30,
        marginBottom: 8
    },
    SubTitle: {
        color: '#FFF',
        fontSize: 15,
    },
    SubTitle2: {
        color: '#FFF',
        fontSize: 15,
        marginBottom: 20,
    }
})