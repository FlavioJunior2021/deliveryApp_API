import { FlatList } from 'react-native'

import { categories } from '../../mocks/categories';
import { Text } from '../Text';
import { CategoriesItem, Icon } from './styles';

export function Categories(){
	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			data={categories}
			horizontal
			contentContainerStyle={{paddingRight: 24}}
			keyExtractor={category => category._id}
			renderItem={({item: category})=>(
				<CategoriesItem>
					<Icon>
						<Text>
							{category.icon}
						</Text>
					</Icon>
					<Text size={14} weight={'600'}>
						{category.name}
					</Text>
				</CategoriesItem>
			)}
		/>
	);
}
