import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { PollingStationsContext } from './../Pages/Election/PollingStationsContext.jsx';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const CustomizedAccordions = () => {
    const {
        pollingStations,
        addPollingStation,
        deletePollingStation,
        handlePollingStationNameChange,
        selectedPollingDistrict,
        setSelectedPollingStation
    } = useContext(PollingStationsContext);

    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handlePollingStationClick = (station) => {
        setSelectedPollingStation(station);
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary>
                    <Typography>{selectedPollingDistrict || 'No Polling District Selected'}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {selectedPollingDistrict && pollingStations[selectedPollingDistrict] &&
                        pollingStations[selectedPollingDistrict].map((station, index) => (
                            <div key={index} className="flex items-center gap-3 mb-3" onClick={() => handlePollingStationClick(station)}>
                                <input
                                    className="input input-bordered input-primary flex-grow"
                                    placeholder="Polling Station Name"
                                    value={station.name}
                                    onChange={(e) => handlePollingStationNameChange(selectedPollingDistrict, index, e.target.value)}
                                />
                                <span className="text-sm text-gray-600 font-semibold">
                                {station.coordinates}
                            </span>
                                <button
                                    type="button"
                                    className="btn btn-outline btn-danger"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePollingStation(selectedPollingDistrict, index);
                                    }}
                                >
                                    -
                                </button>
                            </div>
                        ))}
                    {selectedPollingDistrict && (
                        <button
                            type="button"
                            className="btn btn-outline btn-primary mt-3"
                            onClick={() => addPollingStation(selectedPollingDistrict)}
                        >
                            Add Polling Station
                        </button>
                    )}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default CustomizedAccordions;