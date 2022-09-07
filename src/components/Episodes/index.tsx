import { TouchableOpacity, View } from "react-native";
import { IItemEpisode } from "../Items/IItemData";
import { SImage, STitle, SubTitle } from "./styles";

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
            <TouchableOpacity onPress={() => !!onPress && onPress(video_url)}>
                <SImage source={{ uri: `${image}` }} />
            </TouchableOpacity>    
                <View >
                <STitle>Episodio {ep_number}</STitle>
                <SubTitle style={{ paddingRight: 40}}>{safeDescription}</SubTitle>
                </View>
            </View>
        </TouchableOpacity>
    )
}