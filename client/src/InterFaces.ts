export interface test {}

// Vilket interface skall användas ?

// export interface DeliveryInterface {
//   name: string;
//   price: number;
//    time: number;
// }
export interface DeliveryInterface {
  _id: string;
  name: string;
  altText: string;
  shippingTime: number;
  price: number;
  logo: string;
  id: string;
}
