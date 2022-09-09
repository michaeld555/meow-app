import { TouchableOpacity, View } from "react-native";
import { IItemData } from "../IItemData";
import { SImage, STitle } from "./styles";

export function HLongPortraitItem({
    id,
    image,
    title,
    onPress
}: IItemData){

    const safeTitle = !!title && title.length > 20 ? `${title.substring(0, 20)}...` : title

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