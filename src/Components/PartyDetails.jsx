import React from 'react';

export const PartyDetails = ({ party }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-2 mb-4">
            <div className="mb-4">
                <span className="font-bold">Party Name:</span> {party.partyName}
            </div>

            <div className="mb-4">
                <span className="font-bold">Abbreviation:</span> {party.abbreviation}
            </div>

            <div className="mb-4">
                <span className="font-bold">Party Logo:</span>
                {party.logo && <img src={party.logo} alt="Party Logo" className="h-20 mt-2" />}
            </div>

            <div className="mb-4">
                <span className="font-bold">Leader:</span> {party.leader}
            </div>

            <div className="mb-4">
                <span className="font-bold">Secretary:</span> {party.secretary}
            </div>

            <div className="mb-4">
                <span className="font-bold">Founded Year:</span> {party.foundedYear}
            </div>

            <div className="mb-4">
                <span className="font-bold">Headquarters Address:</span> {party.headquarters.address}
            </div>

            <div className="mb-4">
                <span className="font-bold">Contact Number:</span> {party.headquarters.contactNumber}
            </div>

            <div className="mb-4">
                <span className="font-bold">Party Colors:</span> {party.colors.join(', ')}
            </div>

            <div className="mb-4">
                <span className="font-bold">Seats in Parliament:</span>
                <ul>
                    <li>District Basis Seats: {party.seatsInParliament.districtBasisSeats}</li>
                    <li>National Basis Seats: {party.seatsInParliament.nationalBasisSeats}</li>
                    <li>Total Seats: {party.seatsInParliament.totalSeats}</li>
                </ul>
            </div>

            <div className="mb-4">
                <span className="font-bold">Website:</span> 
                {party.website && <a href={party.website} target="_blank" rel="noopener noreferrer">{party.website}</a>}
            </div>
        </div>
    );
};
