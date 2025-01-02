"use client";
import CustomButton from "@/Components/CustomButton";
import CustomGrid from "@/Components/CustomGrid";
import { Column } from "@/helper/interface";
import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CustomLoader from "@/Components/CustomLoader";
import { apiCall, SweetAlert } from "@/helper/helper";

import { useRouter } from "next/navigation";

const Product: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleEdit = () => {};

  const router = useRouter();

  const handlePath = () => {
    router.replace("/products/create");
  };

  const columns: readonly Column[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "description", label: "Description", minWidth: 170 },
    { id: "file", label: "File", minWidth: 170 },
    // {
    //   id: "action",
    //   label: "Action",
    //   minWidth: 150,
    //   renderCell: (params: any) => {
    //     return (
    //       <CustomButton
    //         variant="contained"
    //         color="primary"
    //         size="small"
    //         handleClick={handleEdit}
    //         text="Click here"
    //       />
    //     );
    //   },
    // },
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

  const getProducts = async (a: any) => {
    try {
      setIsLoading(true);
      let url = "product";
      if (a) url += `?key=${a}`;
      const data = await apiCall(url, "get");
      setIsLoading(false);
      if (data) return setData(data?.data.data);
      SweetAlert("Error", "error", "Something went wrong");
    } catch (error) {
      SweetAlert("Error", "error", "Something went wrong");
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



  return (
    <div style={{ width: "100%" }}>
      <CustomLoader isLoading={isLoading} />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography component={'span'}>Products</Typography>
        <CustomButton
          variant="outlined"
          text="Add Product "
          color="success"
          handleClick={() => router.push("/products/create")}
        ></CustomButton>
      </Box>

      <Box sx={{ marginTop: 1 }}>
        <CustomGrid
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          columns={columns}
          data={data}
        />
      </Box>
    </div>
    // </DashboardLayoutBasic>
  );
};

export default Product;
