import { Header } from "../components/Header";
import { Categories } from "../components/Categories";

import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { useState } from "react";

export function Main(){

	const [isTableModalOpen, setIsTableModalOpen] = useState(false);
	const [selectedTable, setSelecteTable] = useState('');

	function handleSaveTable(table: string){
		setSelecteTable(table);
		setIsTableModalOpen(true);
	}

	function handleCancelOrder(){
		setSelecteTable('');
	}

	return(
		<>
			<Container>
				<Header selectedTable={selectedTable} onCancelOrder={handleCancelOrder}/>
				<CategoriesContainer >
					<Categories />
				</CategoriesContainer>
				<MenuContainer>
					<Menu />
				</MenuContainer>
			</Container>
			<Footer>
				<FooterContainer>
					{!selectedTable && (
						<Button onPress={()=> setIsTableModalOpen(true)}>
							Novo pedido
						</Button>
					)}
				</FooterContainer>
			</Footer>
			<TableModal
				visible={isTableModalOpen}
				onClose={()=> setIsTableModalOpen(false)}
				onSave={handleSaveTable}
			/>
		</>
	);
}
