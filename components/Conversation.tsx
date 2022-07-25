import axios from "axios";
import { useEffect, useState } from "react";
import validator from "validator";
import MessageBubble from "./MessageBubble";
import Order from "./Order";
import {
     GET_DISPATCH_INFO_URL,
     GET_ORDER_BY_ID_URL,
     COMPLETE_ORDER_URL,
} from "../constants";
import CreateConversation from "./CreateConversation";

interface ConversationProps {
     name: string;
     data: {
          author: string;
          sid: string;
          body: string;
          conversationSid: string;
     }[];
     id: string;
}

const Conversation = (props: ConversationProps) => {
     const [modalOpen, setModalOpen] = useState(false);
     const [name, setName] = useState("");
     const [number, setNumber] = useState("");
     const [orderSummary, setOrderSummary] = useState(true);
     const [orderState, setorderState] = useState<any>([]);

     const conversationSid = props.data[0].conversationSid;

     const fetchDispatchInfo = async (sid: string) => {
          const response = await axios.get(`${GET_DISPATCH_INFO_URL}${sid}`);
          return await response.data;
     };

     const fetchOrderDetails = async () => {
          setorderState([]);
          const orders = await fetchDispatchInfo(conversationSid);
          await orders.map(async (order: any) => {
               try {
                    const response = await axios.get(
                         `${GET_ORDER_BY_ID_URL}${order.order_id}`
                    );
                    setorderState(response.data);
               } catch (error) {
                    console.log(error);
               }
          });
     };

     const completeOrder = async (orderId: string) => {
          const url = `${COMPLETE_ORDER_URL}${conversationSid}&order=${orderId}`;
          console.log(url);
          const response = await axios.post(url);
          console.log(response.data);
          setOrderSummary(false);
     };

     useEffect(() => {
          fetchOrderDetails();
     }, [props.name, orderSummary]);

     return (
          <div className="flex flex-col">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-row mb-8">
                    {props.name !== "" ? (
                         <div className="fixed top-16 left-24 md:top-4 md:left-72 bg-white p-4 rounded-xl shadow-xl md:w-1/3">
                              <h1 className="text-lg font-bold">
                                   {props.name}
                              </h1>
                         </div>
                    ) : (
                         <></>
                    )}
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
                    <CreateConversation setModalOpen={setModalOpen} />
               ) : (
                    <div>
                         {orderSummary && (
                              <Order
                                   orderData={orderState}
                                   completeOrder={completeOrder}
                              />
                         )}
                         {props.name !== "" ? (
                              <>
                                   <button
                                        type="button"
                                        onClick={() => {
                                             setOrderSummary(!orderSummary);
                                             console.log(
                                                  "Order Summary",
                                                  orderSummary
                                             );
                                        }}
                                        className="inline-flex ml-20 mt-4 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-800 bg-amber-400 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                   >
                                        Toggle Summary
                                   </button>
                                   <div className="flex flex-col justify-end h-full">
                                        {props.data !== undefined ? (
                                             <>
                                                  {props.data.map((message) => (
                                                       <MessageBubble
                                                            key={message.sid}
                                                            message={message}
                                                       />
                                                  ))}
                                             </>
                                        ) : (
                                             <></>
                                        )}
                                   </div>
                              </>
                         ) : (
                              <></>
                         )}
                    </div>
               )}
          </div>
     );
};

export default Conversation;
