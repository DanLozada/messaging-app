import type { NextPage } from "next";
import Conversation from "../components/Conversation";
import ConversationsList from "../components/ConversationsList";
import axios from "axios";
import { useState, useEffect } from "react";
import Order from "../components/Order";

const EXAMPLE_CONVERSATION_DATA = [
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          chatServiceSid: "IS48afbb78536348be9f26c372537e9e9a",
          messagingServiceSid: "MG32292ae5bdea6cc344379ac1bba66a36",
          sid: "CH40f94e31bf41430d85be926cfe6475ee",
          friendlyName: "+14122955644",
          uniqueName: null,
          attributes: "{}",
          state: "active",
          dateCreated: "2022-05-31T22:14:05.000Z",
          dateUpdated: "2022-05-31T22:14:05.000Z",
          timers: {},
          url: "https://conversations.twilio.com/v1/Conversations/CH40f94e31bf41430d85be926cfe6475ee",
          links: {
               participants:
                    "https://conversations.twilio.com/v1/Conversations/CH40f94e31bf41430d85be926cfe6475ee/Participants",
               messages:
                    "https://conversations.twilio.com/v1/Conversations/CH40f94e31bf41430d85be926cfe6475ee/Messages",
               webhooks:
                    "https://conversations.twilio.com/v1/Conversations/CH40f94e31bf41430d85be926cfe6475ee/Webhooks",
          },
          bindings: null,
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          chatServiceSid: "IS48afbb78536348be9f26c372537e9e9a",
          messagingServiceSid: "MG32292ae5bdea6cc344379ac1bba66a36",
          sid: "CH598ce11a127e4a4c85dcf2ae3b8bfdbf",
          friendlyName: "+19175791432",
          uniqueName: null,
          attributes: "{}",
          state: "active",
          dateCreated: "2022-05-31T22:13:16.000Z",
          dateUpdated: "2022-05-31T22:13:16.000Z",
          timers: {},
          url: "https://conversations.twilio.com/v1/Conversations/CH598ce11a127e4a4c85dcf2ae3b8bfdbf",
          links: {
               participants:
                    "https://conversations.twilio.com/v1/Conversations/CH598ce11a127e4a4c85dcf2ae3b8bfdbf/Participants",
               messages:
                    "https://conversations.twilio.com/v1/Conversations/CH598ce11a127e4a4c85dcf2ae3b8bfdbf/Messages",
               webhooks:
                    "https://conversations.twilio.com/v1/Conversations/CH598ce11a127e4a4c85dcf2ae3b8bfdbf/Webhooks",
          },
          bindings: null,
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          chatServiceSid: "IS48afbb78536348be9f26c372537e9e9a",
          messagingServiceSid: "MG32292ae5bdea6cc344379ac1bba66a36",
          sid: "CH8360dcf373c546cab3ee8970d6475b3c",
          friendlyName: "+12165487070",
          uniqueName: null,
          attributes: "{}",
          state: "active",
          dateCreated: "2022-05-31T13:23:37.000Z",
          dateUpdated: "2022-05-31T13:23:37.000Z",
          timers: {},
          url: "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c",
          links: {
               participants:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Participants",
               messages:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages",
               webhooks:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Webhooks",
          },
          bindings: null,
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          chatServiceSid: "IS48afbb78536348be9f26c372537e9e9a",
          messagingServiceSid: "MG32292ae5bdea6cc344379ac1bba66a36",
          sid: "CHbc7dbc6d3863432fa52be8f44c83505e",
          friendlyName: null,
          uniqueName: null,
          attributes: "{}",
          state: "active",
          dateCreated: "2022-07-09T22:51:04.000Z",
          dateUpdated: "2022-07-09T22:51:04.000Z",
          timers: {},
          url: "https://conversations.twilio.com/v1/Conversations/CHbc7dbc6d3863432fa52be8f44c83505e",
          links: {
               participants:
                    "https://conversations.twilio.com/v1/Conversations/CHbc7dbc6d3863432fa52be8f44c83505e/Participants",
               messages:
                    "https://conversations.twilio.com/v1/Conversations/CHbc7dbc6d3863432fa52be8f44c83505e/Messages",
               webhooks:
                    "https://conversations.twilio.com/v1/Conversations/CHbc7dbc6d3863432fa52be8f44c83505e/Webhooks",
          },
          bindings: null,
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          chatServiceSid: "IS48afbb78536348be9f26c372537e9e9a",
          messagingServiceSid: "MG32292ae5bdea6cc344379ac1bba66a36",
          sid: "CHce29293bab004625a76cb7ba8f410916",
          friendlyName: "Dan Lozada",
          uniqueName: null,
          attributes: "{}",
          state: "active",
          dateCreated: "2022-07-09T22:50:08.000Z",
          dateUpdated: "2022-07-09T22:50:08.000Z",
          timers: {},
          url: "https://conversations.twilio.com/v1/Conversations/CHce29293bab004625a76cb7ba8f410916",
          links: {
               participants:
                    "https://conversations.twilio.com/v1/Conversations/CHce29293bab004625a76cb7ba8f410916/Participants",
               messages:
                    "https://conversations.twilio.com/v1/Conversations/CHce29293bab004625a76cb7ba8f410916/Messages",
               webhooks:
                    "https://conversations.twilio.com/v1/Conversations/CHce29293bab004625a76cb7ba8f410916/Webhooks",
          },
          bindings: null,
     },
];

