// // DraggableMarkerMap.jsx
// import React, { useState } from 'react';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
//
// const mapContainerStyle = {
//     width: '100vw',
//     height: '100vh',
// };
//
// const center = {
//     lat: 37.7749,
//     lng: -122.4194, // San Francisco coordinates
// };
//
// const MapWithMarkers = () => {
//     const { isLoaded, loadError } = useLoadScript({
//         googleMapsApiKey: 'AIzaSyCyn3Iymp1NpFUBho-3HfzzMrnJSLKaqgA', // Replace with your API key
//     });
//
//     const [markerPosition, setMarkerPosition] = useState(center);
//
//     const handleMarkerDragEnd = (event) => {
//         const newLat = event.latLng.lat();
//         const newLng = event.latLng.lng();
//         setMarkerPosition({ lat: newLat, lng: newLng });
//     };
//
//     if (loadError) return <div>Error loading maps</div>;
//     if (!isLoaded) return <div>Loading Maps</div>;
//
//     return (
//         <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             zoom={10}
//             center={center}
//         >
//             <Marker
//                 position={markerPosition}
//                 draggable={true}
//                 onDragEnd={handleMarkerDragEnd}
//             />
//         </GoogleMap>
//     );
// };
//
// export default DraggableMarkerMap;
