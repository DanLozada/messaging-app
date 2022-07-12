import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

interface OrderProps {
     data: {
          customer_address: string;
          delivery_datetime: string;
          vendor_addresses: string[];
          products: { item: string; quantity: string }[];
     };
}

export default function Order(props: OrderProps) {
     const [orderData, setOrderData] = useState(props.data);
     const [newItemName, setNewItemName] = useState("");
     const [newItemQuantity, setNewItemQuantity] = useState("");

     const addProduct = () => {
          const newProducts = [...orderData.products];
          newProducts.push({ item: newItemName, quantity: newItemQuantity });
          setOrderData({ ...orderData, products: newProducts });
          setNewItemName("");
          setNewItemQuantity("");
     };

     const removeProduct = (index: number) => {
          const newProducts = [...orderData.products];
          newProducts.splice(index, 1);
          setOrderData({ ...orderData, products: newProducts });
     };

     return (
          <div className="px-4 sm:px-6 lg:px-8 border-2 border-amber-300 rounded-lg p-4 mt-2">
               <div className="absolute right-12 top-48 md:top-36 md:right-16">
                    <a onClick={() => {}}>
                         <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                         >
                              <path
                                   strokeLinecap="round"
                                   strokeLinejoin="round"
                                   d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                              />
                         </svg>
                    </a>
               </div>
               <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto flex flex-col">
                         <h1 className="text-xl font-semibold text-gray-900">
                              Order Summary
                         </h1>
                         <input
                              type="text"
                              className="bg-gray-200 text-xs appearance-none border-2 w-2/3 md:w-1/3 p-2 my-2 text-left border-gray-200 rounded-lg py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              value={orderData.customer_address}
                              onChange={(e) => {
                                   setOrderData({
                                        ...orderData,
                                        customer_address: e.target.value,
                                   });
                              }}
                         />
                         <input
                              type="text"
                              className="bg-gray-200 text-xs appearance-none border-2 w-2/3 md:w-1/3 p-2 my-2 text-left border-gray-200 rounded-lg py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              value={orderData.delivery_datetime}
                              onChange={(e) => {
                                   setOrderData({
                                        ...orderData,
                                        delivery_datetime: e.target.value,
                                   });
                              }}
                         />
                    </div>
               </div>
               <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0 pb-2">
                    <table className="min-w-full divide-y divide-gray-300">
                         <thead>
                              <tr>
                                   <th
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                                   >
                                        Products
                                   </th>
                                   <th
                                        scope="col"
                                        className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                                   >
                                        Quantity
                                   </th>
                              </tr>
                         </thead>
                         <tbody>
                              {orderData.products.map((product, idx) => (
                                   <tr
                                        key={idx}
                                        className="border-b border-gray-200"
                                   >
                                        <td className=" pl-4 text-sm md:pl-0 w-2/5">
                                             <div className="whitespace-wrap font-medium text-gray-900">
                                                  {product.item}
                                             </div>
                                        </td>
                                        <td className="py-4 text-right text-sm text-gray-500 sm:table-cell">
                                             <div>
                                                  <input
                                                       type="text"
                                                       className="bg-gray-200 text-xs appearance-none border-2 w-2/3 text-center border-gray-200 rounded-lg py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                       value={product.quantity}
                                                       onChange={(e) => {
                                                            console.log(
                                                                 e.target.value
                                                            );
                                                       }}
                                                  />
                                             </div>
                                        </td>
                                        <td>
                                             <div className="mx-12 mr-8">
                                                  <button
                                                       type="button"
                                                       onClick={() => {
                                                            removeProduct(idx);
                                                       }}
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
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
                    <div className="flex flex-row mt-4">
                         <div className="flex flex-row my-2">
                              <input
                                   type="text"
                                   className="bg-gray-200 text-xs appearance-none border-2 w-full md:w-2/3 ml-2 text-left border-gray-200 rounded-lg py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                   onChange={(e) => {
                                        setNewItemName(e.target.value);
                                   }}
                                   value={newItemName}
                                   placeholder="Product Name"
                              />
                              <input
                                   type="text"
                                   className="bg-gray-200 text-xs appearance-none border-2 w-2/3 ml-2 text-center border-gray-200 rounded-lg py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                   onChange={(e) => {
                                        setNewItemQuantity(e.target.value);
                                   }}
                                   value={newItemQuantity}
                                   placeholder="Quantity"
                              />
                         </div>
                         <button
                              type="button"
                              onClick={() => {
                                   addProduct();
                              }}
                              className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-200 px-6 py-2 mx-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 sm:w-auto"
                         >
                              Add Item
                         </button>
                    </div>
               </div>
          </div>
     );
}
