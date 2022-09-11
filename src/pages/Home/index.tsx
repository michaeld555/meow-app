import { Feather } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { HBody } from "components/HBody";
import { HSimpleList } from "components/HSimpleList";
import { HHighlightItem } from 'components/Items/HHighlightItem';
import { HLandscapeItem } from 'components/Items/HLandscapeItem';
import { HLongLandscapeItem } from 'components/Items/HLongLandscapeItem';
import { HLongPortraitItem } from 'components/Items/HLongPortraitItem';
import { HPortraitItem } from 'components/Items/HPortraitItem';
import { HSquareItem } from 'components/Items/HSquareItem';
import React, { useEffect, useState, useCallback } from "react";
import { RouterKey } from 'routes/routes-keys';
import theme from 'styles/GlobalStyles';
import { Movie } from "types/movie.type";
import faker from "types/faker.json";
import { HHighlightPanel } from "./components/HHighlightPanel";
import { useIsFocused } from '@react-navigation/native';
import { BackHandler, Alert } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props extends DrawerContentComponentProps {
}

export function HomePage({ navigation }: Props) {

    const [highlightMovie, setHighlightMovie] = useState<Movie>();
    const [ForYou, setForYou]: any = useState(faker.results);
    const [youLike, setYouLike]: any = useState(faker.results);
    const [Recent, setRecent]: any = useState(faker.results);
    const [MorePopular, setMorePopular]: any = useState(faker.results);
    const [MoreWeekWatched, setMoreWeekWatched]: any = useState(faker.results);
    const [Painel, setPainel]: any = useState(faker.results[0]);
    const [MoreReviwed, setMoreReviwed]: any = useState(faker.results);
    const [MeowIndica, setMeowIndica]: any = useState(faker.results);
    const [Movies, setMovies]: any = useState(faker.results);
    const [BestWatch, setBestWatch]: any = useState(faker.results);
    const [Curtas, setCurtas]: any = useState(faker.results);
    const [token, setToken]: any = useState();
    const isFocused = useIsFocused();

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

  const onBackPress = useCallback(
        () => {
        if(isFocused){
            
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
        meowApi.get( 
              'title?type=forYou',
            ).then(function (response: any) {
              setForYou(response.data.data)
            }).catch(console.log);

    }, [token])

    React.useEffect( () => {
        meowApi.get( 
            'title?type=random',
          ).then(function (response: any) {
            setYouLike(response.data.data)
          }).catch(console.log);
    }, [token]);

    React.useEffect( () => {
        meowApi.get( 
            'title?type=recent',
          ).then(function (response: any) {
            setRecent(response.data.data)
          }).catch(console.log);
    }, [token]);

    React.useEffect( () => {
        meowApi.get( 
              'title?type=more_popular',
            ).then(function (response: any) {
                setMorePopular(response.data.data)
            }).catch(console.log);

    }, [token])

    React.useEffect( () => {
        meowApi.get( 
            'title?type=more_week_watched',
          ).then(function (response: any) {
            setMoreWeekWatched(response.data.data)
          }).catch(console.log);
    }, [token]);

    React.useEffect( () => {
        meowApi.get( 
              'title?type=painel',
            ).then(function (response: any) {
              setPainel(response.data.data[0])
            }).catch(console.log);

    }, [token])

    React.useEffect( () => {
        meowApi.get( 
            'title?type=more_reviwed',
          ).then(function (response: any) {
            setMoreReviwed(response.data.data)
          }).catch(console.log);
    }, [token]);////////

    React.useEffect( () => {
        meowApi.get( 
            'title?type=random',
          ).then(function (response: any) {
            setMeowIndica(response.data.data)
          }).catch(console.log);
    }, [token]);

    React.useEffect( () => {
        meowApi.get( 
              'title?type=random',
            ).then(function (response: any) {
                setMovies(response.data.data)
            }).catch(console.log);

    }, [token])

    React.useEffect( () => {
        meowApi.get( 
            'title?type=random',
          ).then(function (response: any) {
            setBestWatch(response.data.data)
          }).catch(console.log);
    }, [token]);

    React.useEffect( () => {
        meowApi.get( 
            'title?type=more_reviwed',
          ).then(function (response: any) {
            setCurtas(response.data.data)
          }).catch(console.log);
    }, [token]);


    function openSidebar() {
        navigation.openDrawer();
    }

    function handleShowDetailItem(id: number){
        navigation.navigate(RouterKey.DetailItemPage, { id});
    }

    return (
        <HBody openSidebar={openSidebar}>
            <HHighlightPanel onPress={handleShowDetailItem}>
                <HSimpleList
                    title="Selecionados para você"
                    items={ForYou}
                    renderItem={({ item }) => (
                        <HLandscapeItem 
                            id={item.id} 
                            image={item.url_image2}
                            onPress={(item.id == 0) ? () => {} : handleShowDetailItem}
                        />
                    )}
                />
            </HHighlightPanel>

            <HSimpleList
                title="Mais populares na meow"
                items={MorePopular}
                renderItem={({item}) => (
                    <HPortraitItem 
                        id={item.id} 
                        image={item.url_image}
                        onPress={(item.id == 0) ? () => {} : handleShowDetailItem}
                    />
                )}
            />

            <HSimpleList
                title="Talvez você goste"
                items={youLike}
                renderItem={({ item }) => (
                    <HPortraitItem 
                        id={item.id} 
                        image={item.url_image}
                        onPress={(id: number) => (item.id == 0) ? () => {} : handleShowDetailItem(id)}
                    />
                )}
            />

            <HSimpleList
                title="Atualizações mais recentes"
                items={Recent}
                renderIconTitle={<Feather name="chevron-right" size={16} color={theme.colors.white} />}
                renderItem={({item}) => (
                    <HLongLandscapeItem 
                        id={item.id} 
                        image={item.url_image2}
                        title={item.name}
                        onPress={(id: number) => (item.id == 0) ? () => {} : handleShowDetailItem(id)}
                    />
                )}
            />

            <HSimpleList
                title="Mais assistidos da semana"
                subtitle="Nosso TOP 10 mais assistidos nos ultimos 7 dias."
                textAlign="center"
                items={MoreWeekWatched}
                renderItem={({item, index}) => (
                    <HPortraitItem 
                        id={item.id} 
                        image={item.url_image}

                        position={index + 1}
                        onPress={(id: number) => (item.id == 0) ? () => {} : handleShowDetailItem(id)}
                    />
                )}
            />

            <HSimpleList
                title="Melhores avaliados"
                items={MoreReviwed}
                renderIconTitle={<Feather name="chevron-right" size={16} color={theme.colors.white} />}
                renderItem={({item}) => (
                    <HLongPortraitItem 
                        id={item.id} 
                        image={item.url_image}
                        onPress={(item.id == 0) ? () => {} : handleShowDetailItem}
                    />
                )}
            />
           
                    <HHighlightItem 
                        title={Painel.name}
                        id={Painel.id}
                        subtitle={Painel.description}
                        image={Painel.url_image2}
                        onPress={handleShowDetailItem}
                    />
                    
            <HSimpleList
                title="Meow Indica"
                items={MeowIndica}
                renderItem={({ item }) => (
                    <HLandscapeItem 
                        id={item.id} 
                        image={item.url_image2}
                        onPress={(item.id == 0) ? () => {} : handleShowDetailItem}
                    />
                )}
            />

            <HSimpleList
                title="Melhores Filmes"
                items={Movies}
                renderItem={({ item }) => (
                    <HPortraitItem 
                        id={item.id} 
                        image={item.url_image}
                        onPress={(id: number) => (item.id == 0) ? () => {} : handleShowDetailItem(id)}
                    />
                )}
            />

            <HSimpleList
                title="Melhores para maratonar"
                items={BestWatch}
                renderItem={({ item }) => (
                    <HLandscapeItem 
                        id={item.id} 
                        image={item.url_image2}
                        onPress={(item.id == 0) ? () => {} : handleShowDetailItem}
                    />
                )}
            />

            <HSimpleList
                title="Melhores Curtas"
                items={Curtas}
                renderItem={({ item }) => (
                    <HPortraitItem 
                        id={item.id} 
                        image={item.url_image}
                        onPress={(id: number) => (item.id == 0) ? () => {} : handleShowDetailItem(id)}
                    />
                )}
            />
                
        </HBody>
    )
}