import styled, { css } from "styled-components/native";
import theme from "../../../global/styles/theme";
import { RectButton } from "react-native-gesture-handler"; 
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";

interface IconsProps {
    type: 'up' | 'down'
}

interface ContainerProps {
    isActive: boolean
    type: 'up' | 'down'
}

export const Container = styled.View<ContainerProps>`
    width: 48%;
    border: 1.5px solid ${( theme ).colors.text};
    border-radius: 5px;

    ${({ isActive, type }: any) => isActive && type === 'up' && css`
        background-color: ${( theme ).colors.success_light};
        border: none;
    `}

    ${({ isActive, type }: any) => isActive && type === 'down' && css`
        background-color: ${( theme ).colors.attention_light};
        border: none;
    `}
`;

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px;
`;

export const Icon = styled(Feather)<IconsProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${({ theme, type }: any) => 
        type === 'up' ? theme.colors.success : theme.colors.attention
    };
`;

export const Title = styled.Text`
    font-family: ${( theme ).fonts.regular};
    font-size: ${RFValue(14)}px;
`;