const EXAMPLE_MESSAGES = [
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          conversationSid: "CH8360dcf373c546cab3ee8970d6475b3c",
          sid: "IMf82d49bc5dfe4655a973e00c28c310d3",
          index: 0,
          author: "Tack",
          body: "hello aaron, what brand of chicken do you prefer?",
          media: null,
          attributes: "{}",
          participantSid: "MB7f0577f8ed8e42f58df522787c6a37ca",
          dateCreated: "2022-05-31T13:24:14.000Z",
          dateUpdated: "2022-05-31T13:24:14.000Z",
          url: "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IMf82d49bc5dfe4655a973e00c28c310d3",
          delivery: {
               delivered: "all",
               read: "none",
               undelivered: "none",
               failed: "none",
               total: 1,
               sent: "all",
          },
          links: {
               delivery_receipts:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IMf82d49bc5dfe4655a973e00c28c310d3/Receipts",
          },
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          conversationSid: "CH8360dcf373c546cab3ee8970d6475b3c",
          sid: "IMe1405e905baf4d1bacd93718d2cc13a2",
          index: 4,
          author: "+12165487070",
          body: "Tyson ",
          media: null,
          attributes: "{}",
          participantSid: "MB83c9b0b01d0749909b101690dd1e1471",
          dateCreated: "2022-05-31T13:24:29.000Z",
          dateUpdated: "2022-05-31T13:24:29.000Z",
          url: "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IMe1405e905baf4d1bacd93718d2cc13a2",
          delivery: null,
          links: {
               delivery_receipts:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IMe1405e905baf4d1bacd93718d2cc13a2/Receipts",
          },
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          conversationSid: "CH8360dcf373c546cab3ee8970d6475b3c",
          sid: "IMd0c8b532f8bc4768a6b8c475384605f9",
          index: 5,
          author: "Tack",
          body: "got it!",
          media: null,
          attributes: "{}",
          participantSid: "MB7f0577f8ed8e42f58df522787c6a37ca",
          dateCreated: "2022-05-31T13:24:34.000Z",
          dateUpdated: "2022-05-31T13:24:34.000Z",
          url: "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IMd0c8b532f8bc4768a6b8c475384605f9",
          delivery: {
               delivered: "all",
               read: "none",
               undelivered: "none",
               failed: "none",
               total: 1,
               sent: "all",
          },
          links: {
               delivery_receipts:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IMd0c8b532f8bc4768a6b8c475384605f9/Receipts",
          },
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          conversationSid: "CH8360dcf373c546cab3ee8970d6475b3c",
          sid: "IM201d832c78e94143aea222d0288f9e44",
          index: 9,
          author: "+12165487070",
          body: null,
          media: [
               {
                    category: "media",
                    size: 455377,
                    filename: "IMG_1666.jpg",
                    content_type: "image/jpeg",
                    sid: "ME3b70b4662bfd19aafa44d745fbb1ea8e",
               },
          ],
          attributes: "{}",
          participantSid: "MB83c9b0b01d0749909b101690dd1e1471",
          dateCreated: "2022-05-31T13:24:42.000Z",
          dateUpdated: "2022-05-31T13:24:42.000Z",
          url: "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IM201d832c78e94143aea222d0288f9e44",
          delivery: null,
          links: {
               delivery_receipts:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IM201d832c78e94143aea222d0288f9e44/Receipts",
          },
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          conversationSid: "CH8360dcf373c546cab3ee8970d6475b3c",
          sid: "IM51feaef7e5274751a117e6ecac665357",
          index: 10,
          author: "Tack",
          body: "hi there by, this is from my phone",
          media: null,
          attributes: "{}",
          participantSid: "MB7f0577f8ed8e42f58df522787c6a37ca",
          dateCreated: "2022-06-01T00:47:36.000Z",
          dateUpdated: "2022-06-01T00:47:36.000Z",
          url: "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IM51feaef7e5274751a117e6ecac665357",
          delivery: {
               delivered: "all",
               read: "none",
               undelivered: "none",
               failed: "none",
               total: 1,
               sent: "all",
          },
          links: {
               delivery_receipts:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IM51feaef7e5274751a117e6ecac665357/Receipts",
          },
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          conversationSid: "CH8360dcf373c546cab3ee8970d6475b3c",
          sid: "IM682f5f3018ab4175aa07124a74af60b7",
          index: 14,
          author: "Tack",
          body: "hi there",
          media: null,
          attributes: "{}",
          participantSid: "MB7f0577f8ed8e42f58df522787c6a37ca",
          dateCreated: "2022-06-20T15:23:11.000Z",
          dateUpdated: "2022-06-20T15:23:11.000Z",
          url: "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IM682f5f3018ab4175aa07124a74af60b7",
          delivery: {
               delivered: "all",
               read: "none",
               undelivered: "none",
               failed: "none",
               total: 1,
               sent: "all",
          },
          links: {
               delivery_receipts:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IM682f5f3018ab4175aa07124a74af60b7/Receipts",
          },
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          conversationSid: "CH8360dcf373c546cab3ee8970d6475b3c",
          sid: "IMf3be2841a2424319b823c5b817140ee0",
          index: 18,
          author: "+12165487070",
          body: "Hey",
          media: null,
          attributes: "{}",
          participantSid: "MB83c9b0b01d0749909b101690dd1e1471",
          dateCreated: "2022-06-20T15:23:18.000Z",
          dateUpdated: "2022-06-20T15:23:18.000Z",
          url: "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IMf3be2841a2424319b823c5b817140ee0",
          delivery: null,
          links: {
               delivery_receipts:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IMf3be2841a2424319b823c5b817140ee0/Receipts",
          },
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          conversationSid: "CH8360dcf373c546cab3ee8970d6475b3c",
          sid: "IM11485e1b821645258054ae001130908e",
          index: 19,
          author: "+12165487070",
          body: "How's it going",
          media: null,
          attributes: "{}",
          participantSid: "MB83c9b0b01d0749909b101690dd1e1471",
          dateCreated: "2022-06-20T15:23:20.000Z",
          dateUpdated: "2022-06-20T15:23:20.000Z",
          url: "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IM11485e1b821645258054ae001130908e",
          delivery: null,
          links: {
               delivery_receipts:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IM11485e1b821645258054ae001130908e/Receipts",
          },
     },
     {
          accountSid: "ACf3a669cb14e5706b596c0f54d03a7762",
          conversationSid: "CH8360dcf373c546cab3ee8970d6475b3c",
          sid: "IM7b0e8edcdc6b44f2aa218b7743825ee4",
          index: 20,
          author: "Tack",
          body: "hit there",
          media: null,
          attributes: "{}",
          participantSid: "MB7f0577f8ed8e42f58df522787c6a37ca",
          dateCreated: "2022-06-20T15:23:40.000Z",
          dateUpdated: "2022-06-20T15:23:40.000Z",
          url: "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IM7b0e8edcdc6b44f2aa218b7743825ee4",
          delivery: {
               delivered: "all",
               read: "none",
               undelivered: "none",
               failed: "none",
               total: 1,
               sent: "all",
          },
          links: {
               delivery_receipts:
                    "https://conversations.twilio.com/v1/Conversations/CH8360dcf373c546cab3ee8970d6475b3c/Messages/IM7b0e8edcdc6b44f2aa218b7743825ee4/Receipts",
          },
     },
];

