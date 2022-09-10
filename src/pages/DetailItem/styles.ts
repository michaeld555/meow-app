import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';
import { StyleSheet } from "react-native";

export const SImageBackground = styled.ImageBackground`
    height: 560px;
    justify-content: space-between;
`;


export const SBannerItem = styled.View`
`;

export const SCircle = styled.TouchableHighlight`
    height: 60px;
    width: 60px;
    align-items: center;
    justify-content: center;
    padding-left: 3px;

    border: 2px solid ${theme.colors.white};
    
    border-bottom-end-radius: 30px;
    border-top-end-radius: 30px;
    border-bottom-start-radius: 30px;
    border-top-start-radius: 30px;
`;

export const SButtonsContainer = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-horizontal: 20px;
`;

export const SMoreOptions = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const SContentItem = styled.View`
    padding-horizontal: 18px;
    margin-top: -20px;
    margin-bottom: 20px;
`;

export const STitle = styled.Text`
    color: ${theme.colors.white};
    font-size: 22px;
    font-weight: 700;
`;

export const ETitle = styled.Text`
    color: ${theme.colors.white};
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 14px;
    margin-left: 19px;
`;

export const SSubtitle = styled.Text`
    color: ${theme.colors.white};
    font-size: 13px;
    font-weight: 400;
    opacity: 0.7;
    padding-right: 14px;
    line-height: 18px;
`;

export const SItemInfo = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 8px;
`;

export const SAdultBadge = styled.View`
    width: 14px;
    height: 14px;
    background-color: ${theme.colors.black_0};
    border: 0.5px solid ${theme.colors.white};

    align-items: center;
    justify-content: center;

    border-bottom-end-radius: 3px;
    border-top-end-radius: 3px;
    border-bottom-start-radius: 3px;
    border-top-start-radius: 3px;
    margin-right: 14px;
`

export const SNormalBadge = styled.View`
    width: 14px;
    height: 14px;
    background-color: ${theme.colors.orange};
    border: 0.5px solid ${theme.colors.white};

    align-items: center;
    justify-content: center;

    border-bottom-end-radius: 3px;
    border-top-end-radius: 3px;
    border-bottom-start-radius: 3px;
    border-top-start-radius: 3px;
    margin-right: 14px;
`

export const STitleBadge = styled.Text`
    color: ${theme.colors.white};
    font-size: 8px;
`;

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "#50B4F2",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    shimmerDescription:{
        borderRadius: 20,
        height: 5,
    },
    shimmerText:{
        borderRadius: 20,
        height: 8,
        width: 350,
        marginTop: 9,
    }
});