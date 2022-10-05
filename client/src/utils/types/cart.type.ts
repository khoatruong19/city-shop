export type CartItem = {
  product: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
};

export type ShippingInfo = {
  address: string;
  state: string;
  country: string;
  phoneNo: string;
};
