import LinearDeterminate from "../../Components/ProgressBar.jsx";
import {Avatar, Divider, List, ListItem, ListItemText} from "@mui/material";
import Stack from "@mui/material/Stack";
import CountingEffect from "../../Components/CountingEffect.jsx";
import React from "react";
import PercentageCountingEffect from "../../Components/PercentageCountingEffect.jsx";
import {useNavigate, useParams} from "react-router-dom";
import SriLankaMap from '../../Components/SriLankaMap.jsx'
import PieChart from "../../Components/ElectionPieChart.jsx";
import {Box} from "@mui/system";
import ListItemButton from "@mui/material/ListItemButton";
import ElectionResultSmallCards from "../../Components/ElectionResultSmallCards.jsx";
import electionresult from "./result.json";
import candidteInfo from "./candidateInfo.json"
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const allIslandResults = [{
    'Name': 'Gotabaya Rajapaksa',
    'Party': 'SLPP',
    'Image': 'http://election.adaderana.lk/presidential-election-2019/elec_images/gr-2019-pe1.png',
    'count': 6924255,
    'present': 52.25,
    'color': '#b41f24'
}, {
    'Name': 'Sajith Premadasa',
    'Party': 'NDF',
    'Image': 'http://election.adaderana.lk/presidential-election-2019/elec_images/sp-2019-pe1.png',
    'count': 5564239,
    'present': 41.99,
    'color': '#0e723a'
}, {
    'Name': 'Anura Kumara Dissanayaka',
    'Party': 'NMPP',
    'Image': 'http://election.adaderana.lk/presidential-election-2019/elec_images/akd-2019-pe1.png',
    'count': 418553,
    'present': 3.16,
    'color': '#8c0154'
}, {
    'Name': 'Mahesh Senanayake',
    'Party': 'NPP',
    'Image': 'http://election.adaderana.lk/presidential-election-2019/elec_images/msn-2019-pe1.png',
    'count': 49655,
    'present': 0.37,
    'color': '#83c341'
}, {
    'Name': 'Mahesh Senanayake',
    'Party': 'OTHER',
    'Image': 'http://election.adaderana.lk/presidential-election-2019/assets/images/icon-party-other.png',
    'count': 295797,
    'present': 2.23,
    'color': '#a5a5Aa'
}]

const colorMap = {
    'Anuradhapura': '#FF5733', // Anuradhapura
    // Add more districts and colors as needed
};


