// 1. response 404, error what to show
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

function ResultPage(){
    // const [plaintext, setPlaintext] = useState('');
    const [get_allResult, setGet_AllResult] = useState([]);
    const location = useLocation();
    useEffect(()=>{ 
        let data = location.state.plaintext.data;
        // console.log("plaintext", plaintext);
        console.log("data", data);
        const arr = []
        for(var i = 0; i<data.length; i++){
            var obj = data[i];
            console.log(obj.topic_name);
            arr.push({"topic_name": obj.topic_name});
        }
        setGet_AllResult(arr)
        console.log(get_allResult); 
    }, []);

    return (
        <div className="ResultPage">
        <label>
            Result Page here
        </label>
        
        <ul>
            {get_allResult.map((entry, index) => (
                <li key={index}>
                    <span> Topic Name: {entry.topic_name}</span>
                </li>
            ))}
        </ul>
      </div>
    );
}

export default ResultPage;