import {
     GET_TWILIO_TOKEN_URL,
     REMOVE_CONVERSATION_URL,
     SEND_MESSAGE_URL,
} from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Client } from "@twilio/conversations";
import ConversationsList from "../components/ConversationsList";
import InputGroup from "../components/InputGroup";
import Welcome from "../components/Welcome";
import Conversation from "../components/Conversation";

const Sdk = () => {
     const [conversations, setConversations] = useState<any[]>([]);
     const [selectedConvo, setSelectedConvo] = useState<any>();
     const [selectedSid, setSelectedSid] = useState<string>("");

     const getConversations = async (client: any) => {
          const res = await client.on("conversationJoined", (convo: any) => {
               setConversations((prevConversations) => [
                    ...prevConversations,
                    convo,
               ]);
               console.log(convo);
          });
     };

     const sendMessage = (sid: string, message: string) => {
          axios.post(SEND_MESSAGE_URL, {
               sid: sid,
               message: message,
          }).then(() => {
               console.log("Message sent");
          });
     };

     const removeConversation = (sid: string) => {
          axios.get(`${REMOVE_CONVERSATION_URL}${sid}`).then((res) => {});
     };

     const [messages, setMessages] = useState<any[]>([]);

     const getMessages = async (conversation: any) => {
          if (conversation) {
               const lol = await conversation.getMessages();
               setMessages([...lol.items]);

               conversation.on("messageAdded", (message: any) => {
                    if (messages.find((m: any) => m.sid === message.sid)) {
                         return;
                    }
                    setMessages((messages) => [...messages, message]);
               });
          }
     };

     const getToken = async () => {
          const res = await axios.get(GET_TWILIO_TOKEN_URL);
          return res.data;
     };

     const handleSelectConversation = async (sid: any) => {
          setSelectedSid(sid);
          await getMessages(selectedConvo);
     };

     useEffect(() => {
          getToken().then((token: string) => {
               const client = new Client(token);
               getConversations(client);
          });
     }, []);

     return (
          <>
               <ConversationsList
                    data={conversations}
                    setSelectedSid={(sid: string) => {
                         handleSelectConversation(sid);
                         setSelectedConvo(
                              conversations.find(
                                   (convo: any) => convo.sid === sid
                              )
                         );
                    }}
               >
                    {/* {selectedConvo && <Convo conversation={selectedConvo} />} */}
                    {selectedConvo && (
                         <Conversation
                              name={selectedConvo.friendlyName}
                              data={messages}
                              conversation={selectedConvo}
                              id={selectedConvo.sid}
                         />
                    )}
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

export default Sdk;
