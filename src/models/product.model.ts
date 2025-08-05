export interface Product {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  isOnSale: boolean;
  onSalePrice: number;
}