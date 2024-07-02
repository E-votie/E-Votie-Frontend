import React, { useEffect, useState } from 'react';
import Carousel from '../../Components/Carousel';
import ActionCard from '../../Components/ActionCard';

const actions = ["Party Details", "Candidates", "Manifestos", "Elections", "Inquiries", "Announcements"];

const messages = {
  en: "Welcome to our website!",
  si: "අපගේ වෙබ් අඩවියට සාදරයෙන් පිළිගනිමු!",
  ta: "எங்கள் வலைத்தளத்திற்கு வரவேற்கிறோம்!"
};

export const Home = () => {
  const [language, setLanguage] = useState('en'); // Default language is English
  const [fade, setFade] = useState(true); // State for fade animation
  const languageOrder = ['en', 'si', 'ta'];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out
      setTimeout(() => {
        setLanguage((prevLanguage) => {
          const currentIndex = languageOrder.indexOf(prevLanguage);
          const nextIndex = (currentIndex + 1) % languageOrder.length;
          return languageOrder[nextIndex];
        });
        setFade(true); // Start fade in
      }, 500); // Match this to the fade-out transition duration
    }, 5000); // Change language every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="min-h-[480px] flex flex-col justify-between bg-base-100 shadow-xl px-4">
      <div className="h-1/5 flex flex-col justify-center items-center text-3xl">
        <h1 className={`transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {messages[language]}
        </h1>
      </div>
      <div className="h-2/5 flex flex-wrap gap-4 justify-center items-center">
        {actions.map((action, index) => (
          <ActionCard key={index} action={action}/>
        ))}
      </div>
      <div className="h-2/5 flex flex-col justify-center items-center border-3 border-red-950">
        <Carousel />
      </div>
    </div>
  );
};

export default Home;