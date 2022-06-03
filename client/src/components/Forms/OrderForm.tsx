import ShippingForm, {
  AdressFormSchema,
  emptyShippingForm,
  ShippingAdress,
} from "./ShippingForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import PaymentBox from "./PaymentBox";
import {
  Button,
  LinearProgress,
  Box,
  Typography,
} from "@mui/material";
import ShipmentBox from "./ShipmentBox";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { CartType, Types } from "../../contexts/Reducers";
import { useDelivery } from "../../contexts/DeliveryContetxt";
import { useOrder } from "../../contexts/Order/orderContext";
import { useUser } from "../../contexts/UserContext";
import { useProduct } from "../../contexts/product/ProductContext";
import useLocalStorage from "../../Hooks/useLocalStorage";

export interface OrderData {
  shippingAdress: ShippingAdress;
  paymentMethod: string | number | readonly string[] | undefined;
  shippingMethod: number | undefined;
  cardNumber: string;
  cvc: string;
  expDate: string;
  personalNumber: string;
  phoneNumber: string;
}

const emptyForm: OrderData = {
  shippingAdress: emptyShippingForm,
  paymentMethod: "",
  shippingMethod: undefined,
  cardNumber: "",
  cvc: "",
  expDate: "",
  personalNumber: "",
  phoneNumber: "",
};

export type OrderSchemaType = Record<keyof OrderData, Yup.AnySchema>;

const OrderFormSchema = Yup.object().shape<OrderSchemaType>({
  shippingAdress: AdressFormSchema,
  paymentMethod: Yup.string().required("Du måste välja ett betalsätt"),
  shippingMethod: Yup.string().required("Du måste välja ett fraktsätt"),
  cardNumber: Yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) => schema.required("Vänligen fyll i ditt kortnummer."),
  }),
  cvc: Yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) => schema.required("Vänligen fyll i din CVC-kod."),
  }),
  expDate: Yup.string().when("paymentMethod", {
    is: "card",
    then: (schema) => schema.required("Vänligen fyll i utgångsdatum."),
  }),
  personalNumber: Yup.string().when("paymentMethod", {
    is: "klarna",
    then: (schema) => schema.required("Vänligen fyll i ditt personnummer."),
  }),
  phoneNumber: Yup.string().when("paymentMethod", {
    is: "swish",
    then: (schema) => schema.required("Vänligen fyll i ditt telefonnummer."),
  }),
});

export interface AllOrderData {
  orderDetails: OrderData;
  orderTotal: number;
  products: CartType[];
}

interface Props {
  defaultOrderData?: OrderData;
  setSelectedDeliveryId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  selectedDeliveryId: string | undefined;
}

function OrderForm(props: Props) {
  let navigate = useNavigate();
  
  const { updateProduct } = useProduct();

  const { dispatch, cart } = useCart();
  const [total, setTotal] = useLocalStorage<number>("cartSum", 0);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const { deliveries, fetchDeliveries } = useDelivery();
  const { orders, createOrder } = useOrder();
  const { user } = useUser();
  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  async function handleSubmit(orderData: OrderData) {
    setLoading(true);

    if (typeof props.selectedDeliveryId === "undefined") {
      return false;
    }

    if(!user){
      return
    }

    const newOrderData = {
      shipping: orderData.shippingAdress,
      orderTotal: total,
      delivery: props.selectedDeliveryId,
      products: cart,
    };

    if (newOrderData) {
      const myNewOrder = await createOrder(newOrderData);

      dispatch({
        type: Types.ResetCart,
        payload: {},
      });

      navigate(`/confirmed-order/${myNewOrder.id}`);
    }
  }

  const formik = useFormik<OrderData>({
    initialValues: emptyForm,
    validationSchema: OrderFormSchema,
    onSubmit: (orderData) => {
      handleSubmit(orderData);
    },
  });

  return (
    <>
      {!isLoading ? (
        <>
          <Box
            sx={{
              bgcolor: "#ffffff",
              mt: 3,
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" sx={{ padding: 2, fontWeight: "bold" }}>
              Välj dina betal och leveransmetoder
            </Typography>
            {/* RANDOM INFO TEXT, DOESN'T ACTUALLY DO/MEAN ANYTHING */}

            {/* The full order form */}
            <form onSubmit={formik.handleSubmit}>
              {/* Shipping adress */}
              <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                Leveransadress
              </Typography>
              <ShippingForm formikProps={formik} />

              {/* Shipping methods */}
              <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                Leveransmetod
              </Typography>

              {/* Show error if no shipping method is selected */}
              {formik.touched.shippingMethod && formik.errors.shippingMethod}

              <ShipmentBox
                formikProps={formik}
                setSelectedDeliveryId={props.setSelectedDeliveryId}
                selectedDeliveryId={props.selectedDeliveryId}
              />

              {/* Payment methods (and payment details) */}
              <Typography variant="body1" sx={{ mt: 1, fontWeight: "bold" }}>
                Betalningsmetod{" "}
              </Typography>

              {/* Show error if no payment method is selected */}
              {formik.touched.paymentMethod && formik.errors.paymentMethod}

              <PaymentBox formikProps={formik} />

              {/* Post form */}

              <Button
                sx={{
                  mt: 2,
                  mb: 2,
                  height: "3rem",
                  width: "100%",
                  bgcolor: "#0EDFE6",
                  border: "none",
                  color: " black",
                  "&:hover": {
                    bgcolor: "#eaa0ff",
                    border: "none",
                    color: "black",
                  },
                  "@media screen and (max-width: 440px)": {
                    borderRadius: "0",
                    mt: 2,
                    mb: 0,
                  },
                }}
                variant="outlined"
                type="submit"
              >
                Slutför beställning
              </Button>
            </form>
          </Box>
        </>
      ) : (
        <>
          {" "}
          <LinearProgress /> <br />
          Kontrollerar beställning...
        </>
      )}
    </>
  );
}

export default OrderForm;
