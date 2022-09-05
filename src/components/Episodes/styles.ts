import styled from 'styled-components/native';
import theme from 'styles/GlobalStyles';

export const STitle = styled.Text`
    color: ${theme.colors.white};
    margin-left: 6px;
    margin-top: 1px;
    max-width: 220px;
    /* opacity: 0.8; */
    font-size: 20px;
    margin-left: 6px;
`

export const SImage = styled.Image`
    width: 180px;
    height: 100px;
    margin-horizontal: 6px;
    margin-bottom: 16px;

`

export const SubTitle = styled.Text`
    color: ${theme.colors.white};
    margin-left: 6px;
    margin-top: 1px;
    max-width: 220px;
    opacity: 0.8; 
    font-size: 10px;
`