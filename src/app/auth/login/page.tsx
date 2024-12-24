"use client";
import * as React from "react";
import Box from "@mui/material/Box";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import CustomButton from "@/Components/CustomButton";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/Components/CustomInput";
import Grid from "@mui/material/Grid2";
import AppTheme from "@/app/shared-theme/AppTheme";
import ColorModeSelect from "@/app/shared-theme/ColorModeSelect";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
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

type Inputs = {
  email: string;
  password: string;
};

export default function SignIn({}: {}) {
  const [errorMessage, setErrorMessage] = React.useState("");
  const { data: session, status: sessionStatus } = useSession();
  const [isLoading, setIsloading] = React.useState<boolean>();
  const router = useRouter();

  const defaultValues: Inputs = {
    email: "",
    password: "",
  };

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>({ defaultValues });

  const onSubmit: SubmitHandler<Inputs> = async (form: any) => {
    setIsloading(true);
    const res = await signIn("credentials", {
      redirect: false,
      username: form.email,
      password: form.password,
    });
    setIsloading(false);
    if (res?.error) {
      setErrorMessage("Invalid Username or Password");
    } else {
      router.push("/dashboard");
    }
  };

  React.useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/dashboard");
    }
  }, [sessionStatus, router]);

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <CustomInput
                    required
                    label="Email"
                    control={control}
                    name="email"
                    errors={errors}
                    type="email"
                  />
                </Grid>
                <Grid size={12}>
                  <CustomInput
                    required
                    label="Password"
                    control={control}
                    name="password"
                    errors={errors}
                    type="password"
                  />
                </Grid>

                <Grid size={12}>
                  {/* <Button fullWidth variant="contained">
                    Sign In
                    </Button> */}
                  <CustomButton
                    isLoadingButton={true}
                    isLoading={isLoading}
                    buttonType="submit"
                    variant="outlined"
                    text="Sign In"
                    color="secondary"
                    widthProp={true}
                  ></CustomButton>
                </Grid>
              </Grid>
            </Box>
          </form>

          <Divider>or</Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button> */}

            <Typography component={'span'} sx={{ textAlign: "center", cursor: "pointer" }}>
              Don&apos;t have an account?{" "}
              <Link
                onClick={() => router.push("/auth/register")}
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