export const DistrictResultView = () => {

    const {District} = useParams();

    const navigate = useNavigate();

    const handleSelect = (districtID) => {
        navigate(`/election/result/${districtID}`);
    };
    return (<div className="min-h-screen flex flex-col bg-base-100 p-6 gap-4 rounded-xl">
        <div className="flex lg:flex-row gap-4 md:flex-col">
            <div
                className="flex lg:flex-col bg-base-100 shadow-lg p-6 gap-2 border border-gray-200 w-1/2 md:w-full h-fit">
                <h6 className="text-lg font-semibold">District Results - {District}(2019)</h6>
                <Divider sx={{borderBottomWidth: 4}}/>
                <div
                    className="flex flex-col md:flex-row w-1/2 md:w-full p-6 gap-6 h-fit">
                    <div className="w-full">
                        <SriLankaMap sriLankaGeoJSON={District} zoom={10}/>
                    </div>
                    <div className="w-full">
                        <PieChart data={allIslandResults}/>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {allIslandResults.map((result, index) => (<div key={index} className="w-full">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <div className='flex flex-col items-center'>
                                <Avatar
                                    alt={result.Name}
                                    src={result.Image}
                                    sx={{width: 40, height: 40, marginY: 0}}
                                />
                                <span className="text-xs font-bold mt-1 text-center">
                {result.Party}
              </span>
                            </div>
                            <div className="flex-grow">
                                <span className="text-sm">{result.Name}</span>
                                <LinearDeterminate value={result.present} height={'10px'} width={'100%'}
                                                   color={result.color}/>
                                <div className='flex flex-row justify-between'>
                                    <CountingEffect value={result.count} textSize={'.9rem'} duration={1000}/>
                                    <PercentageCountingEffect value={result.present} textSize={'15px'}
                                                              duration={100}/>
                                </div>
                            </div>
                        </Stack>
                    </div>))}
                </div>
                <div className='mt-5'>
                    <TableContainer>
                        <Table sx={{minWidth: 500, borderCollapse: 'separate', borderSpacing: 0}}
                               aria-label="custom pagination table">
                            <TableBody>
                                {['VALID', 'REJECTED', 'POLLED', 'ELECTORS'].map((row, index) => (
                                    <TableRow key={row}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                backgroundColor: '#e6e6e6',
                                                border: '1px solid #ddd',
                                                width: '33.33%',
                                                padding: '16px'
                                            }}
                                        >
                                            {row}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                border: '1px solid #ddd',
                                                width: '33.33%',
                                                padding: '16px'
                                            }}
                                        >
                                            {['1,368,177', '15,333', '1,383,510', '1,670,403'][index]}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                border: '1px solid #ddd',
                                                width: '33.33%',
                                                padding: '16px'
                                            }}
                                        >
                                            {['98.89 %', '1.11 %', '82.82 %', ''][index]}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            <div
                className="flex lg:flex-col bg-base-100 shadow-lg p-6 gap-2 border border-gray-200 w-1/2 md:w-full h-fit">
                <h6 className="text-lg font-semibold">District Results - {District}(2015)</h6>
                <Divider sx={{borderBottomWidth: 4}}/>
                <div
                    className="flex flex-col md:flex-row w-1/2 md:w-full p-6 gap-6 h-fit">
                    <div className="w-full">
                        <SriLankaMap sriLankaGeoJSON={District} zoom={10}/>
                    </div>
                    <div className="w-full">
                        <PieChart data={allIslandResults}/>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {allIslandResults.map((result, index) => (<div key={index} className="w-full">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <div className='flex flex-col items-center'>
                                <Avatar
                                    alt={result.Name}
                                    src={result.Image}
                                    sx={{width: 40, height: 40, marginY: 0}}
                                />
                                <span className="text-xs font-bold mt-1 text-center">
                {result.Party}
              </span>
                            </div>
                            <div className="flex-grow">
                                <span className="text-sm">{result.Name}</span>
                                <LinearDeterminate value={result.present} height={'10px'} width={'100%'}
                                                   color={result.color}/>
                                <div className='flex flex-row justify-between'>
                                    <CountingEffect value={result.count} textSize={'.9rem'} duration={1000}/>
                                    <PercentageCountingEffect value={result.present} textSize={'15px'}
                                                              duration={100}/>
                                </div>
                            </div>
                        </Stack>
                    </div>))}
                </div>
                <div className='mt-5'>
                    <TableContainer>
                        <Table sx={{minWidth: 500, borderCollapse: 'separate', borderSpacing: 0}}
                               aria-label="custom pagination table">
                            <TableBody>
                                {['VALID', 'REJECTED', 'POLLED', 'ELECTORS'].map((row, index) => (
                                    <TableRow key={row}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                backgroundColor: '#e6e6e6',
                                                border: '1px solid #ddd',
                                                width: '33.33%',
                                                padding: '16px'
                                            }}
                                        >
                                            {row}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                border: '1px solid #ddd',
                                                width: '33.33%',
                                                padding: '16px'
                                            }}
                                        >
                                            {['1,368,177', '15,333', '1,383,510', '1,670,403'][index]}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{
                                                border: '1px solid #ddd',
                                                width: '33.33%',
                                                padding: '16px'
                                            }}
                                        >
                                            {['98.89 %', '1.11 %', '82.82 %', ''][index]}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    </div>)
}

