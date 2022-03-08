This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#####################################################################################################################

This is a simple donation system using Ethereum blockchain platform.

The Ethereum folder contain all the javascript code related to compilation and deployment. It also contain the
Solidity contract used in this project.

To run the application open donate-react folder in cmd and run 'npm start'.

Requirements:- 

This application currently need Metamask installed in the user's browser to run.
Login to your Metamask account before interacting with the application.

Dependencies:- 

"solc": "^0.4.25",
"truffle-hdwallet-provider": "^1.0.5",
"web3": "^1.0.0-beta.37"
"fs-extra": "^7.0.1",
"ganache-cli": "^6.4.1",

Steps to Deploy new contract :-

1) Go to Ethereum folder and run 'node compile.js'. This will create a JSON file in build folder with all the 
ABI, Bytecode and other compiler output. Copy the JSON file produced and paste it in the src folder.

2) Now open 'deploy.js'.

3) Change 'ENTER YOUR 12 WORD CODE HERE' from the 12 words code given to you by Metamask. Also generate your 
infura.io access toekn for the Ethereum network and paste it in 'YOUR INFURA.IO ACCESS TOKEN HERE'.(Eveything 
under single quotations)

4) Now run 'node deploy.js' to deploy your instance of contract and copy the address you get as output of the
execution of the 'deploy.js' file and save it somewhere.

5) Now goto src folder and open 'web3.js' file. Now copy and paste the same access token you got from 
infura.io in step no. 3 in the place of 'YOUR INFURA.IO ACCESS TOKEN HERE'.(Eveything under single quotations)

6) Now open 'donate.js' and replace the address of the contract received in step no. 4 in the place of the 
older contract address.(Eveything under single quotations)

7) Now run 'npm start' to run the reactjs app. It may take sometime to load.


#####################################################################################################################

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

##################################################################################################################

