import React from 'react';
import DynamicChart from "../../Components/DynamicChart.jsx";
import {ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {object} from "yup";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "react-query";
import axios from "axios";
import MySwal from "sweetalert2";
import MapComponent from "../../Components/MapComponent.jsx";

export const ReportView = (props) => {
    const [alignment, setAlignment] = React.useState('Structured');
    const [response, setResponse] = React.useState(""); // Fixed typo in variable name

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const schema = object({
        Description: yup.string().required("Can not be empty"),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const mutation = useMutation((data) => {
        return axios.post('http://localhost:8081/report_generation/', data);
    });

    const onSubmit = async (data) => {
        MySwal.fire({
            title: 'Please wait.....',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                MySwal.showLoading();
            },
        });
        mutation.mutate(data, {
            onSuccess: (response) => {
                setResponse(response.data)
                MySwal.close();
            },
            onError: (error) => {
                console.error('Error submitting data:', error);
            }
        });
    };

    const chartData = {
        "Chart_Type": "BarChart",
        "x-axiz": "Categories",
        "y-axiz": "Values",
        "Title": "Sample Chart",
        "data": [
            {
                "bar_oder": 1,
                "bar_name": "Category 1",
                "color": "rgba(255, 99, 132, 0.6)",
                "data": 15
            },
            {
                "bar_oder": 2,
                "bar_name": "Category 2",
                "color": "rgba(54, 162, 235, 0.6)",
                "data": 20
            },
            // ... more data items
        ]
    };

    return (
        <div className="card bg-base-100 shadow-xl h-full p-5 flex flex-col">
            <div className="self-end mb-4">
                <ToggleButtonGroup
                    color="secondary"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    sx={{
                        '& .MuiToggleButton-root': {
                            color: '#EC4899',
                            borderColor: '#EC4899',
                            '&.Mui-selected': {
                                color: 'white',
                                backgroundColor: '#EC4899',
                            },
                        },
                    }}
                >
                    <ToggleButton value="Structured">Structured</ToggleButton>
                    <ToggleButton value="Dynamic">Dynamic</ToggleButton>
                </ToggleButtonGroup>
            </div>
            {alignment === "Structured" ? (
                <div>
                    <div className="flex flex-col lg:flex-row w-full">
                        <select {...register("Year")}
                                className="select select-primary w-full max-w-xs lg:w-fit">
                            <option disabled selected>Year</option>
                            <option>2024</option>
                            <option>2023</option>
                            <option>2022</option>
                            <option>2021</option>
                            <option>2020</option>
                            <option>2019</option>
                        </select>
                        <select {...register("Election")}
                                className="select select-primary w-full max-w-xs lg:w-fit lg:ml-3">
                            <option disabled selected>Election</option>
                            <option>Presidential Election</option>
                            <option>Parliamentary Election</option>
                        </select>
                        <select {...register("PollingDivision")}
                                className="select select-primary w-full max-w-xs lg:w-fit lg:ml-3">
                            <option disabled selected>Polling Division</option>
                            <option></option>
                        </select>
                        <select {...register("Party")}
                                className="select select-primary w-full max-w-xs lg:w-fit lg:ml-3">
                            <option disabled selected>Party</option>
                            <option></option>
                        </select>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Enter what report you want</span>
                            </div>
                            <textarea
                                className="textarea textarea-bordered h-24 textarea-primary"
                                placeholder="Description"
                                {...register("Description")}
                            ></textarea>
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary self-end">Submit</button>
                </form>
            )}
            <div className="flex flex-col items-center">
                <div style={{width: '600px', height: '400px'}}>
                    <DynamicChart chartData={chartData}/>
                </div>
                <div className="mt-4 text-center max-w-2xl">
                    <Typography variant="body1">
                        This chart displays sample data for different categories. The x-axis represents the categories,
                        while the y-axis shows the corresponding values. Each bar's height indicates the value for its
                        respective category.
                    </Typography>
                </div>
            </div>
            v
        </div>
    );
};