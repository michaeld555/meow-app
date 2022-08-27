import { Feather } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { HBody } from "components/HBody";
import { HLoading } from 'components/HLoading';
import { HSimpleList } from "components/HSimpleList";
import { HHighlightItem } from 'components/Items/HHighlightItem';
import { HLandscapeItem } from 'components/Items/HLandscapeItem';
import { HLongLandscapeItem } from 'components/Items/HLongLandscapeItem';
import { HLongPortraitItem } from 'components/Items/HLongPortraitItem';
import { HPortraitItem } from 'components/Items/HPortraitItem';
import { HSquareItem } from 'components/Items/HSquareItem';
import React, { useEffect, useState } from "react";
import { RouterKey } from 'routes/routes-keys';
import theme from 'styles/GlobalStyles';
import { Movie } from "types/movie.type";
import { TVShow } from 'types/tvshow.type';
import { HHighlightPanel } from "./components/HHighlightPanel";
import { getDcMoviesTvShowsData, getIconicMoviesData, getMoviesData, getPopularMoviesTvShowsData } from './home.service';
const axios = require('axios');

interface Props extends DrawerContentComponentProps {
}

class ItemsHomeData {
    public movies: Array<Movie> = [];
    public popularMoviesTvShows: Array<Movie | TVShow> = [];
    public iconicMovies: Array<Movie> = [];
    public dcMoviesTvShows: Array<Movie | TVShow> = [];

