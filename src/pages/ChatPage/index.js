import React from "react";
import "./styles.css";
import Chat from "../../components/Chat";
import Contacts from "../../components/Contacts";
import { auth } from "../../config/firebase";
import { useHistory, useParams } from "react-router-dom";

function ChatPage() {
  const [render, setRender] = React.useState(false);
  const { id } = useParams();

  const history = useHistory();
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setRender(true);
      } else {
        setRender(false);
        history.push("/signin");
      }
    });
  }, [render, history]);
  return (
    // <div className="chat_container">
    <>
      {render ? (
        <div className="container-fluid h-100 ">
          <div className="row justify-content-center h-100">
            <Contacts></Contacts>
            <div className="col-md-8 col-xl-6 chat">
              {id ? <Chat id={id}></Chat> : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
    // </div>
  );
}

export default ChatPage;
