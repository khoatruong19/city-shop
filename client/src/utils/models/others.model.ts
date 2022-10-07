export type ImageModel = {
  _id: string;
  public_id: string;
  url: string;
};

export type CartItem = {
  product: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
};
