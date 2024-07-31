import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {object} from "yup";
import { useMutation } from 'react-query';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import {PopUpChat} from '../../Components/PopUpChat';

const MySwal = withReactContent(Swal)

const messages = [
    {
      sentByUser: false,
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      alt: "User avatar",
      name: "Obi-Wan Kenobi",
      time: "12:45",
      text: "You were the Chosen One!",
      status: "Delivered"
    },
    {
      sentByUser: true,
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      alt: "User avatar",
      name: "Anakin",
      time: "12:46",
      text: "I hate you!",
      status: "Seen at 12:46"
    },
    {
      sentByUser: false,
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      alt: "User avatar",
      name: "Obi-Wan Kenobi",
      time: "12:45",
      text: "You were the Chosen One!",
      status: "Delivered"
    },
    {
      sentByUser: true,
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      alt: "User avatar",
      name: "Anakin",
      time: "12:46",
      text: "I hate you!",
      status: "Seen at 12:46"
    },
    {
      sentByUser: false,
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      alt: "User avatar",
      name: "Obi-Wan Kenobi",
      time: "12:45",
      text: "You were the Chosen One!",
      status: "Delivered"
    },
    {
      sentByUser: true,
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      alt: "User avatar",
      name: "Anakin",
      time: "12:46",
      text: "I hate you!",
      status: "Seen at 12:46"
    },
    {
      sentByUser: false,
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      alt: "User avatar",
      name: "Obi-Wan Kenobi",
      time: "12:45",
      text: "You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!You were the Chosen One!",
      status: "Delivered"
    },
    {
      sentByUser: true,
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
      alt: "User avatar",
      name: "Anakin",
      time: "12:46",
      text: "I hate you!",
      status: "Seen at 12:46"
    }
  ];


export const VoterRegistration_1 = () => {

    const navigate = useNavigate();

    const schema = object({
        NIC: yup.string("Invalid NIC").required("Can not be empty").length(12, "NIC must be 12 characters long"),
        Email: yup.string().required().email(),
        Contact: yup.string().matches(/^\d{3}-\d{7}$/, "Phone number must be in the format 071-1234567")
    })

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const mutation = useMutation((data) => {
        return axios.post('http://localhost:8081/voter-registration/voter', data);
    });

    const onSubmit = (data) => {
        mutation.mutate(data, {
            onSuccess: (response) => {
                MySwal.fire({
                    title: <p>Please check email and phone</p>,
                    icon: 'success',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                })
            },
            onError: (error) => {
                MySwal.fire({
                    title: `<p>${error.response.data}</p>`,
                    icon: 'error',
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    didOpen: () => {
                        // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/');
                    }
                })
            }
        });
    }

    return (
        <div className="card card-side bg-base-100 shadow-xl gap-10 px-4 py-16">
            <figure>
                <ul className="steps steps-vertical ml-28 hidden md:block">
                    <li className="step step-primary">Registration of Email and Mobile</li>
                    <li className="step">Personal Details</li>
                    <li className="step">Location Details</li>
                    <li className="step">Chief Occupant Details</li>
                    <li className="step">Confirmation</li>
                </ul>
            </figure>
            <div className="divider lg:divider-horizontal"></div>
            <div className="card-body">
                <div className="flex-initial space-y-3">
                    <p className="font-sans text-2xl">Contact Details</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex-initial space-y-3">
                        <label className="input input-bordered flex items-center gap-2 input-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    d="M19 2H5C3.34 2 2 3.34 2 5v14c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3zM5 4h14c.55 0 1 .45 1 1v2H4V5c0-.55.45-1 1-1zm14 16H5c-.55 0-1-.45-1-1V9h16v10c0 .55-.45 1-1 1z"/>
                                <path
                                    d="M6 10h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm6-4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1zm0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1z"/>
                            </svg>
                            <input type="text" className="grow" placeholder="NIC" {...register("NIC")}/>
                        </label>
                        {errors.NIC && <p className="text-red-500 text-xs italic ml-5">{errors.NIC.message}</p>}
                        <label className="input input-bordered flex items-center gap-2 input-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
                            </svg>
                            <input type="text" className="grow" placeholder="Email" {...register("Email")}/>
                        </label>
                        {errors.Email && <p className="text-red-500 text-xs italic ml-5">{errors.Email.message}</p>}
                        <label className="input input-bordered flex items-center gap-2 input-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.12-.21 11.72 11.72 0 004.39 1.19 1 1 0 011 .88v3.81a1 1 0 01-.88 1A19.78 19.78 0 012 4.88a1 1 0 011-.88h3.81a1 1 0 01.99.88 11.72 11.72 0 001.2 4.39 1 1 0 01-.21 1.12l-2.2 2.2z"/>
                            </svg>

                            <input type="text" className="grow" placeholder="Phone (07*-*******)" {...register("Contact")}/>
                        </label>
                        {errors.Contact && <p className="text-red-500 text-xs italic ml-5">{errors.Contact.message}</p>}
                        <div className="card-actions justify-end">
                            <button className="btn btn-outline btn-primary">Verify</button>
                        </div>
                    </form>
                </div>
            </div>
            <PopUpChat messages={messages}/>
        </div>
    );
}