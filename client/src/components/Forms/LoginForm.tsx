import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { string } from "yup/lib/locale";
import { useUser, BaseUser } from "../../contexts/UserContext";
import InputField from "./InputField";

type LoginDetailsSchemaType = Record<keyof BaseUser, Yup.AnySchema>;

const LoginFormSchema = Yup.object().shape<LoginDetailsSchemaType>({
  email: Yup.string().required("Vänligen fyll i ditt användarnamn."),
  password: Yup.string().required("Vänligen fyll i ditt lösenord."),
});

export interface LoginDetails {
  email: string;
  password: string;
}

interface Props {
  defaultLoginDetails?: LoginDetails;
}

const emptyForm: LoginDetails = {
  email: "",
  password: "",
};

function LoginForm(_props: Props) {
  const userContext = useUser();
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  let nav = useNavigate();

  const { users, fetchUsers, loginUser } = useUser();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const formik = useFormik({
    initialValues: emptyForm,
    validationSchema: LoginFormSchema,
    onSubmit: (loginDetails, { resetForm }) => {
      loginUser();

      nav("/");
    },
  });

  return (
    // Log-in form
    <form onSubmit={formik.handleSubmit}>
      {/* Display error if invalid input */}
      {!!submitError && (
        <Typography sx={{ color: "red" }}>{submitError}</Typography>
      )}

      {/* user name input */}
      <InputField
        label="email: "
        id="email"
        name="email"
        type="text"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
      />

      {/* Password input */}
      <InputField
        label="Lösenord: "
        id="password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password && formik.errors.password}
      />

      <Button
        variant="outlined"
        type="submit"
        sx={{
          mt: 2,
          mb: 2,
          height: "3rem",
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
      >
        Logga in
      </Button>
    </form>
  );
}

export default LoginForm;
