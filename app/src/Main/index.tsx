import { Header } from "../components/Header";
import { Categories } from "../components/Categories";

import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { useState } from "react";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { products } from "../mocks/products";

export function Main(){

	const [isTableModalOpen, setIsTableModalOpen] = useState(false);
	const [selectedTable, setSelecteTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([
		{
			product: products[0],
			quantity: 1
		},
		{
			product: products[1],
			quantity: 2
		},
	]);

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
					{selectedTable && (
						<Cart
							cartItems={cartItems}
						/>
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
