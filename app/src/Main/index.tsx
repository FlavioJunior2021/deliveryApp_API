import { Header } from "../components/Header";
import { Categories } from "../components/Categories";

import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { useState } from "react";

export function Main(){

	const [isTableModalOpen, setIsTableModalOpen] = useState(false);

	function handleSaveTable(table: string){
		alert(`main table ${table}`);
	}

	return(
		<>
			<Container>
				<Header />
				<CategoriesContainer >
					<Categories />
				</CategoriesContainer>
				<MenuContainer>
					<Menu />
				</MenuContainer>
			</Container>
			<Footer>
				<FooterContainer>
					<Button onPress={()=> setIsTableModalOpen(true)}>
						Novo pedido
					</Button>
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
