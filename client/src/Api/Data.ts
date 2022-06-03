import CreditCardIcon from "../assets/PaymentLogos/visa.png";
import klarna from "../assets/PaymentLogos/klarna-square.jpg";
import swish from "../assets/PaymentLogos/swish.svg";
import { SvgIcon } from "@mui/material";


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
    logo: CreditCardIcon,
    id: "card",
  },
];
