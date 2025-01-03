"use client";
import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";
import { SweetAlert, apiCall } from "@/helper/helper";
import CustomIcon from "@/Components/CustomIcon";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ROLES } from "@/helper/enum";
export default function Users() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setValue,
  } = useForm<Inputs>({ defaultValues });

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  const handleEdit = async () => {
    const url = `http://localhost:8080/users/id/${id}`;

    const response = await apiCall(url, "get");

    console.log("This is response", response);

    const user = response.data?.data;

    setValue("name", user.name);
    setValue("email", user.email);
    setValue("role", user.role);
  };

  useEffect(() => {
    if (id) {
      handleEdit();
    }
  }, [id]);

  // const createNewUser = async (data: any) => {
  //   try {
  //     const result = await SweetAlert(
  //       "Are you sure?",
  //       "info",
  //       "You are about to add a New User",
  //       true,
  //       `Yes!`,
  //       "No"
  //     );

  //     let url = "http://localhost:8080/users";
  //     const payload = {
  //       name: data.name,
  //       password: data.password,
  //       email: data.email,
  //       role: data.role,
  //     };

  //     console.log("Payload being sent:", payload);

  //     const response = await postMethod(`${baseUrl}/users`, payload);

  //     if ((response && response.status === 201) || response.status === 200) {
  //       const successMessage = await SweetAlert(
  //         "User Created",
  //         "success",
  //         "",
  //         false,
  //         "OK"
  //       );

  //       if (successMessage.isConfirmed && result.isConfirmed)
  //         router.push("/user");
  //     } else {
  //       const errorData = response?.data || {};
  //       console.error("Error response data:", errorData);
  //       SweetAlert(
  //         "Failed to create",
  //         "error",
  //         errorData.message || "Unknown error",
  //         false,
  //         "OK"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Network error:", error);
  //     SweetAlert("Failed to create", "error", "", false, "OK");
  //   }
  // };

  const message2 = id
    ? "You are about to update the User "
    : "You are about to add a new User";

  const buttonMessage = id ? "Update" : "Add";

  const createNewUser = async (data: any) => {
    try {
      const result = await SweetAlert(
        "Are you sure?",
        "info",
        message2,
        true,
        `Yes, ${buttonMessage}!`,
        "No"
      );
      setIsLoading(true);

      if (!result.isConfirmed) return;

      if (id) data.id = id;

      let url = id
        ? `http://localhost:8080/users/${id}`
        : `http://localhost:8080/users`;
      let method = id ? "PUT" : "POST";

      setIsLoading(false);

      const response = await apiCall(url, method, data);

      let message = id ? "User Updated" : "User Added";
      console.log("This is repsponse status", response.status);
      if (response.status === 201 || response.status === 200) {
        const successMessage = await SweetAlert(
          "Success",
          "success",
          message,
          false,
          "OK"
        );
        if (result.isConfirmed && successMessage.isConfirmed)
          router.push("/user");
      } else {
        SweetAlert("Error", "error", "Something went wrong", false, "OK");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add/update User");
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
          <CustomIcon
            name="ArrowBack"
            color="primary"
            onClick={() => {
              router.push("/user");
            }}
          />

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
                  disabled={!!id} // Disable the email input if id exists
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
                {!id && ( // Hide the password input if id exists
                  <CustomInput
                    label="Password"
                    control={control}
                    name="password"
                    errors={errors}
                    type="password"
                  />
                )}

                <CustomInput
                  label="Role"
                  control={control}
                  name="role"
                  errors={errors}
                  options={ROLES}
                />
              </div>
            </Grid2>
          </Grid2>
          <div style={{ marginTop: "2rem" }}>
            <CustomButton
              variant="contained"
              text={id ? "Update" : "Add"}
              color="success"
              buttonType="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}
