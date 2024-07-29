import { useForm } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, TextField, Stack, Box, Grid} from "@mui/material";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";

const politicians = [
    'Mahinda Rajapaksa',
    'Ranil Wickremesinghe',
    'Sajith Premadasa',
    'Anura Kumara Dissanayake',
    'Maithripala Sirisena',
  ];

export const PartyRegistrationForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const [uploadedFileName, setUploadedFileName] = useState(null);
    const [selectedLeader, setSelectedLeader] = useState('');

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-initial space-y-3 mb-4 w-full shadow-md rounded-lg p-2">
                
                {/* Party name and abbreviation */}
                <Stack direction="row" className="gap-4">
                    <Box mb={3} className="w-2/3">
                        <TextField
                            // helperText="Enter party name"
                            id="partyName"
                            label="Party Name"
                            required
                            {...register("partyName")}
                        />
                    </Box>
                    <Box mb={3}>
                        <TextField
                            // helperText="Enter party abbreviation"
                            id="abbreviation"
                            label="Abbreviation"
                            required
                            {...register("abbreviation")}
                        />
                    </Box>
                </Stack>

                {/* Leader and Secretary */}
                <Stack direction="row" className="flex gap-4">
                    {/* Founded Date */}
                    <TextField
                        // helperText="Enter founded date"
                        id="foundedDate"
                        label="Founded Date"
                        type="date"
                        className="w-1/3"
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...register("foundedDate")}
                    />
                    {/* Party Leader */}
                    <FormControl className="w-2/3" required>
                        <InputLabel id="leader-label">Leader</InputLabel>
                        <Select
                            labelId="leader-label"
                            // helperText="Enter party leader"
                            id="leader"
                            value={selectedLeader}
                            label="Leader"
                            onChange={(e) => setSelectedLeader(e.target.value)}
                            {...register("leader")}
                        >
                            {politicians.map((politician) => (
                            <MenuItem key={politician} value={politician}>
                                {politician}
                            </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                {/* Headquarters Address */}
                <Stack direction="row" className="flex gap-4">
                    <TextField
                        // helperText="Headquarter address line 1"
                        id="addressLine1"
                        label="Address Line 1"
                        className="w-1/2"
                        required
                        {...register("addressLine1")}
                    />
                    <TextField
                        // helperText="Headquarter address line 2"
                        id="addressLine2"
                        label="Address Line 2"
                        className="w-1/2"
                        required
                        {...register("addressLine2")}
                    />
                </ Stack>
                <Stack direction="row" className="flex gap-4">
                    <TextField
                        // helperText="Headquarter located city"
                        id="city"
                        label="City"
                        required
                        {...register("city")}
                    />
                    <TextField
                        // helperText="Headquarter postal code"
                        id="postalCode"
                        label="Postal Code"
                        required
                        {...register("postalCode")}
                    />
                    <TextField
                        // helperText="Enter contact number"
                        id="contactNumber"
                        label="Contact Number"
                        required
                        {...register("contactNumber")}
                    />
                </Stack>

                <Stack spacing={2}>
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
                        variant="outlined"
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

                    {/* Constitution of the Party */}
                    <input
                        accept="pdf/*"
                        id="partySymbolInput"
                        type="file"
                        style={{ display: "none" }}
                        className="w-1/2"
                        onChange={handleFileChange}
                        {...register("partySymbol")}
                    />
                    <label htmlFor="partySymbolInput">
                        <Button
                        component="span"
                        role={undefined}
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                        Upload Constitution of the Party
                        </Button>
                    </label>
                    {uploadedFileName && (
                        <div>
                        <p>Uploaded File: {uploadedFileName}</p>
                        </div>
                    )}

                    {/* List of Office-Bearers of the Party */}
                    <input
                        accept="pdf/*"
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
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                        Upload the List of Office-Bearers 
                        </Button>
                    </label>
                    {uploadedFileName && (
                        <div>
                        <p>Uploaded File: {uploadedFileName}</p>
                        </div>
                    )}

                    {/* Statements of Audited Accounts */}
                    <input
                        accept="pdf/*"
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
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                        Upload Statements of Audited Accounts
                        </Button>
                    </label>
                    {uploadedFileName && (
                        <div>
                        <p>Uploaded File: {uploadedFileName}</p>
                        </div>
                    )}

                    {/* Current Policy Declaration */}
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
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                        Upload the Current Policy Declaration of the Party
                        </Button>
                    </label>
                    {uploadedFileName && (
                        <div>
                        <p>Uploaded File: {uploadedFileName}</p>
                        </div>
                    )}

                    {/* Any Other Documents */}
                    <input
                        accept="pdf/*"
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
                        variant="outlined"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                        Upload other Documents
                        </Button>
                    </label>
                    {uploadedFileName && (
                        <div>
                        <p>Uploaded File: {uploadedFileName}</p>
                        </div>
                    )}
                </ Stack>

                {/* Submit button */}
                <div className="card-actions justify-end">
                    <Button type="submit" variant="contained" color="primary">
                    Submit Application
                    </Button>
                </div>

            </form>
        </div>

    );
}

export default PartyRegistrationForm;
