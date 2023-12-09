# ecommerce-site-assignment

## Set up:
To Clone the repo: <br>
Run - git clone git@github.com:st-anonymous/ecommerce-site-assignment.git <br>

After cloning, to install the dependencies: <br>
Run - npm i <br>

To start the project: <br>
Run - npm start <br>

It would start the Backend at http://localhost:8080 and the Frontend at port http://localhost:3000 <br>

n is set to be 2 and off is set to be 10%, these can be modified here: https://github.com/st-anonymous/ecommerce-site-assignment/blob/main/src/server/db/index.js#L1-L2

For user login, a mobile number is to be entered... If any user with the mobile number already exists, it would continue as the user or it would create a new user. <br>
For admin login please use the credential as: https://github.com/st-anonymous/ecommerce-site-assignment/blob/main/src/server/admin_auth.txt

N.B.: As in-memory storage is used for data storing, re-running the server in between operations, may leads to wrong outcome. 
