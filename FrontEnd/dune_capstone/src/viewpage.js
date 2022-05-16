import { useEffect, useState } from 'react';
import styles from './mystyle.module.css'; 
function ViewPage(){
    const [getAllMysqlResult, setGetAllMysqlResult] = useState([]);
    const [getAllKafkaResult, setGetAllKafkaResult] = useState([]);

    const [submitInput, setSubmitInput] = useState([]);
    const [postResultMysql, setPostResultMysql] = useState([]);
    const [deleteResultMysql, setDeleteResultMysql] = useState([]);
    const [etlResultMysql, setEtlResultMysql] = useState([]);
    
    const [postErrorMysql, setPostErrorMysql] = useState('');
    const [deleteErrorMysql, setDeleteErrorMysql] = useState('');
    const [etlErrorMysql, setEtlErrorMysql] = useState([]);

    const [postResultKafka, setPostResultKafka] = useState([]);
    const [deleteResultKafka, setDeleteResultKafka] = useState([]);
    const [etlResultKafka, setEtlResultKafka] = useState([]);
    
    const [postErrorKafka, setPostErrorKafka] = useState('');
    const [deleteErrorKafka, setDeleteErrorKafka] = useState('');
    const [etlErrorKafka, setEtlErrorKafka] = useState([]);   
    useEffect(()=>{ 
        const requestMysqlOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"TaskList" : ["Product:mysql:table:Operations:GET_ALL"], "MultiThread" : false}'
        };
        fetch('https://dune-app-ucla.herokuapp.com/task/1', requestMysqlOptions)
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
        fetch('https://dune-app-ucla.herokuapp.com/task/1', requestKafkaOptions)
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
        },[postResultMysql, deleteResultMysql,postResultKafka, deleteResultKafka, etlResultMysql]);


    

    function handleSubmit(requestType, tableName){
        let requestInput = "" 
        if(tableName == "mysql"){
            if (requestType == "ETL"){
                requestInput = '{"TaskList":["Product:mysql:table:Operations:GET '+submitInput +' > tranform.py load_mysql_data_into_kafka > Product:kafka:topic:Operations:POST *"], "MultiThread": false}'
            }else{
                requestInput = '{"TaskList":["Product:mysql:table:Operations:'+requestType+' '+submitInput +'"], "MultiThread": false}'
            } 
        }else if(tableName == "kafka"){
            requestInput = '{"TaskList":["Product:kafka:topic:Operations:'+requestType+' '+submitInput +'"], "MultiThread": false}'
        }
      
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: requestInput
        }; 
        fetch('https://dune-app-ucla.herokuapp.com/task/1', requestOptions)
        .then(response => 
        {   
            if (!response.ok) {  
                if (requestType == "POST" && tableName == "mysql"){
                    setPostErrorMysql("Error, status code is "+response.status);
                    setPostResultMysql([])
                } else if (requestType == "POST" && tableName == "kafka"){
                    setPostErrorKafka("Error, status code is "+response.status);
                    setPostResultKafka([])
                } else if(requestType == "DELETE"&& tableName == "mysql"){
                    setDeleteErrorMysql("Error, status code is "+response.status);
                    setDeleteResultMysql([])
                } else if(requestType == "DELETE"&& tableName == "kafka"){
                    setDeleteErrorKafka("Error, status code is "+response.status);
                    setDeleteResultKafka([])
                } else if(requestType == "ETL"&& tableName == "mysql") {
                    setEtlErrorMysql("Error, status code is "+response.status);
                    setEtlResultKafka([])                   
                }
                throw new Error("Error, status code is "+response.status)
              } 
              return response.json()  
        }
        ).then(data =>{ 
            if(tableName == "mysql"){
                if (requestType == "POST"){ 
                    setPostErrorMysql("")
                    setPostResultMysql(data)  
                } else if (requestType == "DELETE"){
                    if (data[0].search("error") > 0){
                        setDeleteErrorMysql(data[0]);
                        setDeleteResultMysql([])
                    }else{
                        setDeleteErrorMysql("")
                        setDeleteResultMysql(data) 
                    } 
                } else if(requestType == "ETL"){ 
                    let isError = false 
                    for (let i = 0; i < data.length; i++){
                        let eachdata = data[i] 
                        if (eachdata.search("error") > 0){
                            setEtlErrorMysql(eachdata);
                            setEtlResultMysql([])
                            isError = true
                        }
                    } 
                    if(!isError){
                        setEtlErrorMysql("")
                        setEtlResultMysql(data) 
                    }

                }
            }else if (tableName == "kafka"){ 
                if (requestType == "POST"){ 
                    setPostErrorKafka("")
                    setPostResultKafka(data)  
                } else if (requestType == "DELETE"){ 
                    if (data[0].search("error") > 0){
                        setDeleteErrorKafka(data[0]);
                        setDeleteResultKafka([])
                    }else{
                        setDeleteErrorKafka("")
                        setDeleteResultKafka(data) 
                    } 
                } 
            } 
          }
        ).catch(error => {
          console.log("error", error)
        })
    } 


    return (
        <div>
        <div className={styles.right}> 
            <div className={styles.tableBlock}>  
                <p> MySQL Table</p>
                <table className={styles.table}>
                    <tr>
                    <th>ID</th>
                    <th>Name</th> 
                    <th>Complete</th> 
                    </tr>

                    {getAllMysqlResult.map((entry) => (
                        <tr key={entry.id}>
                            <td> {entry.id}</td>
                            <td> {entry.name}</td>
                            <td> {entry.complete.toString()} </td>
                        </tr>
                    ))}
                </table>  
            </div>
      
            <div className={styles.inputBlock}>
                <p> Modify MySQL</p>
                <div>
                    <input className = {styles.input} placeholder='resource:[{name:test}, {name:test2}]' onInput={e => setSubmitInput(e.target.value.replace(/\s/g, ''))} type="text" name="task_json" /> 
                    <button className = {styles.button} onClick={() =>handleSubmit("POST", "mysql")} type="submit" value="postSubmit">POST </button>
                    <p>{postErrorMysql ? postErrorMysql : ""}</p> <p>{postResultMysql.length > 0? "Success":""}</p>
                            
                    <br></br>
                    <input className = {styles.input}  placeholder='id:6' onInput={e => setSubmitInput(e.target.value.replace(/\s/g, ''))} type="text" name="task_json" /> 
                    <button className = {styles.button} onClick={() =>handleSubmit("DELETE", "mysql")} >DELETE </button>
                    <p>{deleteErrorMysql ? deleteErrorMysql : ""}</p> <p>{deleteResultMysql.length > 0? "Success":""}</p>
                    
                    <br></br>
                    <input className = {styles.input} placeholder='id:6' onInput={e => setSubmitInput(e.target.value.replace(/\s/g, ''))} type="text" name="task_json" /> 
                    <button className = {styles.button} onClick={() =>handleSubmit("ETL", "mysql")}>ETL </button>
                    <p>{etlErrorMysql ? etlErrorMysql : ""}</p> <p>{etlResultMysql.length > 0? "Success":""}</p>
                </div>


            </div>
            
            <div className={styles.tableBlock}>  
                <p> Kafka Table</p>
                <table className={styles.table}>
                    <tr>
                    <th>ID</th>
                    <th>Topic Name</th> 
                    </tr>
                    {getAllKafkaResult.map((entry, index) => (
                        <tr key={index}>
                            <td> {index}</td>
                            <td> {entry.topic_name}</td>
                        </tr>
                    ))}
                </table>  
            </div>
         

            <div className={styles.inputBlock}>
                <p > Modify Kafka</p>
                <div>
                    <input className = {styles.input} placeholder='topic_name:t1' onInput={e => setSubmitInput(e.target.value.replace(/\s/g, ''))} type="text" name="task_json" /> 
                    <button className = {styles.button} onClick={() =>handleSubmit("POST", "kafka")} type="submit" value="postSubmit">POST </button>
                    <p>{postErrorKafka ? postErrorKafka : ""}</p> <p>{postResultKafka.length > 0? "Success":""}</p>
                            
                    <br></br>
                    <input className = {styles.input} placeholder='topic_name:t1' onInput={e => setSubmitInput(e.target.value.replace(/\s/g, ''))} type="text" name="task_json" /> 
                    <button className = {styles.button} onClick={() =>handleSubmit("DELETE", "kafka")} >DELETE </button>
                    <p>{deleteErrorKafka ? deleteErrorKafka : ""}</p> <p>{deleteResultKafka.length > 0? "Success":""}</p>
                    
                    {/* <br></br>
                    <input className = {styles.input}  onInput={e => setSubmitInput(e.target.value)} type="text" name="task_json" /> 
                    <button className = {styles.button} >ETL </button> */}
                </div>

            </div>

        </div>
         
        </div>
    );
}

export default ViewPage;