import { TouchableOpacity, View } from "react-native";
import { IItemData } from "../IItemData";
import { SImage, STitle } from "./styles";

export function HLongLandscapeItem({
    id,
    image,
    title,
    onPress
}: IItemData){
    return (
        <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
            <View style={{ paddingBottom: !!title ? 10 : 0 }}>
                <SImage source={{ uri: `${image}` }} />
                {
                    !!title && <STitle>{title}</STitle>
                }
            </View>
        </TouchableOpacity>
    )
}