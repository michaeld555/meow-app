import { TouchableOpacity, View } from "react-native";
import { IItemData } from "../IItemData";
import { styles, SImage, STitle } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export function HLongPortraitItem({
    id,
    image,
    title,
    onPress
}: IItemData){

    const safeTitle = !!title && title.length > 20 ? `${title.substring(0, 20)}...` : title

    if(id == 0){
        return (
            <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
                <View style={{paddingBottom: !!title ? 10 : 0 }}>
                    <ShimmerPlaceHolder style={styles.shimmerVideo} />                   
                    {
                        !!title && <STitle>{safeTitle}</STitle>
                    }
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
        <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
            <View style={{paddingBottom: !!title ? 10 : 0 }}>
                <SImage source={(id == 0) ? require('../../../../assets/shimmer1.png') : { uri: `${image}` }} />
                {
                    !!title && <STitle>{safeTitle}</STitle>
                }
            </View>
        </TouchableOpacity>
        )
    }
    
}