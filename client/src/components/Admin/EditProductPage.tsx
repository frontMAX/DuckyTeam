import {
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import Save from "@mui/icons-material/Save";

import {
  Product,
  Categories,
  useProduct,
  BaseProduct,
} from "../../contexts/product/ProductContext";

import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

interface EditProductCardProps {
  expanded?: boolean;
}

function EditProductPage({ expanded }: EditProductCardProps) {
  const [open, setOpen] = useState(expanded ?? false);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const { products, fetchProduct, updateProduct, deleteProduct } = useProduct();

  const product = products.find((item: Product) => item._id?.toString() === id);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [fetchProduct]);

  const navigate = useNavigate();

  const handleOpen = (
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => setOpen(!open);

  const formik = useFormik({
    initialValues: {
      _id: product?._id || "",
      name: product?.name || "",
      price: product?.price || 0,
      details: product?.details || "",
      imageUrl: "",
      category: product?.category || [],
      quantity: product?.quantity || 0,
    },
    onSubmit: (values) => {
      const newProductData = {
        ...values,
      };
      updateProduct(newProductData);
      navigate("/admin");
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
      {!product?._id ? (
        <div>This product doesn't exist.</div>
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
            type="number"
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
            type="number"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <Button
            endIcon={<Save />}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Save product
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
            <Box
              sx={{
                background: "white",
                height: "10rem",
                width: "25rem",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography>
                Är du säker på att du vill ta bort produkten?
              </Typography>
              {typeof product._id !== "undefined" && (
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
              )}
              <Button onClick={() => setOpenModal(false)}>Nej</Button>
            </Box>
          </Modal>
        </>
      )}
    </form>
  );
}

export default EditProductPage;