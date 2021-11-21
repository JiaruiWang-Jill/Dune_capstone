from .Parser import Parser
from flask import Flask, request, jsonify
import os


app = Flask(__name__)


@app.route('/task/<uuid>', methods=['POST'])
def execute_tasks(uuid):
    task_list = request.json['TaskList']
    return jsonify(task_list)


if __name__ == '__main__':
    app.run(threaded=True, port=5000)


def command_line(user_id, task_file):
    # Check whether user exists
    parser = Parser()
    if parser.find_user(user_id=user_id) is None:
        # TODO: Dump every print message into log
        print("User doesn't exist")
        return None

    # Validate the given tasks
    my_path = os.path.abspath(os.path.dirname(__file__))
    task_file = os.path.join(my_path, "../" + task_file)
    with open(task_file) as f:
        tasks = f.readlines()

    for task in tasks:
        operation = task.split(" ")[0]
        if not parser.check_permission(user_id=user_id, task=operation):
            # this user doesn't have permission to this specific task
            # TODO: Dump every print message into log
            print("User doesn't have permission to: " + operation)
            return None

    # TODO: Users' operations are validated. Now we need send request.

    return None

# commandLine(1, "TaskExample.txt")