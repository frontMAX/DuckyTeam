import { Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputField from "./InputField";
import { useUser } from "../../contexts/UserContext";
type CreateAccountSchemaType = Record<keyof createAccount, Yup.AnySchema>;

const createAccountFormSchema = Yup.object().shape<CreateAccountSchemaType>({
  email: Yup.string().required("Vänligen fyll i ditt användarnamn."),
  password: Yup.string().required("Vänligen fyll i ditt lösenord."),
});

export interface createAccount {
  email: string;
  password: string;
}

interface Props {
  defaultCreateAccount?: createAccount;
}

const emptyForm: createAccount = {
  email: "",
  password: "",
};

function CreateAccountForm(_props: Props) {
  const { createUser } = useUser();
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const formik = useFormik<createAccount>({
    initialValues: emptyForm,
    validationSchema: createAccountFormSchema,

    onSubmit: (newUser, { resetForm }) => {
      createUser(newUser);
    },
  });

  return (
      <form onSubmit={formik.handleSubmit}>
        {/* Display error if invalid input */}
        {!!submitError && (
          <Typography sx={{ color: "red" }}>{submitError}</Typography>
        )}
        <Typography fontWeight={700} mb={2}>Skapa ett konto</Typography>
        {/* user name input */}
        <InputField
          label="E-postadress"
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
          label="Lösenord"
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
          skapa konto
        </Button>
      </form>
  );
}

export default CreateAccountForm;
