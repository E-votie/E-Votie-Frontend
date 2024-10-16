import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const VerticalLinearStepper = ({steps, ActiveStep}) => {
    const [activeStep, setActiveStep] = React.useState(ActiveStep);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{
                '.MuiStepIcon-root': {
                    color: 'secondary.main', // Change the color of the step icons
                    '&.Mui-completed': {
                        color: 'success.main', // Change the color when the step is completed
                    },
                    '&.Mui-active': {
                        color: 'primary.main', // Change the color when the step is active
                    },
                },
            }}>
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === (steps.length - 1) ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1, bgcolor: '#EC4899', color: '#ffff' }}
                                    >
                                        {index === steps.length - 1 ? 'Finish' : 'What is next?'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    {/*<Typography>All steps completed - you&apos;re finished</Typography>*/}
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Re-visit
                    </Button>
                </Paper>
            )}
        </Box>
    );
}
export default VerticalLinearStepper;