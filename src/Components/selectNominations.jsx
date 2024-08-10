import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Checkbox, Button } from '@mui/material';

// Sample data for politicians
const politicians = [
  { name: 'Mahinda Rajapaksha', nic: '123456789V', profilePicture: 'path_to_image1.jpg', description: 'Description 1' },
  { name: 'Namal Rajapaksha', nic: '987654321V', profilePicture: 'path_to_image2.jpg', description: 'Description 2' },
  { name: 'Gotabaya Rajapaksha', nic: '456123789V', profilePicture: 'path_to_image3.jpg', description: 'Description 3' },
  { name: 'Basil Rajapaksha', nic: '789456123V', profilePicture: 'path_to_image4.jpg', description: 'Description 4' },
  { name: 'Chamal Rajapaksha', nic: '321654987V', profilePicture: 'path_to_image5.jpg', description: 'Description 5' },
  { name: 'Shasheendra Rajapaksha', nic: '654789321V', profilePicture: 'path_to_image6.jpg', description: 'Description 6' }
];

export const SelectNominations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPoliticians, setSelectedPoliticians] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleToggle = (politician) => {
    const currentIndex = selectedPoliticians.indexOf(politician);
    const newSelected = [...selectedPoliticians];

    if (currentIndex === -1) {
      newSelected.push(politician);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setSelectedPoliticians(newSelected);
  };

  const filteredPoliticians = politicians.filter((politician) =>
    politician.nic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToNominations = () => {
    console.log('Nominated Politicians:', selectedPoliticians);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="mt-8 w-full max-w-md">
        <TextField
          label="Search by NIC"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4"
        />
        <List className="bg-white rounded-lg shadow-md">
          {filteredPoliticians.map((politician) => (
            <ListItem key={politician.nic} className="flex items-center">
              <ListItemAvatar>
                <Avatar src={politician.profilePicture} />
              </ListItemAvatar>
              <ListItemText
                primary={politician.name}
                secondary={politician.nic}
                className="flex-1"
              />
              <Checkbox
                edge="end"
                onChange={() => handleToggle(politician)}
                checked={selectedPoliticians.indexOf(politician) !== -1}
              />
            </ListItem>
          ))}
        </List>
        <div className="mt-4 flex justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToNominations}
            className="bg-blue-500 hover:bg-blue-700"
          >
            Add to Nominations
          </Button>
        </div>
      </div>
    </div>
  );
};

