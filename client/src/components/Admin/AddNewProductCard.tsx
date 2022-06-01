import {
  Button,
  TextField,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

import Save from "@mui/icons-material/Save";
import {
  BaseProduct,
  Categories,
  useProduct,
} from "../../contexts/product/ProductContext";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

// export type ProductSchemaType = Record<keyof BaseProduct, Yup.AnySchema>;

// const ProductFormSchema = Yup.object().shape<ProductSchemaType>({
//   name: Yup.string().required("Du måste skriva ett namn"),
//   price: Yup.number().required("Du måste skriva ett pris"),
//   quantity: Yup.number().required("Du måste skriva ett antal"),
//   orderedQuantity: Yup.number().nullable().notRequired(),
//   details: Yup.string().required("Du måste skriva en beskrivande text"),
//   imageUrl: Yup.string().required("Du måste välja en bild"),
//   category: Yup.array(Yup.string()).required("Du måste välja en eller flera kategorier"),
// });

function AddNewProductCard() {
  const { createProduct } = useProduct();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      details: "",
      imageUrl: "",
      category: [],
      quantity: 0,
    },
    // validationSchema: ProductFormSchema,
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
    <form onSubmit={formik.handleSubmit}>
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
      <Button
        endIcon={<Save />}
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
      >
        Add product
      </Button>
    </form>
  );
}

export default AddNewProductCard;
