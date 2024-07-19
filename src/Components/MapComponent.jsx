import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const MapComponent = () => {
    const mapStyles = {
        height: "1000px",
        width: "1000px"
    };

    const contentStyle = {
        maxWidth: '1000px',
        width: '1000px',
        height: '1000px'
    };

    const [center, setCenter] = useState(null);

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

    const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCenter({ lat, lng });
    };

    return (
        <Popup
            trigger={
                <button>
                    <svg width="40" height="40" viewBox="0 0 76 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.9997 43.75C44.9853 43.75 50.6663 38.1438 50.6663 31.25C50.6663 24.3562 44.9853 18.75 37.9997 18.75C31.014 18.75 25.333 25.333 31.25C25.333 38.1438 31.014 43.75 37.9997 43.75ZM37.9997 25C41.4925 25 44.333 27.8031 44.333 31.25C44.333 34.6969 41.4925 37.5 37.9997 37.5C34.5068 37.5 31.6663 34.6969 31.6663 31.25C31.6663 27.8031 34.5068 25 37.9997 25Z" fill="black"/>
                        <path d="M36.163 68.1687C36.6989 68.5465 37.341 68.7495 37.9996 68.7495C38.6582 68.7495 39.3003 68.5465 39.8363 68.1687C40.799 67.4969 63.4248 51.375 63.333 31.25C63.333 17.4656 51.9678 6.25 37.9996 6.25C24.0315 6.25 12.6663 17.4656 12.6663 31.2344C12.5745 51.375 35.2003 67.4969 36.163 68.1687ZM37.9996 12.5C48.4781 12.5 56.9996 20.9094 56.9996 31.2656C57.0661 45.1344 43.1043 57.5875 37.9996 61.6719C32.8981 57.5844 18.9331 45.1281 18.9996 31.25C18.9996 20.9094 27.5211 12.5 37.9996 12.5Z" fill="black"/>
                    </svg>
                </button>
            }
            modal
            lockScroll={true}
            contentStyle={contentStyle}
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> Select the Location </div>
                    <LoadScript googleMapsApiKey="AIzaSyCyn3Iymp1NpFUBho-3HfzzMrnJSLKaqgA">
                        <GoogleMap
                            mapContainerStyle={mapStyles}
                            zoom={13}
                            center={center}
                        >
                            <Marker
                                position={center}
                                draggable={true}
                                onDragEnd={onMarkerDragEnd}
                            />
                        </GoogleMap>
                    </LoadScript>
                    <button
                        type="button"
                        className="button"
                        onClick={() => {
                            console.log('modal closed');
                            close();
                        }}
                    >
                        close modal
                    </button>
                </div>
            )}
        </Popup>
    );
};

export default MapComponent;
