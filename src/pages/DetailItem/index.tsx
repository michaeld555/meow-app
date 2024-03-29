import { Feather, Foundation, Ionicons } from '@expo/vector-icons';
import { HBody } from 'components/HBody';
import { HBottomGradientBackground } from 'components/HBottomGrandientBackground';
import { HTopGrandientBackground } from 'components/HTopGrandientBackground';
import React, { useEffect, useState, useCallback, useRef } from "react";
import { styles, SBannerItem, SButtonsContainer, SCircle, SContentItem, SImageBackground, SItemInfo, SMoreOptions, SSubtitle, STitle, ETitle, STitleBadge } from './styles';
import theme from 'styles/GlobalStyles';
import { Movie } from 'types/movie.type';
import { HSimpleList } from 'components/HSimpleList';
import { HPortraitItem } from 'components/Items/HPortraitItem';
import { RouterKey } from 'routes/routes-keys';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {TouchableOpacity, Alert, Modal, StyleSheet, Text, Pressable, View, Share, BackHandler} from 'react-native';
import { Episodes } from 'components/Episodes';
import { PageableTheMovieDb } from "types/global.type";
import faker from "../../types/faker.json";
import * as ScreenOrientation from 'expo-screen-orientation';
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)


interface Props {
    route: {
        params: {
            id: number;
        }
    };
}
//const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
export function DetailItem({ route }: Props){

    const gold = theme.colors.gold;
    const white = theme.colors.white;

    const { id } = route.params;

    const navigation = useNavigation();
    

    const [item, setItem]: any = useState<Movie>();
    const [moreItems, setMoreItems]: any = useState({});
    const [myList, setMyList]: any = useState('plus');
    const [starRating, setStarRating]: any = useState([white, white, white, white, white]);
    const [modalVisible, setModalVisible] = useState(false);
    const [movies, setMovies] = useState<PageableTheMovieDb<Movie>>(new PageableTheMovieDb());
    const [loading, setLoading] = useState(true);
    const [token, setToken]: any = useState();
    const [userId, setUserId]: any = useState();
    const isFocused = useIsFocused();

    React.useEffect(() => {
        getToken()
    }, [])

    async function getToken() {
        try {
        const jsonValue = await AsyncStorage.getItem('userData')
        const datae = jsonValue != null ? JSON.parse(jsonValue) : null;
        setUserId(datae.id)
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

  const onBackPress = useCallback(
        () => {
        if(isFocused){
            navigation.goBack();
            return true
        }
        return false
        }, [isFocused],
    )

    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])


    React.useEffect( () => {
        setMoreItems(faker.results)
        if(token != null){
        meowApi.get( 
            'title?type=random',
          ).then(function (response: any) {
            setMoreItems(response.data.data)
          }).catch(console.log);
        }
    }, [id, token]);

    React.useEffect( () => {
        setStarRating([white, white, white, white, white])
        setLoading(true)
        setMyList('plus')
        if(token != null){
        meowApi.get( 
            `title/${id}`,
          ).then(function (response: any) {
            setItem(response.data.data[0])
            setMovies(response.data.data[0])
            setLoading(false)
          }).catch(console.log);
        }
    }, [id, token]);

    React.useEffect( () => {
        if(token != null){
        meowApi.post('mylist', {
            user_id: userId,
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
        }
    }, [id, token]);

    React.useEffect( () => {
        if(token != null){
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
        }
    }, [id, token]);


    function getImage(){

        if(!item) return {};

        return {
            uri: `${item.url_image}`
        }
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
                user_id: userId,
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
                user_id: userId,
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

    async function share(){

            try {
              const result = await Share.share({
                message:
                  `Olá venha assistir ${getTitle()} legendado e de graça no app da Meow`,
              });
              if (result.action === Share.sharedAction) {
                if (result.activityType) {
                  // shared with activity type of result.activityType
                } else {
                  // shared
                }
              } else if (result.action === Share.dismissedAction) {
                // dismissed
              }
            } catch (error: any) {
              alert(error.message);
            }
        
    }
    
    return (
        
        <HBody title={getTitle()}>
            <SBannerItem>
                <SImageBackground source={loading ? require('../../../assets/shimmer1.png') : getImage()}>
                    <HBottomGradientBackground height={100}>
                        
                        <SButtonsContainer>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
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
                                <TouchableOpacity onPress={share}>
                                    <Feather name="share-2" size={30} color={theme.colors.white} />
                                </TouchableOpacity>                                
                            </SMoreOptions>

                        </SButtonsContainer>
                        
                    </HBottomGradientBackground>
                </SImageBackground>
                <HTopGrandientBackground>
                    
                { !loading  &&
                    <SContentItem>
                        <STitle>{getTitle()}</STitle>
                        <SItemInfo>
                            <SSubtitle>{item.year}</SSubtitle>
                            <SSubtitle>{(item.type_title == 1) ? `Serie` : (item.type_title == 2) ? `Filme` : (item.type_title == 3) ? `Curta` : ``}</SSubtitle>
                            <SSubtitle>Meow Indica</SSubtitle>
                            <SSubtitle>Legendado</SSubtitle>
                        </SItemInfo>                 
                        <SSubtitle style={{ marginTop: 10 }}>{getDescription()}</SSubtitle>
                    </SContentItem>
                }
                { loading  &&
                    <SContentItem>
                        <ShimmerPlaceHolder style={styles.shimmerDescription} />
                        <ShimmerPlaceHolder style={styles.shimmerText} />
                        <ShimmerPlaceHolder style={styles.shimmerText} />
                        <ShimmerPlaceHolder style={styles.shimmerText} />
                        <ShimmerPlaceHolder style={styles.shimmerText} />
                    </SContentItem>
                }

                    <ETitle>Episodios: </ETitle>

                    { loading  && 

                       <View style={{ paddingBottom: 26 }}>
                           <Episodes
                                id={0} 
                                image={faker.results[0].url_image}
                                description={""}
                                ep_number={0}
                                video_url={""}
                                onPress={() => {}}
                            />
                       </View>
                    }

                    { movies  && !loading && 
                    
                    movies.episodes.map((x) => (
                       <View key={x.id} style={{ paddingBottom: 26 }}>
                           <Episodes
                                id={x.id} 
                                image={x.url_image}
                                description={x.description}
                                ep_number={x.ep_number}
                                video_url={x.video_url}
                                onPress={(video_url: string) => { navigation.navigate(RouterKey.SettingsPage as never, { video_url } as never)  }}
                            />
                       </View>
                       
                    ) )
                    }

                    <HSimpleList
                        title="Mais como esse"
                        items={moreItems}
                        renderItem={({ item }) => (
                            <HPortraitItem 
                                id={item.id} 
                                image={item.url_image}
                                onPress={(id: number) => (item.id == 0) ? () => {} : handleChangeDetailItem(id)}
                            />
                        )}
                    />   
                </HTopGrandientBackground>
            </SBannerItem>

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <STitle>Sua Avaliação:</STitle>
                    <TouchableOpacity>
                        <SMoreOptions >
                        <TouchableOpacity><Foundation name="star" size={50} color={gold} style={{ marginRight: 10 }}/></TouchableOpacity>
                        <TouchableOpacity><Foundation name="star" size={50} color={gold} style={{ marginRight: 10 }}/></TouchableOpacity>
                        <TouchableOpacity><Foundation name="star" size={50} color={gold} style={{ marginRight: 10 }}/></TouchableOpacity>
                        <TouchableOpacity><Foundation name="star" size={50} color={gold} style={{ marginRight: 10 }}/></TouchableOpacity>
                        <TouchableOpacity><Foundation name="star" size={50} color={gold} /></TouchableOpacity>                                   
                        </SMoreOptions>
                    </TouchableOpacity>                    
                </View>
                </View>
            </Modal>
            
        </HBody>
    )
}