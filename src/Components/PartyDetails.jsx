import React from 'react';

export const PartyDetails = ({ party }) => {
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Not Available';
    }
  };

  const statusColors = {
    'pending verification': 'bg-yellow-100 text-yellow-800',
    'verified': 'bg-green-100 text-green-800',
    'rejected': 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* Header Section */}
      <div className="">
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[party.state] || 'bg-gray-100 text-gray-800'}`}>
            {party.state?.charAt(0).toUpperCase() + party.state?.slice(1) || 'Unknown Status'}
          </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Basic Information */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Founded Date</label>
                <p className="mt-1 text-gray-900">{formatDate(party.foundedDate)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Party Leader</label>
                <p className="mt-1 text-gray-900">{party.leader || 'Not Available'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Secretary</label>
                <p className="mt-1 text-gray-900">{party.secretary || 'Not Available'}</p>
              </div>
              {party.partyColors?.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Party Colors</label>
                  <div className="flex gap-2 mt-2">
                    {party.partyColors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="mt-1 text-gray-900">
                  {party.address?.addressLine_1}<br />
                  {party.address?.addressLine_2}<br />
                  {party.address?.city}, {party.address?.postalCode}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Contact Number</label>
                <p className="mt-1 text-gray-900">{party.contactNumber}</p>
              </div>
              {party.partyWebsite && party.partyWebsite !== 'Not Avaialble' && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Website</label>
                  <a
                    href={party.partyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-blue-600 hover:text-blue-800"
                  >
                    {party.partyWebsite}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Parliamentary Information */}
        <div className="bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Parliamentary Representation</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <span className="block text-2xl font-bold text-gray-900">{party.districtBasisSeats}</span>
              <span className="text-sm text-gray-500">District Basis</span>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <span className="block text-2xl font-bold text-gray-900">{party.nationalBasisSeats}</span>
              <span className="text-sm text-gray-500">National Basis</span>
            </div>
            <div className="bg-white rounded-lg p-4 text-center shadow-sm">
              <span className="block text-2xl font-bold text-blue-600">{party.totalSeats}</span>
              <span className="text-sm text-gray-500">Total Seats</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