const Home: NextPage = () => {
     const [messages, setMessages] = useState(EXAMPLE_MESSAGES);
     const [message, setMessage] = useState("");
     const [selectedSid, setSelectedSid] = useState("");
     const [conversations, setConversations] = useState<any>(
          EXAMPLE_CONVERSATION_DATA
     );
     const [convoName, setConvoName] = useState("");

     //  const getConversations = async () => {
     //       axios.get(
     //            `http://localhost:8000/api/v1/conversations/getConversations`
     //       ).then((conversations) => setConversations(conversations.data));
     //  };

     //  const triggerConvoLoad = (sid: string) => {
     //       setSelectedSid(sid);
     //       axios.get(
     //            `http://localhost:8000/api/v1/conversations/getConversationMessages?sid=${sid}`
     //       ).then((res) => setMessages(res.data));
     //  };

     // function that makes a post request to this uri: http://localhost:8000/api/v1/conversations/sendMessage with a sid and a message in the body of the request body
     //  const sendMessage = (sid: string) => {
     //       axios.post(`http://localhost:8000/api/v1/conversations/sendMessage`, {
     //            sid: sid,
     //            message: message,
     //       }).then((res) => {
     //            triggerConvoLoad(sid);
     //       });
     //  };

     // function that makes a get request to this uri: http://localhost:3000/api/v1/conversations/removeConversation and passed selectedSid as a query parameter
     //  const removeConversation = (sid: string) => {
     //       axios.get(
     //            `http://localhost:8000/api/v1/conversations/removeConversation?sid=${sid}`
     //       ).then((res) => {
     //            setConversations(
     //                 conversations.filter(
     //                      (convo: { sid: string }) => convo.sid !== sid
     //                 )
     //            );
     //       });
     //  };

     //  useEffect(() => {
     //       getConversations();
     //  }, [messages]);

     //  useEffect(() => {
     //       axios.get(
     //            `http://localhost:8000/api/v1/conversations/getConversationName?sid=${selectedSid}`
     //       ).then((response) => {
     //            setConvoName(response.data);
     //       });
     //  }, [selectedSid]);

     return (
          <>
               <ConversationsList
                    // trigger={triggerConvoLoad}
                    trigger={() => {
                         console.log("trigger new conversation");
                    }}
                    conversations={conversations}
               >
                    {messages !== [] && (
                         <Conversation
                              messages={messages}
                              // name={convoName}
                              name={"Aaron George"}
                         />
                    )}
                    <div className="sticky inset-x-70 bottom-0 flex flex-row bg-white border-t-2 border-gray-400 pt-2 w-full">
                         <input
                              type="text"
                              name="name"
                              id="name"
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-xl border-gray-300 px-4 rounded-full p-4"
                              placeholder="Jane Smith"
                              onChange={(e) => setMessage(e.target.value)}
                              value={message}
                              onKeyDown={(e) => {
                                   if (e.key === "Enter") {
                                        // sendMessage(selectedSid);
                                        setMessage("");
                                   }
                              }}
                         />
                         <button
                              type="button"
                              // onClick={() => sendMessage(selectedSid)}
                              onClick={() => console.log("send message")}
                              className="mx-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                         >
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   className="h-5 w-5"
                                   viewBox="0 0 20 20"
                                   fill="currentColor"
                              >
                                   <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                   />
                              </svg>
                         </button>
                         <button
                              type="button"
                              // onClick={() => removeConversation(selectedSid)}
                              onClick={() => console.log("delete conversation")}
                              className=" inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                         >
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   className="h-5 w-5"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   stroke="currentColor"
                                   strokeWidth={2}
                              >
                                   <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                   />
                              </svg>
                         </button>
                    </div>
               </ConversationsList>
          </>
     );
};

export default Home;
