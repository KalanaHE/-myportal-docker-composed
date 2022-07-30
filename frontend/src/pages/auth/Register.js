import { useState } from "react";
import * as Yup from "yup";

import { capitalCase } from "change-case";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Link,
  Container,
  Typography,
  Tooltip,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import useResponsive from "../../hooks/useResponsive";
import Page from "../../components/Page";
// import Logo from "../../components/Logo";
import Image from "../../components/Image";
import { LoadingButton } from "@mui/lab";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import Iconify from "../../components/Iconify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, RHFTextField } from "../../components/hook-form";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

export default function Register() {
  const { register, method } = useAuth();
  const navigate = useNavigate();

  const mdUp = useResponsive("up", "md");

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    mobile: Yup.string().required("Mobile phone number is required"),
    email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,

    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await register(data);
      navigate("/home");
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError("afterSubmit", error.response.data);
      }
    }
  };

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>{/* <Logo /> */}</HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Get started with MyPortal today.
            </Typography>
            <Image alt="register" src={require("../../assets/images/illustration_register.png")} />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Get started absolutely free.
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>Free forever.</Typography>
              </Box>
              <Tooltip title={capitalCase(method)}>
                <>
                  <Image
                    disabledEffect
                    src={`https://minimal-assets-api.vercel.app/assets/icons/auth/ic_${method}.png`}
                    sx={{ width: 32, height: 32 }}
                  />
                </>
              </Tooltip>
            </Box>

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <RHFTextField name="firstName" label="First name" />
                  <RHFTextField name="lastName" label="Last name" />
                </Stack>

                <RHFTextField name="mobile" label="Mobile Phone" />
                <RHFTextField name="email" label="Email address" />

                <RHFTextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                          <Iconify icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                  Register
                </LoadingButton>
              </Stack>
            </FormProvider>

            <Typography variant="body2" align="center" sx={{ color: "text.secondary", mt: 3 }}>
              By registering, I agree to MyPortal &nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service &nbsp;
              </Link>
              and &nbsp;
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>

            <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
              Already have an account?{" "}
              <Link variant="subtitle2" to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
