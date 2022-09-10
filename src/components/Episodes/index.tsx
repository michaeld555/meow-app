import { TouchableOpacity, View } from "react-native";
import { IItemEpisode } from "../Items/IItemData";
import { styles, SImage, STitle, SubTitle } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export function Episodes({
    id,
    image,
    description,
    ep_number,
    video_url,
    onPress
}: IItemEpisode){

    const safeDescription = !!description && description.length > 190 ? `${description.substring(0, 190)}...` : description

    return (
        <TouchableOpacity>
            <View style={{flex: 1, flexDirection: 'row', marginLeft: 14}}>
            
            { id == 0 && (
                <TouchableOpacity onPress={() => {}}>
                <ShimmerPlaceHolder style={styles.shimmerVideo} />
                </TouchableOpacity>
                
            )}
            { id != 0 && (
                <TouchableOpacity onPress={() => !!onPress && onPress(video_url)}>
                <SImage source={(id == 0) ? require('../../../assets/shimmer2.png') : { uri: `${image}` }} />
                </TouchableOpacity>
            )}    
               
            { id == 0 && (
                
                <View >
                <ShimmerPlaceHolder style={styles.shimmerDescription} />
                <ShimmerPlaceHolder style={styles.shimmerText} />
                <ShimmerPlaceHolder style={styles.shimmerText} />
                <ShimmerPlaceHolder style={styles.shimmerText} />
                <ShimmerPlaceHolder style={styles.shimmerText} />
                <ShimmerPlaceHolder style={styles.shimmerText} />
                <ShimmerPlaceHolder style={styles.shimmerText} />
                </View>
            )}
            { id != 0 && ( 
                <View >
                <STitle>Episodio {ep_number}</STitle>
                <SubTitle style={{ paddingRight: 40}}>{safeDescription}</SubTitle>
                </View>
            )}   
                
            </View>
        </TouchableOpacity>
    )
}