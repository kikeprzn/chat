import React from "react";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../Message";
import firebase from "firebase";
import ChatHeader from "../ChatHeader";

function Chat({ id }) {
  const [input, setInput] = React.useState("");

  const [user] = useAuthState(auth);
  // db.collection('chats').doc(id).get()

  const [chat_snapshot] = useCollection(db.collection("chats").doc(id));
  const [message_snapshot] = useCollection(
    db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (message_snapshot) {
      return message_snapshot?.docs.map((message) => {
        return (
          <Message
            key={message.id}
            user={message.data().user}
            message={{
              ...message.data(),
              timestamp: message.data().timestamp?.toDate().getTime(),
            }}
          />
        );
      });
    }
  };
  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("users").doc(user.uid).set(
      {
        last_seen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    db.collection("chats").doc(id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photo_url: user.photoURL,
    });

    setInput("");
  };
  console.log(chat_snapshot?.data().users);
  return (
    <div className="card card-chat">
      <ChatHeader users={chat_snapshot?.data().users} />
      <div className="card-body msg_card_body">{showMessages()}</div>
      <form className="card-footer">
        <div className="input-group">
          <div className="input-group-append">
            <span className="input-group-text attach_btn"></span>
          </div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-control type_msg"
            placeholder="Type your message..."
          />
          <div className="input-group-append">
            <button
              // hidden
              disabled={!input}
              onClick={sendMessage}
              type="submit"
              className="input-group-text send_btn"
            >
              <i className="fas fa-location-arrow"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Chat;
