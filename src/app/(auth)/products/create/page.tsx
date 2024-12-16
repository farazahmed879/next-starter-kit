"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/Components/CustomInput";
import { Grid2 } from "@mui/material";
import CustomButton from "@/Components/CustomButton";
import { ApiCall, SweetAlert } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function ProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  type Inputs = {
    name: string;
    description: string;
    file: String;
  };

  const defaultValues: Inputs = {
    name: "",
    description: "",
    file: "",
  };

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm<Inputs>({ defaultValues });

  const submitProductData = async (data: Inputs) => {
    try {
      setIsLoading(true);
      const response = await ApiCall(
        "http://localhost:8080/product",
        "post",
        data
      );

      setIsLoading(true);
      if (response.status == 201) {
        const res = await SweetAlert(
          "Success",
          "success",
          "Product added successfully",
          false,
          "OK"
        );
        if (res.isConfirmed) router.push("/products");
      } else {
        SweetAlert("Error", "error", "Something went wrong", false, "Ok");
      }
    } catch (error) {
      console.error("Network error", error);
      SweetAlert("Error", "error", "Something went wrong", false, "Ok");
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
          <h2>Product Form</h2>
        </div>

        <form onSubmit={handleSubmit(submitProductData)} style={{}}>
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
                  label="File"
                  control={control}
                  name="file"
                  errors={errors}
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
                  label="Description"
                  control={control}
                  name="description"
                  errors={errors}
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
      {/* <div
        style={{
          display: "flex",
          width: "80vw",
          padding: " 2rem",
          paddingLeft: "3rem",
          paddingBottom: "30px",
        }}
      >
        <h2>New Product Form</h2>
      </div>

      <Grid2
        container
        spacing={3}
        style={{ width: "80vw", paddingLeft: "3rem" }}
      >
        <form
          onSubmit={handleSubmit(submitProductData)}
          style={{
            width: "100%",
          }}
        >
          <Grid2 container spacing={6}>
            <Grid2
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "30vw",
              }}
            >
              <CustomInput
                label="Name"
                control={control}
                name="name"
                errors={errors}
              />
              <CustomInput
                label="Description"
                control={control}
                name="description"
                errors={errors}
              />

              <CustomInput
                label="File"
                control={control}
                name="file"
                errors={errors}
              />
            </Grid2>

          </Grid2>
          <div style={{ marginTop: "2rem" }}>
            <CustomButton
              variant="contained"
              text="Add "
              color="success"
              buttonType="submit"
            />
          </div>
        </form>
      </Grid2> */}
    </>
  );
}
