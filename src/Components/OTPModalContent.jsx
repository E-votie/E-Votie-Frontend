import React from "react";
import { Box, TextField } from "@mui/material";

const OTPModalContent = ({ otp, setOtp }) => {
    return (
        <div className="card-body flex w-fit justify-center items-center">
            <div className="flex-initial space-y-16 text-center">
                <p className="font-sans text-2xl">Enter the OTP</p>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4, // Increased gap
                        alignItems: "center",
                    }}
                >
                    <TextField
                        label="OTP"
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        inputProps={{
                            maxLength: 6, // Adjust length if needed
                        }}
                        sx={{ width: 200 }}
                        autoFocus
                    />
                </Box>
                <h6 className="text-red-600">
                    You have reserved an OTP to your mobile. Please enter it.
                </h6>
            </div>
        </div>
    );
};

export default OTPModalContent;
