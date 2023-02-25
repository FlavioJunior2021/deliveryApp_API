import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from '../../types/CartItem';
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import { Item, ProductContainer, Actions, Image, QuantityContainer, ProductDetails } from './styles';

type Props = {
	cartItems: CartItem[];
}

export function Cart({cartItems}: Props) {
	return(
		<FlatList
			data={cartItems}
			keyExtractor={item => item.product._id}
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
						<TouchableOpacity style={{marginRight: 24}}>
							<PlusCircle />
						</TouchableOpacity>
						<TouchableOpacity>
							<PlusCircle />
						</TouchableOpacity>
					</Actions>
				</Item>
			)}
		/>
	)
};
