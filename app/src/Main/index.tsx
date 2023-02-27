import { Header } from "../components/Header";
import { Categories } from "../components/Categories";

import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer, CenteredContainer } from "./styles";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { useState } from "react";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { ActivityIndicator } from "react-native";

import { products as mokProducts} from "../mocks/products";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";



export function Main(){

	const [isTableModalOpen, setIsTableModalOpen] = useState(false);
	const [selectedTable, setSelecteTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [products] = useState<Product[]>(mokProducts);

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
				{isLoading && (
					<CenteredContainer>
						<ActivityIndicator color='#D73035' size='large'/>
					</CenteredContainer>
				)}
				{!isLoading && (
					<>
					<CategoriesContainer >
						<Categories />
					</CategoriesContainer>
					{products.length > 0 && (
						<MenuContainer>
							<Menu onAddToCart={handleAddToCart} products={products}/>
						</MenuContainer>
					)}
					{!products.length && (
						<CenteredContainer>
							<Empty />
							<Text color="#666" style={{marginTop: 24}}>
								Nenhum produto encontrado
							</Text>
						</CenteredContainer>
					)}
				</>
				)}
			</Container>
			<Footer>
				<FooterContainer>
					{!selectedTable && (
						<Button onPress={()=> setIsTableModalOpen(true)} disable={isLoading}>
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
