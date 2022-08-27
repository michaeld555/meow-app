import { Feather, Foundation, Ionicons } from '@expo/vector-icons';
import { HBody } from 'components/HBody';
import { HBottomGradientBackground } from 'components/HBottomGrandientBackground';
import { HTopGrandientBackground } from 'components/HTopGrandientBackground';
import React, { useEffect, useState } from "react";
import { getMovieById, getPopularMovies } from 'services/themoviedb/movie.api';
import { SAdultBadge, SBannerItem, SButtonsContainer, SCircle, SContentItem, SImageBackground, SItemInfo, SMoreOptions, SNormalBadge, SSubtitle, STitle, STitleBadge } from './styles';
import theme from 'styles/GlobalStyles';
import { TVShow } from 'types/tvshow.type';
import { Movie } from 'types/movie.type';
import { getPopularTVShows, getTvShowById } from 'services/themoviedb/tvshow.api';
import { HSimpleList } from 'components/HSimpleList';
import { HPortraitItem } from 'components/Items/HPortraitItem';
import { RouterKey } from 'routes/routes-keys';
import { useNavigation } from '@react-navigation/native';
const axios = require('axios');

interface Props {
    route: {
        params: {
            id: number;
        }
    };
}

const token = '44|0x21WPgIUyHWYhFnOLzSjCR78Qp9FCr7Hhjr1o7n';

const meowApi = axios.create({
    baseURL: 'https://meowfansub.me/api/',
    headers: { Authorization: `Bearer ${token}` },
    params: {}
  });

export function DetailItem({ route }: Props){

    const { id } = route.params;

    const navigation = useNavigation();

    const [item, setItem] = useState<Movie>();
    const [moreItems, setMoreItems] = useState([]);

    React.useEffect( () => {
        meowApi.get( 
            'title?type=random',
          ).then(function (response: any) {
            setMoreItems(response.data.data)
          }).catch(console.log);
    }, [id]);

    React.useEffect( () => {
        meowApi.get( 
            `title/${id}`,
          ).then(function (response: any) {
            setItem(response.data.data[0])
          }).catch(console.log);
    }, [id]);


    function getImage(){

        if(!item) return {};

        return {
            uri: `${item.url_image}`
        }
    }

    function handleGoBack(){
        navigation.goBack();
    }

    /* function getReleaseYear(){
        return !!item && item.release_date ? new Date(item.release_date).getFullYear() : '';
    } */

    function getTitle() {
        return (item as Movie)?.name;
    }
    
    function handleChangeDetailItem(id: number){
        navigation.navigate(RouterKey.DetailItemPage as never, { id } as never);
    }

    function getDescription(){
         if(!!item){
            return item.description;
        }
            
    }

    
    
console.log(id)
    return (
        
        <HBody goBack={handleGoBack} title={getTitle()}>
            <SBannerItem>
                <SImageBackground source={getImage()}>
                    <HBottomGradientBackground height={100}>
                        
                        <SButtonsContainer>

                            <SMoreOptions>
                                <Foundation name="star" size={25} color={theme.colors.gold} style={{ marginRight: 10 }}/>
                                <Foundation name="star" size={25} color={theme.colors.gold} style={{ marginRight: 10 }}/>
                                <Foundation name="star" size={25} color={theme.colors.gold} style={{ marginRight: 10 }}/>
                                <Foundation name="star" size={25} color={theme.colors.white} style={{ marginRight: 10 }}/>
                                <Foundation name="star" size={25} color={theme.colors.white} />
                            </SMoreOptions>

                            <SMoreOptions>
                                <Feather name="plus" size={25} color={theme.colors.white} style={{ marginRight: 40 }} />
                                <Feather name="share-2" size={25} color={theme.colors.white} />
                            </SMoreOptions>

                        </SButtonsContainer>
                        
                    </HBottomGradientBackground>
                </SImageBackground>
                <HTopGrandientBackground>
                    
                    <SContentItem>

                        <STitle>{getTitle()}</STitle>

                        <SItemInfo>
                            {/* {!!item?.runtime && <SSubtitle>{getRunTime()}</SSubtitle>} */}

                            {/* {
                                !!item && item.adult ? (
                                    <SAdultBadge>
                                        <STitleBadge>18</STitleBadge>
                                    </SAdultBadge>
                                ) : (
                                    <SNormalBadge>
                                        <STitleBadge>16</STitleBadge>
                                    </SNormalBadge>
                                )
                            } */}
                            
                            {/* {!!item?.release_date && <SSubtitle>{getReleaseYear()}</SSubtitle>} */}
                            <SSubtitle>Meow Indica</SSubtitle>
                            <SSubtitle>5.1</SSubtitle>
                        </SItemInfo>
                        
                        <SSubtitle style={{ marginTop: 10 }}>{getDescription()}</SSubtitle>

                    </SContentItem>

                    <HSimpleList
                        title="Mais como esse"
                        items={moreItems}
                        renderItem={({ item }) => (
                            <HPortraitItem 
                                id={item.id} 
                                image={item.url_image}
                                onPress={(id: number) => handleChangeDetailItem(id)}
                            />
                        )}
                    />   
                </HTopGrandientBackground>
            </SBannerItem>
            
        </HBody>
    )
}