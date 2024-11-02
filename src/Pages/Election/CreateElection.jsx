import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { object } from "yup";
import { useMutation } from 'react-query';
import { authPost} from '../../Auth/authFetch.jsx';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

export const CreateElection = () => {

    const schema = object({
        StartingDateTime: yup.string().required("Cannot be empty"),
        EndingDateTime: yup.string().required("Cannot be empty"),
        ElectionType: yup.string().required("Cannot be empty"),
        ElectionTitleEnglish: yup.string().required("Cannot be empty"),
        ElectionTitleSinhala: yup.string().required("Cannot be empty"),
        ElectionDescriptionEnglish: yup.string().required("Cannot be empty"),
        ElectionDescriptionSinhala: yup.string().required("Cannot be empty")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const mutation = useMutation((data) => {
        return authPost('http://localhost:8081/Election/Create', data);
    });

    const onSubmit = async (data) => {
        console.log("-------->>>>>>>>>>>")
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
                        // navigate('/Home');
                    }
                });
            },
            onError: (error) => {
                console.error('Error submitting data:', error);
                // Handle error (e.g., show error message)
            }
        });
    };

    // Get today's date in the format 'YYYY-MM-DDTHH:MM' for the min attribute
    const today = new Date().toISOString().slice(0, 16);

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
                                        id="StartingDateTime"
                                        type="datetime-local"
                                        className="input input-bordered input-primary w-full"
                                        {...register("StartingDateTime")}
                                        min={today}  // Set minimum date to today
                                    />

                                    {errors.StartingDateTime &&
                                        <p className="text-red-500 text-sm mt-1">{errors.StartingDateTime.message}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 font-sans text-lg">Election Title</label>
                                    <input
                                        className="input input-bordered input-primary w-full"
                                        placeholder="Enter Election Title"
                                        {...register("ElectionTitleEnglish")}
                                    />
                                    {errors.ElectionTitle &&
                                        <p className="text-red-500 text-sm mt-1">{errors.ElectionTitle.message}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 font-sans text-lg">මැතිවරණය නම</label>
                                    <input
                                        className="input input-bordered input-primary w-full"
                                        placeholder="Enter Election Title"
                                        {...register("ElectionTitleSinhala")}
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
                                        {...register("EndingDateTime")}
                                        min={today}  // Set minimum date to today
                                    />
                                    {errors.EndingDateTime &&
                                        <p className="text-red-500 text-sm mt-1">{errors.EndingDateTime.message}</p>}
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-2 font-sans text-lg">Election Type</label>
                                    <select
                                        className="select select-primary w-full"
                                        {...register("ElectionType")}
                                    >
                                        <option disabled value="">Select Election Type</option>
                                        <option>Presidential Election</option>
                                        <option>Parliamentary Election</option>
                                        <option>Provincial Council Election</option>
                                        <option>Local Authorities Election</option>
                                        <option>Referendum</option>
                                    </select>
                                    {errors.ElectionType &&
                                        <p className="text-red-500 text-sm mt-1">{errors.ElectionType.message}</p>}
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
                                {...register("ElectionDescriptionEnglish")}
                            ></textarea>
                            {errors.ElectionDescriptionEnglish &&
                                <p className="text-red-500 text-sm mt-1">{errors.ElectionDescriptionEnglish.message}</p>}
                        </label>
                    </div>
                    <div className="space-y-4">
                        <p className="font-sans text-2xl">මැතිවරණ විස්තරය</p>
                        <label className="form-control">
                            <textarea
                                className="textarea textarea-bordered h-20 textarea-primary w-full"
                                placeholder="Enter Election Details"
                                {...register("ElectionDescriptionSinhala")}
                            ></textarea>
                            {errors.ElectionDescriptionSinhala &&
                                <p className="text-red-500 text-sm mt-1">{errors.ElectionDescriptionSinhala.message}</p>}
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
