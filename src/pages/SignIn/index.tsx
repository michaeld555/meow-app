import { StackHeaderProps } from '@react-navigation/stack';
import { HGradientBackground } from 'components/HGradientBackground';
import { HPrimaryButton } from 'components/HPrimaryButton';
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { RouterKey } from '../../routes/routes-keys';
import { SContent } from './styles';

interface Props extends StackHeaderProps {
  children: ReactNode;
}

export function SignInPage({ navigation }: Props) {

  async function handleSignIn() {
      navigation.navigate(RouterKey.PrivateRoutes);
  }

  return (
    <HGradientBackground>
        <SContent>
          <HPrimaryButton 
            title="LOGIN" 
            width={300}
            onPress={() => handleSignIn()} //TODO: Mudar tela de login e deixar funcional
          />
        </SContent>
    </HGradientBackground>
    
  );
};

