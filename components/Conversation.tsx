import axios from "axios";
import { useEffect, useState } from "react";
import validator from "validator";
import MessageBubble from "./MessageBubble";
import Order from "./Order";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface ConversationProps {
  conversation: any;
  dispatch: any;
}

const Conversation = (props: ConversationProps) => {
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderState, setOrderState] = useState<any>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [dispatchInfo, setDispatchInfo] = useState<any>([]);
  const [listRef] = useAutoAnimate<HTMLUListElement>();

  const getMessages = async (conversation: any) => {
    if (conversation) {
      const lol = await conversation.getMessages();
      setMessages([...lol.items]);

      conversation.on("messageAdded", (message: any) => {
        setMessages((messages) => [...messages, message]);
      });
    }
  };

  useEffect(() => {
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
        <button
          type="button"
          onClick={() => {
            setOrderSummary(!orderSummary);
          }}
          className="inline-flex ml-20 mt-4 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-800 bg-amber-400 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
        >
          Toggle Summary
        </button>
        {orderSummary ? (
          <Order dispatch={props.dispatch} />
        ) : (
          <ul className="flex flex-col justify-end h-full" ref={listRef}>
            {messages.map((message) => (
              <MessageBubble key={message.sid} message={message} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Conversation;
