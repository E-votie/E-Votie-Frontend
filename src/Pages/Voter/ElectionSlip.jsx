import React, {useEffect, useRef, useState} from "react";
import {Button, Card, CardContent, Typography} from "@mui/material";
import {QRCode} from "react-qrcode-logo";

const ElectionSlip = () => {
    const printRef = useRef(null);
    const [qrCodeImage, setQrCodeImage] = useState(null);

    useEffect(() => {
        // Get the QR Code canvas and convert it to an image
        const qrCodeCanvas = document.querySelector("canvas");
        if (qrCodeCanvas) {
            const qrCodeDataUrl = qrCodeCanvas.toDataURL("image/png");
            setQrCodeImage(qrCodeDataUrl);
        }
    }, []);

    const handlePrint = () => {
        const originalContents = document.body.innerHTML;
        const printContents = printRef.current.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (<div className="flex justify-center items-center max-h-[calc(100vh-100px)] bg-white flex-wrap flex-row">
            {/* Printable area */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-md w-2/4">
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
        <div className="flex p-6 pr-0 pt-14">
            <div ref={printRef} className="w-full max-w-lg print-area">
                <Card className="shadow-lg">
                    <CardContent className="p-6">
                        {/* Election Type and Year */}
                        <div className="flex justify-between mb-4">
                            <Typography variant="h6" className="font-bold">
                                Presidential Election
                            </Typography>
                            <Typography variant="h6" className="font-bold">
                                2024
                            </Typography>
                        </div>

                        {/* Voter Information */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <Typography variant="body1" className="font-medium">
                                    Voter Name:
                                </Typography>
                                <Typography variant="body2">John Doe</Typography>
                            </div>

                            <div>
                                <Typography variant="body1" className="font-medium">
                                    Gender:
                                </Typography>
                                <Typography variant="body2">Male</Typography>
                            </div>

                            <div>
                                <Typography variant="body1" className="font-medium">
                                    Election District:
                                </Typography>
                                <Typography variant="body2">Colombo</Typography>
                            </div>

                            <div>
                                <Typography variant="body1" className="font-medium">
                                    Polling District:
                                </Typography>
                                <Typography variant="body2">Colombo Central</Typography>
                            </div>

                            <div>
                                <Typography variant="body1" className="font-medium">
                                    Time:
                                </Typography>
                                <Typography variant="body2">10:30 AM</Typography>
                            </div>

                            <div>
                                <Typography variant="body1" className="font-medium">
                                    Date:
                                </Typography>
                                <Typography variant="body2">2024-10-14</Typography>
                            </div>

                            <div>
                                <Typography variant="body1" className="font-medium">
                                    Address:
                                </Typography>
                                <Typography variant="body2">
                                    123 Main St, Colombo, Sri Lanka
                                </Typography>
                            </div>

                            <div>
                                <Typography variant="body1" className="font-medium">
                                    Polling Center:
                                </Typography>
                                <Typography variant="body2">Colombo City Hall</Typography>
                            </div>

                            <div>
                                <Typography variant="body1" className="font-medium">
                                    Unique Number:
                                </Typography>
                                <Typography variant="body2">1234567890</Typography>
                            </div>
                        </div>

                        {/* QR Code */}
                        <div className="flex justify-center mt-6">
                            {qrCodeImage ? (<img src={qrCodeImage} alt="QR Code"/>) : (<QRCode
                                value="1234546"
                                logoImage="/e-votie-favicon-color.png"
                                fgColor="#EC4899"
                                logoWidth="10px"
                                removeQrCodeBehindLogo="true"
                            />)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Print Button */}
            <div className="flex flex-col justify-between ml-5">
                <div className="flex-grow"></div>
                <div className="flex justify-end mt-6">
                    <Button
                        variant="contained"
                        color="primary"
                        className="bg-blue-500 hover:bg-blue-600 no-print h-[40px] w-[120px] p-0"
                        onClick={handlePrint}
                    >
                        Print Slip
                    </Button>
                </div>
            </div>


        </div>
        {/* Styles for print */}
        <style jsx>{`
            @media print {
                body * {
                    visibility: hidden;
                }

                .print-area,
                .print-area * {
                    visibility: visible;
                }

                .print-area {
                    position: absolute;
                    left: 0;
                    top: 0;
                        width: 100%;
                    }

                    .no-print {
                        display: none;
                    }
                }
            `}</style>
        </div>);
};

export default ElectionSlip;
