import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import styles from './mystyle.module.css';
import './resultpage.css';  
function ResultPage(){
    const [get_allResult, setGet_AllResult] = useState([]);
    const location = useLocation();
    useEffect(()=>{ 
        let data_all = location.state.plaintext;
        let task_all = location.state.tasklist;
        const data_arr = []; 
        for (var i = 0; i<data_all.length; i++){
            let tmp = JSON.parse(data_all[i]);
                if (task_all[i].includes("kafka")){


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
                            data_arr.push({"id":i, "task": task_all[i], "success": true, "result": "Success "+tmp.topic_name, "len": 1})
                        }
                    }

                }else if (task_all[i].includes("mysql")){

                    if (tmp.hasOwnProperty('error')){ 
                        data_arr.push({"id":i, "task": task_all[i], "success": false, "result":  tmp.error.message, "len":1})
                    }else{

                        if(task_all[i].includes("GET_ALL")){ 
                            let result_list = [];
                            for(var j = 0; j<tmp.resource.length; j++){
                                var obj = tmp.resource[j];
                                result_list.push({"id":obj.id, "topic_name": obj.name});
                            }
                            data_arr.push({"id":i, "task": task_all[i], "success": true, "result": result_list, "len": result_list.length})

                        }else if(task_all[i].includes(":GET") && ! task_all[i].includes("GET_ALL" )){ 
                            let result_list = [];
                            result_list.push({"id":"id: "+tmp.id, "topic_name": "name: "+tmp.name});
                            data_arr.push({"id":i, "task": task_all[i], "success": true, "result": result_list, "len":2})

                        }
                        else{ 
                            data_arr.push({"id":i, "task": task_all[i], "success": true, "result": "Success ", "len": 1})

                        }
                }
                }

            
        };
        setGet_AllResult(data_arr);
        },[]);

    return (
        <div className={styles.right}>
  
        <div>
            {get_allResult.map((entry) => (
                <div className = "resultblock" key={entry.id}>
                    <span className='task'> Task: {entry.task}</span>
                    <span>
                        <p>{
                            entry.len==1 ? 
                            entry.success + entry.result : 
                            entry.result.map((e)=>(
                                <tr>
                                    <td className='td'> {e.topic_name} </td> 
                                    <td> {e.id}</td>
                                </tr>
                                
                             )
                             )
                        }</p>

                    </span>
                </div>
            ))}
        </div>
      </div>
    );
}

export default ResultPage;