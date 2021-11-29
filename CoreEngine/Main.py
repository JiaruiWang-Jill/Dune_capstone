from CoreEngine.EventBus import command_line
from flask import Flask, request, jsonify, abort

app = Flask(__name__)


@app.route('/task/<int:uuid>', methods=['POST'])
def execute_tasks(uuid):
    task_list = request.json['TaskList']
    response = command_line(uuid, task_list)

    if response is None:
        abort(400, 'Bad Request. Please check log for further information')

    return jsonify(response)


@app.route('/health/', methods=['POST', 'GET'])
def health_check():
    response = ["status: success"]

    if response is None:
        abort(400, 'Bad Request.')

    return jsonify(response)


if __name__ == '__main__':
    app.run(threaded=True, port=5000)
