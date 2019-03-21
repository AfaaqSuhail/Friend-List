# Friend List Application
## Live Demo: http://my-friend-list.herokuapp.com

### Installation
##### clone and go to main directory
##### npm install
##### node server.js

#### Client Installation
#### go to client
#### npm i
#### ng serve --open

## Features

##### User can register into Application.
##### After User successfully register trigger UserEvent via EventEmitter to send "Welcome Email" via SMTP.
##### Authentication of users with passport.js
##### After User successfully logged In
#####  a)	Show list of all application users.
#####  b)	User can add other users as Friend.
#####   c)	Show list of all friends
##### Create API that will return user detail via JWT(JSON web tokens) /user/userId
##### Sample APi: http://my-friend-list.herokuapp.com/user/userId


