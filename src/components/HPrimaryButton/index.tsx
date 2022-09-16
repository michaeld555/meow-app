import { TouchableOpacityProps } from "react-native";
import { SLinearGradient, SText, STouchableOpacity, GTouchableOpacity  } from "./styles";
import { HLoadingDots } from "components/HLoadingDots";

interface Props extends TouchableOpacityProps {
    width?: number;
    title: string;
}

export function HPrimaryButton({
    title,
    width = 200,
    ...rest
}: Props){
    return (
        <STouchableOpacity {...rest} style={{ width }}>
            <SLinearGradient>
                <SText>{title}</SText>
            </SLinearGradient>
        </STouchableOpacity>
    )
}

export function GPrimaryButton({
    title,
    width = 200,
    ...rest
}: Props){
    return (
        <GTouchableOpacity {...rest} style={{ width }}>
            <SLinearGradient>
                <SText>{title}</SText>
            </SLinearGradient>
        </GTouchableOpacity>
    )
}