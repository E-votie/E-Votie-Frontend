import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { object } from "yup";
import { useMutation } from 'react-query';
import {authGet, authPost} from '../../Auth/authFetch.jsx';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React from 'react';
import {useNavigate} from "react-router-dom";


const MySwal = withReactContent(Swal);

export const CreateElection = () => {

    const navigate = useNavigate();
    const schema = object({
        electionStartDate: yup.string().required("Cannot be empty"),
        electionEndDate: yup.string().required("Cannot be empty"),
        type: yup.string().required("Cannot be empty"),
        name: yup.string().required("Cannot be empty"),
        sinhalaName: yup.string().required("Cannot be empty"),
        description: yup.string().required("Cannot be empty"),
        sinhalaDescription: yup.string().required("Cannot be empty")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const mutation = useMutation((data) => {
        return authPost('/election/create', data);
    });

    const onSubmit = async (data) => {
        console.log("-------->>>>>>>>>>>", data);
        mutation.mutate(data, {
            onSuccess: (response) => {
                MySwal.fire({
                    title: <p>Election created successfully</p>,
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // You might want to import and use 'navigate' from react-router-dom here
                        navigate('/Election/Election_Timeline/' + response.data.id, { state: { responseData: response.data } });
                    }
                });
            },
            onError: (error) => {
                console.error('Error submitting data:', error);
                // Handle error (e.g., show error message)
            }
        });
    };

    return (
        <div className="card card-side bg-base-100 shadow-xl gap-10 px-4">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <p className="font-sans text-3xl font-semibold">Create New Election</p>
                        <div className="flex gap-8">
                            <div className="w-1/2 space-y-4">
                                <div className="flex flex-col">
                                    <label className="mb-2 font-sans text-lg">Starting Date and Time</label>
                                    <input
                                        id="electionStartDate"
                                        type="datetime-local"
                                        className="input input-bordered input-primary w-full"
                                        {...register("electionStartDate")}
                                    />

                                    {errors.electionStartDate &&
                                        <p className="text-red-500 text-sm mt-1">{errors.electionStartDate.message}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 font-sans text-lg">Election Title</label>
                                    <input
                                        className="input input-bordered input-primary w-full"
                                        placeholder="Enter Election Title"
                                        {...register("name")}
                                    />
                                    {errors.ElectionTitle &&
                                        <p className="text-red-500 text-sm mt-1">{errors.ElectionTitle.message}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 font-sans text-lg">මැතිවරණය නම</label>
                                    <input
                                        className="input input-bordered input-primary w-full"
                                        placeholder="Enter Election Title"
                                        {...register("sinhalaName")}
                                    />
                                    {errors.ElectionTitle &&
                                        <p className="text-red-500 text-sm mt-1">{errors.ElectionTitle.message}</p>}
                                </div>
                            </div>
                            <div className="w-1/2 space-y-4">
                                <div className="flex flex-col">
                                    <label className="mb-2 font-sans text-lg">Ending Date and Time</label>
                                    <input
                                        type="datetime-local"
                                        placeholder="Select date and time"
                                        className="input input-bordered input-primary w-full"
                                        {...register("electionEndDate")}
                                    />
                                    {errors.electionEndDate &&
                                        <p className="text-red-500 text-sm mt-1">{errors.electionEndDate.message}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 font-sans text-lg">Election Type</label>
                                    <select
                                        className="select select-primary w-full"
                                        {...register("type")}
                                    >
                                        <option disabled value="">Select Election Type</option>
                                        <option>Presidential Election</option>
                                        <option>Parliamentary Election</option>
                                        <option>Provincial Council Election</option>
                                        <option>Local Authorities Election</option>
                                        <option>Referendum</option>
                                    </select>
                                    {errors.type &&
                                        <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="font-sans text-2xl">Election Description</p>
                        <label className="form-control">
                            <textarea
                                className="textarea textarea-bordered h-20 textarea-primary w-full"
                                placeholder="Enter Election Details"
                                {...register("description")}
                            ></textarea>
                            {errors.description &&
                                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                        </label>
                    </div>
                    <div className="space-y-4">
                        <p className="font-sans text-2xl">මැතිවරණ විස්තරය</p>
                        <label className="form-control">
                            <textarea
                                className="textarea textarea-bordered h-20 textarea-primary w-full"
                                placeholder="Enter Election Details"
                                {...register("sinhalaDescription")}
                            ></textarea>
                            {errors.sinhalaDescription &&
                                <p className="text-red-500 text-sm mt-1">{errors.sinhalaDescription.message}</p>}
                        </label>
                    </div>
                    <div className="card-actions justify-end">
                        <button type="submit" className="btn btn-outline btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
