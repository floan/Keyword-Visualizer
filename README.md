# Introduction
Team Members: Fayez Loan

You can view the demo video [here](https://drive.google.com/file/d/1HdVEE0lmZ60m23Cj7dV-BgKkfyrdoDq0/view?usp=sharing)

# STEPS TO COMPILE: 

## Setting up the front-end

- Download Google Chrome. Currently that is the only compatible browser. 
- Install [Yarn](https://classic.yarnpkg.com/en/docs/install/)
- Ensure you have the latest node version, this [link](https://askubuntu.com/questions/426750/how-can-i-update-my-nodejs-to-the-latest-version) might be useful 
- Navigate to the client directory from your terminal and run the command `yarn install`
- Navigate to clients/src/Components and edit the URL in handleDataFunction.js and HandleRequestFunction.js, change the host to whatever host you are running the server on, by default it is `localhost:5000`. 

## Setting up the back-end

- Install Python
- Install Flask
- Install Flask_Cors `pip3 install -U flask-cors`

# Running the Application

- From the terminal, in the client folder type `yarn start` to start up the React environment. This is hosted on `localhost:3000`
- From the terminal, in the server folder type `python3 server.py` to start up the Flask server. This is hosted on `localhost:5000` by default. 

Enjoy!

# External Libraries Used

- ReactJs (a JavaScript libarary) for the front-end 
- Flask (a Python library) for the back-end
- React-Speech-Recognition API for speech to text
- Chart.js (JavaScript library) for visualization
