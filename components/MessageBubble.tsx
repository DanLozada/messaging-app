import Image from "next/image";
import { useState, useEffect } from "react";

const MessageBubble = ({ message }: any) => {
     const [url, setUrl] = useState("https://via.placeholder.com/150");

     useEffect(() => {
          if (message.media != null) {
               message.media.getContentTemporaryUrl().then((url: any) => {
                    setUrl(url);
               });
          }
     }, []);

     if (message.media !== null) {
          return (
               <div
                    className="text-gray-800 p-4 bg-blue-200 rounded-xl m-2 flex justify-start mr-16"
                    key={message.sid}
               >
                    <Image src={url} width="200" height="200" alt="" />
               </div>
          );
     } else {
          if (message.author !== "Tack") {
               return (
                    <div
                         className="text-gray-800 p-4 bg-blue-200 rounded-xl m-2 flex justify-start mr-16 break-all"
                         key={message.sid}
                    >
                         <a>{message.body}</a>
                    </div>
               );
          } else {
               return (
                    <div
                         className="text-gray-800 p-4 bg-gray-200 rounded-xl m-2 flex justify-end ml-16 break-all"
                         key={message.sid}
                    >
                         <a>{message.body}</a>
                    </div>
               );
          }
     }
};

export default MessageBubble;
