import * as React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import KeycloakService from "../services/KeycloakService";
const MySwal = withReactContent(Swal)

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

  }

  const form = () => (
    <Box
      sx={{ width: 600, padding: 2 }}
      role="presentation"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Stack>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Party Information
            </Typography>
            <Divider />
            
            <TextField
              fullWidth
              label="Party Name"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Abbreviation"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Party Leader"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Established Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Stack row>
              {/* Leader NIC */}
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
            <TextField
              fullWidth
              label="Party Symbol"
              variant="outlined"
              margin="normal"
            />
          </Stack>
        </Box>

        <Divider sx={{ marginY: 2 }} />
        <Button variant="contained" color="primary" disabled={isSubmitDisabled} fullWidth>
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
