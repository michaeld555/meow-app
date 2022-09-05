import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { HBody } from 'components/HBody';
import { Text, View } from 'react-native';
import { SContent } from './styles';
import { WebView } from 'react-native-webview';

interface Props extends DrawerContentComponentProps {
}

export function SettingsPage({ navigation }: Props) {

  function goBack(){
    navigation.goBack();
  }

  return (
    
    <WebView
 
  allowsFullscreenVideo
  useWebKit
 
  allowsInlineMediaPlayback
  mediaPlaybackRequiresUserAction
  javaScriptEnabled
  scrollEnabled={false}
  source={{ uri: 'https://www.mywebsite.com/playVideo?videoId=jzD_yyEcp0M' }}
   />
    
  );
};
