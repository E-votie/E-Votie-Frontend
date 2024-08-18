import React, { useState, useRef } from 'react';
import Box from "@mui/material/Box";
import { Typography, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function Additional_Materials() {
    const [materials, setMaterials] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        files: null,
    });
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
        setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.description) newErrors.description = "Description is required.";
        if (!formData.files) newErrors.files = "File upload is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newMaterial = {
            name: formData.name,
            description: formData.description,
            date: new Date().toLocaleDateString(),
        };
        setMaterials([...materials, newMaterial]);
        setFormData({ name: '', description: '', files: null });

        // Clear the file input field
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemove = (index) => {
        const updatedMaterials = materials.filter((_, i) => i !== index);
        setMaterials(updatedMaterials);
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
                                {errors.name && <Typography color="error" variant="body2">{errors.name}</Typography>}
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
                                {errors.description && <Typography color="error" variant="body2">{errors.description}</Typography>}
                            </Box>
                            <Box className="flex flex-col">
                                <Typography variant="body1" gutterBottom>Upload Files</Typography>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    name="files"
                                    onChange={handleChange}
                                    ref={fileInputRef} // Assign the ref here
                                />
                                {errors.files && <Typography color="error" variant="body2">{errors.files}</Typography>}
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
                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ border: '1px solid #ddd' }}>Name</TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd' }}>Description</TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd' }}>Date Added</TableCell>
                                    <TableCell sx={{ border: '1px solid #ddd' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {materials.map((material, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ border: '1px solid #ddd' }}>{material.name}</TableCell>
                                        <TableCell sx={{ border: '1px solid #ddd' }}>{material.description}</TableCell>
                                        <TableCell sx={{ border: '1px solid #ddd' }}>{material.date}</TableCell>
                                        <TableCell sx={{ border: '1px solid #ddd' }}>
                                            <button
                                                className="btn btn-outline btn-primary"
                                                onClick={() => handleRemove(index)}
                                            >
                                                Remove
                                            </button>
                                        </TableCell>
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
