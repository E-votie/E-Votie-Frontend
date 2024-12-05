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

export default function ElectionDutyApplications() {
  // Dummy data for the table
  const data = [
    {
      id: 101,
      applicantId: "ED-001",
      name: "Sanduni Perera",
      applicationLink: "https://example.com/application-101",
    },
    {
      id: 102,
      applicantId: "ED-002",
      name: "Nuwan Abeysekara",
      applicationLink: "https://example.com/application-102",
    },
    {
      id: 103,
      applicantId: "ED-003",
      name: "Thilini Jayawardena",
      applicationLink: "https://example.com/application-103",
    },
    {
      id: 104,
      applicantId: "ED-004",
      name: "Pradeep Senanayake",
      applicationLink: "https://example.com/application-104",
    },
    {
      id: 105,
      applicantId: "ED-005",
      name: "Samanthi Ekanayake",
      applicationLink: "https://example.com/application-105",
    },
    {
      id: 106,
      applicantId: "ED-006",
      name: "Kasun Bandara",
      applicationLink: "https://example.com/application-106",
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
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
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
            style={{ color: "#3B82F6" }}
          >
            Election Duty Applications
          </Typography>

          {/* Search Section */}
          <Box className="mb-6 flex justify-end items-center">
            <TextField
              variant="outlined"
              placeholder="Search by Name"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                style: { borderRadius: "20px", borderColor: "#3B82F6" },
              }}
              sx={{
                "& fieldset": { borderColor: "#3B82F6" },
                "&:hover fieldset": { borderColor: "#3B82F6" },
              }}
            />
            <Button
              variant="contained"
              size="medium"
              style={{
                marginLeft: "10px",
                backgroundColor: "#3B82F6",
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
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Applicant ID</strong></TableCell>
                  <TableCell><strong>Applicant Name</strong></TableCell>
                  <TableCell><strong>Application</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.length > 0 ? (
                  currentRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.applicantId}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <a href={row.applicationLink} target="_blank" rel="noreferrer">
                          View Application
                        </a>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "green",
                            color: "#fff",
                            marginRight: "10px",
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: "red",
                            color: "#fff",
                          }}
                        >
                          Decline
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
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
