import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function ElectionMaterials() {
    const [materials, setMaterials] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get('name');
        const description = formData.get('description');
        const dateAdded = new Date().toLocaleDateString();

        setMaterials([...materials, { name, description, dateAdded }]);
        event.target.reset(); // Clear the form
    };

    return (
        <div className="card card-side bg-base-100 shadow-xl gap-10 px-4">
            <div className="card-body">
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-2 font-sans text-lg">Description</label>
                                <textarea
                                    className="textarea textarea-bordered h-32 textarea-primary w-full"
                                    placeholder="Enter Description"
                                    name="description"
                                ></textarea>
                            </div>
                            <Box className="flex flex-col gap-4 xl:w-1/3 lg:w-full md:w-full sm:w-full">
                                <label className="form-control w-full">
                                    <Typography variant="body1" className="label-text" gutterBottom>Upload Files</Typography>
                                    <input type="file" className="file-input file-input-bordered w-full" name="file" />
                                </label>
                                <p className="text-red-500 text-xs italic ml-5"></p>
                            </Box>
                        </div>
                    </div>
                    <div className="card-actions justify-end">
                        <button type="submit" className="btn btn-outline btn-primary">Done</button>
                    </div>
                </form>

                <div className="mt-6">
                    {materials.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="table table-striped w-full">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Date Added</th>
                                </tr>
                                </thead>
                                <tbody>
                                {materials.map((material, index) => (
                                    <tr key={index}>
                                        <td>{material.name}</td>
                                        <td>{material.description}</td>
                                        <td>{material.dateAdded}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
