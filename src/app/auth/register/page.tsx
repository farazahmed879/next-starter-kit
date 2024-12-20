"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../shared-theme/AppTheme";
import ColorModeSelect from "../../shared-theme/ColorModeSelect";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/Components/CustomInput";
import Grid from "@mui/material/Grid2";
import CustomButton from "@/Components/CustomButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { apiCall, SweetAlert } from "@/helper/helper";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignUp({}: {}) {
  // const [emailError, setEmailError] = React.useState(false);
  // const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  // const [passwordError, setPasswordError] = React.useState(false);
  // const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  // const [nameError, setNameError] = React.useState(false);
  // const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const { data: session, status: sessionStatus } = useSession();
  const [isLoading, setIsloading] = React.useState<boolean>();
  const router = useRouter();

  type Inputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    file: string;
  };

  const defaultValues: Inputs = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: "",
  };

  React.useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>({ defaultValues });

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    console.log("onSubmit", data);
    if (data.password != data.confirmPassword) return;

    try {
      const reqData = {
        name: data.name,
        email: data.email,
        password: data.password,
        file: "",
      };

      setIsloading(true);
      const response = await apiCall(
        "http://localhost:8080/users",
        "post",
        reqData
      );

      setIsloading(false);
      console.log("response", response);
      if (response.data.message == "User  Created Successfully") {
        // alert("User added successfully!");
        const res = await SweetAlert(
          "Success",
          "success",
          "User added successfully!",
          false,
          "OK"
        );

        if (res.isDenied) return;
        router.replace("/auth/login");
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
      }
    } catch (error) {
      console.error("Network error", error);
      alert("Failed to submit form, please try again");
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <CustomInput
                    label="Full Name"
                    control={control}
                    name="name"
                    errors={errors}
                  />
                </Grid>
                <Grid size={12}>
                  <CustomInput
                    label="Email"
                    control={control}
                    name="email"
                    type="email"
                    errors={errors}
                  />
                </Grid>
                <Grid size={12}>
                  <CustomInput
                    label="Password"
                    control={control}
                    name="password"
                    type="password"
                    errors={errors}
                  />
                </Grid>
                <Grid size={12}>
                  <CustomInput
                    label="Confirm Password"
                    control={control}
                    type="password"
                    name="confirmPassword"
                    errors={errors}
                  />
                </Grid>
                <Grid size={12}></Grid>
              </Grid>
              <CustomButton
                variant="contained"
                text="Sign Up"
                color="secondary"
                widthProp={true}
                buttonType={"submit"}
              ></CustomButton>
            </Box>
          </form>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography sx={{ textAlign: "center", cursor: "pointer" }}>
              Already have an account?{" "}
              <Link
                onClick={() => router.push("/auth/login")}
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
