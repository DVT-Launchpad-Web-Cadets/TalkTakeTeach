export default interface ProductInterface {
  id: string;
  name: string;
  imageUrl: string;
  brand?: string;
  brandLink?: string;
  productLink: string;
  rating?: number;
  numberOfReviews?: number;
  price: number;
  salePrice?: number;
}
