import React, { useEffect, useState } from "react"

import { PageHeader } from "components/common/PageHeader"
import { PageLayout } from "components/common"
import { getOrderDetails } from "redux/actions/orderAction"
import { useDispatch, useSelector } from "react-redux"
const Delivery = () => {
   const dispatch = useDispatch()
   const [sort, setSort] = useState("today")
   const { loading, orders, error } = useSelector((state) => state.orderDetails)
   useEffect(() => {
      dispatch(getOrderDetails(sort))
   }, [])
   console.log(orders)
   return (
      <div>
         hello wordl
         {/* {loading ? (
            <div>Loading</div>
         ) : error ? (
            <div
               style={{
                  color: " #333333bb",
                  backgroundColor: "#f8d7da",
                  borderColor: "#f5c6cb",
                  padding: "12px 20px",
               }}
            >
               {error}
            </div>
         ) : (
            <>
               <PageHeader>
                  <PageLayout style={{ height: "100%" }}>
                     <div>
                        Orders &nbsp;
                        <span>/ &nbsp;{orders.length} order /s today</span>
                     </div>
                  </PageLayout>
               </PageHeader>
               <div className='nav__category select_container'>
                  <select
                     className='nav__category--select select_form'
                     onChange={onCategoryChange}
                  >
                     <option value='' selected={filterOrder === ""}>
                        All
                     </option>
                     <option value='today' selected={filterOrder === "today"}>
                        Today
                     </option>
                  </select>
                  <label className='select_label'>Filter category</label>
               </div>
               <PageLayout
                  style={{
                     //  height: "60vh",
                     display: "flex",
                     maxWidth: "600px",
                     flex: "1 1 700px",
                     justifyContent: "center",
                     padding: "24px",
                  }}
               >
                  {orders.map((order) => (
                     <div
                        style={{
                           width: "100%",
                           //    height: "160px",
                           //    flex: "0 0",
                           border: "1px solid #dcdadb",
                           borderLeft: "5px solid #52A43A",
                           borderRadius: "5px",
                           display: "flex",
                        }}
                     >
                        <div
                           style={{
                              flex: "0 0 100px",
                              padding: "12px",

                              borderRight: "1px solid #dcdadb",
                           }}
                        >
                           <div style={{ fontSize: "14px", opacity: "0.7" }}>
                              Total Items:
                           </div>
                           <div
                              style={{
                                 fontSize: "20px",
                                 fontWeight: "700",
                                 textAlign: "center",
                              }}
                           >
                              {order.orderItems.length}
                           </div>
                           <div></div>
                        </div>
                        <div
                           style={{
                              fontSize: "12px",
                              height: "auto",
                              width: "100%",
                           }}
                        >
                           <table
                              style={{
                                 width: "100%",
                                 padding: "12px",

                                 borderBottom: "1px solid #dcdadb",
                              }}
                           >
                              <tr className='table__row'>
                                 <td className='table__header'>Order id:</td>

                                 <td>{order._id}</td>
                              </tr>
                              <tr className='table__row'>
                                 <td className='table__header'>
                                    Order place on:
                                 </td>
                                 <td>{order.createdAt}</td>
                              </tr>
                              <tr className='table__row'>
                                 <td className='table__header'>
                                    Order due on:
                                 </td>
                                 <td>{order.dateToDeliver}</td>
                              </tr>
                           </table>
                           <table
                              style={{
                                 width: "100%",
                                 padding: "12px",
                                 borderBottom: "1px solid #dcdadb",
                              }}
                           >
                              <tr className='table__row'>
                                 <td className='table__header'>
                                    Billing Address:
                                 </td>
                                 <td>
                                    {order.shippingAddress.region},{" "}
                                    {order.shippingAddress.city},{" "}
                                    {order.shippingAddress.area}
                                 </td>
                              </tr>
                           </table>
                           <table
                              style={{
                                 width: "100%",
                                 padding: "12px",
                                 borderBottom: "1px solid #dcdadb",
                              }}
                           >
                              <tr
                                 className='table__row'
                                 style={{
                                    textTransform: "uppercase",
                                    opacity: "0.7",
                                 }}
                              >
                                 <td className='table__header'>
                                    Shipment Cost:
                                 </td>
                                 <td className='table__header'>Total Cost:</td>
                              </tr>
                              <tr
                                 className='table__row'
                                 style={{
                                    textTransform: "uppercase",
                                    fontSize: "24px",
                                    opacity: "0.7",
                                 }}
                              >
                                 <td>, {order.shippingPrice}</td>
                                 <td>{order.totalPrice}</td>
                              </tr>
                           </table>
                        </div>
                     </div>
                  ))}
               </PageLayout>
            </>
         )} */}
      </div>
   )
}

export default Delivery
