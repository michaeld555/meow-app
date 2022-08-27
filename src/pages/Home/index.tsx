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
    const [highlightMovie, setHighlightMovie] = useState<Movie>()

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

    return (
        <HBody openSidebar={openSidebar}>
            <HHighlightPanel onPress={handleShowDetailItem}>
                <HSimpleList
                    title="Selecionados para você"
                    items={items.movies}
                    renderItem={({ item }) => (
                        <HLandscapeItem 
                            id={item.id} 
                            image={item.backdrop_path}
                            onPress={handleShowDetailItem}
                        />
                    )}
                />
            </HHighlightPanel>

            <HSimpleList
                title="Mais populares na meow"
                /* subtitle="You love them, we love them, and the hits just keep on coming" */
                items={items.iconicMovies}
                renderItem={({item}) => (
                    <HPortraitItem 
                        id={item.id} 
                        image={item.poster_path}
                        onPress={handleShowDetailItem}
                    />
                )}
            />

            <HSimpleList
                title="Sua lista"
                items={items.popularMoviesTvShows}
                onPressTitle={handleMyList}
                renderIconTitle={<Feather name="chevron-right" size={16} color={theme.colors.white} />}
                renderItem={({item}) => (
                    <HSquareItem 
                        id={item.id} 
                        image={item.backdrop_path}
                        title={item.title}
                        onPress={(id: number) => handleShowDetailItem(id, item.title ? 'movie' : 'tv')}
                    />
                )}
            />

            <HSimpleList
                title="Atualizações mais recentes"
                items={items.dcMoviesTvShows}
                onPressTitle={handleMyList}
                renderIconTitle={<Feather name="chevron-right" size={16} color={theme.colors.white} />}
                renderItem={({item}) => (
                    <HLongLandscapeItem 
                        id={item.id} 
                        image={item.backdrop_path}
                        title={item.title}
                        onPress={(id: number) => handleShowDetailItem(id, item.title ? 'movie' : 'tv')}
                    />
                )}
            />

            <HSimpleList
                title="Mais assistidos da semana"
                subtitle="Nosso TOP 10 mais assistidos nos ultimos 7 dias."
                textAlign="center"
                items={items.popularMoviesTvShows}
                renderItem={({item, index}) => (
                    <HPortraitItem 
                        id={item.id} 
                        image={item.poster_path}

                        position={index + 1}
                        onPress={(id: number) => handleShowDetailItem(id, item.title ? 'movie' : 'tv')}
                    />
                )}
            />

            <HSimpleList
                title="Melhores avaliados"
                items={items.movies}
                onPressTitle={handleMyList}
                renderIconTitle={<Feather name="chevron-right" size={16} color={theme.colors.white} />}
                renderItem={({item}) => (
                    <HLongPortraitItem 
                        id={item.id} 
                        image={item.poster_path}
                        onPress={handleShowDetailItem}
                    />
                )}
            />
           
            {
               !!highlightMovie && (
                    <HHighlightItem 
                        title={highlightMovie.title}
                        id={highlightMovie.id}
                        subtitle={highlightMovie.overview}
                        image={highlightMovie.backdrop_path}
                        onPress={handleShowDetailItem}
                    />
               )
            }

            <HSimpleList
                title="Meow Indica"
                items={items.iconicMovies}
                renderItem={({ item }) => (
                    <HLandscapeItem 
                        id={item.id} 
                        image={item.backdrop_path}
                        onPress={handleShowDetailItem}
                    />
                )}
            />

            <HSimpleList
                title="Melhores Filmes"
                items={items.dcMoviesTvShows}
                renderItem={({ item }) => (
                    <HPortraitItem 
                        id={item.id} 
                        image={item.poster_path}
                        onPress={(id: number) => handleShowDetailItem(id, item.title ? 'movie' : 'tv')}
                    />
                )}
            />

            <HSimpleList
                title="Melhores para maratonar"
                items={items.iconicMovies}
                renderItem={({ item }) => (
                    <HLandscapeItem 
                        id={item.id} 
                        image={item.backdrop_path}
                        onPress={handleShowDetailItem}
                    />
                )}
            />

            <HSimpleList
                title="Melhores Curtas"
                items={items.dcMoviesTvShows}
                renderItem={({ item }) => (
                    <HPortraitItem 
                        id={item.id} 
                        image={item.poster_path}
                        onPress={(id: number) => handleShowDetailItem(id, item.title ? 'movie' : 'tv')}
                    />
                )}
            />
                
        </HBody>
    )
}