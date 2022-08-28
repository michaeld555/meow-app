import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { HBody } from "../../components/HBody";
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { HTextInput } from "components/HTextInput";
import { SContent, STitle } from "./styles";
import { PageableTheMovieDb } from "types/global.type";
import { Movie } from "types/movie.type";
import { HPortraitItem } from "components/Items/HPortraitItem";
import { RouterKey } from "routes/routes-keys";
import { meowApi } from "../../services/";
const axios = require('axios');

interface Props extends DrawerContentComponentProps {
}


export function SearchPage({ navigation }: Props) {

    const [movies, setMovies] = useState<PageableTheMovieDb<Movie>>(new PageableTheMovieDb());

    const [textSearch, setTextSearch] = useState<string>();

    const [MorePopular, setMorePopular] = useState([]);
    
    function openSidebar() {
        navigation.openDrawer();
    }

    React.useEffect( () => {
        /* meowApi.get( 
              'title?type=more_popular',
            ).then(function (response: any) {
                setMovies(response.data)
            }).catch(console.log); */
            popularTitles();

    }, [])

    function onChangeTextSearch(text: string){
        if(text.trim() != ''){
            console.log(text);
            searchTitles(text);
        }
        else {
            popularTitles();
        }
    }

    function searchTitles(title: string) {
        meowApi.get( 
            `search/${title}`,
          ).then(function (response: any) {
              setMovies(response.data)
          }).catch(console.log);
    }

    function popularTitles() {
        meowApi.get( 
            'title?type=more_popular',
          ).then(function (response: any) {
              setMovies(response.data)
          }).catch(console.log);
    }

    function handleShowDetailItem(id: number, type: 'movie' | 'tv' = 'movie'){
        navigation.navigate(RouterKey.DetailItemPage, { id, type });
    }
        //TODO: search aqui
        console.log(MorePopular.length)
    return (
        <HBody 
            openSidebar={openSidebar} 
            useSafeAreaHeader 
            customHeaderContent={
                <HTextInput
                    value={textSearch}
                    onChangeText={onChangeTextSearch}
                    placeholder="O Que você está procurando?"
                />}    
        >
            <SContent>
                <STitle>Mais procurados</STitle>
                {
                    
                    movies.data.map((x) => (
                       <View key={x.id} style={{ paddingBottom: 26 }}>
                           <HPortraitItem 
                               id={x.id}
                               image={x.url_image}
                               onPress={handleShowDetailItem}
                           />
                       </View>
                       
                    ) )


                }

            </SContent>
        </HBody>
    )
}