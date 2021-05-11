import React from "react";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import getRecipientEmail from "../../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

const Info = ({ users, user }) => {
  const [recipient_snapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const recipient = recipient_snapshot?.docs?.[0].data();
  const recipient_email = getRecipientEmail(users, user);
  return (
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

        {/* <span className="online_icon"></span> */}
      </div>
      <div className="user_info">
        <span>{recipient_email}</span>
        {recipient_snapshot ? (
          <p>
            Últ. vez{" "}
            {recipient?.last_seen.toDate() ? (
              <TimeAgo datetime={recipient?.last_seen?.toDate().getTime()} />
            ) : (
              "No disponible"
            )}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

function ChatHeader({ users }) {
  const [user] = useAuthState(auth);
  return (
    <div className="card-header msg_head">
      {users ? (
        <Info users={users} user={user} />
      ) : (
        <div className="d-flex bd-highlight">
          <div className="img_cont">
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
            {/* <span className="online_icon"></span> */}
          </div>
          <div className="user_info">
            {users ? <span>Chat with Khalid</span> : <span>Loading</span>}
            <p>...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatHeader;
