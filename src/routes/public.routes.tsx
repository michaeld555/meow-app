import React, { useState } from 'react';
import { getLogin } from '../services';
import { createStackNavigator } from '@react-navigation/stack';
import { PrivateRoutes } from './private.routes';
import { RouterKey } from './routes-keys';
import { SignInPage } from 'pages/SignIn';
import { SignOutPage } from 'pages/SignOut';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HLoading } from 'components/HLoading';

const { Navigator, Screen } = createStackNavigator();

const tabBarOptions = {
  headerShown: false,
}

export function PublicRoutes() {

  const [route, setRoute] = useState(3);

  React.useEffect( () => {

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userData')
        if(value !== null) { 
          setRoute(1)
        }
        else{
          setRoute(2)
        }
      } catch(e) {
          console.log(e)
      }
    }

    getData();

  }, [])

    if(route == 1){

      return (
        <Navigator screenOptions={tabBarOptions} initialRouteName={ RouterKey.PrivateRoutes }>
          <Screen name={RouterKey.SignInPage}  component={SignInPage} />
          <Screen name={RouterKey.SignOutPage}  component={SignOutPage} />
          <Screen name={RouterKey.PrivateRoutes}  component={PrivateRoutes} />
        </Navigator>
      )

    } else if(route == 2) {

      return (
        <Navigator screenOptions={tabBarOptions} initialRouteName={ RouterKey.SignInPage }>
          <Screen name={RouterKey.SignInPage}  component={SignInPage} />
          <Screen name={RouterKey.SignOutPage}  component={SignOutPage} />
          <Screen name={RouterKey.PrivateRoutes}  component={PrivateRoutes} />
        </Navigator>
      )

    }
    else{

      return <HLoading />

    }
}

