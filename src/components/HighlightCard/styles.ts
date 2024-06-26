import styled, { css } from "styled-components/native";
import theme from "../../global/styles/theme";
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

interface TypeProps {
    type: 'up' | 'down' | 'total'
}

export const Container = styled.View<TypeProps>`
    background-color: ${({ theme, type }: any) => 
    type === 'total' ? theme.colors.secondary : theme.colors.shape};
    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 19px 23px;
    margin-right: 16px;
    padding-bottom: ${RFValue(42)}px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
    font-family: ${( theme ).fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({ theme, type }: any) => 
    type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const Icon = styled(Feather)<TypeProps>`
    font-size: ${RFValue(40)}px;
    ${({ type }: any) => type === 'up' && css`
        color: ${({ theme }) => theme.colors.success};
    `}

    ${({ type }: any) => type === 'down' && css`
        color: ${({ theme }) => theme.colors.attention};
    `}

    ${({ type }: any) => type === 'total' && css`
        color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<TypeProps>`
    font-family: ${( theme ).fonts.medium};
    font-size: ${RFValue(32)}px;
    color: ${({ theme, type }: any) => 
    type === 'total' ? theme.colors.shape : theme.colors.text_dark};
    margin-top: 38px;
`;

export const LastTransaction = styled.Text<TypeProps>`
    font-family: ${( theme ).fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${({ theme, type }: any) => 
    type === 'total' ? theme.colors.shape : theme.colors.text};
`;