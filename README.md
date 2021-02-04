# React Native Chat Application

This project is all about building a chat application for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

## User Stories

As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
<br/>
As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
<br/>
As a user, I want to send images to my friends to show them what i'm currently doing.
<br/>
As a user, I want to share my location with my friends to show them where I am.
<br/>
As a user, I want to be able to read my messages offline so I can reread conversations at any time.
<br/>
As a user with a visual impairment, I want to use a chat app that is compatoble with a screen reader so that I can engage with a chat interface.
<br/>

## Installation

### Downloading a Simulator

- Make sure to install a simulator. [Android Studio](https://developer.android.com/studio) for Windows. [XCode](https://developer.apple.com/xcode/) for Mac.
- To demo the app on your phone, install the <strong>Expo Go</strong> app through Google Play or Apple Store.
- In your terminal, install Expo: `npm install -g expo-cli`

### Demo the Application

- Clone the repository to your local machine: ` git clone https://github.com/VeeMae/chat-application.git`
- Install the dependencies: `npm install`
- Start the app: `expo start`
- To launch the app via Android Studio, type `a` in your terminal.
- To launch the app via XCode, type `i` in your terminal.
- To launch the app on your phone via Expo Go, click on the Chat-Application under the 'Recently In Development' section. OR scan the QR code in the Expo GUI on your laptop.

### Database Configuration 

The Chat Application uses Google Firebase to store chat messages, images, and locations. Please follow the instructions below to configure your own Firebase storage.
<br/>
- Go to `https://console.firebase.google.com/` and sign in with a Google account via the top right corner. 
- Click on the <strong>Go to console</strong> link near the top right corner and click on <strong>Create Project</strong>
- Enter your project name, then click continue.
- Agree to the terms and click <strong>Create Project</strong>
- Go to the <strong>Cloud Firestore</strong> section on the left panel and click <strong>Create database</strong>
- Start in test mode option 
- When selecting a region, choose the one that's closest to you. Use this website as a guide: `https://firebase.google.com/docs/projects/locations#location-r`
- Click done
- In order to connect your own credentials from Firebase, click on <strong>Project Settings</strong> by clicking on the gear icon in the left panel. 
- In the following screen, under the 'Your Apps' section at the bottom, click on the icon for the web `</>`
- You will register your app in order to get the config needed to set up your new database with the Chat Application. 
- Add a nickname and in step 2, copy the contents of the firebaseConfig object starting from apiKey:... to measurementId:... 
- Now go to the root directory where you cloned my repository and click on Chat.js from within the components folder. 
- Replace the credentials under <strong>const firebaseConfig</strong> with the credentials you just copied. 
- You are all set and should have your own Firebase storage working alongside the cloned Chat Application!

