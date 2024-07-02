import React, { useEffect, useState } from 'react';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     "Announcement 1: Welcome to our website!",
//     "Announcement 2: Check out our new features!",
//     "Announcement 3: Don't miss our upcoming events!",
//     "Announcement 4: Stay tuned for more updates!",
//   ];

  const slides = [
    {
        "topic" : "Announcement 1",
        "description" : "Welcome to our website!"
    },
    {
        "topic" : "Announcement 2",
        "description" : "Check out our new features!"
    },    
    {
        "topic" : "Announcement 3",
        "description" : "Don't miss our upcoming events!"
    },
    {
        "topic" : "Announcement 4",
        "description" : "Check out our new features!"
    },
    {
        "topic" : "Announcement 5",
        "description" : "Stay tuned for more updates!"
    }
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [slides.length]);

  return (
    <div className="relative w-2/5 h-52 overflow-hidden">
      {slides.map((announcement, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute left-5 right-5 top-1/2 flex items-center justify-between -translate-y-1/2 transform bg-blue-500 text-white p-4">

            <button
              onClick={() => setCurrentSlide(index === 0 ? slides.length - 1 : index - 1)}
              className="btn btn-circle bg-white text-black"
            >
              ❮
            </button>

            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-3xl">{announcement.topic}</h2>
                <h3>{announcement.description}</h3>
            </div>

            <button
              onClick={() => setCurrentSlide((index + 1) % slides.length)}
              className="btn btn-circle bg-white text-black"
            >
              ❯
            </button>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Carousel;
