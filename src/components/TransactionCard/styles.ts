import styled from "styled-components/native";
import theme from "../../global/styles/theme";
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

interface TransactionProps {
    type: 'positive' | 'negative'
}

export const Container = styled.View`
    background-color: ${( theme ).colors.shape};
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: 16px;
`;

export const Title = styled.Text`
    font-family: ${( theme ).fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text<TransactionProps>`
    font-family: ${( theme ).fonts.regular};
    font-size: ${RFValue(20)}px;
    margin-top: 2px;
    color: ${({ theme, type }: any) => 
    type === 'positive' ? theme.colors.success : theme.colors.attention};
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled(Feather)`
    color: ${( theme ).colors.text};
    font-size: ${RFValue(20)}px;
`;

export const CategoryName = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${( theme ).colors.text};
    margin-left: 17px;
`;

export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${( theme ).colors.text};
`;