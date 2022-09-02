import { Feather, Foundation, Ionicons } from '@expo/vector-icons';
import { HBody } from 'components/HBody';
import { HBottomGradientBackground } from 'components/HBottomGrandientBackground';
import { HTopGrandientBackground } from 'components/HTopGrandientBackground';
import React, { useEffect, useState } from "react";
import { SAdultBadge, SBannerItem, SButtonsContainer, SCircle, SContentItem, SImageBackground, SItemInfo, SMoreOptions, SNormalBadge, SSubtitle, STitle, STitleBadge } from './styles';
import theme from 'styles/GlobalStyles';
import { Movie } from 'types/movie.type';
import { HSimpleList } from 'components/HSimpleList';
import { HPortraitItem } from 'components/Items/HPortraitItem';
import { RouterKey } from 'routes/routes-keys';
import { useNavigation } from '@react-navigation/native';
import { meowApi } from "../../services/";
import {TouchableOpacity} from 'react-native';

interface Props {
    route: {
        params: {
            id: number;
        }
    };
}

export function DetailItem({ route }: Props){

    const gold = theme.colors.gold;
    const white = theme.colors.white;

    const { id } = route.params;

    const navigation = useNavigation();

    const [item, setItem] = useState<Movie>();
    const [moreItems, setMoreItems] = useState([]);
    const [myList, setMyList]: any = useState('plus');
    const [starRating, setStarRating]: any = useState([white, white, white, white, white]);

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

    React.useEffect( () => {
        meowApi.post('mylist', {
            user_id: 1,
            title_id: id,
            type: 'is',
          })
          .then(function (response) {
            console.log(response.data.data);
            if(response.data.data.length === 0){
                setMyList('plus');
            } else {
                setMyList('check');
            }
          })
          .catch(function (error) {
            console.error(error);
          });
    }, [id]);

    React.useEffect( () => {
        meowApi.post('avaliation', {
            title_id: id,
            type: 'get'
          })
          .then(function (response) {
            const starRating = response.data.data;
            console.log(response.data.data);

            var starNumber = starRating == 1 ? [gold, white, white, white, white]
            : starRating == 2 ? [gold, gold, white, white, white] : starRating == 3 
            ? [gold, gold, gold, white, white] : starRating == 4 ? [gold, gold, gold, gold, white] 
            : [gold, gold, gold, gold, gold];

            setStarRating(starNumber);
          })
          .catch(function (error) {
            console.error(error);
          });
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

    function addMyList(){
        if(myList == 'plus'){

            meowApi.post('mylist', {
                user_id: 1,
                title_id: id,
                type: 'add',
              })
              .then(function (response) {
                setMyList('check');
              })
              .catch(function (error) {
                console.error(error);
              });
            
        } else if(myList == 'check') {

            meowApi.post('mylist', {
                user_id: 1,
                title_id: id,
                type: 'remove',
              })
              .then(function (response) {
                setMyList('plus');
              })
              .catch(function (error) {
                console.error(error);
              });           
        }
    }
    
    return (
        
        <HBody goBack={handleGoBack} title={getTitle()}>
            <SBannerItem>
                <SImageBackground source={getImage()}>
                    <HBottomGradientBackground height={100}>
                        
                        <SButtonsContainer>
                            <TouchableOpacity>
                                <SMoreOptions>
                                    <Foundation name="star" size={30} color={starRating[0]} style={{ marginRight: 10 }}/>
                                    <Foundation name="star" size={30} color={starRating[1]} style={{ marginRight: 10 }}/>
                                    <Foundation name="star" size={30} color={starRating[2]} style={{ marginRight: 10 }}/>
                                    <Foundation name="star" size={30} color={starRating[3]} style={{ marginRight: 10 }}/>
                                    <Foundation name="star" size={30} color={starRating[4]} />
                                </SMoreOptions>
                            </TouchableOpacity>

                            <SMoreOptions>
                                <TouchableOpacity onPress={addMyList}>
                                    <Feather name={myList} size={35} color={theme.colors.white} style={{ marginRight: 40 }} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Feather name="share-2" size={30} color={theme.colors.white} />
                                </TouchableOpacity>                                
                            </SMoreOptions>

                        </SButtonsContainer>
                        
                    </HBottomGradientBackground>
                </SImageBackground>
                <HTopGrandientBackground>
                    
                    <SContentItem>

                        <STitle>{getTitle()}</STitle>

                        <SItemInfo>
                            <SSubtitle>2022</SSubtitle>
                            <SSubtitle>Série</SSubtitle>


                            {/* <SNormalBadge>
                                <STitleBadge>16</STitleBadge>
                            </SNormalBadge> */}
                            
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