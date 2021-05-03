import React, {useRef, useState} from 'react'
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase/app'


import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'


firebase.initializeApp({
  apiKey: "AIzaSyD4PDJ5a8WdKspovj8XlEQR7sUhI2tGvHM",
    authDomain: "chatoctavo.firebaseapp.com",
    projectId: "chatoctavo",
    storageBucket: "chatoctavo.appspot.com",
    messagingSenderId: "227704668101",
    appId: "1:227704668101:web:f4b201e1593e2633b155ac"
})

const auth = firebase.auth()
const firestore = firebase.firestore()
const analytics = firebase.analytics()

function App() {

  const [user] = useAuthState(auth)

  return (
    <div className = "App">
      <header>
        <h1> Mi chat 📩</h1>
        <SignOut />
      </header>

      <section>
        { user ? <Chatroom/> : <SignIn/> }
      </section>

    </div>
  );
}

function SignIn(){

  const signInWithGoogle = () => {

      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)

  }

    return (<>
  
      <button className= "sign-in" onClick = {signInWithGoogle}> Iniciar Sesión</button>
      <p>Bienvenido</p>
    </>)

}

function SignOut(){

  return auth.currentUser && (
    <button className= "sign-out" onClick={() => auth.signOut()}>Salir</button>
  )

}

function Chatroom(){

  const dummy = useRef()
  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)
  const [messages] = useCollectionData(query, {idField: 'id'})

  const [formValue,setFormValue] = useState('')
  
  const sendMessage = async (e) =>{
    
    e.preventDefault()
    const {uid, photoURL} = auth.currentUser

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth'})

  }
  
  return(<>
  
  <main>

    {messages && messages.map(msg=> <ChatMessage key = {msg.id} message = {msg} /> )}
    <span ref = {dummy}></span>

  </main>

  <form onSubmit = {sendMessage}>
      <input value= {formValue} onChange= {(e) => setFormValue(e.target.value)} placeholder= "Enviar msg" />
      <button type = "submit">Send 🕊</button>
    </form>

  

  </>)
}

function ChatMessage(props){
  const {text,uid,photoURL} = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (<>
  
    <div className = {`message ${messageClass}`}>

    <img src = {photoURL} />
    <p>{text}</p>

    </div>
  
  </>)

}

export default App;