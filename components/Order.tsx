interface OrderProps {
     orderData: any;
}

export default function Order(props: OrderProps) {
     return (
          <div className="px-4 sm:px-6 lg:px-8 border-2 border-amber-300 rounded-lg p-4 mt-2">
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
                                        className="py-3.5 px-3 text-center text-sm font-semibold text-gray-900 sm:table-cell"
                                   >
                                        Quantity
                                   </th>
                              </tr>
                         </thead>
                         <tbody>
                              {props.orderData && (
                                   <>
                                        {props.orderData.line_items.map(
                                             (product: any) => {
                                                  return (
                                                       <tr
                                                            key={
                                                                 product.product_id
                                                            }
                                                            className="border-b border-gray-200"
                                                       >
                                                            <td className=" pl-4 text-sm md:pl-0 w-2/5 py-4">
                                                                 <div className="whitespace-wrap font-medium text-gray-900">
                                                                      {
                                                                           product.product
                                                                      }
                                                                 </div>
                                                            </td>
                                                            <td className=" text-lg md:pl-0 w-2/5">
                                                                 <div className="whitespace-wrap text-center font-medium text-gray-900">
                                                                      {
                                                                           product.quantity
                                                                      }
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  );
                                             }
                                        )}
                                   </>
                              )}
                         </tbody>
                    </table>
               </div>
          </div>
     );
}
