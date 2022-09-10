import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';

//TODO: header do configuracao
export function HHeaderAccount(){
    return (
        <SHeaderAccountContainer>
            <SAccountContainer>
                <SPicture source={{ uri: `https://uploaddeimagens.com.br/images/004/017/404/full/Design_sem_nome_%284%29.png?1662826050` }} />
                <Text style={styles.texto}>Michael</Text>
            </SAccountContainer>
        </SHeaderAccountContainer>
    )
}

const SHeaderAccountContainer = styled.View`
    flex-direction: row;
    align-items: center;
`

const SAccountContainer = styled.View`
    flex: 1;
    align-items: center;
`

const SSpacing = styled.View`
    min-width: 10px;
`

const SPicture = styled.ImageBackground`
    width: 60px;
    height: 60px;

    border-bottom-end-radius: 20px;
    border-top-end-radius: 20px;
    border-bottom-start-radius: 20px;
    border-top-start-radius: 20px;
    overflow: hidden;
    margin-top: 70px;
    margin-bottom: 10px
    border: 2px solid ${theme.colors.purple_normal};
`

const styles = StyleSheet.create({
    texto:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    }
})