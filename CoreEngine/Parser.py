import json
import os

class Parser:
    def __init__(self):
        mpath = os.path.abspath(os.path.dirname(__file__))
        cfg = os.path.join(mpath, "../configuration.json")
        with open(cfg) as f:
            self.configuration = json.load(f)

    def find_user(self, user_id):
        user_list = self.configuration["user"]
        for u in user_list:
            if user_id == u["id"]:
                return True
        return False

    def find_and_get_user(self, user_id):
        user_list = self.configuration["user"]
        for u in user_list:
            if user_id == u["id"]:
                return u
        return None

    def check_permission(self, user_id, task):
        """
         Check whether the given user has permission to perform a task

        :param user_id: user id
        :param task: task in a format of Product:<Product>:<level1>:<level2>:...:Operations:<operation>. For example,
                     Product:kafka:topic:Operations:read.
        :return: True if this user has permission to perform such task, otherwise False
        """
        cur_user = self.find_and_get_user(user_id)
        if cur_user is None:
            # Given user doesn't exist
            return False

        # Check permission
        tlist = task.split(":")

        for i in range(len(tlist)):
            cur_user = cur_user.get(tlist[i])
            if cur_user is None:
                return False
        return True

# x = Parser()
# print(x.checkPermission(1, "Product:kafka:topic:Operations:delete"))
