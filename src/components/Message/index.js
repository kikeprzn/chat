import React from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";

const SenderClasses = {
  container: "d-flex justify-content-end mb-4",
  message: "msg_container_send",
  time: "msg_time_send",
};
const RecieverClasses = {
  container: "d-flex justify-content-start mb-4",
  message: "msg_container",
  time: "msg_time",
};
function Message({ user, message }) {
  const [user_logged_in] = useAuthState(auth);
  const classes =
    user === user_logged_in.email ? SenderClasses : RecieverClasses;

  return (
    <div className={classes.container}>
      <div className={classes.message}>
        {message.message}
        <span className={classes.time}>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </span>
      </div>
      {/* <div className="img_cont_msg">
        <img
          alt="not found"
          src=""
          className="rounded-circle user_img_msg"
        />
      </div> */}
    </div>
  );
}

export default Message;