    public isLoading() {
        return Object.values(this).some(x => x === null || x.length === 0);
    }
}
export function HomePage({ navigation }: Props) {

    const [items, setItems] = useState<ItemsHomeData>(new ItemsHomeData());
    const [highlightMovie, setHighlightMovie] = useState<Movie>();
    const [ForYou, setForYou] = useState([]);
    const [MyList, setMyList] = useState([]);
    const [Recent, setRecent] = useState([]);
    const [MorePopular, setMorePopular] = useState([]);
    const [MoreWeekWatched, setMoreWeekWatched] = useState([]);
    const [Painel, setPainel] = useState<Movie>();
    const [MoreReviwed, setMoreReviwed] = useState([]);
    const [MeowIndica, setMeowIndica] = useState([]);
    const [Movies, setMovies] = useState([]);
    const [BestWatch, setBestWatch] = useState([]);
    const [Curtas, setCurtas] = useState([]);

    const token = '44|0x21WPgIUyHWYhFnOLzSjCR78Qp9FCr7Hhjr1o7n';

    const meowApi = axios.create({
        baseURL: 'https://meowfansub.me/api/',
        headers: { Authorization: `Bearer ${token}` },
        params: {}
      });

    React.useEffect( () => {
        meowApi.get( 
              'title?type=forYou',
            ).then(function (response: any) {
              setForYou(response.data.data)
            }).catch(console.log);

    }, [])

    React.useEffect( () => {
        meowApi.get( 
            'mylist/1',
          ).then(function (response: any) {
            setMyList(response.data.data)
          }).catch(console.log);
    }, []);

    React.useEffect( () => {
        meowApi.get( 
            'title?type=recent',
          ).then(function (response: any) {
            setRecent(response.data.data)
          }).catch(console.log);
    }, []);

    React.useEffect( () => {
        meowApi.get( 
              'title?type=more_popular',
            ).then(function (response: any) {
                setMorePopular(response.data.data)
            }).catch(console.log);

    }, [])

    React.useEffect( () => {
        meowApi.get( 
            'title?type=more_week_watched',
          ).then(function (response: any) {
            setMoreWeekWatched(response.data.data)
          }).catch(console.log);
    }, []);

    React.useEffect( () => {
        meowApi.get( 
              'title?type=painel',
            ).then(function (response: any) {
              setPainel(response.data.data[0])
            }).catch(console.log);

    }, [])

    React.useEffect( () => {
        meowApi.get( 
            'title?type=more_reviwed',
          ).then(function (response: any) {
            setMoreReviwed(response.data.data)
          }).catch(console.log);
    }, []);////////

    React.useEffect( () => {
        meowApi.get( 
            'title?type=random',
          ).then(function (response: any) {
            setMeowIndica(response.data.data)
          }).catch(console.log);
    }, []);

    React.useEffect( () => {
        meowApi.get( 
              'title?type=random',
            ).then(function (response: any) {
                setMovies(response.data.data)
            }).catch(console.log);

    }, [])

    React.useEffect( () => {
        meowApi.get( 
            'title?type=random',
          ).then(function (response: any) {
            setBestWatch(response.data.data)
          }).catch(console.log);
    }, []);

    React.useEffect( () => {
        meowApi.get( 
            'title?type=more_reviwed',
          ).then(function (response: any) {
            setCurtas(response.data.data)
          }).catch(console.log);
    }, []);


    function openSidebar() {
        navigation.openDrawer();
    }

    useEffect(() => {
        getItems();
    }, []);

    async function getItems(){
        
        const [
            movies, 
            popularMoviesTvShows,
            iconicMovies,
            dcMoviesTvShows
        ] = await Promise.all([
            getMoviesData(),
            getPopularMoviesTvShowsData(),
            getIconicMoviesData(),
            getDcMoviesTvShowsData()
        ]);
        
        const data = new ItemsHomeData();
        data.movies = movies;
        data.popularMoviesTvShows = popularMoviesTvShows;
        data.iconicMovies = iconicMovies;
        data.dcMoviesTvShows = dcMoviesTvShows;

        setItems(data);
        setHighlightMovie(data.movies[Math.floor(Math.random() * data.movies.length)]);
    }
    
    function handleMyList(){
        //TODO: Futura navegacao para aba de minha lista console.log('navigate to my list')
    }

    function handleShowDetailItem(id: number, type: 'movie' | 'tv' = 'movie'){
        navigation.navigate(RouterKey.DetailItemPage, { id, type });
    }

    if(items.isLoading()) {
        return <HLoading />
    }

        console.log(ForYou.length)

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
                            onPress={handleShowDetailItem}
                        />
                    )}
                />
            </HHighlightPanel>

            <HSimpleList
                title="Mais populares na meow"
                /* subtitle="You love them, we love them, and the hits just keep on coming" */
                items={MorePopular}
                renderItem={({item}) => (
                    <HPortraitItem 
                        id={item.id} 
                        image={item.url_image}
                        onPress={handleShowDetailItem}
                    />
                )}
            />

            <HSimpleList
                title="Sua lista"
                items={MyList}
                onPressTitle={handleMyList}
                renderIconTitle={<Feather name="chevron-right" size={16} color={theme.colors.white} />}
                renderItem={({item}) => (
                    <HSquareItem 
                        id={item.id} 
                        image={item.url_image3}
                        title={item.name}
                        onPress={(id: number) => handleShowDetailItem(id, item.name ? 'movie' : 'tv')}
                    />
                )}
            />

            <HSimpleList
                title="Atualizações mais recentes"
                items={Recent}
                onPressTitle={handleMyList}
                renderIconTitle={<Feather name="chevron-right" size={16} color={theme.colors.white} />}
                renderItem={({item}) => (
                    <HLongLandscapeItem 
                        id={item.id} 
                        image={item.url_image2}
                        title={item.name}
                        onPress={(id: number) => handleShowDetailItem(id, item.title ? 'movie' : 'tv')}
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
                        onPress={(id: number) => handleShowDetailItem(id, item.name ? 'movie' : 'tv')}
                    />
                )}
            />

            <HSimpleList
                title="Melhores avaliados"
                items={MoreReviwed}
                onPressTitle={handleMyList}
                renderIconTitle={<Feather name="chevron-right" size={16} color={theme.colors.white} />}
                renderItem={({item}) => (
                    <HLongPortraitItem 
                        id={item.id} 
                        image={item.url_image}
                        onPress={handleShowDetailItem}
                    />
                )}
            />
           
                    {
                    !!Painel && (<HHighlightItem 
                        title={Painel.name}
                        id={Painel.id}
                        subtitle={Painel.description}
                        image={Painel.url_image2}
                        onPress={handleShowDetailItem}
                    />)
                    }

            <HSimpleList
                title="Meow Indica"
                items={MeowIndica}
                renderItem={({ item }) => (
                    <HLandscapeItem 
                        id={item.id} 
                        image={item.url_image2}
                        onPress={handleShowDetailItem}
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
                        onPress={(id: number) => handleShowDetailItem(id, item.name ? 'movie' : 'tv')}
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
                        onPress={handleShowDetailItem}
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
                        onPress={(id: number) => handleShowDetailItem(id, item.title ? 'movie' : 'tv')}
                    />
                )}
            />
                
        </HBody>
    )
}