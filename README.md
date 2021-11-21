# Dune
All-in-one data management platform that allows you to govern your data infrastructures more easily.

Requirement: python3.8
Recommanded IDE: PyCharm

## Developer Guide
To start with, please set up your python environment. In this project, we will use virtual environment.
```commandline
python -m venv venv/
source venv/bin/activate
pip install -r requirements.txt
```
Above commands will help you to install required packages. Since we are using Heroku as our deployment platform,
if you want to add any dependency, **please dump that to the requirement.txt file by:**
```commandline
pip freeze > requirements.txt
```

## User Guide

TODO

### Command Line Input
All command line input should have the same format as below:
```text
Product:<Product>:<level1>:<level2>:...:Operations:<operation>
```
For example，
```text
Product:kafka:topic:Operations:POST topic_name:t1
Product:kafka:topic:Operations:GET_ALL
```

