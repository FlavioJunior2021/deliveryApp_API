export type Order = {
  _id: string,
  table: string,
  price: string,
  status: string,

  products: {
    _id: string,
    quantity: number,
    product: {
      name: string,
      price: number,
      imagePath: string
    };
  }[];
}
