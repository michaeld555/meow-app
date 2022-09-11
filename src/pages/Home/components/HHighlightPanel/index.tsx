import React, { ReactNode, useEffect, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Movie } from "types/movie.type";
import { HBottomGradientBackground } from "../../../../components/HBottomGrandientBackground";
import { HTopGrandientBackground } from "../../../../components/HTopGrandientBackground";
import { HHeaderGrandientBackground } from "../HHeaderGrandientBackground";
import { styles, SContainer, SHighlightSubtitle, SHighlightTitle, SImageBackground } from "./styles";
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import theme from 'styles/GlobalStyles';
import { HLandscapeItem } from 'components/Items/HLandscapeItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

interface Props {
    children: ReactNode;
    onPress?: (id: number) => void;
}

export function HHighlightPanel({ children, onPress }: Props){

    const [Header, setHeader] = useState<Movie>();
    const [loading, setLoading] = useState(true);
    const [token, setToken]: any = useState();

    React.useEffect(() => {
        getToken()
    }, [])

    async function getToken() {
        try {
        const jsonValue = await AsyncStorage.getItem('userData')
        const datae = jsonValue != null ? JSON.parse(jsonValue) : null;
        setToken(datae.token)
        } catch(e) {
        // error reading value
        }
    }

    const meowApi = 

      axios.create({
        baseURL: 'https://meowfansub.me/api/',
        headers: { Authorization: `Bearer ${token}` },
        params: {}
      });

    React.useEffect( () => {
        meowApi.get( 
              'title?type=header',
            ).then(function (response: any) {
              setHeader(response.data.data[0])
              setLoading(false)
            }).catch(console.log);

    }, [token])

  

    function getImage(){

        // Exibir imagem de carregando
        if(!Header) return {};

        return {
            uri: `${Header.url_image}` // TODO: parte header da api aqui
        }
       
    }

    function getOverview(){

        if(!!Header && Header.description.length > 80) {
            return `${Header.description.substring(0, 80)}...`
        }
    }


    if(loading){
        return (
            <SContainer>
    
                <TouchableHighlight onPress={() => !!onPress && onPress(!!Header ? Header.id : 0)}>
                    <SImageBackground source={require('../../../../../assets/shimmer1.png')}>
                        <HHeaderGrandientBackground />
                        <HBottomGradientBackground>
                            <ShimmerPlaceHolder style={styles.shimmerText}/>                           
                            <ShimmerPlaceHolder style={styles.shimmerSubText}/>
                            <ShimmerPlaceHolder style={styles.shimmerSubText}/>                   
                        </HBottomGradientBackground>
                    </SImageBackground>
                </TouchableHighlight>
                
                <HTopGrandientBackground>
                    {children}
                </HTopGrandientBackground>
            </SContainer>
        )
    } else {
        return (
            <SContainer>
    
                <TouchableHighlight onPress={() => !!onPress && onPress(!!Header ? Header.id : 0)}>
                    <SImageBackground source={loading ? require('../../../../../assets/shimmer1.png') : getImage()}>
                        <HHeaderGrandientBackground />
                        <HBottomGradientBackground>

                            <SHighlightTitle>
                                {!!Header ? Header.name : ''}
                            </SHighlightTitle>
    
                            <SHighlightSubtitle>
                            {getOverview()}
                            </SHighlightSubtitle>
                            
                        </HBottomGradientBackground>
                    </SImageBackground>
                </TouchableHighlight>
                
                <HTopGrandientBackground>
                    {children}
                </HTopGrandientBackground>
            </SContainer>
        )
    }
}

