"use client";
import CustomButton from "@/Components/CustomButton";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CustomLoader from "@/Components/CustomLoader";
import {
  apiCall,
  baseUrl,
  getMethod,
  getMethodAxio,
  SweetAlert,
} from "@/helper/helper";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import CustomIcon from "@/Components/CustomIcon";

const Product: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products, setProducts] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleDelete = async (rowData: any) => {
    const result = await SweetAlert(
      "Are you sure?",
      "error",
      "You won't be able to revert this!",
      true,
      "Yes",
      "No"
    );

    if (!result.isConfirmed) return;
    const url = `http://localhost:8080/product/${rowData._id}`;
    const response = await apiCall(url, "delete");

    if (response && response.status === 201) {
      SweetAlert("Product Deleted", "success", "", false, "OK");
      getProducts();
    } else {
      SweetAlert("Failed to Delete", "error", "", false, "OK");
    }
  };

  const router = useRouter();

  const handlePath = () => {
    router.replace("/products/create");
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", minWidth: 400 },
    { field: "description", headerName: "Description", minWidth: 400 },
    { field: "file", headerName: "File", minWidth: 300 },
    {
      field: "action",
      headerName: "Action",
      minWidth: 250,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <CustomIcon
              name="Delete"
              color="error"
              hover
              onClick={() => handleDelete(params.row)}
            />

            <CustomIcon
              name="ModeEdit"
              color="primary"
              hover
              onClick={() =>
                router.push(`/products/create?id=${params.row._id}`)
              }
            />
          </div>
        );
      },
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getProducts = async (a?: any) => {
    try {
      setIsLoading(true);
      // let url = "http://localhost:8080/product";
      // if (a) url += `?key=${a}`;
      // const data = await apiCall(url, "get");

      //  const data = await getMethod(`${baseUrl}/product` )

      const { status, data, error, message } = await getMethodAxio(
        `${baseUrl}/product`
      );

      setIsLoading(false);
      if (data) return setProducts(data?.data);
      SweetAlert(`${error}`, `error`, "Something went wrong");
    } catch (error) {
      SweetAlert("Error", "error", `Something went wrong`);
    }
  };

  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };

  const handleFilter = () => {
    getProducts(filter);
  };

  useEffect(() => {
    getProducts("");
  }, []);

  console.log(products, "This products");
  return (
    <div style={{ width: "100%" }}>
      <CustomLoader isLoading={isLoading} />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Products</h2>
        <CustomButton
          variant="outlined"
          text="Add Product "
          color="success"
          handleClick={() => router.push("/products/create")}
        ></CustomButton>
      </Box>

      <Box sx={{ marginTop: 1 }}>
        <DataGrid
          rows={products}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
    </div>
  );
};

export default Product;
