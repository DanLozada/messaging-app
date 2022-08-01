import axios from "axios";
import { useEffect, useState } from "react";
import validator from "validator";
import MessageBubble from "./MessageBubble";
import Order from "./Order";
import {
     GET_DISPATCH_INFO_URL,
     GET_ORDER_BY_ID_URL,
     COMPLETE_ORDER_URL,
     ADD_DISPATCH_MODIFICATION_URL,
} from "../constants";

interface ConversationProps {
     conversation: any;
}

const Conversation = (props: ConversationProps) => {
     const [orderSummary, setOrderSummary] = useState(true);
     const [orderState, setOrderState] = useState<any>([]);
     const [messages, setMessages] = useState<any[]>([]);
     const [dispatchInfo, setDispatchInfo] = useState<any>([]);

     const getMessages = async (conversation: any) => {
          if (conversation) {
               const lol = await conversation.getMessages();
               setMessages([...lol.items]);

               conversation.on("messageAdded", (message: any) => {
                    setMessages((messages) => [...messages, message]);
               });
          }
     };

     const fetchDispatchInfo = async (sid: string) => {
          const response = await axios.get(`${GET_DISPATCH_INFO_URL}${sid}`);
          setDispatchInfo(response.data);
          return await response.data;
     };

     const fetchOrderDetails = async () => {
          setOrderState([]);
          try {
               const orders = await fetchDispatchInfo(props.conversation.sid);
               await orders.map(async (order: any) => {
                    try {
                         const response = await axios.get(
                              `${GET_ORDER_BY_ID_URL}${order.order_id}`
                         );
                         setOrderState(response.data);
                    } catch (error) {
                         console.log(error);
                    }
               });
          } catch (error) {
               console.log(error);
          }
     };

     const completeOrder = async (orderId: string) => {
          const url = `${COMPLETE_ORDER_URL}${props.conversation.sid}&order=${orderId}`;
          try {
               const response = await axios.post(url);
               fetchOrderDetails();
               setOrderSummary(false);
          } catch (error) {
               console.log(error);
          }
     };

     const addModification = async (orderId: string, message: string) => {
          try {
               const url = `${ADD_DISPATCH_MODIFICATION_URL}${orderId}`;
               const response = await axios.post(url, {
                    modification: message,
               });
               fetchDispatchInfo(props.conversation.sid);
          } catch (error) {
               console.log(error);
          }
     };

     useEffect(() => {
          fetchOrderDetails();
          getMessages(props.conversation);
     }, [props.conversation]);

     return (
          <div className="flex flex-col">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-row mb-8">
                    <div className="fixed top-16 left-24 md:top-4 md:left-72 bg-white p-4 rounded-xl shadow-xl md:w-1/3">
                         <h1 className="text-lg font-bold">
                              {props.conversation.friendlyName}
                         </h1>
                    </div>
               </div>
               <div>
                    {orderSummary && (
                         <Order
                              addModification={addModification}
                              orderData={orderState}
                              completeOrder={completeOrder}
                              dispatchInfo={dispatchInfo}
                         />
                    )}
                    <>
                         <button
                              type="button"
                              onClick={() => {
                                   setOrderSummary(!orderSummary);
                              }}
                              className="inline-flex ml-20 mt-4 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-800 bg-amber-400 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                         >
                              Toggle Summary
                         </button>
                         <div className="flex flex-col justify-end h-full">
                              {messages.map((message) => (
                                   <MessageBubble
                                        key={message.sid}
                                        message={message}
                                   />
                              ))}
                         </div>
                    </>
               </div>
          </div>
     );
};

export default Conversation;
