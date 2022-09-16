import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RouterKey } from './routes-keys';
import { TabRoutes } from './tab.routes';
import { HSidebarMenu } from 'components/HSidebarMenu';
import { SettingsPage } from 'pages/Settings';
import { DetailItem } from 'pages/DetailItem';
import { UserPage } from 'pages/MyAccount';
//import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const { Navigator, Screen } = createNativeStackNavigator();

const tabBarOptions = {
  headerShown: false,
}

export function PrivateRoutes() {
    return (
      <Navigator 
        screenOptions={tabBarOptions} 
        initialRouteName={RouterKey.TabRoutes}
      >
        <Screen name={RouterKey.TabRoutes} component={TabRoutes}/>
        <Screen name={RouterKey.SettingsPage} component={SettingsPage} />
        <Screen name={RouterKey.DetailItemPage} component={DetailItem} />
        <Screen name={RouterKey.UserPage} component={UserPage} />
      </Navigator>
    )
}

