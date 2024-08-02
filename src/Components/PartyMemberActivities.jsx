import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Card, CardContent, Box, IconButton, Tooltip, Chip } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { MoreOverMenu } from './MoreOverMenu';

const options = ["Edit", "Delete"];

export const PartyMemberActivities = ({ activities }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h5" component="h2">Activities in Parliament</Typography>
                    <Tooltip title="Add New Activity" arrow>
                        <IconButton color="primary" size="large" sx={{ '&:hover': { transform: 'scale(1.1)' } }}>
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <TableContainer component={Paper} elevation={0} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="subtitle2">Hansard code</Typography></TableCell>
                                <TableCell><Typography variant="subtitle2">Date</Typography></TableCell>
                                <TableCell><Typography variant="subtitle2">Method</Typography></TableCell>
                                <TableCell><Typography variant="subtitle2">Topic</Typography></TableCell>
                                <TableCell><Typography variant="subtitle2">Page</Typography></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((activity, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>
                                        <Chip label={activity.hansardCode} size="small" />
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{activity.date}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <ChatBubbleOutlineIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{activity.method}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>{activity.topic}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <MenuBookIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">Page {activity.page}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <MoreOverMenu options={options} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={activities.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </CardContent>
        </Card>
    );
};

// import React, { useState } from 'react';
// import Divider from '@mui/material/Divider';
// import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
// import { MoreOverMenu } from './MoreOverMenu';
// import IconButton from '@mui/material/IconButton';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import Tooltip from '@mui/material/Tooltip';

// const options = ["Edit", "Delete"];

// export const PartyMemberActivities = ({ activities }) => {
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     return (
//         <div className="pb-2 mb-8">
//             <div className='flex justify-between items-center'>
//                 <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Activities in Parliament
//                 </Typography>
//                 <Tooltip title="Add New Activity" arrow>
//                     <IconButton aria-label="create" size='large' color='primary'>
//                         <AddCircleIcon fontSize="200px"/>
//                     </IconButton>
//                 </Tooltip>
//             </div>
//             <Divider />

//             <div className="p-4">
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Hansard code</Typography></TableCell>
//                                 <TableCell><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Date</Typography></TableCell>
//                                 <TableCell><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Method of contribution</Typography></TableCell>
//                                 <TableCell><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Topic</Typography></TableCell>
//                                 <TableCell><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Page number</Typography></TableCell>
//                                 <TableCell></TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {activities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((activity, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell><Typography variant="body1">{activity.hansardCode}</Typography></TableCell>
//                                     <TableCell><Typography variant="body1">{activity.date}</Typography></TableCell>
//                                     <TableCell><Typography variant="body1">{activity.method}</Typography></TableCell>
//                                     <TableCell><Typography variant="body1">{activity.topic}</Typography></TableCell>
//                                     <TableCell><Typography variant="body1">Page {activity.page}</Typography></TableCell>
//                                     <TableCell><div className="float-right"><MoreOverMenu options={options} /></div></TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <TablePagination
//                     component="div"
//                     count={activities.length}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </div>
//         </div>
//     );
// };