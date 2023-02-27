import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from '../../types/CartItem';
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { OrderComfirmedModal } from "../OrderConfirmedModal";
import { Text } from "../Text";
import { Item,
	ProductContainer,
	Actions,
	Image,
	QuantityContainer,
	ProductDetails,
	Summary,
	TotalContainer } from './styles';

type Props = {
	cartItems: CartItem[];
	onAdd: (product: Product) => void;
	onDecrement: (product: Product) => void;
	onComfirmOrder: () => void;
}

export function Cart({cartItems, onAdd, onDecrement, onComfirmOrder}: Props) {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const total = cartItems.reduce((acc, item) => {return acc + item.quantity * item.product.price}, 0);

	function handleConfirmOrder(){
		setIsModalVisible(true);
	}
	function handleOk(){
		onComfirmOrder();
		setIsModalVisible(false);
	}

	return(
		<>
		<OrderComfirmedModal visible={isModalVisible} onClose={handleOk}/>
		{cartItems.length > 0 && (
			<FlatList
			data={cartItems}
			keyExtractor={item => item.product._id}
			style={{marginBottom: 20, maxHeight: 150}}
			showsVerticalScrollIndicator={false}
			renderItem={({item: cartItem}) => (
				<Item>
					<ProductContainer>
						<Image
							source={{
								uri: `http://192.168.18.3:3001/uploads/${cartItem?.product.imagePath}`
							}}
						/>
						<QuantityContainer>
							<Text size={14} color='#666'>
								{cartItem.quantity}x
							</Text>
						</QuantityContainer>
						<ProductDetails>
							<Text size={14} weight="600">
								{cartItem.product.name}
							</Text>
							<Text size={14} color='#666' style={{marginTop: 4}}>
								{formatCurrency(cartItem.product.price)}
							</Text>
						</ProductDetails>
					</ProductContainer>
					<Actions>
						<TouchableOpacity style={{marginRight: 24}} onPress={() => onAdd(cartItem.product)}>
							<PlusCircle />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
							<MinusCircle />
						</TouchableOpacity>
					</Actions>
				</Item>
			)}
		/>
		)}
		<Summary>
			<TotalContainer>
				{cartItems.length > 0 ?(
					<>
						<Text color="#666">Total</Text>
						<Text size={20} weight='600'>{formatCurrency(total)}</Text>
					</>
				) : (
					<Text color="#999">Seu carrinho esta vazio</Text>
				)}
			</TotalContainer>
			<Button onPress={handleConfirmOrder} disable={cartItems.length === 0} loading={isLoaded}>
				Confirmar pedido
			</Button>
		</Summary>
		</>
	)
};
