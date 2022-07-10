import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const data = [
     {
          id: 1,
          name: "New Advertising Campaign",
          hours: "12.0",
          quantity: 5,
          price: "$900.00",
     },
     {
          id: 1,
          name: "New Advertising Campaign",
          hours: "12.0",
          quantity: 5,
          price: "$900.00",
     },
     {
          id: 1,
          name: "New Advertising Campaign",
          hours: "12.0",
          quantity: 5,
          price: "$900.00",
     },
     // More projects...
];

export default function Order(props: any) {
     const [example_data, setExampleData] = useState(props.data);

     return (
          <div className="px-4 sm:px-6 lg:px-8 border-2 border-amber-300 rounded-lg p-4 mt-4">
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
                    <div className="sm:flex-auto">
                         <h1 className="text-xl font-semibold text-gray-900">
                              Order Summary
                         </h1>
                         <p className="mt-2 text-sm text-gray-700">
                              {example_data.customer_address}
                         </p>
                         <p className="mt-2 text-sm text-gray-700">
                              {example_data.delivery_datetime}
                         </p>
                    </div>
                    {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                         <button
                              type="button"
                              onClick={() => {
                                   console.log("send to client by email");
                              }}
                              className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-200 px-4 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 sm:w-auto"
                         >
                              Send to Client
                         </button>
                    </div> */}
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
                              {Object.keys(example_data.products).map(
                                   (product_name, idx) => (
                                        <tr
                                             key={idx}
                                             className="border-b border-gray-200"
                                        >
                                             <td className=" pl-4 text-sm md:pl-0 w-2/5">
                                                  <div className="whitespace-wrap font-medium text-gray-900">
                                                       {product_name}
                                                  </div>
                                             </td>
                                             <td className="py-4 text-right text-sm text-gray-500 sm:table-cell">
                                                  <div>
                                                       <input
                                                            type="text"
                                                            className="bg-gray-200 text-xs appearance-none border-2 w-2/3 text-center border-gray-200 rounded-lg py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            value={
                                                                 example_data
                                                                      .products[
                                                                      product_name
                                                                 ]
                                                            }
                                                            onChange={(e) => {
                                                                 setExampleData(
                                                                      {
                                                                           ...example_data,
                                                                           products:
                                                                                {
                                                                                     ...example_data.products,
                                                                                     [product_name]:
                                                                                          e
                                                                                               .target
                                                                                               .value,
                                                                                },
                                                                      }
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
                                                                 setExampleData(
                                                                      {
                                                                           ...example_data,
                                                                           products:
                                                                                {
                                                                                     ...example_data.products,
                                                                                     [product_name]:
                                                                                          "OOS",
                                                                                },
                                                                      }
                                                                 );
                                                            }}
                                                            className=" inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                                   )
                              )}
                         </tbody>

                         {/* <tfoot>
                              <tr>
                                   <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                                   >
                                        Subtotal
                                   </th>
                                   <th
                                        scope="row"
                                        className="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                                   >
                                        Subtotal
                                   </th>
                                   <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                                        {props.subtotal}
                                   </td>
                              </tr>
                              <tr>
                                   <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                                   >
                                        Delivery Fee
                                   </th>
                                   <th
                                        scope="row"
                                        className="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                                   >
                                        Delivery Fee
                                   </th>
                                   <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                                        <div>
                                             <div className="mt-1 relative rounded-md shadow-sm">
                                                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                       <span className="text-gray-500 sm:text-sm">
                                                            $
                                                       </span>
                                                  </div>
                                                  <input
                                                       type="text"
                                                       name="price"
                                                       value={deliveryFee}
                                                       onChange={(e) => {
                                                            setDeliveryFee(
                                                                 e.target.value
                                                            );
                                                       }}
                                                       onKeyDown={(e) => {
                                                            if (
                                                                 e.key ===
                                                                 "Enter"
                                                            ) {
                                                                 e.preventDefault();
                                                                 setTotal(
                                                                      parseFloat(
                                                                           props.subtotal
                                                                      ) +
                                                                           parseFloat(
                                                                                deliveryFee
                                                                           )
                                                                 );
                                                            }
                                                       }}
                                                       className="focus:ring-amber-300 focus:border-amber-300 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-right"
                                                  />
                                                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                       <span
                                                            className="text-gray-500 sm:text-sm"
                                                            id="price-currency"
                                                       >
                                                            USD
                                                       </span>
                                                  </div>
                                             </div>
                                        </div>
                                   </td>
                              </tr>
                              <tr>
                                   <th
                                        scope="row"
                                        colSpan={3}
                                        className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                                   >
                                        Total
                                   </th>
                                   <th
                                        scope="row"
                                        className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                                   >
                                        Total
                                   </th>
                                   <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                                        $ {total}
                                   </td>
                              </tr>
                         </tfoot> */}
                    </table>
               </div>
          </div>
     );
}
