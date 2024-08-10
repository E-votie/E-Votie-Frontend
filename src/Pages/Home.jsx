import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaFingerprint, FaUserEdit, FaVoteYea, FaClipboardList, FaHandshake, FaBullhorn } from 'react-icons/fa';
import Carousel from '../Components/Carousel';
import ActionCard from '../Components/ActionCard';
import { useNavigate } from "react-router-dom";
import KeycloakService from "../services/KeycloakService.jsx";
import { authGet } from "../Auth/authFetch.jsx";
import keycloakService from "../services/KeycloakService.jsx";

const actions = [
  {
    "action": "Voter Registration",
    "icon": "candidate",
    "description": "New voters register here.",
    "link": "/VoterRegistration",
    "roles": ["Anonymous"]
  },
  {
    "action": "My Details",
    "icon": "candidate",
    "description": "View your personal details and history hear",
    "link": "/voter/profile",
    "roles": ["Voter"]
  },
  {
    "action": "Election Registration",
    "icon": "candidate",
    "description": "eligible voter register for an election to vote",
    "link": "/voter/election_registration",
    "roles": ["Voter"]
  },
  {
    "action": "Voter Applications",
    "icon": "application",
    "description": "Pending applications for verification.",
    "link": "/verification_officer/voter_applications",
    "roles": ["VerificationOfficer"],
  },
  {
    "action": "Candidate Applications",
    "icon": "application",
    "description": "Pending applications for verification.",
    "link": "/verification_officer/candidate_applications",
    "roles": ["VerificationOfficer"],
  },
  {
    "action": "Voter Applications",
    "icon": "application",
    "description": "Pending applications for verification.",
    "link": "/GN/voter_applications",
    "roles": ["GramaNiladhari"],
  },
  {
    "action": "Fingerprint Scan",
    "icon": "FingerprintIcon",
    "description": "Register new fingerprint or update",
    "link": "/verification_officer/fingerprint_scan",
    "roles": ["VerificationOfficer"]
  },
  {
    "action": "Party Details",
    "icon": "party",
    "description": "Details about the political parties.",
    "link": "/party/list",
    "roles": ["Anonymous", "Voter", "partyMember"]
  },
  {
    "action": "Candidates",
    "icon": "candidate",
    "description": "Information about the election candidates.",
    "roles": ["Anonymous", "Voter", "GramaNiladhari"]
  },
  {
    "action": "Elections",
    "icon": "election",
    "description": "General information about the elections.",
    "link": "/election/list",
    "roles": ["Anonymous", "Voter"]
  },
  {
    "action": "Inquiries",
    "icon": "inquiry",
    "description": "Submit your inquiries and complaints here.",
    "link": "/inquiries",
    "roles": ["Anonymous", "Voter"]
  },
  {
    "action": "Announcements",
    "icon": "announcement",
    "description": "Latest announcements and updates.",
    "link":"/announcements",
    "roles": ["Anonymous", "Voter", "GramaNiladhari", "VerificationOfficer"]
  },
];

const shouldShowCard = (roles) => {
  if (roles.includes("ALL")) return true;
  if (roles.includes("Anonymous") && !keycloakService.isLoggedIn()) return true;
  if (keycloakService.isLoggedIn()) {
      return roles.some(role => KeycloakService.hasRole(role));
  }
  return false;
};

const messages = {
  en: "Welcome to our Digital Democracy Platform!",
  si: "අපගේ ඩිජිටල් ප්‍රජාතන්ත්‍රවාදී වේදිකාවට සාදරයෙන් පිළිගනිමු!",
  ta: "எங்கள் டிஜிட்டல் ஜனநாயக தளத்திற்கு வரவேற்கிறோம்!"
};
const languageOrder = ['en', 'si', 'ta'];

const iconMap = {
  "candidate": FaUserEdit,
  "application": FaClipboardList,
  "FingerprintIcon": FaFingerprint,
  "party": FaHandshake,
  "election": FaVoteYea,
  "announcement": FaBullhorn,
};

