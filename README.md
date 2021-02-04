# React Native Chat Application

This project is a chat application for mobile devices using React Native. The app provides users with a chat interface and options to share images and their location.

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
- To launch the app on your phone via Expo Go, click on the Chat-Application under the <strong>Recently In Development</strong> section. OR scan the QR code in the Expo GUI on your laptop.

### Database Configuration

The Chat Application uses Google Firebase to store chat messages, images, and locations. Please follow the instructions below to configure your own Firebase storage. For detailed assistance, please visit `https://firebase.google.com/docs/web/setup`
<br/>

- Go to `https://console.firebase.google.com/` and sign in with a Google account via the top right corner.
- Click on the <strong>Go to console</strong> link near the top right corner and click on <strong>Create Project</strong>.
- Enter your project name, then click Continue.
- Agree to the terms and click <strong>Create Project</strong>.
- Go to the <strong>Cloud Firestore</strong> section on the left panel and click <strong>Create database</strong>.
- Click on the test mode option.
- When selecting a region, choose the one that's closest to you. Use this website as a guide: `https://firebase.google.com/docs/projects/locations#location-r`
- Click <strong>Done</strong>.
- Still inside the <strong>Cloud Firestore</strong> page, click on <strong>Start collection</strong>.
- Name the collection `messages` and input `1` for the Document ID. Fill in the rest of the document with this information (use a string for avatar, text, and user): `_id: 1` `avatar: https://placeimg.com/140/140/any` `createdAt: January 31, 2021 at 8:13:20 PM UTC-8` `text: Hello developer` `uid: 0` `user: React Native`
- In order to connect your own credentials from Firebase to the Chat Application, click on <strong>Project Settings</strong> by clicking on the gear icon at the top in the left panel.
- Inside the <strong>General Tab</strong>, in the `Your Apps` section at the bottom, click on the icon for the web `</>`
- You will register your app in order to get the configurations needed to connect your new database with the Chat Application.
- Add a nickname in the follwing screen and in step 2, copy the contents of the `firebaseConfig` object starting from `apiKey:... to measurementId:...`
- Now switch gears and go to the root directory where you cloned my repository. You will be editing the Chat.js file from within the components folder.
- In the Chat.js file, replace the credentials under `const firebaseConfig` with the credentials you just copied.
- You are all set and should have your own Firebase storage working alongside the cloned Chat Application!
- Refer back to the instructions under `Demo the Application` for help with starting the app.
