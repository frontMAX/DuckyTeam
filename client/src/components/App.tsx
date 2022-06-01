import { Route, Routes } from "react-router-dom";
import ProductListPage from "../pages/ProductListPage";
import Layout from "./Layout";
import StartPage from "../pages/StartPage";
import CheckOutPage from "../pages/CheckOutPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import FaqPage from "../pages/FaqPage";
import TermsOfUsePage from "../pages/TermsOfUsePage";
import SupportPage from "../pages/SupportPage";
import ConfirmedOrderPage from "../pages/ConfirmedPage";
import OrderPage from "../pages/orderPage";
import OrderListPage from "../pages/OrderListPage";
import AddNewProductCard from "./Admin/AddNewProductCard";
import AdminOrdersPage from "./Admin/AdminOrdersPage";
import AdminProductsPage from "./Admin/AdminProductsPage";
import EditProductPage from "./Admin/EditProductPage";
import AdminPage from "./Admin/AdminPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StartPage />} />
        <Route path="products">
          <Route index element={<ProductListPage />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="cartPage" element={<CartPage />} />
        <Route path="checkoutPage" element={<CheckOutPage />} />
        <Route path="confirmed-order" element={<ConfirmedOrderPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="termsOfUse" element={<TermsOfUsePage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="order" >
          <Route path="all" element={<OrderListPage />} /> - alla ordrar sen
          typ
          <Route path=":id" element={<OrderPage />} />
        </Route>
      </Route>
      {/* <Route path="admin" element={<AdminPage />} /> */}
      <Route path="admin">
      <Route index element={<AdminPage />} />
      <Route path="orders" element={<AdminOrdersPage />} />
      <Route path="products" element={<AdminProductsPage />} />
      <Route path="products/:id" element={<EditProductPage />} />
      <Route path="products/new" element={<AddNewProductCard />} />
      </Route>
    </Routes>
  );
}

export default App;
