import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { HBody } from 'components/HBody';
import { Text, View, StatusBar } from 'react-native';
import { SContent } from './styles';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { setStatusBarHidden } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { useBackHandler } from '@react-native-community/hooks'
import { useNavigation } from '@react-navigation/native';

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

  useBackHandler(() => {
    navigation.goBack();
    setStatusBarHidden(false, 'fade')
    NavigationBar.setVisibilityAsync("visible")
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
    return true;
  })

  setStatusBarHidden(true, 'fade')
  NavigationBar.setVisibilityAsync("hidden")
  NavigationBar.setBehaviorAsync('overlay-swipe')
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)

  
    return (
    
    <WebView
    allowsFullscreenVideo
    useWebKit
    allowsInlineMediaPlayback
    mediaPlaybackRequiresUserAction
    javaScriptEnabled
    scrollEnabled={false}
    source={{ uri: `${video_url}` }}
     />
    
  );

};