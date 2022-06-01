import CreditCardIcon from "@mui/icons-material/CreditCard";
import klarna from "../assets/PaymentLogos/klarna-square.jpg";
import swish from "../assets/PaymentLogos/swish.svg";
import { SvgIcon } from "@mui/material";

export interface User {
  email: string;
  password: string;
  isAdmin: boolean;
}

// export const mockedUsers: User[] = [
//   {
//     username: "Regular-User",
//     password: "User",
//     isAdmin: false,
//   },
//   {
//     username: "Admin-User",
//     password: "Admin",
//     isAdmin: true,
//   },
// ];

// // export interface Delivery {
// //   name: string;
// //   altText: string;
// //   shippingTime: number;
// //   price: number;
// //   logo: string;
// //   id: string;
// // }

// // export const deliveryOptions: Delivery[] = [
// //   {
// //     name: 'Postnord',
// //     altText: 'Leverans i brevlådan, 1-3 arbetsdagar',
// //     shippingTime: 3,
// //     price: 19,
// //     logo: postnord,
// //     id: 'postnord',
// //   },
// //   {
// //     name: 'Schenker',
// //     altText: 'Spårbar leverans, 1-2 arbetsdagar',
// //     shippingTime: 2,
// //     price: 29,
// //     logo: schenker,
// //     id: 'schenker',
// //   },
// //   {
// //     name: 'Instabox',
// //     altText: 'Leverans till box, 1-2 arbetsdagar',
// //     shippingTime: 2,
// //     price: 29,
// //     logo: instabox,
// //     id: 'instabox',
// //   },
// // ];

export interface Payment {
  name: string;
  altText: string;
  id: string;
  logo?: string;
  icon?: typeof SvgIcon;
}

export const paymentOptions: Payment[] = [
  {
    name: "Klarna",
    altText: "Välj att delbetala, betala senare, eller i slutet av månaden",
    logo: klarna,
    id: "klarna",
  },
  {
    name: "Swish",
    altText: "Betala enkelt med mobilen",
    logo: swish,
    id: "swish",
  },
  {
    name: "Kortbetalning",
    altText: "Betala med Visa / Mastercard / Maestro",
    icon: CreditCardIcon,
    id: "card",
  },
];
