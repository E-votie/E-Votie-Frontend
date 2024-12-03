import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import VerticalLinearStepper from "./VerticalLinearStepper.jsx";
import KeycloakService from "../services/KeycloakService.jsx";
import {Link, useNavigate} from 'react-router-dom';

const ElectionCard = ({image, Title, description, EnrollLink, TimeLine, Special}) => {
    console.log(TimeLine)
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {Title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <VerticalLinearStepper steps={TimeLine}></VerticalLinearStepper>
                    <Typography variant="body2" color="text.secondary">
                        {Special}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ElectionCard;
