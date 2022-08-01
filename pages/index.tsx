import { GET_TWILIO_TOKEN_URL, REMOVE_CONVERSATION_URL } from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Client } from "@twilio/conversations";
import ConversationsList from "../components/ConversationsList";
import InputGroup from "../components/InputGroup";
import Welcome from "../components/Welcome";
import Conversation from "../components/Conversation";
import { useRouter } from "next/router";
import Cookies from "cookies-js";

const Sdk = () => {
     const [conversations, setConversations] = useState<any[]>([]);
     const [selectedConvo, setSelectedConvo] = useState<any>();
     const [client, setClient] = useState<any>();

     const router = useRouter();

     const getConversations = async (client: any) => {
          await client.on("conversationJoined", (convo: any) => {
               setConversations((prevConversations) => [
                    ...prevConversations,
                    convo,
               ]);
          });

          await client.on("conversationLeft", (convo: any) => {
               setConversations((prevConversations) =>
                    prevConversations.filter((c) => c.sid !== convo.sid)
               );
          });
     };

     const sendMessage = (message: string) => {
          selectedConvo.sendMessage(message);
     };

     const removeConversation = async () => {
          await axios
               .get(`${REMOVE_CONVERSATION_URL}${selectedConvo.sid}`)
               .then((res) => {});
          setSelectedConvo(undefined);
     };

     const getToken = async () => {
          const res = await axios.get(GET_TWILIO_TOKEN_URL);
          return res.data;
     };

     const handleCreateConversation = async (
          phoneNumber: string,
          name: string
     ) => {
          client
               .createConversation({
                    friendlyName: name,
                    attributes: {
                         phoneNumber: phoneNumber,
                    },
               })
               .then((conversation: any) => {
                    console.log(conversation);
                    conversation.add("Tack");
                    conversation.addNonChatParticipant(
                         "+13512089170",
                         `+1${phoneNumber}`
                    );
               })
               .catch((err: any) => {
                    alert(err);
               });
     };

     useEffect(() => {
          if (Cookies("jwt") === "admin") {
               getToken().then((token: string) => {
                    const client = new Client(token);
                    getConversations(client);
                    setClient(client);
               });
          } else {
               router.push("/login");
          }
     }, []);

     return (
          <>
               <ConversationsList
                    data={conversations}
                    createConversation={handleCreateConversation}
                    setSelectedConvo={(convo: any) => {
                         setSelectedConvo(convo);
                    }}
               >
                    {selectedConvo ? (
                         <>
                              <Conversation conversation={selectedConvo} />
                              <InputGroup
                                   sendMessage={(message: string) =>
                                        sendMessage(message)
                                   }
                                   removeConversation={() =>
                                        removeConversation()
                                   }
                              />
                         </>
                    ) : (
                         <Welcome
                              createConversation={handleCreateConversation}
                              setSelectedConvo={(convo: any) => {
                                   setSelectedConvo(convo);
                              }}
                         />
                    )}
               </ConversationsList>
          </>
     );
};

export default Sdk;
