import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import axios from 'axios';
import MySwal from "sweetalert2";
import {authPost} from "../Auth/authFetch.jsx";
import {useNavigate} from "react-router-dom"; // Make sure to install axios: npm install axios

export default function CandidateListVoting({ candidates }) {

    const navigate = useNavigate();

    const [checked, setChecked] = React.useState({
        rows: {},
        columns: {},
        count: 0
    });

    const handleToggle = (candidateName, column) => () => {
        setChecked(prev => {
            const newChecked = { ...prev };

            if (prev.rows[candidateName] === column) {
                newChecked.rows[candidateName] = null;
                newChecked.columns[column] = null;
                newChecked.count--;
                return newChecked;
            }

            if (prev.count >= 3 && prev.rows[candidateName] !== column) {
                return prev;
            }

            if (prev.rows[candidateName] !== undefined) {
                newChecked.columns[prev.rows[candidateName]] = null;
            } else {
                newChecked.count++;
            }

            if (prev.columns[column] !== undefined) {
                newChecked.rows[prev.columns[column]] = null;
            } else if (prev.rows[candidateName] === undefined) {
                newChecked.count++;
            }

            newChecked.rows[candidateName] = column;
            newChecked.columns[column] = candidateName;

            return newChecked;
        });
    };

    const isChecked = (candidateName, column) => {
        return checked.rows[candidateName] === column;
    };

    const options = ['A', 'B', 'C'];

    const handleVote = async () => {
        const preferences = Object.entries(checked.rows)
            .filter(([_, value]) => value !== null)
            .sort((a, b) => a[1] - b[1])
            .map(([candidateName]) => candidateName);

        try {
            MySwal.fire({
                title: 'Please wait.....',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    MySwal.showLoading();
                },
            });
            console.log(preferences);
            const response = await axios.post('http://localhost:3000/vote', { preferences });;
            console.log('Vote submitted successfully:', response.data);
            MySwal.close();
            MySwal.fire({
                title: "Successfully Voted",
                icon: 'success',
                showConfirmButton: true,
                confirmButtonText: 'OK',
                didOpen: () => {
                    // `MySwal` is a subclass of `Swal` with all the same instance & static methods
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/voting_page/start');
                }
            })
        } catch (error) {
            console.error('Error submitting vote:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className="card bg-base-100 w-full max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden">
            <div className="card-header bg-primary text-white p-4">
                <h2 className="text-xl font-semibold">Candidate Selection</h2>
            </div>

            <div className="card-body p-6">
                <List className="w-full bg-white rounded-md">
                    {candidates.map((candidate) => {
                        const labelId = `checkbox-list-label-${candidate.Name}`;
                        return (
                            <ListItem
                                key={candidate.Name}
                                className="mb-4 border-b last:border-b-0"
                                disablePadding
                            >
                                <ListItemButton className="py-3">
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={candidate.Name}
                                            src={candidate.Symbol}
                                            className="mr-4"
                                            style={{ backgroundColor: candidate.Color }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        id={labelId}
                                        primary={candidate.Name}
                                        className="flex-grow"
                                    />
                                    <div className="flex space-x-2">
                                        {options.map((option, index) => (
                                            <Checkbox
                                                key={option}
                                                edge="end"
                                                onChange={handleToggle(candidate.Name, index)}
                                                checked={isChecked(candidate.Name, index)}
                                                inputProps={{'aria-labelledby': `${labelId}-${option}`}}
                                                disabled={checked.count >= 3 && !isChecked(candidate.Name, index)}
                                                className="text-primary"
                                            />
                                        ))}
                                    </div>
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </div>

            <div className="card-footer bg-gray-100 p-4">
                <p className="text-gray-600 mb-4">Click the button below to cast your vote</p>
                <div className="flex justify-end">
                    <button
                        className="btn btn-primary px-6 py-2 rounded-full hover:bg-primary-dark transition-colors"
                        onClick={handleVote}
                        disabled={checked.count === 0}
                    >
                        Vote
                    </button>
                </div>
            </div>
        </div>
    );
}