/* This example requires Tailwind CSS v2.0+ */
import { UserAddIcon, MenuIcon } from "@heroicons/react/outline";

function classNames(...classes: string[]) {
     return classes.filter(Boolean).join(" ");
}

export default function Welcome() {
     const items = [
          {
               name: "Browse Existing Conversations",
               description:
                    "Clients that placed orders throught the automated text-line have existing conversations, so Start Here!",
               href: "#",
               iconColor: "bg-amber-400",
               icon: MenuIcon,
          },
          {
               name: "Create a Conversation",
               description:
                    "You should really only use this to create chats with drivers",
               href: "#",
               iconColor: "bg-amber-400",
               icon: UserAddIcon,
          },
     ];

     return (
          <div className="max-w-lg mx-auto">
               <h2 className="text-lg font-medium text-gray-900">
                    Welcome to SupplyNow Dispatch
               </h2>
               <p className="mt-1 text-sm text-gray-500">
                    This is a simple chat application that will help you
                    communicate with clients and manage order items
               </p>
               <ul
                    role="list"
                    className="mt-6 border-t border-b border-gray-200 divide-y divide-gray-200"
               >
                    {items.map((item, itemIdx) => (
                         <li
                              key={itemIdx}
                              onClick={() => console.log("I was clicked")}
                         >
                              <div className="relative group py-4 flex items-start space-x-3">
                                   <div className="flex-shrink-0">
                                        <span
                                             className={classNames(
                                                  item.iconColor,
                                                  "inline-flex items-center justify-center h-10 w-10 rounded-lg"
                                             )}
                                        >
                                             <item.icon
                                                  className="h-6 w-6 text-gray-800"
                                                  aria-hidden="true"
                                             />
                                        </span>
                                   </div>
                                   <div className="min-w-0 flex-1">
                                        <div className="text-sm font-medium text-gray-900">
                                             <a href={item.href}>
                                                  <span
                                                       className="absolute inset-0"
                                                       aria-hidden="true"
                                                  />
                                                  {item.name}
                                             </a>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                             {item.description}
                                        </p>
                                   </div>
                              </div>
                         </li>
                    ))}
               </ul>
          </div>
     );
}
