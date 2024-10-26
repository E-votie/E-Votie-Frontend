import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, CircularProgress, Snackbar, Stack} from '@mui/material';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Alert } from '@mui/material';
import KeycloakService from './../../services/KeycloakService.jsx';
import {navigate} from "react-big-calendar/lib/utils/constants.js";
import {useNavigate} from "react-router-dom";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 10,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    label: {
        width: 150,
        fontWeight: 'bold',
    },
    value: {
        flex: 1,
    },
});

// PDF Document component
const ElectionPDF = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Election Commission</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Serial No:</Text>
                    <Text style={styles.value}>{data.serialNo}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Polling District No:</Text>
                    <Text style={styles.value}>{data.pollingDistrictNo}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Polling Division:</Text>
                    <Text style={styles.value}>{data.pollingDivision}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Election District:</Text>
                    <Text style={styles.value}>{data.electionDistrict}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Year:</Text>
                    <Text style={styles.value}>{data.year}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Gender:</Text>
                    <Text style={styles.value}>{data.gender}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>NIC No:</Text>
                    <Text style={styles.value}>{data.nicNo}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.value}>{data.address}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Name of the Elector:</Text>
                    <Text style={styles.value}>{data.electorName}</Text>
                </View>
            </View>
        </Page>
    </Document>
);

const StatementOfElectoralRegistrationForm = () => {
    const [nic, setNic] = useState('');
    const [year, setYear] = useState('2024');
    const [district, setDistrict] = useState('Colombo');
    const [captcha, setCaptcha] = useState(false);

    const [pdfData, setPdfData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            // Replace this with your actual API call
            const response = await fetch('https://api.example.com/election-data');
            const data = await response.json();
            setPdfData(data);
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // UseEffect to autofill NIC using Keycloak
    useEffect(() => {
        setNic(KeycloakService.getUserName());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ nic, year, district, captcha });
    };

    return (
        <div className="flex items-center justify-center bg-white gap-5 p-10">
            {!pdfData && (
                <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-4">
                        Where You Can Use This Document
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>This document proves your eligibility to vote in national, local, and regional elections.
                        </li>
                        <li>It may be requested at a polling station on election day to confirm your identity and that
                            you
                            are on the voter list.
                        </li>
                        <li>You may also use this document to prove residency in a particular district, which is
                            required
                            when applying for certain government services.
                        </li>
                        <li>It can be used as evidence of citizenship and residence for government benefits, social
                            welfare
                            programs, and legal matters.
                        </li>
                    </ul>

                    <h2 className="text-xl font-semibold text-blue-700 mt-6 mb-4">
                        Where This Document Is Valid
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>This document is valid within the borders of the country for national and local elections.
                        </li>
                        <li>It’s valid at any government or electoral office for verifying your registration status.
                        </li>
                        <li>The document can be used as proof of your voter status when interacting with government
                            authorities in your district.
                        </li>
                        <li>It may not be valid outside your country for international purposes, but can sometimes be
                            used
                            to prove citizenship when dealing with foreign embassies or consulates.
                        </li>
                    </ul>
                </div>
            )}
            {!pdfData && (
                <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">Statement of Electoral Registration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {/* NIC No Field */}
                            <TextField
                                fullWidth
                                label="NIC No"
                                variant="outlined"
                                value={nic}
                                onChange={(e) => setNic(e.target.value)}
                                className="mb-4"
                            />

                            {/* Year Dropdown */}
                            <FormControl fullWidth className="mb-4">
                                <InputLabel>Year</InputLabel>
                                <Select
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    label="Year"
                                >
                                    <MenuItem value="2024">2024</MenuItem>
                                    <MenuItem value="2023">2023</MenuItem>
                                    <MenuItem value="2022">2022</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        {/* Admin District Dropdown */}
                        <FormControl fullWidth className="mb-4">
                            <InputLabel>Admin. District</InputLabel>
                            <Select
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                                label="Admin. District"
                            >
                                <MenuItem value="Colombo">Colombo</MenuItem>
                                <MenuItem value="Gampaha">Gampaha</MenuItem>
                                <MenuItem value="Kandy">Kandy</MenuItem>
                            </Select>
                        </FormControl>

                        {/* CAPTCHA */}
                        <FormControlLabel
                            control={<Checkbox checked={captcha} onChange={(e) => setCaptcha(e.target.checked)}/>}
                            label="I'm not a robot"
                            className="mb-4"
                        />

                        <div className="flex justify-between">
                            <Button type="submit" variant="contained" onClick={() => {navigate(`/voter/election_slip/${nic}`);}}
                                    className="bg-pink-500 text-white hover:bg-pink-600">
                                Print
                            </Button>
                            <Button type="reset" variant="outlined" onClick={() => {
                                setNic('');
                                setYear('2024');
                                setDistrict('Colombo');
                                setCaptcha(false);
                            }}>
                                Reset
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            <Stack direction="row" spacing={2}>
                {pdfData && (
                    <PDFDownloadLink
                        document={<ElectionPDF data={pdfData}/>}
                        fileName="election_data.pdf"
                    >
                        {({blob, url, loading, error}) =>
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={loading}
                            >
                                {loading ? 'Loading document...' : 'Download PDF'}
                            </Button>
                        }
                    </PDFDownloadLink>
                )}
            </Stack>

            {pdfData && (
                <PDFViewer style={{width: '100%', height: '1000px', marginTop: '20px'}}>
                    <ElectionPDF data={pdfData}/>
                </PDFViewer>
            )}

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert onClose={() => setError(null)} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </div>

    );
};

export default StatementOfElectoralRegistrationForm;
