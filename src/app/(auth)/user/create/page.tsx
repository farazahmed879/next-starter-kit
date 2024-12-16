"use client";
import CustomButton from "@/Components/CustomButton";
import CustomInput from "@/Components/CustomInput";
import { Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";

export default function Users() {
  type Inputs = {
    name: string;
    email: string;
    password: string;
    role: string;
    file: string;
  };

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>();

  const createNewUser = async (data: Inputs) => {
    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("New user created!");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to add user!");
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
        <div>
          <h2>New User</h2>
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
