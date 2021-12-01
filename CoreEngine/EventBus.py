import http.client
import json
import CoreEngine.transform
from CoreEngine.Parser import Parser

def command_line(user_id, task_list):
    # Check whether user exists
    parser = Parser(user_id)
    if not parser.find_user():
        print("User doesn't exist")
        return None

    # Validate the given tasks
    for task in task_list:
        split_task = task.split(" ")
        operation = split_task[0]
        params = split_task[1:]
        # TODO: ">" permission
        if operation is not ">" and not parser.check_permission(task=operation, params=params):
            # this user doesn't have permission to this specific task
            print("User doesn't have permission to: " + task)
            return None

    # TODO: Add fault-tolerant logic. For example, re-execution when encountering failure.
    result = []
    # TODO: put three lines transformation into one line?
    tmp = None
    for task in task_list:
        if task.startswith('>'):
            split_task = task.split(" ")
            target = split_task[1]
            if target.endswith('.py'):
                try:
                    tmp = eval("CoreEngine.transform." + split_task[2])(tmp)
                    result.append("{\"status\": \"Data Transformation Completed!\"}")
                except:
                    print("Data Transformation fails!")
                    return None
            else:
                operation = split_task[1]
                params = tmp
                # TODO: duplicate code
                api_path = parser.generate_path(operation, params)
                https = parser.get_https(operation)
                authentication = parser.get_authentication(operation)
                payload = parser.generate_payload(params)
                tmp = execute_task(https, authentication, payload, api_path)
                result.append(tmp)
        else:
            split_task = task.split(" ")
            operation = split_task[0]
            params = split_task[1:]
            api_path = parser.generate_path(operation, params)
            https = parser.get_https(operation)
            authentication = parser.get_authentication(operation)
            payload = parser.generate_payload(params)
            tmp = execute_task(https, authentication, payload, api_path)
            result.append(tmp)
    return result

def execute_task(https, authorization, payload, api_path):
    conn = http.client.HTTPSConnection(https)
    headers = authorization
    json_payload = json.dumps(payload)
    if len(payload) != 0:
        conn.request(api_path.split(" ")[0], api_path.split(" ")[1], json_payload, headers=headers)
    else:
        conn.request(api_path.split(" ")[0], api_path.split(" ")[1], headers=headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))
    return data.decode("utf-8")

# command_line(2, ["Product:kafka:topic:Operations:POST topic_name:t1", "Product:kafka:topic:Operations:GET_ALL"])