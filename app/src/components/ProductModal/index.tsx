import { FlatList, Modal } from 'react-native';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Image, Icon, Header, ModalBody, IngredientsContainer, Ingredient, FooterContainer, Footer, PriceContainer } from './styles'

type Props = {
	visible: boolean,
	onClose: () => void,
	product: null | Product,
}

export function ProductModal({visible, onClose, product}: Props) {
	if(!product){
		return null;
	}
	return(
		<Modal visible={visible} animationType="slide" presentationStyle='pageSheet' onRequestClose={onClose}>
			<Image
				source={{
					uri: `http://192.168.18.3:3001/uploads/${product?.imagePath}`,
				}}
			>
				<Icon onPress={onClose}>
					<Close/>
				</Icon>
			</Image>
			<ModalBody>
        <Header>
					<Text weight='600' size={24}>{product.name}</Text>
					<Text color='#666' style={{marginTop: 8}}>{product.description}</Text>
				</Header>
				{product.ingredients.length > 0 && (
					<IngredientsContainer>
						<Text weight='600' color='#666'>
							Ingredientes
						</Text>
						<FlatList
							style={{marginTop: 16}}
							data={product.ingredients}
							keyExtractor={ingredient => ingredient._id}
							showsVerticalScrollIndicator={false}
							renderItem={({item: ingredient}) => (
								<Ingredient>
									<Text>{ingredient.icon}</Text>
									<Text size={14} color='#666' style={{marginLeft: 20}}>{ingredient.name}</Text>
								</Ingredient>
							)}
						/>
				</IngredientsContainer>
				)}
      </ModalBody>
			<Footer>
				<FooterContainer>
					<PriceContainer>
						<Text color='#666'>Preço</Text>
						<Text size={20} weight='600'>{formatCurrency(product.price)}</Text>
					</PriceContainer>
					<Button onPress={() => alert('adicionar ao pedido')}>Adicionar ao pedido</Button>
				</FooterContainer>
			</Footer>
		</Modal>
	);
};
