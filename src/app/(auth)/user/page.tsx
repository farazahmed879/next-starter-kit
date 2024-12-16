// src/components/LoginPage.tsx

"use client";
import { jwtDecode } from "jwt-decode";
import CustomButton from "@/Components/CustomButton";
import CustomGrid from "@/Components/CustomGrid";
import { FORMMODES } from "@/helper/constant";
import { Column } from "@/helper/interface";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Project: React.FC = () => {
  const [mode, setMode] = useState<number>(1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const handleEdit = () => {};

  const router = useRouter();

  //   const handlePath = () => {
  //     router.replace("/conatct/create");
  //   };

  const columns: readonly Column[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 },
    { id: "role", label: "Role", minWidth: 170 },
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
  const handleClick = () => {
    setMode(FORMMODES.ADD);
  };

  // const getUsers = async (a: any) => {
  //   let url = "http://localhost:8080/users";
  //   if (a) url += `?key=${a}`;
  //   const token = session?.user
  //   const data = await axios.get(url, {headers:{
  //     "Authorization":`Bearer ${token}`
  //   }});
  //   if (data) setData(data?.data.data);
  // };

  const { data: session, status: sessionStatus } = useSession();
  const getUsers = async (a: any) => {
    
    const token = session?.user?.token; // Access the token from the session

    if (!token) {
      alert("User is not authenticated or token is missing");
      return;
    }

    try {
      // Decode the token to extract the role
      const decodedToken = jwtDecode<{ role: string }>(token);
      console.log("Decoded Token:", decodedToken);
      console.log("Decoded token role", decodedToken.role)

  
      let url = "http://localhost:8080/users";
      if (a) url += `?key=${a}`;


    
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Fetched Users:", result);
        setData(result.data); 
      } else {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error Fetching Users:", error);
      alert("An error occurred while fetching users");
    }
  };
  const handleChange = (e: any) => {
    setFilter(e.target.value);
  };

  const handleFilter = () => {
    getUsers(filter);
  };

  useEffect(() => {
    getUsers("");
  }, [mode]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link href="/user/create">
          <CustomButton
            variant="contained"
            text="Add User "
            color="success"
          ></CustomButton>
        </Link>
      </div>

      {mode == FORMMODES.GRID ? (
        <>
          {/* <CustomButton handleClick={handleClick} text="Add" />
    <DashboardLayoutBasic>
      <div style={{ width: "100%" }}>
        {mode == FORMMODES.GRID ? (
          <>
            {/* <CustomButton handleClick={handleClick} text="Add" />

          <CustomButton handleClick={handleFilter} text="Search" /> */}
          <CustomGrid
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            columns={columns}
            data={data}
          />
        </>
      ) : mode == FORMMODES.ADD ? (
        <></>
      ) : // <CreateOrEditStudents handleMode={(e) => setMode(e)} />
      null}
    </div>
    // </DashboardLayoutBasic>
  );
};

export default Project;
