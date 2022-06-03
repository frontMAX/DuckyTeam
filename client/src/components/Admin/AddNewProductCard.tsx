import {
  Button,
  TextField,
  MenuItem,
  OutlinedInput,
  Select,
  InputLabel,
  Container,
  Box,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Save from "@mui/icons-material/Save";
import {
  BaseProduct,
  Categories,
  useProduct,
} from "../../contexts/product/ProductContext";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useUser } from "../../contexts/UserContext";

function AddNewProductCard() {
  const { createProduct } = useProduct();
  const navigate = useNavigate();
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      details: "",
      imageUrl: "",
      category: [],
      quantity: 0,
    },
    onSubmit: (values) => {
      const newProductData = {
        ...values,
      };
      createProduct(newProductData);
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
    <Container>
      <Link to="/admin/products">
        <Button sx={{ paddingTop: "2rem" }} startIcon={<ArrowBackIcon />}>
          Tillbaka till produktsidan
        </Button>
      </Link>
      {!user?.isAdmin && (
        <Box sx={{ textAlign: "center", padding: "2rem" }}>
          <Typography fontSize={30}>
            Woops. <br /> Unauthorized access, please return back.
          </Typography>
        </Box>
      )}
      {!!user?.isAdmin && (
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="imageUrl"
            type="file"
            name="imageUrl"
            // label="imageUrl"
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

          <InputLabel id="category">Categories</InputLabel>
          <Select
            label="Categories"
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
            sx={{
              bgcolor: "#0EDFE6",
              "&:hover": {
                bgcolor: "#eaa0ff",
              },
            }}
            endIcon={<Save />}
            variant="contained"
            fullWidth
            type="submit"
          >
            Lägg till
          </Button>
        </form>
      )}
    </Container>
  );
}

export default AddNewProductCard;
