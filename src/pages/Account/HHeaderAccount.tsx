import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';

//TODO: header do configuracao
export function HHeaderAccount(){
    return (
        <SHeaderAccountContainer>
            <TouchableOpacity>
                <Ionicons name="ios-settings-outline" size={24} color={theme.colors.white} />
            </TouchableOpacity>
            <SAccountContainer>

                <SPicture source={require("assets/logo.png")} />
                
            </SAccountContainer>
            <SSpacing />
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
    min-width: 35px;
`

const SPicture = styled.ImageBackground`
    width: 40px;
    height: 40px;

    border-bottom-end-radius: 20px;
    border-top-end-radius: 20px;
    border-bottom-start-radius: 20px;
    border-top-start-radius: 20px;
    overflow: hidden;

    border: 2px solid ${theme.colors.purple_normal};
`