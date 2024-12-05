import React from 'react';
import {
  MapPin,
  Globe,
  Phone,
  Calendar,
  Users,
  Award,
  ChevronRight,
} from 'lucide-react';

export const PartyDetails = ({ party }) => {
  // Extract leader and secretary details
  const leader = party.partyMembers.find((member) => member.role === 'Leader');
  const secretary = party.partyMembers.find(
    (member) => member.role === 'Secretary'
  );

  const detailItems = [
    {
      icon: Calendar,
      label: 'Founded',
      value: new Date(party.foundedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
    {
      icon: Users,
      label: 'Leadership',
      value: leader ? party.leaderName : 'Not Available',
      subtext: `Secretary: ${secretary ? party.secretoryName : 'Not Available'}`,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: party.address?.city,
      subtext: `${party.address?.addressLine_1}, ${party.address?.postalCode}`,
    },
    {
      icon: Phone,
      label: 'Contact',
      value: party.contactNumber,
    },
    {
      icon: Globe,
      label: 'Website',
      value:
        party.partyWebsite !== 'Not Available' ? (
          <a
            href={party.partyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Visit Website
          </a>
        ) : (
          'Not Available'
        ),
    },
    {
      icon: Award,
      label: 'Parliamentary Seats',
      value: `Total: ${party.totalSeats}`,
      subtext: (
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>District: {party.districtBasisSeats}</span>
          <span>National: {party.nationalBasisSeats}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {detailItems.map((item, index) => (
          <li
            key={index}
            className="px-5 py-4 hover:bg-gray-50 transition-colors group cursor-pointer"
          >
            <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className="bg-blue-50 p-2 rounded-full">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {item.label}
                  </div>
                  <div className="text-sm text-gray-900">{item.value}</div>
                  {item.subtext && (
                    <div className="text-xs text-gray-500 mt-1">
                      {item.subtext}
                    </div>
                  )}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
