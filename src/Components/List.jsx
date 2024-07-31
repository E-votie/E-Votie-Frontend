import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Demo = styled('div')({
    backgroundColor: 'transparent',
});

export default function InteractiveList({ items = [] }) {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(true);

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: 'transparent' }}>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography sx={{ml:2, mt: 0, mb: 2 }} variant="h10" component="div">
                        Past Crimes
                    </Typography>
                    <Demo>
                        {Array.isArray(items) && items.length > 0 ? (
                            <List dense={dense}>
                                {items.map((item, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={item.primary}
                                            secondary={secondary ? item.secondary : null}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography sx={{ml:4, mt: 0, mb: 2 }} variant="h10">There are no items to display.</Typography>
                        )}
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
}