import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "cookies-js";

export default function Login() {
     const [user, setUsers] = useState("");
     const [password, setPassword] = useState("");

     const router = useRouter();

     const handleLogin = async () => {
          if (user === "admin" && password === "admin") {
               // window.localStorage.setItem("jwt", "admin");
               Cookies.set("jwt", "admin");
               router.push("/");
          } else {
               alert("Invalid credentials");
          }
     };

     return (
          <>
               <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-36">
                    <div className="max-w-md w-full space-y-8">
                         <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
                              {`Welcome to the Future of SN Dispatch`}
                         </h2>
                         <form className="mt-8 space-y-6">
                              <input
                                   type="hidden"
                                   name="remember"
                                   defaultValue="true"
                              />
                              <div className="rounded-md shadow-sm -space-y-px">
                                   <div>
                                        <label
                                             htmlFor="email-address"
                                             className="sr-only"
                                        >
                                             Email address
                                        </label>
                                        <input
                                             type="text"
                                             required
                                             value={user}
                                             onChange={(e) =>
                                                  setUsers(e.target.value)
                                             }
                                             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-300 focus:border-amber-300 focus:z-10 sm:text-sm"
                                             placeholder="Email address"
                                        />
                                   </div>
                                   <div>
                                        <label
                                             htmlFor="password"
                                             className="sr-only"
                                        >
                                             Password
                                        </label>
                                        <input
                                             value={password}
                                             onChange={(e) =>
                                                  setPassword(e.target.value)
                                             }
                                             onKeyDown={(e) => {
                                                  if (e.key === "Enter") {
                                                       handleLogin();
                                                  }
                                             }}
                                             type="password"
                                             required
                                             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-300 focus:border-amber-300 focus:z-10 sm:text-sm"
                                             placeholder="Password"
                                        />
                                   </div>
                              </div>

                              <div>
                                   <button
                                        onClick={(e) => {
                                             handleLogin();
                                             e.preventDefault();
                                        }}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-amber-300 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-300"
                                   >
                                        Sign in
                                   </button>
                              </div>
                         </form>
                    </div>
               </div>
          </>
     );
}
