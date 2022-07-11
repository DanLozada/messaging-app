import { useState } from "react";

interface InputGroupProps {
     sendMessage: (message: string) => void;
     removeConversation: () => void;
}

const InputGroup = (props: InputGroupProps) => {
     const [message, setMessage] = useState("");

     return (
          <>
               <div className="sticky inset-x-70 bottom-0 flex flex-row bg-white border-t-2 border-gray-400 pt-2 w-full">
                    <input
                         type="text"
                         name="name"
                         id="name"
                         className="shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-xl border-gray-300 px-4 rounded-full p-4"
                         placeholder="Jane Smith"
                         onChange={(e) => setMessage(e.target.value)}
                         value={message}
                         onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                   props.sendMessage(message);
                                   setMessage("");
                              }
                         }}
                    />
                    <button
                         type="button"
                         onClick={() => props.sendMessage(message)}
                         className="mx-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-full text-gray-800 bg-amber-400 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
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
                         onClick={() => props.removeConversation()}
                         className=" inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-full text-gray-800 bg-amber-400 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
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
          </>
     );
};

export default InputGroup;
