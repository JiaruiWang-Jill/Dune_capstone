import json

def load_mysql_data_into_kafka(input):
    res = json.loads(input)
    output_params = "topic_name:" + res["name"]
    return [output_params]