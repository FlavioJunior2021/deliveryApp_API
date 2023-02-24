export type Product = {
	_id: string,
	name: string,
	description: string,
  price: number,
  imagePath: string,
	ingredients: {
		name: string,
		_id: string,
		icon: string,
	}[];
}
