import type { NextPage } from "next";
import useSWR, { mutate } from "swr";
import Conversation from "../components/Conversation";
import ConversationsList from "../components/ConversationsList";
import InputGroup from "../components/InputGroup";
import Welcome from "../components/Welcome";
import axios from "axios";
import { useState, useEffect } from "react";
import {
     SEND_MESSAGE_URL,
     GET_CONVERSATIONS_URL,
     GET_MESSAGES_URL,
     REMOVE_CONVERSATION_URL,
     GET_CONVO_NAME_URL,
} from "../constants";

const Home: NextPage = () => {
     const [selectedSid, setSelectedSid] = useState("");
     const [convoName, setConvoName] = useState("");

     const conversationsFetcher = (url: string) =>
          axios.get(url).then((res) => res.data);

     const messagesFetcher = (url: string) =>
          axios.get(url).then((res) => res.data);

     const { data } = useSWR(GET_CONVERSATIONS_URL, conversationsFetcher, {
          refreshInterval: 2000,
     });

     const { data: messages } = useSWR(
          `${GET_MESSAGES_URL}${selectedSid}`,
          messagesFetcher,
          { refreshInterval: 1000 }
     );

     const sendMessage = (sid: string, message: string) => {
          axios.post(SEND_MESSAGE_URL, {
               sid: sid,
               message: message,
          }).then(() => {});
     };

     const removeConversation = (sid: string) => {
          axios.get(`${REMOVE_CONVERSATION_URL}${sid}`).then((res) => {});
     };

     useEffect(() => {
          axios.get(`${GET_CONVO_NAME_URL}${selectedSid}`).then((response) => {
               setConvoName(response.data);
          });
     }, [selectedSid]);

     return (
          <>
               <ConversationsList
                    data={data ? data : "No data yet"}
                    setSelectedSid={setSelectedSid}
               >
                    <Conversation name={convoName} data={messages} />
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
