import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TransferList from './../../Components/TransferList.jsx';
import {authGet} from "../../Auth/authFetch.jsx";
import MySwal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export default function AddCandidates() {

    const electionId = window.location.pathname.split("/").pop();
    const navigate = useNavigate();

    const deployContract = async () => {
        MySwal.fire({
            title: 'Please wait deploying election contract',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => MySwal.showLoading(),
        });

        try {
            // Make sure 'authGet' is an async function returning a promise
            const contractData = await authGet(`/election/deploy_contract/${electionId}`);
            console.log(contractData);
            MySwal.close();

            MySwal.fire({
                title: `Contract successfully deployed. Contract address: ${contractData.data.contractAddress}`,
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        } catch (error) {
            MySwal.close();
            MySwal.fire({
                title: 'An error occurred',
                text: error.message || 'Something went wrong.',
                icon: 'error',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
        }
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
                        style={{ color: '#EC4899' }} // Directly applying the color
                    >
                        Add Candidates
                    </Typography>

                    {/* Content Section */}
                    <Box className="flex flex-col min-h-[500px] m-8">
                        <TransferList />

                        {/* Submit Button Section */}
                        <Box className="mt-8 flex justify-end">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                aria-label="submit"
                                className="py-3 px-8 text-lg font-semibold"
                                onClick={() => deployContract()}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

//new line