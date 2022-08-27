from types import SimpleNamespace
from flask import Flask, jsonify
from flask import request
import mysql.connector
import json
import main
from uuid import uuid4
from flask_cors import CORS


app=Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "104.154.237.18"}})

@app.route('/employees',methods=['GET'])
def retrive():
    mydb=database_conn()
    mycursor = mydb.cursor()
    sql="SELECT * FROM employee_tab"
    mycursor.execute(sql)
    tree=[]
    for row in mycursor:
        tree.append(json.loads(row[1]))
    return tree



@app.route('/employee/<string:id>',methods=['DELETE','GET'])
def user_fetch(id):
    mydb=database_conn()
    mycursor = mydb.cursor()
    if request.method=='DELETE':
        sql="DELETE FROM employee_tab Where id=%s"
        adr=(id,)
        try:
            mycursor.execute(sql,adr)
            if(mycursor.rowcount==1):
                mydb.commit()
                return "DELETED User with id='%s'"%(id)
            else:
                return 'UID Not Exist'
        except:
            return "User Not Exist"
    else:
        try:
            sql="SELECT * FROM employee_tab Where id=%s"
            adr=(id,)
            mycursor.execute(sql,adr)
            for row in mycursor:
                return json.loads(row[1])
            return 'UID Wrong'
        except:
            return 'User Not Found'


    

@app.route('/employee',methods=['POST','PUT'])
def modify_db():
    mydb=database_conn()
    mycursor = mydb.cursor()
    if request.method=='POST':
        department=request.json['department']
        name=request.json['name']
        print(name)
        mail=request.json['mail']
        phone=request.json['phone']
        id=str(uuid4().hex[:8])
        p1=main.Person(name,id,department,mail,phone)
        store=json.dumps(p1.__dict__)
        sql="INSERT INTO employee_tab (id,data) VALUES (%s,%s)"
        val=(id,store)
        try:
            mycursor.execute(sql,val)
            mydb.commit()
            return 'User Added'
        except:
            return "Problem Appears"
    else:
        val=json.dumps(request.json)
        id=request.json['id']
        sql="SELECT data FROM employee_tab Where id='%s'"%(id)
        try:
            mycursor.execute(sql)
            myresult = mycursor.fetchone()
            if(len(myresult[0])!=0):
                x = json.loads(val, object_hook=lambda d: SimpleNamespace(**d))
                sql="UPDATE employee_tab SET data='%s' WHERE id='%s'"%(json.dumps(x.__dict__),id)
                try:
                    mycursor.execute(sql)
                    mydb.commit()
                    new=mycursor.rowcount
                    if(new==1):
                        return 'User Updated'
                    else:
                        return 'No Change'
                except:
                    return 'Invalid data'
        except:
            return 'Provide Valid Id'


def database_conn():
    mydb=mysql.connector.connect(
        host='34.170.201.218',
        user='root',
        password='',
        database='employee'
    )
    return mydb

if __name__=='__main__':
    app.run(debug=True)