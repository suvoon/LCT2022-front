import { useEffect, useState } from "react";
import axios from "axios";
import RequestList from "../RequestList/RequestList";
import RequestMap from "../RequestMap/RequestMap";
import RequestAnalytics from "../RequestAnalytics/RequestAnalytics";
import "./styles.css";

const RequestContainer = ({ currentPath, query, server }) => {

    const [district, setDistrict] = useState(300);
    const [data, setData] = useState(null);
    const [center, setCenter] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [bounds, setBounds] = useState([0, 0, 0, 0]);
    const [date, setDate] = useState([null, null]);
    const [reqTypes, setReqTypes] = useState([true, true, true]);
    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `${server}application/?district=${district}`
                );
                setData(response.data);
                //setError(null);
            } catch (err) {
                //setError(err.message);
                setData(null);
            } finally {
                //setLoading(false);
            }
        };
        getData();
    }, [district, server]);


    useEffect(() => {
        setFilterData(data?.filter(rqst => {
            const condQuery = query
                ? (rqst.adress_id.adress.toLowerCase().includes(query.toLowerCase())
                    || rqst.defect_id_id === query
                    || rqst.unique_id === query)
                : true;
            const condDate = (date[0] && date[1])
                ? new Date(rqst.started_at.slice(0, 10)) >= new Date(date[0])
                && new Date(rqst.started_at.slice(0, 10)) <= new Date(date[1])
                : true;
            const condTypes =
                (reqTypes[2] ? true : !rqst.anomaly)
                && (reqTypes[0] ? true : rqst.status === 'request_resolved')
                && (reqTypes[1] ? true : (rqst.status !== 'request_resolved' || rqst.anomaly))
            return condQuery && condDate && condTypes;
        }) || []);
    }, [query, data, date, reqTypes]);

    const leftPanel = currentPath === 'analytics'
        ? <RequestAnalytics
            district={district}
            server={server}
        />
        : <RequestList
            data={filterData}
            center={center}
            setCenter={setCenter}
            bounds={bounds}
        />;

    return (
        <div className="RequestContainer">
            {data &&
                <>
                    {leftPanel}
                    <RequestMap
                        data={filterData}
                        district={district}
                        setDistrict={setDistrict}
                        bounds={bounds}
                        setBounds={setBounds}
                        date={date}
                        setDate={setDate}
                        reqTypes={reqTypes}
                        setReqTypes={setReqTypes}
                        center={center}
                    />
                </>}
        </div>
    )
}

export default RequestContainer