import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { PollingStationsContext } from './../Pages/Election/PollingStationsContext.jsx';
import { useContext } from 'react';

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
    } = useContext(PollingStationsContext);
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                {Object.keys(
                    pollingStations.reduce((acc, station) => {
                        if (!acc[station.electionDistrict]) {
                            acc[station.electionDistrict] = [];
                        }
                        acc[station.electionDistrict].push(station);
                        return acc;
                    }, {})
                ).map((district) => (
                    <Accordion key={district}>
                        <AccordionSummary
                            aria-controls={`panel-${district}-content`}
                            id={`panel-${district}-header`}
                        >
                            <Typography>{district}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {pollingStations
                                .filter((station) => station.electionDistrict === district)
                                .map((station, index) => (
                                    <div key={index} className="flex items-center gap-3 mb-3">
                                        <input
                                            className="input input-bordered input-primary flex-grow"
                                            placeholder="Polling Station Name"
                                            value={station.name}
                                            onChange={(e) => handlePollingStationNameChange(index, e.target.value, district)}
                                        />
                                        <span className="text-sm text-gray-600 font-semibold">
                      {station.coordinates}
                    </span>
                                        <button
                                            type="button"
                                            className="btn btn-outline btn-primary"
                                            onClick={() => addPollingStation(district)}
                                        >
                                            +
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline btn-danger"
                                            onClick={() => deletePollingStation(index, district)}
                                        >
                                            -
                                        </button>
                                    </div>
                                ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Accordion>
        </div>
    );
};

export default CustomizedAccordions;