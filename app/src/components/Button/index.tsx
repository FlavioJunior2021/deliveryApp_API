import { Text } from "../Text";
import { Container } from "./styles";

type Props = {
	children: string,
	onPress: () => void,
	disable?: boolean
}

export function Button({children, onPress, disable}: Props) {
	return(
		<Container onPress={onPress} disabled={disable}>
			<Text weight="600" color="#FFF">
				{children}
			</Text>
		</Container>
	)
}
