import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapWithMarkers = ({ onLocationSelect }) => {
    const mapStyles = {
        height: "500px",
        width: "650px",
        maxWidth: "800px",
        margin: "20px auto"
    };

    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [markerPosition, setMarkerPosition] = useState(null);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setCenter({ lat: 0, lng: 0 }); // Default fallback
                }
            );
        } else {
            console.log("Geolocation is not available");
            setCenter({ lat: 0, lng: 0 }); // Default fallback
        }
    }, []);

    const onMapClick = (e) => {
        const newPosition = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        setMarkerPosition(newPosition);
        onLocationSelect(newPosition.lat, newPosition.lng);
    };

    const onMarkerDragEnd = (e) => {
        const newPosition = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        setMarkerPosition(newPosition);
        onLocationSelect(newPosition.lat, newPosition.lng);
    };

    return (
        <div>
            <LoadScript googleMapsApiKey="AIzaSyCyn3Iymp1NpFUBho-3HfzzMrnJSLKaqgA">
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={center}
                    onClick={onMapClick}
                >
                    {markerPosition && (
                        <Marker
                            position={markerPosition}
                            draggable={true}
                            onDragEnd={onMarkerDragEnd}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
            {markerPosition && (
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    {/*<h3>Selected Location:</h3>*/}
                    {/*<p>Latitude: {markerPosition.lat.toFixed(6)}</p>*/}
                    {/*<p>Longitude: {markerPosition.lng.toFixed(6)}</p>*/}
                </div>
            )}
        </div>
    );
};

export default MapWithMarkers;