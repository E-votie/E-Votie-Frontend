import * as React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Stack, Typography } from '@mui/material';
import {Grid, Card, CardContent
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadIcon from '@mui/icons-material/Upload';
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import KeycloakService from "../services/KeycloakService";
const MySwal = withReactContent(Swal)

const initialApplicationDetails = {
  partyName: 'Green Party',
  leader: 'John Doe',
  submittedDate: '2024-07-31',
  partySymbol: '/path/to/party-symbol.png',
  addressLine1: '123 Green Street',
  addressLine2: 'Eco City',
  postalCode: '12345',
  contactNumber: '+1 234 567 8900',
  email: 'contact@greenparty.com',
  attachments: [
    { type: 'Constitution', name: 'Constitution.pdf', link: '/path/to/constitution.pdf' },
    { type: 'Logo', name: 'Logo.png', link: '/path/to/logo.png' },
    { type: 'Membership List', name: 'Members.xlsx', link: '/path/to/members.xlsx' },
    { type: 'Financial Statement', name: 'Finances.pdf', link: '/path/to/finances.pdf' },
    { type: 'Leadership Structure', name: 'Leadership.pdf', link: '/path/to/leadership.pdf' }
  ]
};

const FormSection = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const PartyRegistrationApplicationDrawer = () => {
  
  const [state, setState] = React.useState({right: false,});
  const [isLeaderVerified, setIsLeaderVerified] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true); 
  const [token, setToken] = useState(KeycloakService.getToken());
  const [leaderName, setLeaderName] = useState("");

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
  const navigate = useNavigate();

  //drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, right: open });
  };

  //validate leader nic
  const validateLeaderNic = async (e) => {
    const updatedToken = KeycloakService.getToken();
    const nic = e.target.value;
    setIsLoading(true); 
    try {
        const response = await axios.get(`http://localhost:5003/api/voter/${nic}`,
        {  
          headers: {
              Authorization: `Bearer ${updatedToken}`
          }
        });
        setLeaderName(response.data.Name);
        console.log(response.data);
        if ([200, 201].includes(response.status)) {
            setIsLeaderVerified(true);
            setIsSubmitDisabled(false);
        } else {
            setIsLeaderVerified(false);
            setIsSubmitDisabled(true);
        }
    } catch (error) {
        console.log(error);
        setIsLeaderVerified(false);
        setIsSubmitDisabled(true);
    } finally {
        setIsLoading(false);
    }
  };

  //form submission handling
  const onSubmit = (data) => {
    console.log("On submit");
    console.log(data);
  }

  const renderAttachments = () => (
    <CardContent>
      <Grid container spacing={2}>
        {initialApplicationDetails.attachments.map((attachment, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>{attachment.type}</Typography>
                <Box display="flex" alignItems="center" mb={1}>
                  <AttachFileIcon fontSize="small" />
                  <Typography variant="body2" noWrap sx={{ ml: 1 }}>{attachment.name}</Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<UploadIcon />}
                  onClick={() => handleFileUpload(attachment.type)}
                  fullWidth
                >
                  Update
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </CardContent>
  );


  const form = () => (
    <Box
      sx={{ width: 600, padding: 2 }}
      role="presentation"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Stack spacing={2}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Party Information
            </Typography>
            <Divider />
            <Stack direction="row">
              <TextField
                fullWidth
                label="Party Name"
                variant="outlined"
                {...register("partyName", { required: true })}
                />
              <TextField
                fullWidth
                label="Abbreviation"
                variant="outlined"
                {...register("abbreviation", { required: true })}
              />
            </Stack>
            <TextField
              fullWidth
              label="Established Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("date", { required: true })}
            />
            <Stack spacing={2}>
              <TextField
                  fullWidth
                  label="Address line 1"
                  variant="outlined"
                  {...register("address line 1", { required: true })}
              />
              <TextField
                fullWidth
                label="Address line 2"
                variant="outlined"
                {...register("address line 2", { required: true })}
              />
              <Stack direction="row">
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  {...register("city", { required: true })}
                />
                <TextField
                  fullWidth
                  label="Postal Code"
                  variant="outlined"
                  {...register("postal code", { required: true })}

                />
              </Stack>
            </Stack>
            <Stack direction="row">
              {/* Leader NIC */}
              <Box>
                <TextField
                  fullWidth
                  label="Leader NIC"
                  variant="outlined"
                  {...register("leaderNic", { required: true })}
                  error={!!errors.leaderNic}
                  helperText={errors.leaderNic && 'Leader NIC is required'}
                  onBlur={validateLeaderNic} 
                />
                {isLoading && <Typography>Verifying leader NIC...</Typography>} 
                {!isLoading && isLeaderVerified && <Typography className='text-green-400'>Leader identified successfully!</Typography>}
                {!isLoading && !isLeaderVerified && <Typography className='text-error'>Leader identification failed!</Typography>}
              </Box>
              {/* Leader Name */}
              <TextField
                fullWidth
                label="Leader Name"
                variant='outlined'
                {...register("leaderName", { required:true })}
                disabled={true}
                value={leaderName}
              />
            </Stack>
          </Stack>
        </Box>

        <Box>
          <Stack>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Documents
            </Typography>
            <Divider />
            {/* {renderAttachments()} */}
          </Stack>
        </Box>

        <Divider sx={{ marginY: 2 }} />
        <Button type="submit" variant="contained" color="primary" disabled={isSubmitDisabled} fullWidth>
          Submit
        </Button>
      </form>
    </Box>
  );

  return (
    <div>
      <Button variant="outlined" onClick={toggleDrawer(true)}>
        Open Registration Form
      </Button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer(false)}
      >
        {form()}
      </Drawer>
    </div>
  );
}
