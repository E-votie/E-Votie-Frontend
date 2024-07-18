import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {object} from "yup";
import {useMutation} from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import React, {useState} from 'react';


const MySwal = withReactContent(Swal)

export const CreateElection = () => {

    const schema = object({
        Address: yup.string().required("Can not be empty"),
        ChiefOccupantNIC: yup.string("Invalid NIC").required("Can not be empty").length(12, "NIC must be 12 characters long"),
        // NICFront: yup.mixed().required("A file is required").test("fileSize", "File size is too large", value => value && value[0].size <= FILE_SIZE).test("fileFormat", "Unsupported file format", value => value && SUPPORTED_FORMATS.includes(value[0].type)),
        // NICBack: yup.mixed().required("A file is required").test("fileSize", "File size is too large", value => value && value[0].size <= FILE_SIZE).test("fileFormat", "Unsupported file format", value => value && SUPPORTED_FORMATS.includes(value[0].type)),
        // Face: yup.mixed().required("A file is required").test("fileSize", "File size is too large", value => value && value[0].size <= FILE_SIZE).test("fileFormat", "Unsupported file format", value => value && SUPPORTED_FORMATS.includes(value[0].type)),
        // Relationship: yup.string().required("Can not be empty").matches(/^\D*$/, "Invalid Relationship"),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const mutation = useMutation((data) => {
        return axios.post('http://localhost:8081/Election/Create', data);
    });

    const onSubmit = async (data) => {
        mutation.mutate(data, {
            onSuccess: (response) => {
                MySwal.fire({
                    title: <p>Please check Date_of_Birth and phone</p>,
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/Home');
                    }
                })
            },
            onError: (error) => {
                console.error('Error submitting data:', error);
                // Handle error (e.g., show error message)
            }
        });
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl gap-10 px-4">
            <div className="card-body md:px-2">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div className="space-y-3">
                        <p className="font-sans text-2xl">New Election</p>
                        <div className="space-y-3">
                            <div className="flex gap-6">
                                <div className="flex flex-col">
                                    <label className="mb-1 font-sans text-l">Starting Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        placeholder="Type here"
                                        className="input input-bordered input-primary w-full max-w-xs"/>
                                </div>
                                <span className="text-lg font-bold self-end mb-2">-</span>
                                <div className="flex flex-col">
                                    <label className="mb-1 font-sans text-l">Ending Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        placeholder="Type here"
                                        className="input input-bordered input-primary w-full max-w-xs"/>
                            </div>
                        </div>
                    </div>
                        <p className="font-sans text-2l">Election Type</p>
                        <select className="select select-primary w-full max-w-xs">
                            <option disabled selected>Election Type</option>
                            <option>Presidential Election</option>
                            <option>Parliamentary Election</option>
                            <option>Provincial Council Election</option>
                            <option>Local Government Election</option>
                        </select>
                        <div className="flex gap-5">
                            <label className="form-control w-full max-w-xs">
                                {/*<div className="label">*/}
                                {/*<span className="label-text">NIC Front</span>*/}
                                {/*</div>*/}
                                {/*<input type="file"*/}
                                {/*       className="file-input file-input-bordered w-full max-w-xs" {...register("NICFront")}/>*/}
                            </label>
                            {/*{errors.NICFront &&*/}
                            {/*    <p className="text-red-500 text-xs italic ml-5">{errors.NICFront.message}</p>}*/}
                            <label className="form-control w-full max-w-xs">
                                {/*<div className="label">*/}
                                {/*    <span className="label-text">NIC Back</span>*/}
                                {/*</div>*/}
                                {/*<input type="file"*/}
                                {/*       className="file-input file-input-bordered w-full max-w-xs" {...register("NICBack")}/>*/}
                            </label>
                            {/*{errors.NICBack &&*/}
                            {/*    <p className="text-red-500 text-xs italic ml-5">{errors.NICBack.message}</p>}*/}
                            <label className="form-control w-full max-w-xs">
                                {/*<div className="label">*/}
                                {/*    <span className="label-text">Current facial photo for verification</span>*/}
                                {/*</div>*/}
                                {/*<input type="file"*/}
                                {/*       className="file-input file-input-bordered w-full max-w-xs" {...register("Face")}/>*/}
                            </label>
                            {/*{errors.Face &&*/}
                            {/*    <p className="text-red-500 text-xs italic ml-5">{errors.Face.message}</p>}*/}
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="font-sans text-2l">Election Details</p>
                        <label className="form-control">
                            <textarea className="textarea textarea-bordered h-24 textarea-primary"
                                      placeholder="Election Details" {...register("Address")}></textarea>
                        </label>
                    </div>
                    <div className="space-y-3">
                        {/*<p className="font-sans text-2l">Electoral District</p>*/}
                        {/*<label className="input input-bordered flex items-center gap-2 input-primary">*/}
                        {/*    /!*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"*!/*/}
                        {/*    /!*     className="h-5 w-5">*!/*/}
                        {/*    /!*    <path*!/*/}
                        {/*    /!*        d="M19 2H5C3.34 2 2 3.34 2 5v14c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3zM5 4h14c.55 0 1 .45 1 1v2H4V5c0-.55.45-1 1-1zm14 16H5c-.55 0-1-.45-1-1V9h16v10c0 .55-.45 1-1 1z"/>*!/*/}
                        {/*    /!*    <path*!/*/}
                        {/*    /!*        d="M6 10h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm6-4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z"/>*!/*/}
                        {/*    /!*</svg>*!/*/}
                        {/*    <input type="text" className="grow"*/}
                        {/*           placeholder="Enter Electoral District" {...register("ChiefOccupantNIC")}/>*/}
                        {/*</label>*/}
                        {/*/!*{errors.ChiefOccupantNIC &&*!/*/}
                        {/*/!*    <p className="text-red-500 text-xs italic ml-5">{errors.ChiefOccupantNIC.message}</p>}*!/*/}

                        {/*<p className="font-sans text-2l">Polling Division</p>*/}

                        {/*<label className="input input-bordered flex items-center gap-2 input-primary">*/}
                        {/*    /!*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"*!/*/}
                        {/*    /!*     className="h-5 w-5">*!/*/}
                        {/*    /!*    <path*!/*/}
                        {/*    /!*        d="M19 2H5C3.34 2 2 3.34 2 5v14c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3zM5 4h14c.55 0 1 .45 1 1v2H4V5c0-.55.45-1 1-1zm14 16H5c-.55 0-1-.45-1-1V9h16v10c0 .55-.45 1-1 1z"/>*!/*/}
                        {/*    /!*    <path*!/*/}
                        {/*    /!*        d="M6 10h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm6-4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z"/>*!/*/}
                        {/*    /!*</svg>*!/*/}
                        {/*    <input type="text" className="grow"*/}
                        {/*           placeholder="Enter Polling Division " {...register("Relationship")}/>*/}
                        {/*</label>*/}
                        {/*{errors.Relationship &&*/}
                        {/*    <p className="text-red-500 text-xs italic ml-5">{errors.Relationship.message}</p>}*/}
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-primary">Next</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
        ;
}