export const Home = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [fade, setFade] = useState(true);
  const [Status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setLanguage((prevLanguage) => {
          const currentIndex = languageOrder.indexOf(prevLanguage);
          const nextIndex = (currentIndex + 1) % languageOrder.length;
          return languageOrder[nextIndex];
        });
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (keycloakService.isLoggedIn() && KeycloakService.hasRole("Voter")) {
        try {
          setLoading(true);
          const data = await authGet(`/voter/status`);
          setStatus(data.Status);
          await new Promise(resolve => setTimeout(resolve, 1000));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 text-center">
          <motion.h1
            className={`text-2xl font-bold mb-2 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          > 
          {messages[language]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl"
          >
            Empowering citizens through digital democracy
          </motion.p>
          {(KeycloakService.hasRole("Voter") && Status !== "Completed") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4 rounded-r"
            >
              <p className="font-bold">Action Required:</p>
              <p>Your fingerprint is not registered. Please visit a designated office to complete registration.</p>
            </motion.div>
          )}
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map((action, index) => (
              shouldShowCard(action.roles) && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <ActionCard
                    icon={action.icon}
                    action={action.action}
                    description={action.description}
                    link={action.link}
                    role={action.roles}
                  />
                </motion.div>
              )
            ))}
          </div>
        </div>

        <div className="bg-gray-100 p-8 flex-grow justify-between">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Latest Updates</h2>
          <center>
            <Carousel />
          </center>
        </div>
      </div>
    </motion.div>
  );
};


export default Home;



// ==============UI 1 ===============

// import React, {useEffect, useState} from 'react';
// import Carousel from '../Components/Carousel';
// import ActionCard from '../Components/ActionCard';
// import {useNavigate} from "react-router-dom";
// import KeycloakService from "../services/KeycloakService.jsx";
// import {authGet} from "../Auth/authFetch.jsx";
// import keycloakService from "../services/KeycloakService.jsx";

// const actions = [
//   {
//     "action": "Voter Registration",
//     "icon": "candidate",
//     "description": "New voters register here. Online Voter Registration",
//     "link": "/VoterRegistration",
//     "roles": ["Anonymous"]
//   },
//   {
//     "action": "My Details",
//     "icon": "candidate",
//     "description": "View your personal details and history hear",
//     "link": "/voter/profile",
//     "roles": ["Voter"]
//   },
//   {
//     "action": "Election Registration",
//     "icon": "candidate",
//     "description": "eligible voter register for an election to vote",
//     "link": "/voter/election_registration",
//     "roles": ["Voter"]
//   },
//   {
//     "action": "Voter Applications",
//     "icon": "application",
//     "description": "Pending applications for verification.",
//     "link": "/verification_officer/voter_applications",
//     "roles": ["VerificationOfficer"],
//   },
//   {
//     "action": "Voter Applications",
//     "icon": "application",
//     "description": "Pending applications for verification.",
//     "link": "/GN/voter_applications",
//     "roles": ["GramaNiladhari"],
//   },
//   {
//     "action": "Fingerprint Scan",
//     "icon": "FingerprintIcon",
//     "description": "Register new fingerprint or update",
//     "link": "/verification_officer/fingerprint_scan",
//     "roles": ["VerificationOfficer"]
//   },
//   {
//     "action": "Party Details",
//     "icon": "party",
//     "description": "Details about the political parties.",
//     "link": "/party/list",
//     "roles": ["Anonymous", "Voter", "partyMember"]
//   },
//   {
//     "action": "Candidates",
//     "icon": "candidate",
//     "description": "Information about the election candidates.",
//     "roles": ["Anonymous", "Voter", "GramaNiladhari"]
//   },
//   // {
//   //   "action": "Manifestos",
//   //   "icon": "manifesto",
//   //   "description": "Read the manifestos of each party."
//   // },
//   {
//     "action": "Elections",
//     "icon": "election",
//     "description": "General information about the elections.",
//     "link": "/election/list",
//     "roles": ["Anonymous", "Voter"]
//   },
//   {
//     "action": "Inquiries",
//     "icon": "inquiry",
//     "description": "Submit your inquiries and complaints here.",
//     "link": "/inquiries",
//     "roles": ["Anonymous", "Voter"]
//   },
//   {
//     "action": "Announcements",
//     "icon": "announcement",
//     "description": "Latest announcements and updates.",
//     "link":"/announcements",
//     "roles": ["Anonymous", "Voter", "GramaNiladhari", "VerificationOfficer"]
//   },
// ]

// const messages = {
//   en: "Welcome to our website!",
//   si: "අපගේ වෙබ් අඩවියට සාදරයෙන් පිළිගනිමු!",
//   ta: "எங்கள் வலைத்தளத்திற்கு வரவேற்கிறோம்!"
// };

// const languageOrder = ['en', 'si', 'ta'];

// export const Home = () => {
//   const navigate = useNavigate();

//   const [language, setLanguage] = useState('en');
//   const [fade, setFade] = useState(true);
//   const [Status, setStatus] = useState("")

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFade(false); 
//       setTimeout(() => {
//         setLanguage((prevLanguage) => {
//           const currentIndex = languageOrder.indexOf(prevLanguage);
//           const nextIndex = (currentIndex + 1) % languageOrder.length;
//           return languageOrder[nextIndex];
//         });
//         setFade(true); 
//       }, 500); 
//     }, 5000); 

//     return () => clearInterval(interval); 
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if(keycloakService.isLoggedIn() && KeycloakService.hasRole("Voter")) {
//         try {
//           setLoading(true);
//           const data = await authGet(`/voter/status`);
//           setStatus(data.Status);
//           await new Promise(resolve => setTimeout(resolve, 1000));
//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="min-h-[600px] flex flex-col bg-base-100 shadow-2xl px-4 pb-4 gap-6 rounded-3xl py-14">
//       <div className="h-1/5 flex-grow flex flex-col justify-center items-center text-3xl text-center">
//         <h1 className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
//           {messages[language]}
//         </h1>
//         {(KeycloakService.hasRole("Voter") && Status !== "Completed")  &&
//             <div className="my-5">
//               <h3 className="font-bold text-red-500">Your fingerprint is not registered go to a designated office and get registered</h3>
//         </div>
//         }
//       </div>
//       <div className="h-2/5 flex-grow flex flex-wrap gap-4 justify-center items-center ">
//         {actions.map((action, index) => (
//           <ActionCard key={index} icon={action.icon} action={action.action} description={action.description}  link={action.link} role={action.roles}/>
//         ))}
//       </div>
//       <div className="h-[2/5] flex-grow flex flex-col justify-center items-center">
//         <Carousel />
//       </div>
//     </div>
//   );
// };

// ==============UI 2 ===============