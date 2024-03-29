import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import CreateConversation from "./CreateConversation";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface ConversationsListProps {
  children: any;
  data: any;
  setSelectedConvo: (convo: any) => void;
  createConversation: (number: string, name: string) => void;
}

export default function ConversationsList(props: ConversationsListProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createNewConversations, setCreateNewConversations] = useState(false);
  const [listRef] = useAutoAnimate<HTMLTableSectionElement>();

  return (
    <>
      <div>
        {sidebarOpen ? (
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 md:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 flex z-40">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                          type="button"
                          className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-amber-400 hover:bg-amber-400"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <span className="sr-only">Close sidebar</span>
                          <XIcon
                            className="h-6 w-6 text-gray-800"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="mt-5 flex-1 h-0 overflow-y-auto">
                      <nav className="px-2 space-y-1" ref={listRef}>
                        <>
                          <a
                            onClick={() => setCreateNewConversations(true)}
                            className="text-gray-600 bg-amber-200 hover:bg-amber-400 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          >
                            Create Conversation
                          </a>
                          {props.data &&
                            props.data.map((item: any) => (
                              <a
                                key={item.sid}
                                onClick={() => {
                                  props.setSelectedConvo(item);
                                  setCreateNewConversations(false);
                                }}
                                className="text-gray-600 bg-amber-200 hover:bg-amber-400 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                              >
                                {item.friendlyName}
                              </a>
                            ))}
                        </>
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                  {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        ) : (
          <></>
        )}

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1" ref={listRef}>
                <a
                  onClick={() => setCreateNewConversations(true)}
                  className="text-gray-600 bg-amber-200 hover:bg-amber-400 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                >
                  Create Conversation
                </a>
                {props.data == "No data yet" ? (
                  <>No data yet</>
                ) : (
                  <>
                    {props.data.map((item: any) => (
                      <a
                        key={item.sid}
                        onClick={() => {
                          props.setSelectedConvo(item);
                          setCreateNewConversations(false);
                        }}
                        className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-sm font-medium rounded-md bg-amber-200"
                      >
                        {item.friendlyName}
                      </a>
                    ))}
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-row mb-8">
                  <div className=" md:hidden mt-2 ml-2">
                    <a onClick={() => setSidebarOpen(true)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
                {createNewConversations ? (
                  <>
                    <CreateConversation
                      createConversation={props.createConversation}
                      setModalOpen={setCreateNewConversations}
                    />
                  </>
                ) : (
                  <>{props.children}</>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
