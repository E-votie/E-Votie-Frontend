import React from 'react';
import { Container, Box, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SuccessView = ({ message, onContinue }) => {
    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Card>
                    <CardContent>
                        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                            <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }} />
                            <Typography variant="h4" align="center" gutterBottom>
                                Success!
                            </Typography>
                            <Typography variant="body1" align="center">
                                {message}
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={onContinue}
                        >
                            Continue
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Container>
    );
};

export default SuccessView;


// import React from 'react';
// import SuccessView from './SuccessView';

// const App = () => {
//     const handleContinue = () => {
//         // Define what happens when the user clicks the Continue button
//         console.log("Continue button clicked!");
//         // For example, navigate to another page or reset the form
//     };

//     return (
//         <div>
//             <SuccessView
//                 message="Your action was successful!"
//                 onContinue={handleContinue}
//             />
//         </div>
//     );
// };

// export default App;
