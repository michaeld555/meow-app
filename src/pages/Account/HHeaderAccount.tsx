import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export function HHeaderAccount(){

    const [loading, setLoading] = useState(true)
    const [token, setToken]: any = useState();
    const [userId, setUserId]: any = useState();
    const [userName, setUsername]: any = useState();
    const [userPhoto, setUserPhoto]: any = useState();
    const isFocused = useIsFocused();

    React.useEffect(() => {
        getToken()
    }, [isFocused])

    async function getToken() {
        try {
        const jsonValue = await AsyncStorage.getItem('userData')
        const datae = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUserId(datae.id)
        setToken(datae.token)
        setUsername(datae.name)
        } catch(e) {
        // error reading value
        }
    }

    const meowApi = 

      axios.create({
        baseURL: 'https://meowfansub.me/api/',
        headers: { Authorization: `Bearer ${token}` },
        params: {}
      });

    React.useEffect(() => {
        
        meowApi.get( 
            `user/${userId}`,
          ).then(function (response: any) {
            if(response.data.data.photo_url !== null){
                setUserPhoto(response.data.data.photo_url);
                setLoading(false);
            } else {
                setUserPhoto(`https://uploaddeimagens.com.br/images/004/018/351/full/icon.png?1662944284`);
                setLoading(false);
            }
            
            
          }).catch(console.log);
    }, [token, isFocused])


    if(loading){
        return (
        <SHeaderAccountContainer>
            <SAccountContainer>
            <ShimmerPlaceHolder style={styles.shimmerPhoto}/>
                <ShimmerPlaceHolder style={styles.shimmerText}/>
            </SAccountContainer>
        </SHeaderAccountContainer>
    )
    } else {
        return (
            <SHeaderAccountContainer>
                <SAccountContainer>
                    <SPicture source={{ uri: `${userPhoto}` }} />
                    <Text style={styles.texto}>{userName.split(" ")[0]}</Text>
                </SAccountContainer>
            </SHeaderAccountContainer>
        )
    }
    
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
    },
    shimmerText:{
        width: 80,
        borderRadius: 20,
    },
    shimmerPhoto:{
        width: 60,
        height: 60,
        borderRadius: 8,
        marginTop: 70,
        marginBottom: 10
    }

})