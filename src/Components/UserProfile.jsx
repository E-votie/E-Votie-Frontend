import React from "react";
import { User, MapPin, Mail, Phone, Calendar, IdCard, Home, Users, Map } from "lucide-react";

const voter = {
  VoterID: "V123456",
  applicationID: "APP987654",
  Name: "John Doe",
  Address: "123 Main Street, Colombo",
  HouseNo: "10A",
  NIC: "123456789V",
  DOB: "1985-01-01",
  Email: "john.doe@example.com",
  Contact: "0771234567",
  CivilStatus: "Married",
  Gender: "Male",
  RelationshipToTheChiefOccupant: "Son",
  ChiefOccupantNIC: "987654321V",
  AdminDistrict: "Colombo",
  ElectionDistrict: "Colombo East",
  PollingDivision: "Borella",
  gramaNiladhariDivision: "GN123",
  status: "Active",
};

export const UserProfile = () => {
  return (
    <div>
      <div className="mx-auto">
        {/* Status Badge */}
        <div className="flex justify-end mb-4">
          <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
            voter.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}>
            {voter.status}
          </span>
        </div>

        {/* Main Profile Card */}
        <div className="min-h-[600px] flex bg-base-100 shadow-md rounded-xl px-4 pb-4 gap-6">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500"></div>

          {/* Profile Info */}
          <div className="relative px-6">
            <div className="flex flex-col items-center -mt-20">
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <User size={64} className="text-blue-500" />
                </div>
              </div>
              <h1 className="mt-4 text-3xl font-bold text-gray-800">{voter.Name}</h1>
              <div className="mt-2 flex items-center space-x-2 text-gray-600">
                <IdCard size={16} />
                <span>{voter.VoterID}</span>
              </div>
            </div>

            {/* Content Sections */}
            <div className="mt-8 pb-6">
                <div className="flex">
                    <Section
                        title="Personal Information"
                        icon={<User className="text-blue-500" />}
                        items={[
                        { icon: <IdCard size={18} />, label: "NIC", value: voter.NIC },
                        { icon: <Calendar size={18} />, label: "Date of Birth", value: voter.DOB },
                        { icon: <Mail size={18} />, label: "Email", value: voter.Email },
                        { icon: <Phone size={18} />, label: "Contact", value: voter.Contact },
                        ]}
                    />
                    <Section
                        title="Residential Information"
                        icon={<Home className="text-blue-500" />}
                        items={[
                        { icon: <MapPin size={18} />, label: "Address", value: `${voter.HouseNo}, ${voter.Address}` },
                        { icon: <Users size={18} />, label: "Relationship to Chief Occupant", value: voter.RelationshipToTheChiefOccupant },
                        { icon: <IdCard size={18} />, label: "Chief Occupant NIC", value: voter.ChiefOccupantNIC },
                        ]}
                    />
                </div>

                <Section
                    title="Electoral Information"
                    icon={<Map className="text-blue-500" />}
                    items={[
                    { label: "Admin District", value: voter.AdminDistrict },
                    { label: "Election District", value: voter.ElectionDistrict },
                    { label: "Polling Division", value: voter.PollingDivision },
                    { label: "Grama Niladhari Division", value: voter.gramaNiladhariDivision },
                    ]}
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, icon, items }) => (
  <div className="mt-8 first:mt-0">
    <div className="flex items-center space-x-2 mb-4">
      {icon}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
          <div className="flex items-center space-x-2">
            {item.icon}
            <span className="text-gray-600 font-medium">{item.label}</span>
          </div>
          <div className="mt-1 text-gray-900 font-semibold">{item.value}</div>
        </div>
      ))}
    </div>
  </div>
);

