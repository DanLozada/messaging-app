import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
interface OrderProps {
  orderData: any;
  completeOrder: (orderId: string) => void;
  addModification: (orderId: string, dispatchId: string) => void;
  dispatchInfo: any[];
}

export default function Order(props: OrderProps) {
  const [addModification, setAddModification] = useState(false);
  const [modificationText, setModificationText] = useState("");
  const [listRef] = useAutoAnimate<HTMLTableSectionElement>();

  return (
    <div className="px-4 sm:px-6 lg:px-8 border-2 border-amber-300 rounded-lg p-4 mt-2">
      {props.orderData.line_items ? (
        <>
          <button
            type="button"
            onClick={() => {
              props.completeOrder(props.orderData._id);
            }}
            className="inline-flex ml-20 mt-4 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-800 bg-green-400 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Complete Order
          </button>
          <button
            type="button"
            onClick={() => setAddModification(!addModification)}
            className="inline-flex ml-20 mt-4 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-800 bg-green-400 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Modifications
          </button>
          {!addModification ? (
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
                <tbody ref={listRef}>
                  {props.orderData.line_items.map((product: any) => {
                    return (
                      <tr
                        key={product.product_id}
                        className="border-b border-gray-200"
                      >
                        <td className=" pl-4 text-sm md:pl-0 w-2/5 py-4">
                          <div className="whitespace-wrap font-medium text-gray-900">
                            {product.product}
                          </div>
                        </td>
                        <td className=" text-lg md:pl-0 w-2/5">
                          <div className="whitespace-wrap text-center font-medium text-gray-900">
                            {product.quantity}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <>
              <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0 pb-2">
                <input
                  type="text"
                  className="text-xl text-gray-800 mx-2 rounded-lg"
                  value={modificationText}
                  onChange={(e) => {
                    setModificationText(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      props.addModification(
                        props.orderData._id,
                        modificationText
                      );
                    }
                  }}
                  placeholder="What changes do you want to make?"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  props.addModification(props.orderData._id, modificationText);
                }}
                className="inline-flex ml-28 mt-4 items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-800 bg-green-400 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit
              </button>
              <div className="mt-4 text-center">
                {props.dispatchInfo[0].modification.length > 0 ? (
                  <>
                    {props.dispatchInfo[0].modification.map(
                      (modification: any, idx: number) => {
                        return <h1 key={idx}>{modification}</h1>;
                      }
                    )}
                  </>
                ) : (
                  <h1>No modifications</h1>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center font-bold">No Order Assigned</div>
      )}
    </div>
  );
}
