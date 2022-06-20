import { Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { BaseUser, useUser } from "../../contexts/UserContext";
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
  const { loginUser, user, failedLogin } = useUser();
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  let navigate = useNavigate();

  const formik = useFormik<LoginDetails>({
    initialValues: emptyForm,
    validationSchema: LoginFormSchema,
    onSubmit: (loginDetails, { resetForm }) => {
      loginUser(loginDetails);
      if (!failedLogin) {
        navigate(`/`);
      }
      if (failedLogin) {
        navigate("/login");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {!failedLogin ? <h2>Wrong email or password.</h2> : <h2></h2>}
      {/* Display error if invalid input */}
      {!!submitError && (
        <Typography sx={{ color: "red" }}>{submitError}</Typography>
      )}
      <Typography>Logged in user: {user?.email}</Typography>
      {/* user name input */}
      <InputField
        label="Email: "
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
      />

      {/* Password input */}
      <InputField
        label="Password: "
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
