import { ActivityIndicator } from "react-native";
import { Text } from "../Text";
import { Container } from "./styles";

type Props = {
	children: string,
	onPress: () => void,
	disable?: boolean,
	loading?: boolean,
}

export function Button({children, onPress, disable, loading}: Props) {
	return(
		<Container onPress={onPress} disabled={disable || loading}>
			{!loading && (
				<Text weight="600" color="#FFF">
					{children}
				</Text>
			)}
			{loading && (
				<ActivityIndicator color='#FFF'/>
			)}
		</Container>
	)
}
