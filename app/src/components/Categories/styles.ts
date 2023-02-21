import { Platform } from "react-native";
import styled from "styled-components/native";

const isAndroid = Platform.OS === 'android';


export const CategoriesItem = styled.View`
	align-items: center;
	margin-left: 24px;
`;
export const Icon = styled.View`
	background: #fff;
	width: 44px;
	height: 44px;
	border-radius: 22px;
	align-items: center;
	justify-content: center;
	margin-bottom: 8px;
	elevation: ${isAndroid ? `2` : 0};
`;
