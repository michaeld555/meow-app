import { DrawerContentComponentProps } from '@react-navigation/drawer';
import React from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity} from "react-native";
import { HBody } from "components/HBody";
import { HHeaderAccount } from './HHeaderAccount';
import { SContent, styles } from './styles';
import { Ionicons } from "@expo/vector-icons";
import { RouterKey } from 'routes/routes-keys';
import { Feather } from '@expo/vector-icons';
import theme from 'styles/GlobalStyles';
import * as Linking from 'expo-linking';

interface Props extends DrawerContentComponentProps {
}

export function AccountPage({ navigation }: Props) {
    
    return (
        <HBody 
            useSafeAreaHeader 
            customHeaderContent={<HHeaderAccount />}
        >
            <SContent>
            <TouchableOpacity onPress={() => { navigation.navigate(RouterKey.UserPage) }} style={styles.buttons}>
                <Ionicons name="person" size={24} color='#fff' />
                <Text style={{ color: '#fff', fontSize: 20 }}> Sua Conta <Feather style={styles.icon} name="chevron-right" size={20} color={theme.colors.white} /></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }} style={styles.buttons}>
                <Ionicons name="lock-closed-outline" size={24} color='#fff' />
                <Text style={{ color: '#fff', fontSize: 20 }}> Alterar Senha <Feather style={styles.icon} name="chevron-right" size={20} color={theme.colors.white} /></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { Linking.openURL('https://t.me/mzd628') }} style={styles.buttons}>
                <Ionicons name="help-circle-outline" size={24} color='#fff' />
                <Text style={{ color: '#fff', fontSize: 20 }}> Suporte <Feather style={styles.icon} name="chevron-right" size={20} color={theme.colors.white} /></Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate(RouterKey.SignOutPage) }} style={styles.buttons}>
                <Ionicons name="log-out-outline" size={24} color='#fff' />
                <Text style={{ color: '#fff', fontSize: 20 }}> Sair</Text>
            </TouchableOpacity>
                
            </SContent>
        </HBody>
    )
}

