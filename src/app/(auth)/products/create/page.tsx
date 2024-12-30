"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomInput from "@/Components/CustomInput";
import { Grid2 } from "@mui/material";
import CustomButton from "@/Components/CustomButton";
import { apiCall, SweetAlert } from "@/helper/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import CustomIcon from "@/Components/CustomIcon";

export default function ProductForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productData, setProductData] = useState<any>(null); // State to store product data

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the id from query params

  // Default form values
  const defaultValues = {
    name: "",
    description: "",
    file: "",
    ...productData,
  };

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm({ defaultValues });

  useEffect(() => {
    if (!id) return;
    handleEdit();
  }, [id]);

  const handleEdit = async () => {
    let url = `http://localhost:8080/product/id/${id}`;

    const response = await apiCall(url, "get");
    if (!response.data.data.name) return;
    const product = response.data.data;

    setProductData(product);

    setValue("name", product.name);
    setValue("description", product.description);
    setValue("file", product.file);
  };

  const message2 = id
    ? "You are about to update this Product"
    : "You are about to add a new Product";

  const buttonMessage = id ? "Update" : "Add";
  const submitProductData: SubmitHandler<any> = async (data) => {
    try {
      // Show SweetAlert confirmation dialog
      const result = await SweetAlert(
        "Are you sure?",
        "info",
        message2,
        true,
        `Yes, ${buttonMessage}!`,
        "No"
      );

      if (!result.isConfirmed) {
        console.log("User clicked No, update cancelled.");
        return;
      }

      setIsLoading(true);
      if (id) data.id = id;

      const methodType = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:8080/product/${id}`
        : "http://localhost:8080/product";

      const response = await apiCall(url, methodType, data);

      setIsLoading(false);

      let message = id ? "Product Updated" : "Product Added";
      console.log("Response status:", response.status);

      if (response.status === 200 || response.status === 201) {
        const successMessage = await SweetAlert(
          "Success",
          "success",
          message,
          false,
          "OK"
        );

        if (successMessage.isConfirmed) {
          router.push("/products");
        }
      } else {
        SweetAlert("Error", "error", "Something went wrong", false, "OK");
      }
    } catch (error) {
      console.error("Network error", error);
      SweetAlert("Error", "error", "Something went wrong", false, "OK");
    }
  };

  return (
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
      <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
        <Link href="/products">
          <CustomIcon name="ArrowBack" color="primary" />
        </Link>
        <h2 style={{ paddingLeft: "1rem" }}>
          {id ? "Edit Product" : "Add Product"}
        </h2>
      </div>

      <form onSubmit={handleSubmit(submitProductData)}>
        <Grid2 container spacing={4}>
          <Grid2 size={6}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
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
            text={id ? "Update" : "Add"}
            color="success"
            buttonType="submit"
          />
        </div>
      </form>
    </div>
  );
}
