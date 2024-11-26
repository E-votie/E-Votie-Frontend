import React, { useEffect, useState } from 'react';

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: "https://elections.gov.lk/7.jpg" },
    { image: "https://elections.gov.lk/3.jpg" },
    { image: "https://elections.gov.lk/5.jpg" },
    { image: "/e-votie-high-resolution-logo-white.png" },

  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handlePrevClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNextClick = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="relative w-4/5 h-64 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white text-black p-2"
      >
        ❮
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white text-black p-2"
      >
        ❯
      </button>
    </div>
  );
}

export default Carousel;


// import React, { useEffect, useState } from 'react';

// function Carousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const slides = [
//     { topic: "Announcement 1", description: "Welcome to our website!" },
//     { topic: "Announcement 2", description: "Check out our new features!" },
//     { topic: "Announcement 3", description: "Don't miss our upcoming events!" },
//     { topic: "Announcement 4", description: "Stay tuned for more updates!" },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//     }, 5000); // Change slide every 5 seconds

//     return () => clearInterval(interval); // Cleanup on component unmount
//   }, [slides.length]);

//   return (
//     <div className="relative w-3/5 h-52 overflow-hidden">
//       {slides.map((announcement, index) => (
//         <div
//           key={index}
//           className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
//             index === currentSlide ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <div className="absolute left-5 right-5 top-1/2 flex items-center justify-between -translate-y-1/2 transform bg-blue-500 text-white p-4 h-full">
//             <button
//               onClick={() => setCurrentSlide(index === 0 ? slides.length - 1 : index - 1)}
//               className="btn btn-circle bg-white text-black"
//             >
//               ❮
//             </button>
//             <div className="flex flex-col items-center justify-center h-full">
//               <h2 className="text-3xl">{announcement.topic}</h2>
//               <p>{announcement.description}</p>
//             </div>
//             <button
//               onClick={() => setCurrentSlide((index + 1) % slides.length)}
//               className="btn btn-circle bg-white text-black"
//             >
//               ❯
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Carousel;
