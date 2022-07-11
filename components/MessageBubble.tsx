import { useEffect } from "react";

const MessageBubble = ({ message }: any) => {
     // useEffect(() => {
     //      if (message.media !== null) {
     //           message.media.getContentTemporaryUrl().then((url) => {
     //                console.log(url);
     //           });
     //      }
     // }, []);

     if (message.media !== null) {
          return (
               <div
                    className="text-gray-800 p-4 bg-blue-200 rounded-xl m-2 flex justify-start mr-16"
                    key={message.sid}
               >
                    <a>Message Contains an Image</a>
               </div>
          );
     } else {
          if (message.author !== "Tack") {
               return (
                    <div
                         className="text-gray-800 p-4 bg-blue-200 rounded-xl m-2 flex justify-start mr-16"
                         key={message.sid}
                    >
                         <a>{message.body}</a>
                    </div>
               );
          } else {
               return (
                    <div
                         className="text-gray-800 p-4 bg-gray-200 rounded-xl m-2 flex justify-end ml-16"
                         key={message.sid}
                    >
                         <a>{message.body}</a>
                    </div>
               );
          }
     }
};

export default MessageBubble;
