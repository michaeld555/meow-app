import { StackHeaderProps } from '@react-navigation/stack';
import { HGradientBackground } from 'components/HGradientBackground';
import React, { useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, BackHandler } from 'react-native';
import { RouterKey } from '../../routes/routes-keys';
import { SContent } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Lottie from "lottie-react-native";
import { useIsFocused } from '@react-navigation/native';

interface Props extends StackHeaderProps {
}

export function SignOutPage({ navigation }: Props) {

  const isFocused = useIsFocused();

  const onBackPress = useCallback(
    () => {
      if(isFocused){
        return true
      }
      return false
    }, [isFocused],
  )

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [])

  useEffect(() => {

    const logout = async () => {
      try {
        await AsyncStorage.removeItem('userData');
        setTimeout(() => {
          navigation.navigate(RouterKey.SignInPage);
        }, 5000);
      } catch(e) {
        alert(e);
      }
    }

    logout();

  }, []);


  return (
    <HGradientBackground>
        
        <SContent>
          <View style={styles.modalView}>                
                    <Lottie
                    source={require("../../assets/85499-catlover.json")}
                    autoPlay={true}
                    loop={true}
                    />              
                </View>
            <Text style={{ color: '#fff', fontSize: 20 }}>Saindo...</Text>
        </SContent>
    </HGradientBackground>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: 100,
    height: 100
  }
})