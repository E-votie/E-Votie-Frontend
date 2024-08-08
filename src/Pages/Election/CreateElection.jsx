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
        StartingDateTime: yup.string().required("Cannot be empty"),
        EndingDateTime: yup.string().required("Cannot be empty"),
        ElectionType: yup.string().required("Cannot be empty"),
        // ChiefOccupantNIC: yup.string("Invalid NIC").required("Can not be empty").length(12, "NIC must be 12 characters long"),
        ElectionTitle: yup.string().required("Cannot be empty"),
        ElectionDetails: yup.string().required("Cannot be empty"),
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
                                    {errors.StartingDateTime && <p>{errors.StartingDateTime.message}</p>}
                                </div>
                                <span className="text-lg font-bold self-end mb-2">-</span>
                                <div className="flex flex-col">
                                    <label className="mb-1 font-sans text-l">Ending Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        placeholder="Type here"
                                        className="input input-bordered input-primary w-full max-w-xs"/>
                                    {errors.ElectionType && <p>{errors.EndingDateTime.message}</p>}
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="flex flex-col">

                                    <label className="mb-1 font-sans text-l">Election Title</label>
                                    <input className="input input-bordered input-primary w-full max-w-xs"
                                           placeholder="Enter Election Title"/>

                                    {errors.EndingDateTime && <p>{errors.ElectionTitle.message}</p>}
                                </div>
                                <span className="text-lg font-bold self-end mb-2"></span>
                                <div className="flex flex-col">
                                    <label className="mb-1 font-sans text-l">Election Type</label>
                                    <select className="select select-primary w-full max-w-xs">
                                        <option disabled selected>Election Type</option>
                                        <option>Presidential Election</option>
                                        <option>Parliamentary Election</option>
                                        <option>Provincial Council Election</option>
                                        <option>Local Authorities Election</option>
                                        <option>Referendum</option>
                                    </select>
                                    {errors.EndingDateTime && <p>{errors.ElectionType.message}</p>}
                                </div>
                            </div>

                        </div>
                        {/*<div className="space-y-3">*/}
                        {/*    <p className="font-sans text-2l">Election Type</p>*/}
                        {/*    <select className="select select-primary w-full max-w-xs">*/}
                        {/*        <option disabled selected>Election Type</option>*/}
                        {/*        <option>Presidential Election</option>*/}
                        {/*        <option>Parliamentary Election</option>*/}
                        {/*        <option>Provincial Council Election</option>*/}
                        {/*        <option>Local Authorities Election</option>*/}
                        {/*        <option>Referendum</option>*/}
                        {/*    </select>*/}
                        {/*    {errors.EndingDateTime && <p>{errors.ElectionType.message}</p>}*/}
                        {/*</div>*/}
                        {/*<div className="space-y-3">*/}
                        {/*    <p className="font-sans text-2l">Election Title</p>*/}
                        {/*    <input className="input input-bordered input-primary w-full max-w-xs"*/}
                        {/*           placeholder="Enter Election Title"/>*/}

                        {/*    {errors.EndingDateTime && <p>{errors.ElectionTitle.message}</p>}*/}
                        {/*</div>*/}

                        <div className="flex gap-5">
                            <label className="form-control w-full max-w-xs">
                            </label>
                            <label className="form-control w-full max-w-xs">
                            </label>
                            <label className="form-control w-full max-w-xs">
                            </label>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <p className="font-sans text-2l">Election Details</p>
                        <label className="form-control">
                            <textarea className="textarea textarea-bordered h-24 textarea-primary"
                                      placeholder="Election Details" {...register("ElectionDetails")}></textarea>
                            {errors.ElectionDetails && <p>{errors.ElectionDetails.message}</p>}
                        </label>
                    </div>
                    <div className="space-y-3">
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-primary">Create</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
        ;
}