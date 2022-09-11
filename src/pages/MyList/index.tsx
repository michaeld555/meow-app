import React, { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, BackHandler} from "react-native";
import { HBody } from "../../components/HBody";
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { SContent, STitle } from "./styles";
import { PageableTheMovieDb } from "types/global.type";
import { Movie } from "types/movie.type";
import { RouterKey } from "routes/routes-keys";
import axios from 'axios';
import { HSquareItem } from 'components/Items/HSquareItem';
import Lottie from "lottie-react-native";
import { HPrimaryButton } from 'components/HPrimaryButton';
import { mylist } from "./styles";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';





interface Props extends DrawerContentComponentProps {
}


export function MyList({ navigation }: Props) {

    const [movies, setMovies] = useState<PageableTheMovieDb<Movie>>(new PageableTheMovieDb());
    const [loader, setLoader] = useState(true);
    const [response, setResponse] = useState(false);
    const [emptyResponse, setEmptyResponse] = useState(false);
    const [token, setToken]: any = useState();
    const [id, setId]: any = useState();
    const isFocused = useIsFocused();

    React.useEffect(() => {
        getToken()
    }, [])

    async function getToken() {
        try {
        const jsonValue = await AsyncStorage.getItem('userData')
        const datae = jsonValue != null ? JSON.parse(jsonValue) : null;
        setId(datae.id)
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

    function openSidebar() {
        navigation.openDrawer();
    }

    React.useEffect( () => {

        //setLoader(true)
        setResponse(false)
        setEmptyResponse(false)

        meowApi.get( 
            `mylist/${id}`,
          ).then(function (response: any) {
            if(response.data.data.length != 0){
                setMovies(response.data)
                setLoader(false)
                setResponse(true)
            } else {
                setLoader(false)
                setEmptyResponse(true)
            }
          }).catch(console.log);
          
    }, [isFocused, token])

    function handleShowDetailItem(id: number){
        navigation.navigate(RouterKey.DetailItemPage, { id });
    }

    function homeNavigate(){
        navigation.navigate(RouterKey.HomePage);
    }
    
    return (
        <HBody 
            openSidebar={openSidebar} 
            useSafeAreaHeader 
            customHeaderContent={
            <STitle>Sua Lista:</STitle>
        }    
        >
            <SContent>
                
                { response  &&   
                    movies.data.map((x) => (
                       <View key={x.id} style={{ paddingBottom: 26 }}>
                           <HSquareItem 
                        id={x.id} 
                        image={x.url_image3}
                        title={x.name}
                        onPress={(id: number) => handleShowDetailItem(id)}
                    /></View>                   
                    ))
                }

                { loader  && 
                <View style={mylist.loaderView}>                
                    <Lottie
                    source={require("../../assets/116545-loading-cat.json")}
                    autoPlay={true}
                    loop={true}
                    />           
                </View>
                }
                
                { emptyResponse  && 
                <View>
                <View style={mylist.emptyView}>                
                    <Lottie
                    source={require("../../assets/cat-sleeping.json")}
                    autoPlay={true}
                    loop={true}
                    />
                                 
                </View>
                <Text style={ mylist.Title }>Sua lista está vazia...</Text>
                <Text style={ mylist.SubTitle }>Explore e adicione titulos a sua lista para</Text>
                <Text style={ mylist.SubTitle2 }>poder ve-los aqui depois</Text>
                <HPrimaryButton 
                    title="Explorar" 
                    width={300}
                    onPress={homeNavigate}
                    />
                </View> 
                }

            </SContent>
        </HBody>
    )
}