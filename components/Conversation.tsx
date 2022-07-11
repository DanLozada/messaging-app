import axios from "axios";
import { useState } from "react";
import validator from "validator";
import MessageBubble from "./MessageBubble";
import Order from "./Order";

const EXAMPLE_DATA = {
     conversation_sids: [
          "CH598ce11a127e4a4c85dcf2ae3b8bfdbf",
          "CH40f94e31bf41430d85be926cfe6475ee",
     ],
     delivery_datetime: "Monday at 8am",
     customer_address: "123 Main St",
     vendor_addresses: ["123 Main St", "456 Main St"],
     products: [
          { item: "apples", quantity: 1 },
          { item: "bananas", quantity: 2 },
          { item: "oranges", quantity: 3 },
     ],
};

interface ConversationProps {
     messages: { author: string; sid: string; body: string }[];
     name: string;
}

const Conversation = (props: ConversationProps) => {
     const [modalOpen, setModalOpen] = useState(false);
     const [name, setName] = useState("");
     const [number, setNumber] = useState("");
     const [orderSummary, setOrderSummary] = useState(false);

     const handleSubmit = (e: any) => {
          e.preventDefault();
          if (validatePhoneNumber(number)) {
               axios.get(
                    `https://supplynownodeapi.herokuapp.com/api/v1/conversations/createConversation?client=${number}&name=${name}`
               ).then((response) => {
                    console.log(response);
                    setModalOpen(false);
               });
          } else {
               alert("Invalid phone number");
          }
     };

     const validatePhoneNumber = (number: string) => {
          if (validator.isMobilePhone(number, "en-US")) {
               return true;
          } else {
               return false;
          }
     };

     const fetchData = () => {
          axios.get("someurl?sid=CH598ce11a127e4a4c85dcf2ae3b8bfdbf").then(
               (response) => {
                    console.log(response);
               }
          );
     };

     return (
          <div className="flex flex-col">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-row mb-8">
                    <div className="fixed top-16 left-24 md:top-4 md:left-72 bg-white p-4 rounded-xl shadow-xl md:w-1/3">
                         <h1 className="text-lg font-bold">
                              {props.name == "" ? "Select Convo" : props.name}
                         </h1>
                    </div>
                    <div className="absolute right-8 top-9">
                         <a onClick={() => setModalOpen(!modalOpen)}>
                              <svg
                                   xmlns="http://www.w3.org/2000/svg"
                                   className="h-10 w-10"
                                   fill="none"
                                   viewBox="0 0 24 24"
                                   stroke="currentColor"
                                   strokeWidth={2}
                              >
                                   <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                   />
                              </svg>
                         </a>
                    </div>
               </div>
               {modalOpen ? (
                    <div className="isolate -space-y-px rounded-md shadow-sm">
                         <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                              <label
                                   htmlFor="name"
                                   className="block text-xs md:text-lg font-medium text-gray-900"
                              >
                                   Name
                              </label>
                              <input
                                   type="text"
                                   name="name"
                                   id="name"
                                   className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-xl"
                                   placeholder="Jane Smith"
                                   onChange={(e) => setName(e.target.value)}
                                   value={name}
                              />
                         </div>
                         <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                              <label
                                   htmlFor="job-title"
                                   className="block text-xs md:text-lg font-medium text-gray-900"
                              >
                                   Number
                              </label>
                              <input
                                   type="text"
                                   name="job-title"
                                   id="job-title"
                                   className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-xl"
                                   placeholder="000-000-0000"
                                   onChange={(e) => setNumber(e.target.value)}
                                   value={number}
                                   onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                             handleSubmit(e);
                                        }
                                   }}
                              />
                         </div>
                         <div className="p-4 ml-12">
                              <button
                                   type="button"
                                   onClick={(e) => handleSubmit(e)}
                                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                   Create Conversation
                              </button>
                         </div>
                    </div>
               ) : (
                    <div>
                         {orderSummary ? <Order data={EXAMPLE_DATA} /> : <></>}
                         {/* <button
                              type="button"
                              onClick={() => setOrderSummary(!orderSummary)}
                              className="inline-flex ml-20 mt-4 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                         >
                              Toggle Summary
                         </button> */}
                         <div className="flex flex-col justify-end h-full">
                              {props.messages.map((message) => (
                                   <MessageBubble
                                        key={message.sid}
                                        message={message}
                                   />
                              ))}
                         </div>
                    </div>
               )}
          </div>
     );
};

export default Conversation;
