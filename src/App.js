import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

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

function App() {
  const [user] = useAuthState(auth);
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

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.SignOut}>Sign Out</button>
  );
}

function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  //determine message CSS class:
  //is the message send by current user or other users?
  const messageClass = uid === currentUser.auth.uid ? "send" : "received";

  return (
    <div>
      <img src={photoURL} />
      <p className={`message ${messageClass}`}>{text}</p>
    </div>
  );
}
export default App;
