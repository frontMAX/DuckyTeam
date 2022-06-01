import { User } from "../Api/Data";
import { LoginDetails } from "../components/Forms/LoginForm";
import axios from "axios";
import { Product } from "../contexts/product/ProductContext";

function wait(time: number) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}

export async function userFetch(loginDetails: LoginDetails): Promise<User> {
  const findUsers = await axios.get("http://localhost:5001/api/user");
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

// export async function userFetch(loginDetails: LoginDetails): Promise<User> {
//   const findUsers = await axios.post("http://localhost:5001/api/user/login");
//   const foundUsers = await findUsers.data.user;
//   console.log(foundUsers.user);
//   foundUsers.filter((loginDetails: { email: string; password: string }) => {
//     return loginDetails;
//   });

//   if (!foundUsers.length) {
//     console.log(foundUsers.email);
//     throw new Error("fel email eller lösenord.");
//   }

//   const foundUser = foundUsers[0];
//   console.log(foundUser);
//   if (foundUser.password !== loginDetails.password) {
//     throw new Error("fel email eller LÖSENORD.");
//   }

//   return foundUser;
// }

export async function ProductFetch(product: Promise<Product>) {
  const res = await axios.get("http://localhost:5001/api/product");

  const result = await res.data.product;
  console.log(result.product);
  return result;
}

export async function placeOrderFetch() {
  return await wait(1000);
}
