# Dune
All-in-one data management platform that allows you to govern your data infrastructures more easily.

Requirement: python3.8 \
Recommended IDE: PyCharm \
Recommended Tools: Postman

## Developer Guide

### Setup

To start with, please set up your python environment. In this project, we will use virtual environment.
```commandline
python -m venv venv/
source venv/bin/activate (macOs)
.\venv\Scripts\activate (windows)
pip install -r requirements.txt
```
Above commands will help you to install required packages. Since we are using Heroku as our deployment platform,
if you want to add any dependency, **please dump that to the requirement.txt file by:**
```commandline
pip freeze > requirements.txt
```

### Development
1. After adding new features, please deploy and test Dune app locally before push.
```commandline
heroku local
```
* If you don't have heroku command yet, please install it by
```commandline
brew tap heroku/brew && brew install heroku
```
2. Use your Postman to send out API requests.
3. After finishing developing, just do `git push` to deploy your code.

## User Guide
### Configuration Guide
Configuration should comply to the following format. And users are responsible to fill in the detail inside each {}.
```json
{
  "User" : [{
    "id" : "{999}",
    "Product" : {
      "{level1}": {
        "{level2}": {
          "Operations": {
            "GET_ALL" : {
              "API_Path" : "{}",
              "Request" : {"Path_Param" : ["{}"]},
              "Response" : { "Data" : "{}"}
            },
            "POST" : {
              "API_Path" : "{}",
              "Request" : {"Body" : {"Required" : ["{}"], "Optional": []}},
              "Response" : { "Data" : "{}"}
            }
          },
          "Authentication": {"{header1}" : "{}"},
          "Https" : "{}"
        }
      }}}]
    }
```

### Task List Guide
All command line input should have the same format as below:
```text
Product:<Product>:<level1>:<level2>:...:Operations:<operation>
```
For example，
```text
Product:kafka:topic:Operations:POST topic_name:t1
Product:kafka:topic:Operations:GET_ALL
```

To use our API, send your task list to `https://dune-app-ucla.herokuapp.com/task/1`

Example CURL command:
```commandline
curl --location --request POST 'https://dune-app-ucla.herokuapp.com/task/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "TaskList": [
        "Product:kafka:topic:Operations:GET_ALL",
        "Product:kafka:topic:Operations:DELETE topic_name:t1",
        "Product:kafka:topic:Operations:GET_ALL"
    ]
}'
```
