import React, { useEffect, useState, useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { PollingStationsContext } from './../Pages/Election/PollingStationsContext.jsx';

const MapWithMarkers = ({ onLocationSelect }) => {
    const mapStyles = {
        height: "500px",
        width: "650px",
        maxWidth: "800px",
        margin: "20px auto"
    };

    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [markers, setMarkers] = useState([]);
    const [tempMarker, setTempMarker] = useState(null);

    const { pollingStations, selectedPollingDistrict } = useContext(PollingStationsContext);

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
                    setCenter({ lat: 7.8731, lng: 80.7718 }); // Default to Sri Lanka's center
                }
            );
        } else {
            console.log("Geolocation is not available");
            setCenter({ lat: 7.8731, lng: 80.7718 }); // Default to Sri Lanka's center
        }
    }, []);

    useEffect(() => {
        if (selectedPollingDistrict && pollingStations[selectedPollingDistrict]) {
            const newMarkers = pollingStations[selectedPollingDistrict].map(station => {
                const [lat, lng] = station.coordinates.split(',').map(Number);
                return { position: { lat, lng }, name: station.name };
            });
            setMarkers(newMarkers);
        } else {
            setMarkers([]);
        }
    }, [selectedPollingDistrict, pollingStations]);

    const onMapClick = (e) => {
        const newPosition = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };
        setTempMarker(newPosition);
        onLocationSelect(newPosition.lat, newPosition.lng);
    };

    return (
        <div>
            <LoadScript googleMapsApiKey="AIzaSyCyn3Iymp1NpFUBho-3HfzzMrnJSLKaqgA">
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={8}
                    center={center}
                    onClick={onMapClick}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            key={index}
                            position={marker.position}
                            title={marker.name}
                        />
                    ))}
                    {tempMarker && (
                        <Marker
                            position={tempMarker}
                            icon={{
                                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                            }}
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapWithMarkers;