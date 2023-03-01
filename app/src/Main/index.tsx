import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { api } from "../utils/api";

import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer, CenteredContainer } from "./styles";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { useEffect, useState } from "react";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { ActivityIndicator } from "react-native";

import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";
import { Category } from "../types/Category";



export function Main() {

	const [isTableModalOpen, setIsTableModalOpen] = useState(false);
	const [selectedTable, setSelecteTable] = useState('');
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		Promise.all([
			api.get(`/categories/`),
			api.get(`/products/`)
		]).then(([categoriesResponse, productsResponse]) => {
			setCategories(categoriesResponse.data);
			setProducts(productsResponse.data);
			setIsLoading(false);
		}
		)
	}, []);

	async function handleSelectCategory(categoryId: string) {
		const router = categoryId === '' ? '/products/' : `/categories/${categoryId}/products/`;
		setIsLoadingProducts(true);
		const { data } = await api.get(router);
		setProducts(data);
		setIsLoadingProducts(false);
	}


	function handleSaveTable(table: string) {
		setSelecteTable(table);
		setIsTableModalOpen(true);
	}
	function handleResetOrder() {
		setSelecteTable('');
		setCartItems([]);
	}
	function handleAddToCart(product: Product) {
		if (!selectedTable) {
			setIsTableModalOpen(true)
		}
		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(
				cartImte => cartImte.product._id === product._id
			);
			if (itemIndex < 0) {
				return prevState.concat({ quantity: 1, product });
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
	function handleDecrementCardItem(product: Product) {
		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(
				cartImte => cartImte.product._id === product._id
			);
			const item = prevState[itemIndex];
			const newCartItens = [...prevState];
			if (item.quantity === 1) {
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

	return (
		<>
			<Container>
				<Header selectedTable={selectedTable} onCancelOrder={handleResetOrder} />
				{isLoading ? (
					<CenteredContainer>
						<ActivityIndicator color='#D73035' size='large' />
					</CenteredContainer>
				) : (
					<>
						<CategoriesContainer >
							<Categories categories={categories} onSelectCategory={handleSelectCategory} />
						</CategoriesContainer>
						{
							isLoadingProducts ? (
								<CenteredContainer>
									<ActivityIndicator color='#D73035' size='large' />
								</CenteredContainer>
							) : (
								<>
									{products.length > 0 ? (
										<MenuContainer>
											<Menu onAddToCart={handleAddToCart} products={products} />
										</MenuContainer>
									) : (
										<CenteredContainer>
											<Empty />
											<Text color="#666" style={{ marginTop: 24 }}>
												Nenhum produto encontrado
											</Text>
										</CenteredContainer>
									)}
								</>
							)
						}
					</>
				)}
			</Container>
			<Footer>
				<FooterContainer>
					{!selectedTable && (
						<Button onPress={() => setIsTableModalOpen(true)} disable={isLoading}>
							Novo pedido
						</Button>
					)}
					{selectedTable && (
						<Cart
							cartItems={cartItems}
							onAdd={handleAddToCart}
							onDecrement={handleDecrementCardItem}
							onComfirmOrder={handleResetOrder}
							selectedTable={selectedTable}
						/>
					)}
				</FooterContainer>
			</Footer>
			<TableModal
				visible={isTableModalOpen}
				onClose={() => setIsTableModalOpen(false)}
				onSave={handleSaveTable}
			/>
		</>
	);
}
