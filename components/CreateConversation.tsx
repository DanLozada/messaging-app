import { useState } from "react";
import validator from "validator";

const CreateConversation = (props: any) => {
     const [name, setName] = useState("");
     const [number, setNumber] = useState("");

     const handleSubmit = (e: any) => {
          e.preventDefault();
          if (validatePhoneNumber(number)) {
               props.createConversation(number, name);
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

     return (
          <div className="isolate -space-y-px rounded-md shadow-sm">
               <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-amber-600 focus-within:border-amber-600">
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
               <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-amber-600 focus-within:border-amber-600">
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
                         className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-gray-800 bg-amber-400 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                         Create Conversation
                    </button>
               </div>
          </div>
     );
};

export default CreateConversation;
