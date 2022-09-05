import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { HBody } from "../../components/HBody";
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { SContent, STitle } from "./styles";
import { PageableTheMovieDb } from "types/global.type";
import { Movie } from "types/movie.type";
import { RouterKey } from "routes/routes-keys";
import { meowApi } from "../../services/";
import { HSquareItem } from 'components/Items/HSquareItem';
import Lottie from "lottie-react-native";
import { HPrimaryButton } from 'components/HPrimaryButton';
import { mylist } from "./styles";
import { useIsFocused } from '@react-navigation/native';





interface Props extends DrawerContentComponentProps {
}


export function MyList({ navigation }: Props) {

    const [movies, setMovies] = useState<PageableTheMovieDb<Movie>>(new PageableTheMovieDb());
    const [loader, setLoader] = useState(true);
    const [response, setResponse] = useState(false);
    const [emptyResponse, setEmptyResponse] = useState(false);
    const isFocused = useIsFocused();

    function openSidebar() {
        navigation.openDrawer();
    }

    React.useEffect( () => {

        //setLoader(true)
        setResponse(false)
        setEmptyResponse(false)

        meowApi.get( 
            'mylist/1',
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
          
    }, [isFocused])

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