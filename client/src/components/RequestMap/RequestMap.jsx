import React from "react";
import "./styles.css";
import Map from "../Map/Map";
import { MapContainer, TileLayer } from "react-leaflet";

const RequestMap = ({
    data,
    district, setDistrict,
    center,
    bounds, setBounds,
    date, setDate,
    reqTypes, setReqTypes
}) => {

    const districtDict = [
        { name: "Все", value: 0 },
        { name: "ЗАО", value: 800 },
        { name: "СВАО", value: 300 },
        { name: "ЦАО", value: 100 },
        { name: "ЮВАО", value: 500 },
        { name: "СЗАО", value: 900 },
        { name: "ЮЗАО", value: 700 },
        { name: "ЮАО", value: 600 },
        { name: "САО", value: 200 },
        { name: "ВАО", value: 400 },
        { name: "ЗелАО", value: 1000 }
    ]

    return (
        <div className="RequestMap">
            <div className="RequestMap__info">
                <form>
                    <div className="RequestMap__district-select">
                        <div className="RequestMap__ao">
                            Администр. округ:
                        </div>
                        <select
                            value={districtDict.find(e => e.value === district).name}
                            onChange={(ev) => setDistrict(
                                districtDict.find(e => e.name === ev.target.value).value
                            )}
                        >
                            <option>Все</option>
                            <option>ЗАО</option>
                            <option>ЗелАО</option>
                            <option>СВАО</option>
                            <option>ЦАО</option>
                            <option>ЮВАО</option>
                            <option>СЗАО</option>
                            <option>ЮЗАО</option>
                            <option>ЮАО</option>
                            <option>ВАО</option>
                            <option>САО</option>
                        </select>
                    </div>
                    <div className="RequestMap__date">
                        <input
                            type="date"
                            onChange={(ev) => {
                                setDate([ev.target.value, date[1]])
                            }}
                        />
                        -
                        <input
                            type="date"
                            onChange={(ev) => {
                                setDate([date[0], ev.target.value])
                            }}
                        />
                    </div>
                    <div className="RequestMap__types">
                        <label className="RequestMap__checkbox-container">Открытые
                            <input
                                type="checkbox"
                                defaultChecked={true}
                                onChange={(ev) => {
                                    setReqTypes([ev.target.checked, reqTypes[1], reqTypes[2]])
                                }}
                            />
                            <span className="RequestMap__checkmark"></span>
                        </label>
                        <label className="RequestMap__checkbox-container">Закрытые
                            <input
                                type="checkbox"
                                defaultChecked={true}
                                onChange={(ev) => {
                                    setReqTypes([reqTypes[0], ev.target.checked, reqTypes[2]])
                                }}
                            />
                            <span className="RequestMap__checkmark"></span>
                        </label>
                        <label className="RequestMap__checkbox-container">Аномальные
                            <input
                                type="checkbox"
                                defaultChecked={true}
                                onChange={(ev) => {
                                    setReqTypes([reqTypes[0], reqTypes[1], ev.target.checked])
                                }}
                            />
                            <span className="RequestMap__checkmark"></span>
                        </label>
                    </div>
                </form>
            </div>
            <div className="RequestMap__map">
                <MapContainer center={[55.749668, 37.623744]} zoom={11}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Map
                        data={data}
                        center={center}
                        bounds={bounds}
                        setBounds={setBounds}
                    />
                </MapContainer>
            </div>
        </div>
    )
}

export default RequestMap