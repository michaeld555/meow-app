import React, { ReactNode, useEffect, useState } from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Movie } from "types/movie.type";
import { HBottomGradientBackground } from "../../../../components/HBottomGrandientBackground";
import { HTopGrandientBackground } from "../../../../components/HTopGrandientBackground";
import { HHeaderGrandientBackground } from "../HHeaderGrandientBackground";
import { styles, SContainer, SHighlightSubtitle, SHighlightTitle, SImageBackground } from "./styles";
const axios = require('axios');
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import theme from 'styles/GlobalStyles';
import { HLandscapeItem } from 'components/Items/HLandscapeItem';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

interface Props {
    children: ReactNode;
    onPress?: (id: number) => void;
}

const token = '44|0x21WPgIUyHWYhFnOLzSjCR78Qp9FCr7Hhjr1o7n';

    const meowApi = axios.create({
        baseURL: 'https://meowfansub.me/api/',
        headers: { Authorization: `Bearer ${token}` },
        params: {}
      });

export function HHighlightPanel({ children, onPress }: Props){

    const [Header, setHeader] = useState<Movie>();
    const [loading, setLoading] = useState(true);

    React.useEffect( () => {
        meowApi.get( 
              'title?type=header',
            ).then(function (response: any) {
              setHeader(response.data.data[0])
              setLoading(false)
            }).catch(console.log);

    }, [])

  

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
    
                <TouchableHighlight onPress={() => {}}>
                <ShimmerPlaceHolder style={styles.shimmerVideo} />
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

