import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const RequestAnalytics = ({ region }) => {

    const [data, setData] = useState(null);
    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/visualization?region=${region}`
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
    }, [region]);

    return (
        <div className="RequestAnalytics" >
            <img src={data} alt={'analytics'} />
        </div>
    )
}

export default RequestAnalytics