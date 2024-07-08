import { useForm } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField} from "@mui/material";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  

export const PartyRegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const [uploadedFileName, setUploadedFileName] = useState(null);

    const onSubmit = (data) => {
        // Handle form submission logic here
        console.log(data);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedFileName(file.name);
            setValue("partySymbol", file); // Set the file object to the form value
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex-initial space-y-3 w-full">
            <div className="topic text-xl mb-4 font-bold">
                Application
            </div> 

            {/* Party name and abbreviation */}
            <div className="partyName flex gap-4">
                <TextField
                    helperText="Enter party name"
                    id="partyName"
                    label="Party Name"
                    className="w-2/3"
                    required
                    {...register("partyName")}
                />
                
                <TextField
                    helperText="Enter party abbreviation"
                    id="abbreviation"
                    label="Abbreviation"
                    className="w-1/3"
                    required
                    {...register("abbreviation")}
                />
            </div>

            {/* Headquarters Address */}
            <TextField
                helperText="Headquarter address line 1"
                id="addressLine1"
                label="Address Line 1"
                required
                {...register("addressLine1")}
            />

            <TextField
                helperText="Headquarter address line 2"
                id="addressLine2"
                label="Address Line 2"
                required
                {...register("addressLine2")}
            />

            <TextField
                helperText="Headquarter located city"
                id="city"
                label="City"
                required
                {...register("city")}
            />

            <TextField
                helperText="Headquarter postal code"
                id="postalCode"
                label="Postal Code"
                required
                {...register("postalCode")}
            />

            {/* Party Symbol */}
            <input
                accept="image/*"  
                id="partySymbolInput"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                {...register("partySymbol")}
            />
            <label htmlFor="partySymbolInput">
                <Button
                    component="span"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload Party Symbol
                </Button>
            </label>
            {uploadedFileName && (
                <div>
                    <p>Uploaded File: {uploadedFileName}</p>
                </div>
            )}


            {/* Constitution
            <TextField
                type="file"
                className="grow"
                id="constitution"
                label="Constitution"
                required
                {...register("constitution")}
            />
             */}
            {/* Submit button */}
            <div className="card-actions justify-end">
                <Button type="submit" variant="outlined" color="primary">Submit Application</Button>
            </div>
        </form>
    );
}

export default PartyRegistrationForm;
