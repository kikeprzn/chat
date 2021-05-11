import React from "react";
import * as EmailValidator from "email-validator";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Contact from "../Contact";

function Contacts() {
  const [user] = useAuthState(auth);
  const user_chat_ref = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chats_snapshot] = useCollection(user_chat_ref);

  const createChat = () => {
    const input = prompt(
      "Introduce un email con el que quieras chatear (el email debe estar registrado)."
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (repicient_email) =>
    !!chats_snapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === repicient_email)?.length > 0
    );
  return (
    <div className="col-md-4 col-xl-3 chat">
      <div className="card card-chat mb-sm-3 mb-md-0 contacts_card">
        <div className="card-header">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search..."
              name=""
              className="form-control search"
            />
            <div className="input-group-prepend">
              <span className="input-group-text search_btn">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={createChat}>
          Nuevo chat
        </button>

        <div className="card-body contacts_body">
          <ul className="contacts">
            {chats_snapshot?.docs.map((chat) => (
              <Contact key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
            {/* <li className="contacts_active">
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img
                    alt="Not found"
                    src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg"
                    className="rounded-circle user_img"
                  />
                  <span className="online_icon"></span>
                </div>
                <div className="user_info">
                  <span>Khalid</span>
                  <p>Kalid is online</p>
                </div>
              </div>
            </li> */}
          </ul>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
}

export default Contacts;
