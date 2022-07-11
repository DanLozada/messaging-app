import type { NextPage } from "next";
import Conversation from "../components/Conversation";
import ConversationsList from "../components/ConversationsList";
import InputGroup from "../components/InputGroup";
import Welcome from "../components/Welcome";
import axios from "axios";
import { useState, useEffect } from "react";
import Order from "../components/Order";
import { send } from "process";

const Home: NextPage = () => {
     const [messages, setMessages] = useState([]);
     const [selectedSid, setSelectedSid] = useState("");
     const [conversations, setConversations] = useState<any>([]);
     const [convoName, setConvoName] = useState("");

     const getConversations = async () => {
          const response = await axios.get(
               `https://supplynownodeapi.herokuapp.com/api/v1/conversations/getConversations`
          );
          setConversations(response.data);
          console.log(response.data);
     };

     const triggerConvoLoad = (sid: string) => {
          setSelectedSid(sid);
          axios.get(
               `https://supplynownodeapi.herokuapp.com/api/v1/conversations/getConversationMessages?sid=${sid}`
          ).then((res) => setMessages(res.data));
     };

     const sendMessage = (sid: string, message: string) => {
          axios.post(
               `https://supplynownodeapi.herokuapp.com/api/v1/conversations/sendMessage`,
               {
                    sid: sid,
                    message: message,
               }
          ).then((res) => {
               triggerConvoLoad(sid);
          });
     };

     const removeConversation = (sid: string) => {
          axios.get(
               `https://supplynownodeapi.herokuapp.com/api/v1/conversations/removeConversation?sid=${sid}`
          ).then((res) => {
               setConversations(
                    conversations.filter(
                         (convo: { sid: string }) => convo.sid !== sid
                    )
               );
          });
     };

     useEffect(() => {
          getConversations();
     }, []);

     useEffect(() => {
          axios.get(
               `https://supplynownodeapi.herokuapp.com/api/v1/conversations/getConversationName?sid=${selectedSid}`
          ).then((response) => {
               setConvoName(response.data);
          });
     }, [selectedSid]);

     return (
          <>
               <ConversationsList
                    trigger={triggerConvoLoad}
                    conversations={conversations}
               >
                    <Conversation messages={messages} name={convoName} />
                    {selectedSid !== "" ? (
                         <>
                              <InputGroup
                                   sendMessage={(message: string) =>
                                        sendMessage(selectedSid, message)
                                   }
                                   removeConversation={() =>
                                        removeConversation(selectedSid)
                                   }
                              />
                         </>
                    ) : (
                         <Welcome />
                    )}
               </ConversationsList>
          </>
     );
};

export default Home;
