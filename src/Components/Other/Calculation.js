import {useEffect, useState} from 'react';
import NetworthFinder from "../../Apis/NetworthFinder";

const Calculation = ({type}) => {

    const [datas, setDatas] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [totalCapital, setTotalCapital] = useState(0);
    const [totalProfit, setTotalProfit] = useState(0);
    let value = 0;
    let capital = 0;

    const calc = () => {
        for(let i=0;i<datas.length;i++){
            value = value + datas[i].values;
            capital = capital + datas[i].exvalue;
        }

        setTotalValue(value);
        setTotalCapital(capital);
        setTotalProfit(value - capital);
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await NetworthFinder.get("/")
                if(response.data.length !==0 ){
                    for(let i=0;i<response.data.length;i++){
                        if(response.data[i].invest == true){
                            setDatas(data => [...data, response.data[i]])
                        }
                    }
                }
                
            } catch (err) {
                console.error(err.message);
            }
        };
    
        fetchData();
    
    },[])

    useEffect(() => {

        calc();    
    
    },[datas])

    if(datas && type === "profit"){
        return(
            <>{totalProfit}</>
        )
    }
}

export default Calculation;

