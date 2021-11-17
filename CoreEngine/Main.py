from Parser import Parser
import os

def commandLine(user_id, task_file):
    # Check whether user exists
    parser = Parser()
    if parser.findUser(user_id=user_id) is None:
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
        if not parser.checkPermission(user_id=user_id, task=operation):
            # this user doesn't have permission to this specific task
            # TODO: Dump every print message into log
            print("User doesn't have permission to: " + operation)
            return None

    # TODO: Users' operations are validated. Now we need send request.

    return None

# commandLine(1, "TaskExample.txt")