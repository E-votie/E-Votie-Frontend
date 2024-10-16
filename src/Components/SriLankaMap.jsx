import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

const SriLankaMap = ({ sriLankaGeoJSON, zoom = 7, level = 'ADM2_EN', districtColors }) => {
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

    const getColor = (code) => districtColors[code] || '#CCCCCC';

    const onEachFeature = (feature, layer) => {
        if (feature.properties) {
            layer.bindPopup(`
                <strong>District:</strong> ${feature.properties[level] || 'Unknown'}<br>
                <strong>Province:</strong> ${feature.properties[level]}
            `);

            const originalStyle = {
                fillColor: getColor(feature.properties[level]),
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
                    navigate(`district/${feature.properties[level]}`);
                }
            });
        }
    };

    const style = (feature) => {
        return {
            fillColor: getColor(feature.properties[level]),
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