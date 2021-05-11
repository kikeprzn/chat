import React from "react";
import getRecipientEmail from "../../utils/getRecipientEmail";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";

function Contact({ id, users }) {
  const history = useHistory();
  const [user] = useAuthState(auth);
  const [recipient_snapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );
  const recipient = recipient_snapshot?.docs[0]?.data();
  const recipient_email = getRecipientEmail(users, user);

  const enterChat = () => {
    history.push(`/chat/${id}`);
  };
  return (
    <li onClick={enterChat}>
      <div className="d-flex bd-highlight">
        <div className="img_cont">
          {recipient ? (
            <>
              {recipient.photo_url ? (
                <img
                  alt="Not found"
                  src={recipient.photo_url}
                  className="rounded-circle user_img"
                />
              ) : (
                <div
                  className="rounded-circle user_img"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="fa fa-user"
                    style={{ fontSize: "40px" }}
                    aria-hidden="true"
                  ></i>
                </div>
              )}
            </>
          ) : null}
        </div>
        <div className="user_info">
          <span>{recipient_email}</span>
          {/* <p>Kalid is online</p> */}
        </div>
      </div>
    </li>
  );
}

export default Contact;
