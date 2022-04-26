import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';

function ResultPage(){
    const [get_allResult, setGet_AllResult] = useState([]);

    const location = useLocation();
    useEffect(()=>{ 
        let data_all = location.state.plaintext;
        let task_all = location.state.tasklist;
        const data_arr = [];
        for (var i = 0; i<data_all.length; i++){
            let tmp = JSON.parse(data_all[i]);
            if (tmp.hasOwnProperty('error_code')){
                data_arr.push({"id":i, "task": task_all[i], "success": false, "result":  tmp.message, "len":1})
            }else{
                if (tmp.kind == 'KafkaTopicList'){
                    //deal with GET_ALL
                    let result_list = [];
                    for(var j = 0; j<tmp.data.length; j++){
                        var obj = tmp.data[j];
                        result_list.push({"id":j, "topic_name": obj.topic_name});
                    }
                    data_arr.push({"id":i, "task": task_all[i], "success": true, "result": result_list, "len": result_list.length})
                } else {
                    //deal with POST, DEL kafkaTopic
                    data_arr.push({"id":i, "task": task_all[i], "success": true, "result": "Success "+obj.topic_name, "len": 1})
                }
            }
        };
        setGet_AllResult(data_arr);
        },[]);

    return (
        <div className="ResultPage">
        <label>
            Result Page here haha
        </label>
        <ul>
            {get_allResult.map((entry) => (
                <li key={entry.id}>
                    <span> Task: {entry.task}</span>
                    <span>
                        <p>{
                            entry.len==1 ? 
                            entry.success + entry.result : 
                            entry.result.map((e)=>(
                                <p key={e.id}> {e.topic_name} </p>
                             )
                             )
                        }</p>
                    </span>
                </li>
            ))}
        </ul>
      </div>
    );
}

export default ResultPage;