import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import styles from './mystyle.module.css';
import commonStyles from './common.module.css';
function ViewPage(){
    const [getAllMysqlResult, setGetAllMysqlResult] = useState([]);
    const [getAllKafkaResult, setGetAllKafkaResult] = useState([]);

    const [submitInput, setSubmitInput] = useState([]);
    const [postResult, setPostResult] = useState([]);
    const [deleteResult, setDeleteResult] = useState([]);
    
    const [postError, setPostError] = useState('');
    const [deleteError, setDeleteError] = useState('');

    useEffect(()=>{ 
        const requestMysqlOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"TaskList" : ["Product:mysql:table:Operations:GET_ALL"], "MultiThread" : false}'
        };
        fetch('http://127.0.0.1:5000/task/1', requestMysqlOptions)
            .then(response => 
            {
              return response.json() 
            }
            ).then(data =>{ 
                setGetAllMysqlResult(JSON.parse(data).resource) 
              }
            ).catch(error => {
              console.log("error", error)
            })
    



        const requestKafkaOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"TaskList" : ["Product:kafka:topic:Operations:GET_ALL"], "MultiThread" : false}'
        };
        fetch('http://127.0.0.1:5000/task/1', requestKafkaOptions)
            .then(response => 
            {
                return response.json() 
            }
            ).then(data =>{ 
                let tmpData = JSON.parse(data[0]).data 
                setGetAllKafkaResult(tmpData)   
                }
            ).catch(error => {
                console.log("error", error)
            })
        },[postResult, deleteResult]);


    

    function handleSubmit(requestType, tableName){
        let requestInput = ""
        if(tableName == "mysql"){
            requestInput = '{"TaskList":["Product:mysql:table:Operations:'+requestType+' '+submitInput +'"], "MultiThread": false}'
        }else if(tableName == "kafka"){
            requestInput = '{"TaskList":["Product:kafka:topic:Operations:'+requestType+' '+submitInput +'"], "MultiThread": false}'
        }
      
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestInput
        }; 
        fetch('http://127.0.0.1:5000/task/1', requestOptions)
        .then(response => 
        {   
            if (!response.ok) { 
                if (requestType == "POST"){
                    setPostError("Error, status code is "+response.status);
                    setPostResult([])
                }else if(requestType == "DELETE"){
                    setDeleteError("Error, status code is "+response.status);
                    setDeleteResult([])
                } 
                throw new Error("Error, status code is "+response.status)
              } 
              return response.json()  
        }
        ).then(data =>{ 
            if (requestType == "POST"){ 
                setPostError("")
                setPostResult(data)  
            } else if (requestType == "DELETE"){
                if (data[0].search("error") > 0){
                    setDeleteError(data[0]);
                    setDeleteResult([])
                }else{
                    setDeleteError("")
                    setDeleteResult(data) 
                }
                
            }
          }
        ).catch(error => {
          console.log("error", error)
        })
    }

    //css
    //之后的任务是，把ETL修好
    return (
        <div>
        <div className={commonStyles.left}>left side setting</div>

        <div className={commonStyles.right}> 
            <div className={styles.tableBlock}>  
                <p> MySQL Table</p>
                <table className={styles.table}>
                    <tr>
                    <th>Name</th> 
                    <th>ID</th> 
                    <th>Complete</th> 
                    </tr>

                    {getAllMysqlResult.map((entry) => (
                        <tr key={entry.id}>
                            <td> {entry.name}</td>
                            <td> {entry.id}</td>
                            <td> {entry.complete.toString()} </td>
                        </tr>
                    ))}
                </table>  
            </div>

            {/* 把table 和 左边的三个导引栏做好 */}
            {/* 休息一下 学os 或者 269 presentation */}
            
            <div className={styles.inputBlock}>
                <p> Modify MySQL</p>
                <div>
                    <input className = {styles.input} placeholder='resource:[{name:test}, {name:test2}]' onInput={e => setSubmitInput(e.target.value)} type="text" name="task_json" /> 
                    <button className = {styles.button} onClick={() =>handleSubmit("POST", "mysql")} type="submit" value="postSubmit">POST </button>
                    <p>{postError ? postError : ""}</p> <p>{postResult.length > 0? "Success":""}</p>
                            
                    <br></br>
                    <input className = {styles.input}  placeholder='id:6' onInput={e => setSubmitInput(e.target.value)} type="text" name="task_json" /> 
                    <button className = {styles.button} onClick={() =>handleSubmit("DELETE", "mysql")} >DELETE </button>
                    <p>{deleteError ? deleteError : ""}</p> <p>{deleteResult.length > 0? "Success":""}</p>
                    
                    <br></br>
                    <input className = {styles.input} onInput={e => setSubmitInput(e.target.value)} type="text" name="task_json" /> 
                    <button className = {styles.button}>ETL </button>
                </div>

            </div>
            
            <div className={styles.tableBlock}>  
                <p> Kafka Table</p>
                <table className={styles.table}>
                    <tr>
                    <th>Topic Name</th> 
                    <th>ID</th> 
                    </tr>
                    {getAllKafkaResult.map((entry, index) => (
                        <tr key={index}>
                            <td> {entry.topic_name}</td>
                            <td> {index}</td>
                        </tr>
                    ))}
                </table>  
            </div>
         

            <div className={styles.inputBlock}>
                <p > Modify Kafka</p>
                <div>
                    <input className = {styles.input} placeholder='topic_name:t1' onInput={e => setSubmitInput(e.target.value)} type="text" name="task_json" /> 
                    <button className = {styles.button} onClick={() =>handleSubmit("POST", "kafka")} type="submit" value="postSubmit">POST </button>
                    <p>{postError ? postError : ""}</p> <p>{postResult.length > 0? "Success":""}</p>
                            
                    <br></br>
                    <input className = {styles.input} placeholder='topic_name:t1' onInput={e => setSubmitInput(e.target.value)} type="text" name="task_json" /> 
                    <button className = {styles.button} onClick={() =>handleSubmit("DELETE", "kafka")} >DELETE </button>
                    <p>{deleteError ? deleteError : ""}</p> <p>{deleteResult.length > 0? "Success":""}</p>
                    
                    <br></br>
                    <input className = {styles.input}  onInput={e => setSubmitInput(e.target.value)} type="text" name="task_json" /> 
                    <button className = {styles.button} >ETL </button>
                </div>

            </div>

        </div>
         
        </div>
    );
}

export default ViewPage;