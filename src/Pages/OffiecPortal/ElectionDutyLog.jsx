import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

export default function ElectionDutyLog() {
  // Updated dummy data
  const data = [
    {
      id: "200035400877",
      employeeName: "Nimal Perera",
      electionYear: 2020,
      electionType: "Presidential",
      from: "2020/06/22",
      to: "2020/07/05",
    },
    {
      id: "927857212V",
      employeeName: "Kasun Udara",
      electionYear: 2021,
      electionType: "Parliamentary",
      from: "2021/07/10",
      to: "2021/07/20",
    },
    {
      id: "200178477578",
      employeeName: "Sunil Bandara",
      electionYear: 2022,
      electionType: "Presidential",
      from: "2022/08/15",
      to: "2022/08/25",
    },
    {
      id: "200298755788",
      employeeName: "Thilini Kavinfi",
      electionYear: 2023,
      electionType: "Parliamentary",
      from: "2023/09/01",
      to: "2023/09/10",
    },
    {
      id: "9578451218V",
      employeeName: "Sanduni Silva",
      electionYear: 2024,
      electionType: "Presidential",
      from: "2024/10/05",
      to: "2024/10/15",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Handle search query changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filter data based on the search query
  const filteredData = data.filter((row) =>
    row.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic for filtered data
  const currentRows = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box className="max-w-full h-full mx-auto mt-12 px-4">
      {/* Card Container */}
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-8">
          {/* Title */}
          <Typography
            variant="h4"
            component="h2"
            className="text-3xl font-semibold text-center mb-8"
            style={{ color: "#EC4899" }}
          >
            Election Duty Log
          </Typography>

          {/* Search Section */}
          <Box className="mb-6 flex justify-end items-center">
            <TextField
              variant="outlined"
              placeholder="Search by Employee Name"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                style: { borderRadius: "20px", borderColor: "#EC4899" },
              }}
              sx={{
                "& fieldset": { borderColor: "#EC4899" },
                "&:hover fieldset": { borderColor: "#EC4899" },
              }}
            />
            <Button
              variant="contained"
              size="medium"
              style={{
                marginLeft: "10px",
                backgroundColor: "#EC4899",
                color: "#fff",
                borderRadius: "20px",
                padding: "5px 20px",
              }}
            >
              Search
            </Button>
          </Box>

          {/* Table Section */}
          <TableContainer component={Paper} className="shadow-lg">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Employee Name</strong></TableCell>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Election Year</strong></TableCell>
                  <TableCell><strong>Election Type</strong></TableCell>
                  <TableCell><strong>From</strong></TableCell>
                  <TableCell><strong>To</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.length > 0 ? (
                  currentRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.employeeName}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.electionYear}</TableCell>
                      <TableCell>{row.electionType}</TableCell>
                      <TableCell>{row.from}</TableCell>
                      <TableCell>{row.to}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            className="flex justify-end mt-4"
            style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
          >
            <Pagination
              count={Math.ceil(filteredData.length / rowsPerPage)} // Total pages
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
