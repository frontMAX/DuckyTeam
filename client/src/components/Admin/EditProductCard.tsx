import {
  Accordion,
  Typography,
  Button,
  AccordionDetails,
  AccordionSummary,
  Box,
  ButtonGroup,
  Modal,
  CardMedia,
  TextField,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import Save from "@mui/icons-material/Save";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Product,
  Categories,
  useProduct,
} from "../../contexts/product/ProductContext";

import { useParams } from "react-router-dom";
import axios from "axios";
import { Field, useFormik } from "formik";
import * as Yup from "yup";

interface EditProductCardProps {
  expanded?: boolean;
  product: Product;
}

// export interface ProductData {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   details: string;
//   category: string[];
//   imageUrl: string;
// }

export type ProductSchemaType = Record<keyof Product, Yup.AnySchema>;

// const ProductFormSchema = Yup.object().shape<ProductSchemaType>({
//   name: Yup.string().required("Du måste skriva ett namn"),
//   price: Yup.number().required("Du måste skriva ett pris"),
//   quantity: Yup.number().required("Du måste skriva ett antal"),
//   details: Yup.string().required("Du måste skriva en beskrivande text"),
//   category: Yup.string[].required("Du måste välja en eller flera kategorier"),
//   imageUrl: Yup.string().required("Du måste välja en bild"),
//   _id:
// });

function EditProductCard({ expanded, product }: EditProductCardProps) {
  const [open, setOpen] = useState(expanded ?? false);
  const [openModal, setOpenModal] = useState(false);

  const { products, fetchProduct, updateProduct, deleteProduct } = useProduct();

  const handleOpen = (
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => setOpen(!open);

  const formik = useFormik({
    initialValues: {
      _id: product._id,
      name: product?.name || "",
      price: product?.price || 0,
      details: product?.details || "",
      imageUrl: "",
      category: product?.category || [],
      quantity: product?.quantity || 0,
    },
    // validationSchema: ProductFormSchema,
    onSubmit: (values) => {
      const newProductData = {
        ...values,
      };
      updateProduct(newProductData);
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.set("file", file);

    // TODO: spara ett loading state
    const res = await axios.post(
      "/api/media",
      formData,

      {
        headers: {
          "content-Type": "multipart/form-data",
        },
      }
    );
    formik.setFieldValue("imageId", res.data._id);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {!product._id ? (
        <div>blä</div>
      ) : (
        <>
          <img
            style={{ width: 100, height: 100 }}
            src={product?.imageUrl}
          ></img>
          <TextField
            fullWidth
            id="imageUrl"
            type="file"
            name="imageUrl"
            label="imageUrl"
            value={formik.values.imageUrl}
            onChange={handleUpload}
          />
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="price"
            name="price"
            label="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            fullWidth
            id="details"
            name="details"
            label="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            error={formik.touched.details && Boolean(formik.errors.details)}
            helperText={formik.touched.details && formik.errors.details}
          />

          <Select
            labelId="category"
            id="category"
            name="category"
            multiple
            value={formik.values.category}
            onChange={formik.handleChange}
            input={<OutlinedInput label="Categories" />}
          >
            {Categories.map((category, key) => (
              <MenuItem key={key} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>

          <TextField
            fullWidth
            id="quantity"
            name="quantity"
            label="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <Button
            startIcon={<DeleteForeverIcon />}
            onClick={() => setOpenModal(true)}
          >
            Ta bort produkt
          </Button>
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-modal-name"
            aria-describedby="modal-modal-description"
          >
            <Box>
              <Typography>
                Är du säker på att du vill ta bort produkten?
              </Typography>
              {typeof product._id !=="undefined" &&
              <Button
                onClick={(e) => {
                  deleteProduct(product._id);
                  setOpenModal(false);
                  setOpen(false);
                  e.stopPropagation();
                }}
              >
                Ja
              </Button>
              }
              <Button onClick={() => setOpenModal(false)}>Nej</Button>
            </Box>
          </Modal>
        </>
      )}
    </form>
  );
}

export default EditProductCard;
