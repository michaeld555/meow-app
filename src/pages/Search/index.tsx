import React, { useEffect, useState, useCallback } from "react";
import { Text, View, BackHandler } from "react-native";
import { HBody } from "../../components/HBody";
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { HTextInput } from "components/HTextInput";
import { SContent, STitle } from "./styles";
import { PageableTheMovieDb } from "types/global.type";
import { Movie } from "types/movie.type";
import { HPortraitItem } from "components/Items/HPortraitItem";
import { RouterKey } from "routes/routes-keys";
import { meowApi } from "../../services/";
import { search } from "./styles";
import Lottie from "lottie-react-native";
import { debounce } from "lodash";
import { useIsFocused } from '@react-navigation/native'

interface Props extends DrawerContentComponentProps {
}


export function SearchPage({ navigation }: Props) {

    const [movies, setMovies] = useState<PageableTheMovieDb<Movie>>(new PageableTheMovieDb());
    const [textSearch, setTextSearch] = useState<string>();
    const [MorePopular, setMorePopular] = useState([]);
    const [loader, setLoader] = useState(true);
    const [response, setResponse] = useState(false);
    const [emptyResponse, setEmptyResponse] = useState(false);
    const [searchText, setSearchText] = useState(`Mais procurados`);
    const handler = useCallback(debounce(onChangeTextSearch, 1000), []);
    const isFocused = useIsFocused();

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

    function openSidebar() {
        navigation.openDrawer();
    }

    React.useEffect( () => {
            popularTitles();
    }, [])

    function onChangeTextSearch(text: string){
        if(text.trim() != ''){
            setSearchText(`Resultados para: ${text}`);
            setResponse(false)
            setLoader(true)
            searchTitles(text);
        }
        else {
            setSearchText(`Mais procurados`)
            setEmptyResponse(false)
            setLoader(true)
            popularTitles();
        }
    }

    function searchTitles(title: string) {
        meowApi.get( 
            `search/${title}`,
          ).then(function (response: any) {
              
              if(response.data.data != 0){
                setMovies(response.data)
                setLoader(false);
                setResponse(true)
                setEmptyResponse(false)
              } else {
                setLoader(false)
                setResponse(false)
                setEmptyResponse(true)
              }
          }).catch(console.log);
    }

    function popularTitles() {
        meowApi.get( 
            'title?type=more_popular',
          ).then(function (response: any) {
              setMovies(response.data)
              setLoader(false)
              setResponse(true)
          }).catch(console.log);
    }

    function handleShowDetailItem(id: number){
        navigation.navigate(RouterKey.DetailItemPage, { id});
    }

    return (
        <HBody 
            openSidebar={openSidebar} 
            useSafeAreaHeader 
            customHeaderContent={
                <HTextInput
                    value={textSearch}
                    onChangeText={handler}
                    placeholder="O Que você está procurando?"
                />}    
        >
            <SContent>
                <STitle>{searchText}</STitle>

                { response  && 
                    
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

                { loader  && 
                <View style={search.loaderView}>                
                    <Lottie
                    source={require("../../assets/116545-loading-cat.json")}
                    autoPlay={true}
                    loop={true}
                    />           
                </View>
                }

                { emptyResponse  && 
                <View>
                <View style={search.emptyView}>                
                    <Lottie
                    source={require("../../assets/search-cat.json")}
                    autoPlay={true}
                    loop={true}
                    />
                                 
                </View>
                <Text style={ search.Title }>Sem resultados...</Text>
                <Text style={ search.SubTitle }>Não encontramos resultados para sua pesquisa</Text>
                <Text style={ search.SubTitle }>talvez voce não digitou corretamente ou ainda</Text>
                <Text style={ search.SubTitle2 }>não temos esse titulo em nosso catálogo.</Text>
                
                </View> 
                }

            </SContent>
        </HBody>
    )
}