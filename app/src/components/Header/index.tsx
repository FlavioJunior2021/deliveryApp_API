import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Container, OrderContent, OrderHeader, Table } from "./style";

type Props = {
	selectedTable: string,
	onCancelOrder: () => void,
}

export function Header({selectedTable, onCancelOrder}: Props){
	return(
		<Container>
			{!selectedTable && (
				<>
					<Text size={14} opacity={0.9}>
						Bem vindo(a) ao
					</Text>
					<Text size={24} weight='700'>
						WAITER<Text size={24}>APP</Text>
					</Text>
				</>
			)}
			{selectedTable && (
				<OrderContent>
					<OrderHeader>
						<Text size={24} weight="600">Pedido</Text>
						<TouchableOpacity onPress={onCancelOrder}>
							<Text size={14} color="#D73035" weight="600">
								Cancelar pedido
							</Text>
						</TouchableOpacity>
					</OrderHeader>
					<Table>
						<Text color="#666">
							Mesa {selectedTable}
						</Text>
					</Table>
				</OrderContent>
			)}
		</Container>
	);
};
