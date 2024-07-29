import React, { useState } from 'react';
import { Badge, Collapse, Card, CardContent, Typography, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Politician } from './PoliticianCard';
import { Box } from '@mui/material';

export const PartyMemberJoinRequests = ({ requestList }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
        <div className='bg-gray-200 flex items-center justify-end'>
            <Typography>Request List</Typography>
            <IconButton onClick={handleToggle} color="pink-500">
                <Badge badgeContent={requestList.length} color="secondary">
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Badge>
            </IconButton>
        </div>
        <Box my={2} className='bg-gray-200'/>
        <Collapse in={open} >
            <Card>
            <CardContent >
                <div className="flex flex-col gap-2">
                    {requestList.map((candidate, index) => (
                        <Politician key={index} />
                    ))}
                </div>
            </CardContent>
            </Card>
        </Collapse>
    </div>
  );
}

