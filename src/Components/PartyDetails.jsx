import React from 'react';
import { Card, CardContent, Typography, Avatar, Chip, Box, Link, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: 'auto',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
  '&:hover': {
    boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)',
  },
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: '1 1 45%',
  marginBottom: theme.spacing(2),
}));

const InfoItem = ({ label, value }) => (
  <Box mb={1}>
    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

export const PartyDetails = ({ party }) => {
  return (
    <StyledCard>
      <CardContent>
        <Box display="flex" gap={4}  justifyContent="space-between">

          <SectionPaper elevation={2} width={1/2}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            <Box display="flex" alignItems="center" mb={4}>
              <Avatar
                src={party.logo}
                alt={`${party.partyName} logo`}
                sx={{ width: 100, height: 100, marginRight: 3 }}
              />
              <Box>
                <Typography variant="h4" gutterBottom>
                  {party.partyName}
                </Typography>
                <Chip label={party.abbreviation} color="primary" size="large" />
              </Box>
            </Box>
            <InfoItem label="Leader" value={party.leader} />
            <InfoItem label="Secretary" value={party.secretary} />
            <InfoItem label="Founded Year" value={party.foundedYear} />
            <Typography variant="h6" gutterBottom>Party Colors</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {party.colors.map((color, index) => (
                <Chip 
                  key={index} 
                  label={color} 
                  style={{ backgroundColor: color, color: 'white' }} 
                />
              ))}
            </Box>
          </SectionPaper>

          <Box display="flex" flexDirection="column" justifyContent="space-between"  width={1/2}>
            <SectionPaper elevation={2}>
              <Typography variant="h6" gutterBottom>Contact Information</Typography>
              <InfoItem label="Headquarters" value={party.headquarters.address} />
              <InfoItem label="Contact" value={party.headquarters.contactNumber} />
              {party.website && (
                <Link href={party.website} target="_blank" rel="noopener noreferrer">
                  Visit Official Website
                </Link>
              )}
            </SectionPaper>

            <SectionPaper elevation={2} >
              <Typography variant="h6" gutterBottom>Seats in Parliament</Typography>
              <InfoItem label="District Basis" value={party.seatsInParliament.districtBasisSeats} />
              <InfoItem label="National Basis" value={party.seatsInParliament.nationalBasisSeats} />
              <InfoItem label="Total Seats" value={party.seatsInParliament.totalSeats} />
            </SectionPaper>
          </Box>

        </Box>
      </CardContent>
    </StyledCard>
  );
};
