import { Header } from "../components/Header";
import { Categories } from "../components/Categories";

import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { useState } from "react";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";


export function Main(){

	const [isTableModalOpen, setIsTableModalOpen] = useState(false);
	const [selectedTable, setSelecteTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	function handleSaveTable(table: string){
		setSelecteTable(table);
		setIsTableModalOpen(true);
	}
	function handleResetOrder(){
		setSelecteTable('');
		setCartItems([]);
	}
	function handleAddToCart(product: Product){
		if(!selectedTable){
			setIsTableModalOpen(true)
		}
		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(
				cartImte => cartImte.product._id === product._id
			);
			if(itemIndex < 0){
				return prevState.concat({quantity: 1, product});
			};
			const newCartItens = [...prevState];
			const item = newCartItens[itemIndex];
			newCartItens[itemIndex] = {
				...item,
				quantity: item.quantity + 1
			}
			return newCartItens;
		});
	}
	function handleDecrementCardItem(product: Product){
		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(
				cartImte => cartImte.product._id === product._id
			);
			const item = prevState[itemIndex];
			const newCartItens = [...prevState];
			if(item.quantity === 1){
				newCartItens.splice(itemIndex, 1);
				return newCartItens;
			}
			newCartItens[itemIndex] = {
				...item,
				quantity: item.quantity - 1
			}
			return newCartItens;
		});
	}

	return(
		<>
			<Container>
				<Header selectedTable={selectedTable} onCancelOrder={handleResetOrder}/>
				<CategoriesContainer >
					<Categories />
				</CategoriesContainer>
				<MenuContainer>
					<Menu onAddToCart={handleAddToCart}/>
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
							onAdd={handleAddToCart}
							onDecrement={handleDecrementCardItem}
							onComfirmOrder={handleResetOrder}
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
