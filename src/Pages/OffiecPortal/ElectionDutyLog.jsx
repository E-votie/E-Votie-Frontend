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
  // Dummy data for the table
  const data = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    employeeName: `Employee ${index + 1}`,
    electionYear: 2020 + (index % 5),
    electionType: index % 2 === 0 ? "Presidential" : "Parliamentary",
    workDuration: `202${index % 4}/06/22 - 202${index % 4}/07/05`,
  }));

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
              placeholder=""
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
                  <TableCell><strong>Election Year</strong></TableCell>
                  <TableCell><strong>Election Type</strong></TableCell>
                  <TableCell><strong>Work Duration</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.length > 0 ? (
                  currentRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.employeeName}</TableCell>
                      <TableCell>{row.electionYear}</TableCell>
                      <TableCell>{row.electionType}</TableCell>
                      <TableCell>{row.workDuration}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
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
