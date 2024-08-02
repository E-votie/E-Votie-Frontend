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


import React, { useEffect, useState } from 'react';
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
  // {
  //   "action": "Manifestos",
  //   "icon": "manifesto",
  //   "description": "Read the manifestos of each party."
  // },
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
]


const messages = {
  en: "Welcome to our Digital Democracy Platform!",
  // si: "අපගේ ඩිජිටල් ප්‍රජාතන්ත්‍රවාදී වේදිකාවට සාදරයෙන් පිළිගනිමු!",
  // ta: "எங்கள் டிஜிட்டல் ஜனநாயக தளத்திற்கு வரவேற்கிறோம்!"
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
            Welcome to our Digital Democracy Platform!
            {/* {messages[language]} */}
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
            ))}
          </div>
        </div>

        <div className="bg-gray-100 p-8 w-full">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Latest Updates</h2>
              <Carousel />
        </div>
      </div>
    </motion.div>
  );
};


// ==============UI 3 ===============


// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaFingerprint, FaUserEdit, FaVoteYea, FaClipboardList, FaHandshake, FaBullhorn, FaChevronDown } from 'react-icons/fa';
// import Carousel from '../Components/Carousel';
// import ActionCard from '../Components/ActionCard';
// import { useNavigate } from "react-router-dom";
// import KeycloakService from "../services/KeycloakService.jsx";
// import { authGet } from "../Auth/authFetch.jsx";
// import keycloakService from "../services/KeycloakService.jsx";

// // ... (keep the existing actions, messages, languageOrder, and iconMap)

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
//   en: "Welcome to our Digital Democracy Platform!",
//   si: "අපගේ ඩිජිටල් ප්‍රජාතන්ත්‍රවාදී වේදිකාවට සාදරයෙන් පිළිගනිමු!",
//   ta: "எங்கள் டிஜிட்டல் ஜனநாயக தளத்திற்கு வரவேற்கிறோம்!"
// };

// const languageOrder = ['en', 'si', 'ta'];

// const iconMap = {
//   "candidate": FaUserEdit,
//   "application": FaClipboardList,
//   "FingerprintIcon": FaFingerprint,
//   "party": FaHandshake,
//   "election": FaVoteYea,
//   "announcement": FaBullhorn,
// };

// export const Home = () => {
//   const navigate = useNavigate();
//   const [language, setLanguage] = useState('en');
//   const [fade, setFade] = useState(true);
//   const [Status, setStatus] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showMore, setShowMore] = useState(false);

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
//       if (keycloakService.isLoggedIn() && KeycloakService.hasRole("Voter")) {
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
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 sm:p-8"
//     >
//       <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
//         <motion.div 
//           className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 sm:p-10 text-center relative overflow-hidden"
//           initial={{ height: "auto" }}
//           animate={{ height: "auto" }}
//           transition={{ duration: 0.5 }}
//         >
//           <motion.div
//             className="absolute inset-0 opacity-10"
//             initial={{ backgroundPosition: "0% 0%" }}
//             animate={{ backgroundPosition: "100% 100%" }}
//             transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
//             style={{
//               backgroundImage: "url('path_to_your_background_pattern.svg')",
//               backgroundSize: "cover",
//             }}
//           />
//           <motion.h1
//             className={`text-4xl sm:text-5xl font-bold mb-4 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
//             initial={{ y: -20 }}
//             animate={{ y: 0 }}
//             transition={{ duration: 0.5 }}
//           >
//             {messages[language]}
//           </motion.h1>
//           <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.5 }}
//             className="text-xl mb-6"
//           >
//             Empowering citizens through digital democracy
//           </motion.p>
//           {(KeycloakService.hasRole("Voter") && Status !== "Completed") && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.2, duration: 0.3 }}
//               className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4 rounded-r max-w-2xl mx-auto"
//             >
//               <p className="font-bold">Action Required:</p>
//               <p>Your fingerprint is not registered. Please visit a designated office to complete registration.</p>
//             </motion.div>
//           )}
//         </motion.div>

//         <div className="p-8">
//           <h2 className="text-3xl font-semibold mb-6 text-gray-800">Quick Actions</h2>
//           <motion.div 
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//             variants={{
//               hidden: { opacity: 0 },
//               show: {
//                 opacity: 1,
//                 transition: {
//                   staggerChildren: 0.1
//                 }
//               }
//             }}
//             initial="hidden"
//             animate="show"
//           >
//             {actions.slice(0, showMore ? actions.length : 6).map((action, index) => (
//               <motion.div
//                 key={index}
//                 variants={{
//                   hidden: { opacity: 0, y: 20 },
//                   show: { opacity: 1, y: 0 }
//                 }}
//               >
//                 <ActionCard
//                   icon={iconMap[action.icon] || FaUserEdit}
//                   action={action.action}
//                   description={action.description}
//                   link={action.link}
//                   role={action.roles}
//                 />
//               </motion.div>
//             ))}
//           </motion.div>
//           {actions.length > 6 && (
//             <motion.button
//               onClick={() => setShowMore(!showMore)}
//               className="mt-6 flex items-center justify-center w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {showMore ? "Show Less" : "Show More"}
//               <FaChevronDown className={`ml-2 transform transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
//             </motion.button>
//           )}
//         </div>

//         <motion.div 
//           className="bg-gray-100 p-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//         >
//           <h2 className="text-3xl font-semibold mb-6 text-gray-800">Latest Updates</h2>
//           <Carousel />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };