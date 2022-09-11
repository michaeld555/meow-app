import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { HBody } from 'components/HBody';
import { Text, View} from 'react-native';
import { SContent } from './styles';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { setStatusBarHidden, setStatusBarStyle } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useBackHandler } from '@react-native-community/hooks'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { HLoading } from 'components/HLoading'

interface Props {
  route: {
      params: {
          video_url: string;
      }
  };
}

export function SettingsPage({ route }: Props) {

  const navigation = useNavigation();
  const { video_url } = route.params;

  async function changeScreenOrientation() {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
  }

  useBackHandler(() => {
    
    setStatusBarHidden(false, 'fade')
    NavigationBar.setVisibilityAsync("visible")
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    navigation.goBack();
    return true;
  })

  setStatusBarHidden(true, 'fade')
  NavigationBar.setVisibilityAsync("hidden")
  NavigationBar.setBehaviorAsync('overlay-swipe')
  const runFirst = `
    document.body.style.backgroundColor = 'blue';
      true;`;
  const runBefore = `
    document.querySelector('.plyr--fullscreen-enabled [data-plyr=fullscreen]').style.display='none';
    document.querySelector('.plyr--fullscreen-enabled [data-plyr=fullscreen]').click();
      true;
    `;

  
    return (
      <SContent>
    <WebView
    style={{
      backgroundColor: '#3971E0'
    }}
    allowsFullscreenVideo={false}
    useWebKit
    allowsInlineMediaPlayback
    mediaPlaybackRequiresUserAction
    javaScriptEnabled
    scrollEnabled={false}
    source={{ uri: `${video_url}` }}
    onLoad={() => {changeScreenOrientation()}}
    injectedJavaScriptBeforeContentLoaded={runFirst}
    injectedJavaScript={runBefore}
     />
     </SContent>
  );

};