import LinearDeterminate from "../../Components/ProgressBar.jsx";
import {Avatar, Divider, List, ListItem, ListItemText} from "@mui/material";
import Stack from "@mui/material/Stack";
import CountingEffect from "../../Components/CountingEffect.jsx";
import React, {useEffect, useState} from "react";
import PercentageCountingEffect from "../../Components/PercentageCountingEffect.jsx";
import {useNavigate, useParams} from "react-router-dom";
import SriLankaMap from '../../Components/SriLankaMap.jsx';
import PieChart from "../../Components/ElectionPieChart.jsx";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import electionresult from "./result.json";
import ElectionResultSmallCards from "../../Components/ElectionResultSmallCards.jsx";
import candidteInfo from "./candidateInfo.json";

const colorMap = {
    'Anuradhapura': '#FF5733', // Anuradhapura
    // Add more districts and colors as needed
};


export const DistrictResultView = () => {

    const {District} = useParams();
    const year1 = 2019;
    const year2 = 2015;
    const navigate = useNavigate();

    const handleSelect = (districtID) => {
        navigate(`/election/result/${districtID}`);
    };

    const [isLoading, setIsLoading] = useState(true);
    const [districtColors1, setdistrictColors1] = useState(null);
    const [districtColors2, setdistrictColors2] = useState(null);
    const [result1, setResult1] = useState(null);
    const [result2, setResult2] = useState(null);
    const [pieData1, setpieData1] = useState(null);
    const [pieData2, setpieData2] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            import(`./../../../public/Result/${District}_${year1}.json`),
            import(`./../../../public/Result/${District}_${year2}.json`),
            import(`./../../../public/DistrictResult/${District}_${year1}.json`),
            import(`./../../../public/DistrictResult/${District}_${year2}.json`),
            import(`./../../../public/pie_data_district_results/${District} District_${year1}.json`),
            import(`./../../../public/pie_data_district_results/${District} District_${year2}.json`)
        ]).then(([colors1, colors2, res1, res2,pie1, pie2]) => {
            setdistrictColors1(colors1.default);
            setdistrictColors2(colors2.default);
            setResult1(res1.default);
            setResult2(res2.default);
            setpieData1(pie1.default);
            setpieData2(pie2.default);
            setIsLoading(false);
        }).catch(error => {
            console.error("Error loading data:", error);
            setIsLoading(false);
        });
    }, [District]);

    return (
        <div className="min-h-screen flex flex-col bg-base-100 p-6 gap-4 rounded-xl">
            { isLoading ? (<div>Loading...</div>) : (
        <div className="flex lg:flex-row gap-4 md:flex-col">
            <div
                className="flex lg:flex-col bg-base-100 shadow-lg p-6 gap-2 border border-gray-200 w-1/2 md:w-full h-fit">
                <h6 className="text-lg font-semibold">District Results - {District}(2019)</h6>
                <Divider sx={{borderBottomWidth: 4}}/>
                <div
                    className="flex flex-col md:flex-row w-1/2 md:w-full p-6 gap-6 h-fit">
                    <div className="w-full">
                        <SriLankaMap sriLankaGeoJSON={District} zoom={10} level='ADM3_EN'
                                     districtColors={districtColors1}/>
                    </div>
                    <div className="w-full">
                        <PieChart data={pieData1}/>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {pieData1 && pieData1.map((result, index) => (<div key={index} className="w-full">
                        <Stack direction="row" spacing={2} alignItems="center">
                            <div className='flex flex-col items-center'>
                                <Avatar
                                    alt={result.Name}
                                    src={result.Image}
                                    sx={{width: 40, height: 40, marginY: 0}}
                                />
                                <span className="text-xs font-bold mt-1 text-center">
                {result.party}
              </span>
                            </div>
                            <div className="flex-grow">
                                <span className="text-sm">{result.Name}</span>
                                <LinearDeterminate value={result.percentage} height={'10px'} width={'100%'}
                                                   color={result.color}/>
                                <div className='flex flex-row justify-between'>
                                    <CountingEffect value={result.count} textSize={'.9rem'} duration={1000}/>
                                    <PercentageCountingEffect value={result.percentage} textSize={'15px'}
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
                <div
                    className='flex lg:flex-col bg-base-100 shadow-lg p-6 gap-2 border border-gray-200 md:w-full h-fit'>
                    <h3 className="font-semibold">All Island Results - Cumulative</h3>
                    <Divider sx={{borderBottomWidth: 4}}/>
                    <div className="flex flex-row flex-wrap w-full bg-base-100 pt-0 p-1">
                        {result2.map((district, index) => (
                            <ElectionResultSmallCards result={district.results} district={district.division}
                                                      candidateInfo={candidteInfo}></ElectionResultSmallCards>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className="flex lg:flex-col bg-base-100 shadow-lg p-6 gap-2 border border-gray-200 w-1/2 md:w-full h-fit">
                <h6 className="text-lg font-semibold">District Results - {District}(2015)</h6>
                <Divider sx={{borderBottomWidth: 4}}/>
                <div
                    className="flex flex-col md:flex-row w-1/2 md:w-full p-6 gap-6 h-fit">
                    <div className="w-full">
                        <SriLankaMap sriLankaGeoJSON={District} zoom={10} level='ADM3_EN'
                                     districtColors={districtColors2}/>
                    </div>
                    <div className="w-full">
                        <PieChart data={pieData2}/>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {pieData2 && pieData2.map((result, index) => (
                        <div key={index} className="w-full">
                            <Stack direction="row" spacing={2} alignItems="center">
                                <div className='flex flex-col items-center'>
                                    <Avatar
                                        alt={result.Name}
                                        src={result.Image}
                                        sx={{width: 40, height: 40, marginY: 0}}
                                    />
                                    <span className="text-xs font-bold mt-1 text-center">
            {result.party}
          </span>
                                </div>
                                <div className="flex-grow">
                                    <span className="text-sm">{result.Name}</span>
                                    <LinearDeterminate
                                        value={result.percentage}
                                        height={'10px'}
                                        width={'100%'}
                                        color={result.color}
                                    />
                                    <div className='flex flex-row justify-between'>
                                        <CountingEffect
                                            value={result.count}
                                            textSize={'.9rem'}
                                            duration={1000}
                                        />
                                        <PercentageCountingEffect
                                            value={result.percentage}
                                            textSize={'15px'}
                                            duration={100}
                                        />
                                    </div>
                                </div>
                            </Stack>
                        </div>
                    ))}
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
                <div
                    className='flex lg:flex-col bg-base-100 shadow-lg p-6 gap-2 border border-gray-200 md:w-full h-fit'>
                    <h3 className="font-semibold">All Island Results - Cumulative</h3>
                    <Divider sx={{borderBottomWidth: 4}}/>
                    <div className="flex flex-row flex-wrap w-full bg-base-100 pt-0 p-1">
                        {result2.map((district, index) => (
                            <ElectionResultSmallCards result={district.results} district={district.division}
                                                      candidateInfo={candidteInfo}></ElectionResultSmallCards>
                        ))}
                    </div>
                </div>
            </div>
        </div>)}
        </div>)
}

