import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import theme from 'styles/GlobalStyles';

export const SContent = styled.View`
    flex: 1;
    min-height: 500px;
    align-items: center;
    justify-content: center;
`;

 export const styles = StyleSheet.create({
    buttons:{
        flexDirection: 'row',
        margin: 10,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor:  `${theme.colors.blue_clear}`,
        borderRadius: 20,
        padding: 20,
        width: 350,
        backgroundColor: `${theme.colors.blue_clear}`
    }, 
    icon:{
        alignSelf: 'flex-end',
    }
})
