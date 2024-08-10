import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Card, CardContent, Box, IconButton, Tooltip, Chip, LinearProgress } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { AddNewManifesto } from './AddNewManifesto';

export const PartyMemberManifestos = ({ manifestos }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAddNewManifestoModal, setOpenAddNewManifestoModal] = useState(false);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleRowClick = (id) => window.location.href = `member/manifesto`;
    const handleOpenAddNewManifestoModal = () => setOpenAddNewManifestoModal(true);
    const handleCloseAddNewManifestoModal = () => setOpenAddNewManifestoModal(false);

    return (
        <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" component="h2">Manifestos</Typography>
                    <Tooltip title="Create New Manifesto" arrow>
                        <IconButton onClick={handleOpenAddNewManifestoModal} color="primary" size="large">
                            <AddCircleIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Box>

                <TableContainer component={Paper} elevation={0} variant="outlined">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><Typography variant="subtitle2">ID</Typography></TableCell>
                                <TableCell align="left"><Typography variant="subtitle2">Manifesto Name</Typography></TableCell>
                                <TableCell align="center"><Typography variant="subtitle2">Created Date</Typography></TableCell>
                                <TableCell align="center"><Typography variant="subtitle2">Overall Progress</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {manifestos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((manifesto, index) => (
                                <TableRow key={index} onClick={() => handleRowClick(manifesto.id)} sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}>
                                    <TableCell align="center">
                                        <Chip label={manifesto.id} size="small" />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Typography variant="body2">{manifesto.manifestoName}</Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            <Typography variant="body2">{manifesto.createdDate}</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Box sx={{ width: '100%', mr: 1 }}>
                                                <LinearProgress variant="determinate" value={manifesto.progress || 0} />
                                            </Box>
                                            <Box sx={{ minWidth: 35 }}>
                                                <Typography variant="body2" color="text.secondary">{`${manifesto.progress || 0}%`}</Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={manifestos.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

                <AddNewManifesto open={openAddNewManifestoModal} handleClose={handleCloseAddNewManifestoModal} />
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
// import { AddNewManifesto } from './AddNewManifesto';

// const options = ["Edit", "Delete"];

// export const PartyMemberManifestos = ({ manifestos }) => {
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [openAddNewManifestoModal, setOpenAddNewManifestoModal] = useState(false);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const handleRowClick = (id) => {
//         // window.location.href = `party/member/manifesto/${id}`; // Assuming you have a route set up for this
//         window.location.href = `member/manifesto`; // Assuming you have a route set up for this
//     };

//     const handleMenuClick = (event) => {
//         event.stopPropagation();
//     };

//     const handleOpenAddNewManifestoModal = () => {
//         setOpenAddNewManifestoModal(true);
//     }

//     const handleCloseAddNewManifestoModal = () => {
//         setOpenAddNewManifestoModal(false);
//     }

//     return (
//         <div className="pb-2 mb-8">
//             <div className='flex justify-between items-center'>
//                 <Typography variant="h6" color="textSecondary" gutterBottom>
//                     Manifestos
//                 </Typography>
//                 <Tooltip title="Create New Manifesto" arrow>
//                     <IconButton aria-label="create" size='large' color='primary' onClick={handleOpenAddNewManifestoModal}>
//                         <AddCircleIcon fontSize="200px"/>
//                     </IconButton>
//                 </Tooltip>
//             </div>
//             <Divider />

//             {/* add new manifesto modal */}
//             {
//                 openAddNewManifestoModal && <AddNewManifesto open={openAddNewManifestoModal} handleClose={handleCloseAddNewManifestoModal}/>
//             }

//             <div className="p-4">
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow >
//                                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }} ><Typography variant="body1" sx={{ fontWeight: 'bold'}}>ID</Typography></TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }} ><Typography variant="body1" sx={{ fontWeight: 'bold'}}>Manifesto Name</Typography></TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }} ><Typography variant="body1" sx={{ fontWeight: 'bold'}}>Created Date</Typography></TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }} ><Typography variant="body1" sx={{ fontWeight: 'bold'}}>Overall Progress</Typography></TableCell>
//                                 {/* <TableCell className='text-center'></TableCell> */}
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {manifestos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((manifesto, index) => (
//                                 <TableRow key={index} onClick={() => handleRowClick(manifesto.id)} style={{ cursor: 'pointer' }} hover>
//                                     <TableCell><Typography variant="body1" className='text-center'>{manifesto.id}</Typography></TableCell>
//                                     <TableCell><Typography variant="body1" className='text-center'>{manifesto.manifestoName}</Typography></TableCell>
//                                     <TableCell><Typography variant="body1" className='text-center'>{manifesto.createdDate}</Typography></TableCell>
//                                     <TableCell><Typography variant="body1" className='text-center'>{manifesto.progress ? `${manifesto.progress}%` : '0%'}</Typography></TableCell>
//                                     {/* <TableCell onClick={handleMenuClick}><div className="float-right"><MoreOverMenu options={options} /></div></TableCell> */}
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <TablePagination
//                     component="div"
//                     count={manifestos.length}
//                     page={page}
//                     onPageChange={handleChangePage}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//             </div>
//         </div>
//     );
// };
