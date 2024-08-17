import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

const SriLankaMap = ({ sriLankaGeoJSON, zoom = 7 }) => {
    const navigate = useNavigate();
    const [geoJsonData, setGeoJsonData] = useState(null);

    function MapController({ geoJsonData }) {
        const map = useMap();

        useEffect(() => {
            if (geoJsonData) {
                const bounds = L.geoJSON(geoJsonData).getBounds();
                map.fitBounds(bounds);
            }
        }, [geoJsonData, map]);

        return null;
    }

    useEffect(() => {
        import(`./../../public/GeoData/${sriLankaGeoJSON}.json`)
            .then((module) => {
                setGeoJsonData(module.default);
            })
            .catch((error) => {
                console.error("Error loading the GeoJSON file:", error);
            });
    }, [sriLankaGeoJSON]);

    const districtColors = {
        'Ampara': '#0e723a', 'Anuradhapura': '#b41f24', 'Badulla': '#b41f24',
        'Batticaloa': '#0e723a', 'Colombo': '#b41f24', 'Galle': '#b41f24',
        'Gampaha': '#b41f24', 'Hambantota': '#b41f24', 'Jaffna': '#0e723a',
        'Kalutara': '#b41f24', 'Kandy': '#b41f24', 'Kegalle': '#b41f24',
        'Kilinochchi': '#0e723a', 'Kurunegala': '#b41f24', 'Mannar': '#0e723a',
        'Matale': '#b41f24', 'Matara': '#b41f24', 'Monaragala': '#b41f24',
        'Mullaitivu': '#0e723a', 'Nuwara Eliya': '#0e723a', 'Polonnaruwa': '#b41f24',
        'Puttalam': '#b41f24', 'Ratnapura': '#b41f24', 'Trincomalee': '#b41f24',
        'Vavuniya': '#0e723a'
    };

    const getColor = (code) => districtColors[code] || '#CCCCCC';

    const onEachFeature = (feature, layer) => {
        if (feature.properties) {
            layer.bindPopup(`
                <strong>District:</strong> ${feature.properties.ADM2_EN || 'Unknown'}<br>
                <strong>Province:</strong> ${feature.properties.ADM1_EN}
            `);

            const originalStyle = {
                fillColor: getColor(feature.properties.ADM2_EN),
                fillOpacity: 0.9
            };

            layer.on({
                mouseover: (e) => {
                    e.target.setStyle({
                        fillColor: 'gray',
                        fillOpacity: 0.4
                    });
                },
                mouseout: (e) => {
                    e.target.setStyle(originalStyle);
                },
                click: () => {
                    navigate(`district/${feature.properties.ADM2_EN}`);
                }
            });
        }
    };

    const style = (feature) => {
        return {
            fillColor: getColor(feature.properties.ADM2_EN),
            weight: 1,
            opacity: 1,
            color: 'black',
            fillOpacity: 0.9
        };
    };

    return (
        <MapContainer
            center={[7.8731, 80.7718]}
            zoom={zoom}
            style={{ height: "450px", width: "100%", background: 'transparent' }}
        >
            <MapController geoJsonData={geoJsonData} />
            {geoJsonData && (
                <GeoJSON
                    data={geoJsonData}
                    onEachFeature={onEachFeature}
                    style={style}
                />
            )}
        </MapContainer>
    );
};

export default SriLankaMap;