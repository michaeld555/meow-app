import { View, Text, TouchableOpacity } from "react-native";
import { IItemData } from "../IItemData";
import { styles, SImage, SPosition, STextPosition, STitle } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

interface Props extends IItemData{
    position?: number;
}

export function HPortraitItem({
    id,
    image,
    title,
    position,
    onPress
}: Props){

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
                <SImage source={(id == 0) ? require('../../../../assets/shimmer1.png') : { uri: `${image}` }}>
                    {
                        !!position && (
                            <SPosition style={{ width: position > 9 ? 32 : 24 }}>
                                <STextPosition>
                                    {'#' + position}
                                </STextPosition>
                            </SPosition>
                        )
                    }
                </SImage>
                {
                    !!title && <STitle>{safeTitle}</STitle>
                }
            </View>
        </TouchableOpacity>
    )
    }
    
}