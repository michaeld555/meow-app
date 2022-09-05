import { TouchableOpacity, View } from "react-native";
import { IItemData } from "../Items/IItemData";
import { SImage, STitle, SubTitle } from "./styles";

export function Episodes({
    id,
    image,
    title,
    onPress
}: IItemData){

    const safeTitle = !!title && title.length > 25 ? `${title.substring(0, 25)}...` : title

    return (
        <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
            <View style={{ paddingBottom: !!title ? 10 : 0 , flex: 1, flexDirection: 'row', marginLeft: 14}}>
            <TouchableOpacity onPress={() => !!onPress && onPress(id)}>
                <SImage source={{ uri: `${image}` }} />
            </TouchableOpacity>    
                <View style={{ marginRight: 20}}>
                <STitle>Episodio 1</STitle>
                <SubTitle>esse teste ssssss sssssssssss hhhhhh sssssssssssuuuuuu uuuuuuuuu ssssss sssssssss sssss </SubTitle>
                </View>
            </View>
        </TouchableOpacity>
    )
}