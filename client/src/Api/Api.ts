import { User } from "../Api/Data";
import { LoginDetails } from "../components/Forms/LoginForm";
// import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { Product } from "../contexts/product/ProductContext";
import { Order } from "../../../backend/resources/order";

function wait(time: number) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
// import axios from "axios";
// import { LoginDetails } from "../components/Forms/LoginForm";
// // import { DeliveryInterface } from "../InterFaces";
// import { Product } from "../contexts/product/ProductContext";

// import { mockedUsers } from "./Data";

// function wait(time: number) {
//   return new Promise<boolean>((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, time);
//   });
// }

// // export async function DeliveryFetch(delivery: Promise<DeliveryInterface>) {
// //   const res = await axios.get("http://localhost:5001/api/delivery");
// // }

export async function userFetch(loginDetails: LoginDetails): Promise<User> {
  const findUsers = await axios.post("http://localhost:5001/api/user/login");
  const foundUsers = await findUsers.data.user;
  console.log(foundUsers.user);
  foundUsers.filter((loginDetails: { email: string; password: string }) => {
    return loginDetails;
  });

  if (!foundUsers.length) {
    console.log(foundUsers.email);
    throw new Error("fel email eller lösenord.");
  }

  const foundUser = foundUsers[0];
  console.log(foundUser);
  if (foundUser.password !== loginDetails.password) {
    throw new Error("fel email eller LÖSENORD.");
  }

  return foundUser;
}
// export async function ProductFetch(product: Promise<Product>) {
//   const res = await axios.get(
//     'http://localhost:5001/api/product'
//   )

//   // export async function OrderFetch(order: Promise<OrderInterface>) {
//   //   const res = await axios.get(
//   //     'http://localhost:5001/api/product'
//   //   )
//   // }

//   const result = await res.data.product
//   console.log(result.product)
//   return result
// }

// export async function OrderFetch(order: Promise<Order>) {
//   const res = await axios.get(
//     'http://localhost:5001/api/order'
//   )

//   // export async function OrderFetch(order: Promise<OrderInterface>) {
//   //   const res = await axios.get(
//   //     'http://localhost:5001/api/product'
//   //   )
//   // }

//   const result = await res.data.order
//   console.log(result.order)
//   return result

// export async function ProductFetch(product: Promise<Product>) {
//   const res = await axios.get("http://localhost:5001/api/product");

//   const result = await res.data.product;
//   console.log(result.product);
//   return result;
// }

// export async function placeOrderFetch() {
//   return await wait(1000);

// }
