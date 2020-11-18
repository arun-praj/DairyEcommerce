import React, { useEffect, useState } from "react"

import { PageHeader } from "components/common/PageHeader"
import { PageLayout } from "components/common"
import { getOrderDetails } from "redux/actions/orderAction"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "components/UI/Button"
import axios from "axios"
const Delivery = () => {
   const dispatch = useDispatch()
   const [sort, setSort] = useState("today")
   const [failedReason, setFailedReason] = useState()
   const { loading, orders, error } = useSelector((state) => state.orderDetails)
   console.log(sort)

   useEffect(() => {
      dispatch(getOrderDetails(sort))
   }, [sort, dispatch])
   const onSortChange = (e) => {
      setSort(e.target.value)
   }
   const setDeliveryStatus = async (e, status, orderId) => {
      // console.log(status)
      let body
      const config = {
         headers: {
            "Content-Type": "application/json",
         },
      }
      if (failedReason) {
         body = JSON.stringify({
            orderFailedReason: failedReason,
            orderId,
         })
      } else {
         body = JSON.stringify({
            orderId,
         })
      }
      const res = await axios.put(
         `http://localhost:9000/api/order/deliverystatus/${status}`,
         body,
         config
      )
      console.log(res.data)
   }
   console.log(orders)
   return (
      <div>
         {loading ? (
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
                        {/* <span>/ &nbsp;{orders.length} order /s today</span> */}
                     </div>
                  </PageLayout>
               </PageHeader>

               <PageLayout
                  style={{
                     //  height: "60vh",
                     display: "flex",
                     flexDirection: "column",
                     maxWidth: "600px",
                     flex: "1 1 700px",
                     justifyContent: "center",
                     padding: "24px",
                  }}
               >
                  <div
                     className='nav__category select_container'
                     style={{ display: "block" }}
                  >
                     <select
                        className='nav__category--select select_form'
                        onChange={onSortChange}
                     >
                        <option value='all' selected={sort === " "}>
                           All
                        </option>
                        <option value='today' selected={sort === "today"}>
                           Today
                        </option>
                     </select>
                     <label className='select_label'>Filter category</label>
                  </div>
                  {orders.map((order) => (
                     <div
                        style={{
                           width: "100%",
                           border: "1px solid #dcdadb",
                           borderLeft: "5px solid #52A43A",
                           borderRadius: "5px",
                           display: "flex",
                           flexDirection: "column",
                           marginTop: "32px",
                        }}
                     >
                        <div style={{ display: "flex" }}>
                           <div
                              style={{
                                 flex: "0 0 100px",
                                 padding: "12px",
                                 borderBottom: "1px solid #dcdadb",

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
                              <div
                                 style={{
                                    fontSize: "14px",
                                    opacity: "0.7",
                                    textAlign: "center",
                                    marginTop: "16px",
                                 }}
                              >
                                 Details:
                              </div>
                              <div
                                 style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    textAlign: "center",
                                 }}
                              >
                                 <table
                                    style={{
                                       width: "100%",
                                       // padding: "12px",
                                       fontSize: "12px",

                                       // borderBottom: "1px solid #dcdadb",
                                    }}
                                 >
                                    {order.orderItems.map((item) => {
                                       return (
                                          <tr className=''>
                                             <td>{item.name}</td>

                                             <td>&nbsp;&nbsp;</td>

                                             <td>{item.qty}</td>
                                          </tr>
                                       )
                                    })}
                                 </table>
                              </div>
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
                                 <tr className='table__row'>
                                    <td className='table__header'>
                                       Buyers Name:
                                    </td>
                                    <td>{order.userName}</td>
                                 </tr>
                                 <tr className='table__row'>
                                    <td className='table__header'>
                                       Buyers Email:
                                    </td>
                                    <td>{order.email}</td>
                                 </tr>
                                 <tr className='table__row'>
                                    <td className='table__header'>
                                       Buyers Contact No:
                                    </td>
                                    <td>{order.contact}</td>
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
                                    <td className='table__header'>
                                       Total Cost:
                                    </td>
                                 </tr>
                                 <tr
                                    className='table__row'
                                    style={{
                                       textTransform: "uppercase",
                                       fontSize: "24px",
                                       opacity: "0.7",
                                    }}
                                 >
                                    <td> {order.shippingPrice}</td>
                                    <td>{order.totalPrice}</td>
                                 </tr>
                              </table>
                           </div>
                        </div>
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "center",

                              padding: "12px",
                           }}
                        >
                           <Button
                              onClick={(e) =>
                                 setDeliveryStatus(e, "success", order._id)
                              }
                              style={{
                                 color: "#fff",
                                 backgroundColor: "#28a745",
                                 borderColor: "#28a745",
                                 width: "77px",
                                 height: "38px",
                                 marginRight: "16px",
                              }}
                           >
                              Success
                           </Button>
                           <Button
                              onClick={(e) => {
                                 let msg = prompt("State the reason")
                                 if (msg) {
                                    setDeliveryStatus(e, "failed", order._id)
                                 }
                              }}
                              style={{
                                 color: "#fff",
                                 backgroundColor: "#dc3545",
                                 borderColor: "#dc3545",
                                 height: "38px",

                                 width: "77px",
                              }}
                           >
                              Failed
                           </Button>
                        </div>
                     </div>
                  ))}
               </PageLayout>
            </>
         )}
      </div>
   )
}

export default Delivery
