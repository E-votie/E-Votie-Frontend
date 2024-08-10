import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { Typography, Button, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function Additional_Materials() {
    const [materials, setMaterials] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        files: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMaterial = {
            name: formData.name,
            description: formData.description,
            date: new Date().toLocaleDateString(),
        };
        setMaterials([...materials, newMaterial]);
        setFormData({ name: '', description: '', files: null });
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Additional Election Materials
                    </Typography>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Box className="space-y-4">
                            <Box className="flex flex-col">
                                <Typography variant="body1" gutterBottom>Name</Typography>
                                <input
                                    type="text"
                                    placeholder="Enter Name"
                                    className="input input-bordered input-primary w-full"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box className="flex flex-col">
                                <Typography variant="body1" gutterBottom>Description</Typography>
                                <textarea
                                    className="textarea textarea-bordered h-32 textarea-primary w-full"
                                    placeholder="Enter Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </Box>
                            <Box className="flex flex-col">
                                <Typography variant="body1" gutterBottom>Upload Files</Typography>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    name="files"
                                    onChange={handleChange}
                                />
                            </Box>
                        </Box>
                        <Box className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="btn btn-outline btn-primary"
                            >
                                Add
                            </button>
                        </Box>
                    </form>
                </CardContent>
            </Card>

            <Card sx={{ marginTop: 4 }}>
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" component="div" gutterBottom>
                            Election Materials
                        </Typography>
                        <button
                            className="btn btn-outline btn-primary"
                        >
                            Submit
                        </button>
                    </Box>
                    <TableContainer component={Paper} sx={{marginTop: 2}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid #ddd' }}>Name</TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd' }}>Description</TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd' }}>Date Added</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {materials.map((material, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ border: '1px solid #ddd' }}>{material.name}</TableCell>
                                        <TableCell sx={{ border: '1px solid #ddd' }}>{material.description}</TableCell>
                                        <TableCell sx={{ border: '1px solid #ddd' }}>{material.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}
