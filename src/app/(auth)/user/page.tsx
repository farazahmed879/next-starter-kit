// // src/components/LoginPage.tsx

// "use client";
// import { jwtDecode } from "jwt-decode";
// import CustomButton from "@/Components/CustomButton";
// import { FORMMODES } from "@/helper/constant";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import CustomIcon from "@/Components/CustomIcon";
// import CustomLoader from "@/Components/CustomLoader";
// import { Box } from "@mui/material";
// import { apiCall, SweetAlert } from "@/helper/helper";

// const Project: React.FC = () => {
//   const [mode, setMode] = useState<number>(1);
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const [data, setData] = React.useState([]);
//   const [filter, setFilter] = React.useState("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const router = useRouter();

//   const columns: GridColDef[] = [
//     { field: "name", headerName: "Name", minWidth: 300 },
//     { field: "email", headerName: "Email", minWidth: 300 },
//     { field: "role", headerName: "Role", minWidth: 300 },
//     {
//       field: "action",
//       headerName: "Actions  ",
//       minWidth: 250,
//       renderCell: (params: any) => {
//         return (
//           <div
//             style={{ display: "flex", alignItems: "center", height: "100%" }}
//           >
//             <CustomIcon
//               style={{ cursor: "pointer" }}
//               name="Delete"
//               color="error"
//               hover
//               onClick={() => handleDelete(params.row)}
//             />
//           </div>
//         );
//       },
//     },
//   ];

//   const handleDelete = async (rowData: any) => {
//     console.log(rowData._id);

//     const result = await SweetAlert(
//       "Are you sure?",
//       "error",
//       "You won't be able to revert this!",
//       true,
//       "Yes",
//       "No"
//     );

//     if (!result.isConfirmed) return;
//     let url = `http://localhost:8080/users/${rowData._id}`;
//     const response = await apiCall(url, "DELETE");

//     if (response && response.status === 201) {
//       SweetAlert("User Deleted", "success", "", false, "OK");
//       getUsers();
//     } else {
//       console.error;
//       SweetAlert("Failed to delete User", "error", "", false, "OK");
//     }
//   };
//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleEdit = (rowData: any) => {
//     console.log(rowData._id);
//   };
//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const handleClick = () => {
//     setMode(FORMMODES.ADD);
//   };

//   // const getUsers = async (a: any) => {
//   //   let url = "http://localhost:8080/users";
//   //   if (a) url += `?key=${a}`;
//   //   const token = session?.user
//   //   const data = await axios.get(url, {headers:{
//   //     "Authorization":`Bearer ${token}`
//   //   }});
//   //   if (data) setData(data?.data.data);
//   // };

//   const { data: session, status: sessionStatus } = useSession();
//   const getUsers = async (a?: any) => {
//     const token = session?.user?.token; // Access the token from the session

//     if (!token) {
//       alert("User is not authenticated or token is missing");
//       return;
//     }

//     try {
//       // Decode the token to extract the role
//       const decodedToken = jwtDecode<{ role: string }>(token);
//       console.log("Decoded Token:", decodedToken);
//       console.log("Decoded token role", decodedToken.role);

//       let url = "http://localhost:8080/users";
//       if (a) url += `?key=${a}`;

//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Fetched Users:", result);
//         setData(result.data);
//       } else {
//         const errorData = await response.json();
//         console.error("Error Response:", errorData);
//         alert(`Error: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error("Error Fetching Users:", error);
//       alert("An error occurred while fetching users");
//     }
//   };
//   const handleChange = (e: any) => {
//     setFilter(e.target.value);
//   };

//   const handleFilter = () => {
//     getUsers(filter);
//   };

//   useEffect(() => {
//     getUsers("");
//   }, [mode]);

//   return (
//     <div style={{ width: "100%" }}>
//       <CustomLoader isLoading={isLoading} />
//       <Box
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         <h2>Users</h2>
//         <CustomButton
//           variant="outlined"
//           text="Add User "
//           color="success"
//           handleClick={() => router.push("/user/create")}
//         ></CustomButton>
//       </Box>

//       <Box sx={{ marginTop: 1 }}>
//         <DataGrid rows={data} columns={columns} getRowId={(row) => row._id} />
//       </Box>
//     </div>
//   );
// };

// export default Project;

// src/components/LoginPage.tsx

"use client";
import { jwtDecode } from "jwt-decode";
import CustomButton from "@/Components/CustomButton";
import { FORMMODES } from "@/helper/constant";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import CustomIcon from "@/Components/CustomIcon";
import CustomLoader from "@/Components/CustomLoader";
import { Box } from "@mui/material";
import { apiCall, SweetAlert } from "@/helper/helper";

const Project: React.FC = () => {
  const [mode, setMode] = useState<number>(1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();



  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", minWidth: 300 },
    { field: "email", headerName: "Email", minWidth: 300 },
    { field: "role", headerName: "Role", minWidth: 300 },
    {
      field: "action",
      headerName: "Actions  ",
      minWidth: 250,
      renderCell: (params: any) => {
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
              name="Edit"
              color="info"
              hover
              onClick={() => {
                router.push(`/user/create?id=${params.row._id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDelete = async (rowData: any) => {
    console.log(rowData._id);

    const result = await SweetAlert(
      "Are you sure?",
      "error",
      "You won't be able to revert this!",
      true,
      "Yes",
      "No"
    );

    if (!result.isConfirmed) return;
    let url = `http://localhost:8080/users/${rowData._id}`;
    const response = await apiCall(url, "DELETE");

    if (response && response.status === 201) {
      SweetAlert("User Deleted", "success", "", false, "OK");
      getUsers();
    } else {
      console.error;
      SweetAlert("Failed to delete User", "error", "", false, "OK");
    }
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleEdit = (rowData: any) => {
    console.log(rowData._id);
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
  const getUsers = async (a?: any) => {
    const token = session?.user?.token; // Access the token from the session

    if (!token) {
      alert("User is not authenticated or token is missing");
      return;
    }

    try {
      // Decode the token to extract the role
      const decodedToken = jwtDecode<{ role: string }>(token);
      console.log("Decoded Token:", decodedToken);
      console.log("Decoded token role", decodedToken.role);

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
      <CustomLoader isLoading={isLoading} />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Users</h2>
        <CustomButton
          variant="outlined"
          text="Add User "
          color="success"
          handleClick={() => router.push("/user/create")}
        ></CustomButton>
      </Box>

      <Box sx={{ marginTop: 1 }}>
        <DataGrid rows={data} columns={columns} getRowId={(row) => row._id} />
      </Box>
    </div>
  );
};

export default Project;
