import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import {Avatar} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ElectionResultSmallCards = ({ result, district, candidateInfo }) => {
    return (
        <Card className="w-full md:w-1/2 lg:w-1/3 max-w-md mx-auto mt-3">
            <CardContent>
                <div className="flex flex-row justify-between bg-[#f7f7f7] hover:bg-[#EC4899] transition-colors duration-300">
                    <h3 className="text-[.75rem] m-1 ml-3 font-semibold">{district}</h3>
                    <ArrowForwardIosIcon sx={{ fontSize: 16, background: '#EC4899', height: '26px', width: '26px', padding: '8px' }} />
                </div>
                {result.map((candidate, index) => {
                    const matchingCandidate = candidateInfo.candidates.find(
                        info => info.party === candidate.party
                    );

                    return (
                        <div key={index} className="flex flex-col mb-2">
                            <div className="flex justify-between items-center mb-1">
                                <Avatar
                                    alt={candidate.candidate}
                                    src={matchingCandidate ? matchingCandidate.image : 'http://election.adaderana.lk/presidential-election-2019/assets/images/icon-party-other.png'}
                                    sx={{ width: 30, height: 30, marginY: 0 }}
                                />
                                <div className='flex flex-row justify-between w-full'>
                                    <div className="flex flex-col justify-center p-1 pl-2">
                                        <span className='text-[.7rem] font-normal'>{candidate.party}</span>
                                        <span className='text-[.7rem] font-medium'>{candidate.candidate}</span>
                                    </div>
                                    <div className="flex flex-col justify-center items-end">
                                        <span className='text-[.7rem] font-normal'>{candidate.percentage} %</span>
                                        <span className='text-[.9rem] font-normal'>{new Intl.NumberFormat('en-US').format(candidate.votes)}</span>
                                    </div>
                                </div>
                            </div>
                            <LinearProgress
                                variant="determinate"
                                value={parseFloat(candidate.percentage)}
                                sx={{
                                    height: '6px',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: 5,
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: matchingCandidate ? matchingCandidate.color : '#000000',
                                        borderRadius: 5,
                                    }
                                }}
                            />
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default ElectionResultSmallCards;