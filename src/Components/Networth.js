import { useState, useEffect } from "react";


const Networth = () => {

    const [data,setData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/networth", {
                    method: "GET"
                });
        
                const parseData = await res.json();
                console.log(parseData[0].names);
                setData(parseData[0].names);

                } catch (err) {
                console.error(err.message);
            }
        };

        fetchData();

    },[])

    return(
        <>
        <div>{data}</div>
        <div>Networth</div>
        <div>test</div>
        </>
    );
}

export default Networth;