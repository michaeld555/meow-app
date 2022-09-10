import { TouchableOpacity, View } from "react-native";
import { IItemData } from "../IItemData";
import { styles, SImage, STitle } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

export function HLongLandscapeItem({
    id,
    image,
    title,
    onPress
}: IItemData){
    if(id == 0){
        return (
            <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
                <View style={{ paddingBottom: !!title ? 10 : 0 }}>
                    <ShimmerPlaceHolder style={styles.shimmerVideo} />                   
                    {
                        !!title && <STitle>{title}</STitle>
                    }
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
        <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
            <View style={{ paddingBottom: !!title ? 10 : 0 }}>
                <SImage source={(id == 0) ? require('../../../../assets/shimmer2.png') : { uri: `${image}` }} />
                {
                    !!title && <STitle>{title}</STitle>
                }
            </View>
        </TouchableOpacity>
    )
    }
    
}