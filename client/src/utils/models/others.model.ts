export type ImageModel = {
  _id: string;
  public_id: string;
  url: string;
};

export type OrderItem = {
  _id: string;
  productName: string;
  productPrice: number;
  quantity: number;
  productImage: string;
  productId: string;
};
