import React, { useCallback, useEffect, useState } from "react";
import L from "leaflet";
import "./styles.css";
import useSupercluster from "use-supercluster";
import { Marker, useMap, Popup } from "react-leaflet";
import "leaflet-rotatedmarker";

const icons = {};
const fetchIcon = (count, size) => {
    let color;

    if (count < 10) {
        color = "yellow";
    } else if (count < 50) {
        color = "orange";
    } else {
        color = "red";
    }

    if (!icons[count]) {
        icons[count] = L.divIcon({
            html: `
            <div 
                class="cluster-marker ${color}" 
                style="width: ${size * 1.1}px; height: ${size * 1.1}px;">
                ${count}
            </div>`,
        });
    }
    return icons[count];
};

const qmark = new L.Icon({
    iconUrl: "/qmark.png",
    iconSize: [22, 26],
});

const exmark = new L.Icon({
    iconUrl: "/exmark.png",
    iconSize: [22, 26],
});

function Map({ data, center, bounds, setBounds }) {
    const maxZoom = 22;
    const [zoom, setZoom] = useState(12);
    const map = useMap();
    let latLongList = {};

    // get map bounds
    function updateMap() {
        const b = map.getBounds();
        setBounds([
            b.getSouthWest().lng,
            b.getSouthWest().lat,
            b.getNorthEast().lng,
            b.getNorthEast().lat,
        ]);
        setZoom(map.getZoom());
    }

    const onMove = useCallback(() => {
        updateMap();
    }, []);

    useEffect(() => {
        if (center) {
            map.setView(center, 18, {
                animate: true,
            });
        }
    }, [center, map]);

    useEffect(() => {
        updateMap();
    }, []);

    useEffect(() => {
        map.on("move", onMove);
        return () => {
            map.off("move", onMove);
        };
    }, [map, onMove]);

    const points = data.map((rqst) => {
        const latLong = [rqst.adress_id.latitude, rqst.adress_id.longitude];
        latLongList[`${latLong}`]
            ? latLongList[`${latLong}`] += 1
            : latLongList[`${latLong}`] = 1;

        let rq_score = '';
        switch (rqst.score) {
            case -1:
                rq_score = 'Плохо'
                break;
            case 0:
                rq_score = 'Нормально'
                break;
            case 1:
                rq_score = 'Хорошо'
                break;
            default:
                break;
        }

        return ({
            type: "Feature",
            properties: {
                cluster: false,
                rqstId: rqst.unique_id,
                anomaly: rqst.anomaly,
                description: rqst.description,
                score: rq_score,
                address: rqst.adress_id.adress,
                order: latLongList[`${latLong}`]
            },
            geometry: {
                type: "Point",
                coordinates: [
                    latLong[1],
                    latLong[0],
                ],
            },
        })
    });

    const { clusters, supercluster } = useSupercluster({
        points: points,
        bounds: bounds,
        zoom: zoom,
        options: { radius: 75, maxZoom: 17 },
    });

    return (
        <>
            {clusters.map((cluster) => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const { cluster: isCluster, point_count: pointCount } =
                    cluster.properties;
                const angle = 360 / latLongList[`${latitude},${longitude}`] * cluster.properties.order;
                if (isCluster) {
                    return (
                        <Marker
                            key={`cluster-${cluster.id}`}
                            position={[latitude, longitude]}
                            icon={fetchIcon(
                                pointCount,
                                10 + (pointCount / points.length) * 40
                            )}
                            eventHandlers={{
                                click: () => {
                                    const expansionZoom = Math.min(
                                        supercluster.getClusterExpansionZoom(cluster.id),
                                        maxZoom
                                    );
                                    map.setView([latitude, longitude], expansionZoom, {
                                        animate: true,
                                    });
                                },
                            }}
                        />
                    );
                }
                return (
                    <Marker
                        rotationAngle={angle}
                        key={`crime-${cluster.properties.rqstId}`}
                        position={[latitude, longitude]}
                        icon={cluster.properties.anomaly
                            ? exmark
                            : qmark}
                    >
                        <Popup>
                            <div>
                                <p>id:{cluster.properties.rqstId}</p>
                                <h2>{cluster.properties.address}</h2>
                                <p>{cluster.properties.description}</p>
                                <p>Оценка пользователя: {cluster.properties.score}</p>
                            </div>
                        </Popup>
                    </Marker>
                );
            })}
        </>
    );
}

export default Map;