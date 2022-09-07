import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, StyleSheet } from "react-native";
import { HBody } from "components/HBody";
import { HHeaderAccount } from './HHeaderAccount';
import { SContent } from './styles';
import { Ionicons } from "@expo/vector-icons";
import { RouterKey } from 'routes/routes-keys';

interface Props extends DrawerContentComponentProps {
}

export function AccountPage({ navigation }: Props) {
    
    return (
        <HBody 
            useSafeAreaHeader 
            customHeaderContent={<HHeaderAccount />}
        >
            <SContent>
            <TouchableOpacity onPress={() => { }} style={styles.buttons}>
                <Ionicons name="cog-outline" size={24} color='#fff' />
                <Text style={{ color: '#fff', fontSize: 20 }}> Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate(RouterKey.SignOutPage) }} style={styles.buttons}>
                <Ionicons name="log-out-outline" size={24} color='#fff' />
                <Text style={{ color: '#fff', fontSize: 20 }}> Sair</Text>
            </TouchableOpacity>
                
            </SContent>
        </HBody>
    )
}

const styles = StyleSheet.create({
    buttons:{
        flexDirection: 'row',
        margin: 30
    }
})