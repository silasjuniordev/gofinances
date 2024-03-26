import styled from "styled-components/native";
import theme from "../../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    width: 100%; 
`;

export const Error = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${( theme ).fonts.regular};
    color: ${( theme ).colors.attention};
    margin: 7px;
`;