"use client";
import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";
import { SweetAlert, apiCall, baseUrl, postMethod } from "@/helper/helper";
import Link from "next/link";
import CustomIcon from "@/Components/CustomIcon";
import { useRouter, useSearchParams } from "next/navigation";

export default function Users() {
  type Inputs = {
    name: string;
    email: string;
    password: string;
    role: string;
    file: string;
  };

  const defaultValues = {
    name: "",
    email: "",
    role: "",
    password: "",
  };

  const router = useRouter();
  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>({ defaultValues });

  const createNewUser = async (data: Inputs) => {
    try {
      const result = await SweetAlert(
        "Are you sure?",
        "info",
        "You are about to add a New User",
        true,
        `Yes!`,
        "No"
      );

      let url = "http://localhost:8080/users";
      const payload = {
        name: data.name,
        password: data.password,
        email: data.email,
        role: data.role,
      };

      console.log("Payload being sent:", payload);

      const response = await postMethod(`${baseUrl}/users`, payload);

      if ((response && response.status === 201) || response.status === 200) {
        const successMessage = await SweetAlert(
          "User Created",
          "success",
          "",
          false,
          "OK"
        );

        if (successMessage.isConfirmed && result.isConfirmed)
          router.push("/user");
      } else {
        const errorData = response?.data || {};
        console.error("Error response data:", errorData);
        SweetAlert(
          "Failed to create",
          "error",
          errorData.message || "Unknown error",
          false,
          "OK"
        );
      }
    } catch (error) {
      console.error("Network error:", error);
      SweetAlert("Failed to create", "error", "", false, "OK");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "2rem",
          paddingBottom: "30px",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",

            width: "100%",
            alignItems: "center",
          }}
        >
          <Link href="/user">
            <CustomIcon name="ArrowBack" color="primary" />
          </Link>

          <h2 style={{ paddingLeft: "1rem" }}>User Details</h2>
        </div>
        <form onSubmit={handleSubmit(createNewUser)} style={{}}>
          <Grid2 container spacing={4}>
            <Grid2 size={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <CustomInput
                  label="Name"
                  control={control}
                  name="name"
                  errors={errors}
                />
                <CustomInput
                  label="Email"
                  control={control}
                  name="email"
                  errors={errors}
                  type="email"
                />
              </div>
            </Grid2>

            <Grid2 size={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <CustomInput
                  label="password"
                  control={control}
                  name="password"
                  errors={errors}
                  type="password"
                />

                <CustomInput
                  label="Role"
                  control={control}
                  name="role"
                  errors={errors}
                  options={[
                    { label: "Admin", value: "Admin" },
                    { label: "Normal", value: "Normal" },
                  ]}
                />
              </div>
            </Grid2>
          </Grid2>
          <div style={{ marginTop: "2rem" }}>
            <CustomButton
              variant="contained"
              text="Add"
              color="success"
              buttonType="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}
