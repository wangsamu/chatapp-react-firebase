import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/firebase-app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCBaeaRU3A5mR9ZQdtb9TtMh0AlvjXCfKY",
  authDomain: "chatapp-91b6a.firebaseapp.com",
  projectId: "chatapp-91b6a",
  storageBucket: "chatapp-91b6a.appspot.com",
  messagingSenderId: "507826548855",
  appId: "1:507826548855:web:a1905799bce61e59b01672",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

function App() {
  return (
    <div className="App">
      <header></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function ChatRoom() {}

export default App;
