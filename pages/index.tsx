import {
  GET_TWILIO_TOKEN_URL,
  REMOVE_CONVERSATION_URL,
  GET_ALL_DISPATCHED_URL,
} from "../constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Client } from "@twilio/conversations";
import ConversationsList from "../components/ConversationsList";
import InputGroup from "../components/InputGroup";
import Welcome from "../components/Welcome";
import Conversation from "../components/Conversation";
import { useRouter } from "next/router";
import Cookies from "cookies-js";

export async function getServerSideProps() {
  const { data } = await axios.get(GET_TWILIO_TOKEN_URL);
  const dispatch = await axios.get(GET_ALL_DISPATCHED_URL);

  return {
    props: {
      twilioToken: await data,
      dispatch: await dispatch.data,
    },
  };
}

const Sdk = (props: any) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConvo, setSelectedConvo] = useState<any>();
  const [client, setClient] = useState<any>();

  const getConversations = async (client: any) => {
    await client.on("conversationJoined", (convo: any) => {
      setConversations((prevConversations) => [...prevConversations, convo]);
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
        conversation.addNonChatParticipant("+13512089170", `+1${phoneNumber}`);
      })
      .catch((err: any) => {
        alert(err);
      });
  };

  useEffect(() => {
    const newClient = new Client(props.twilioToken);
    getConversations(newClient);
    setClient(newClient);
    //     console.log(props.dispatch);
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
            <Conversation
              conversation={selectedConvo}
              dispatch={props.dispatch.filter(
                (item: any) =>
                  item.drivers[0].name === selectedConvo.friendlyName &&
                  item.metadata.status !== "delivered"
              )}
            />
            <InputGroup
              sendMessage={(message: string) => sendMessage(message)}
              removeConversation={() => removeConversation()}
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
