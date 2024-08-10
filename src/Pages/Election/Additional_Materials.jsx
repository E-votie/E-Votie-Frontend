import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
        <div>
            <div className="card card-side bg-base-100 shadow-xl gap-10 px-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <p className="font-sans text-3xl font-semibold">Add Election Material</p>
                            <div className="space-y-4">
                                <div className="flex flex-col">
                                    <label className="mb-2 font-sans text-lg">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        className="input input-bordered input-primary w-full"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 font-sans text-lg">Description</label>
                                    <textarea
                                        className="textarea textarea-bordered h-32 textarea-primary w-full"
                                        placeholder="Enter Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <Box className="flex flex-col gap-4 xl:w-1/3 lg:w-full md:w-full sm:w-full">
                                    <label className="form-control w-full">
                                        <Typography variant="body1" className="label-text" gutterBottom>Upload Files</Typography>
                                        <input
                                            type="file"
                                            className="file-input file-input-bordered w-full"
                                            name="files"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </Box>
                            </div>
                        </div>
                        <div className="card-actions justify-end">
                            <button
                                type="submit"
                                className="btn btn-outline btn-primary"
                                disabled={!formData.files}
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <TableContainer component={Paper} sx={{ marginTop: 4 }}>
                <Table aria-label="materials table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
                            <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Description</TableCell>
                            <TableCell sx={{ border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Date Added</TableCell>
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
        </div>
    );
}
