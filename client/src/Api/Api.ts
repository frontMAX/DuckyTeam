import { mockedUsers, User } from "../Api/Data";
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

export async function FakeUserFetch(loginDetails: LoginDetails): Promise<User> {
  await wait(1000);
  const foundUsers = mockedUsers.filter((user) => {
    return user.username === loginDetails.username;
  });

  if (!foundUsers.length) {
    throw new Error("Tyvärr så finns inte denna användare.");
  }

  const foundUser = foundUsers[0];

  if (foundUser.password !== loginDetails.password) {
    throw new Error("Tyvärr så stämmer ej lösenordet.");
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
