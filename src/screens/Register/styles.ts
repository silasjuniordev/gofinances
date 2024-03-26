import styled from "styled-components/native";
import theme from "../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    flex: 1;
    background-color: ${( theme ).colors.background};
`;

export const Header = styled.View`
    background-color: ${( theme ).colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`;

export const Title = styled.Text`
    font-family: ${( theme ).fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${( theme ).colors.shape};
`;

export const Form = styled.View`
    flex: 1;
    width: 100%;
    justify-content: space-between;
    padding: 24px;
`;

export const Fields = styled.View``;

export const TransactionsTypes = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 16px;
`;