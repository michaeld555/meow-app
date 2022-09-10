import { HPrimaryButton } from "components/HPrimaryButton";
import { TouchableOpacity, View } from "react-native";
import { IItemData } from "../IItemData";
import { styles, SButtonContainer, SImage, SSubtitleList, STitle } from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

interface Props extends IItemData {
    subtitle?: string;
    textAlign?: 'left' | 'center';
}

export function HHighlightItem({
    id,
    image,
    title,
    subtitle,
    textAlign = 'center',
    onPress
}: Props){

    const safeTitle = !!title && title.length > 25 ? `${title.substring(0, 25)}...` : title;
    const safeSubtitle = !!subtitle && subtitle.length > 100 ? `${subtitle.substring(0, 100)}...` : subtitle;

    if(id == 0){
        return (
            
            <View style={{ paddingVertical: 30 }}>
                <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
                <ShimmerPlaceHolder style={styles.shimmerVideo} />
                </TouchableOpacity>

                {
                    <STitle style={{ textAlign: textAlign }}><ShimmerPlaceHolder style={styles.shimmerText} /></STitle>
                }

                { <SSubtitleList style={{ textAlign: textAlign }}><ShimmerPlaceHolder style={styles.shimmerSubText} /></SSubtitleList>}
                               
            </View>
    )
    } else {
        return (
            <View style={{ paddingVertical: 30 }}>
                <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
                    <SImage source={{ uri: `${image}` }} />
                </TouchableOpacity>

                {
                    !!title && <STitle style={{ textAlign: textAlign }}>{safeTitle}</STitle>
                }

                { !!subtitle && <SSubtitleList style={{ textAlign: textAlign }}>{safeSubtitle}</SSubtitleList>}
                               
            </View>
    )
    }
    
}