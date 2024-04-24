import { useEffect, useState } from "react";
import TypeIt from "typeit-react";
import SearchForm from "../modules/SearchForm";
import { apiCall } from "../../../service/apiService";
import './orderList.css';
import AdminPaging from "../modules/AdminPaging";
const imageSrc = process.env.PUBLIC_URL + "/productIMG/";

const OrderItem = ({ order, onClick }) => {
   const [editMode, setEditMode] = useState(false);
   const [infostatus, setInfostatus] = useState(order.status);

   const handleStatusChange = (event) => {
      setInfostatus(event.target.value);
   };

   const toggleEdit = () => {
      setEditMode(!editMode);
   };

   const updateStatus = async (merchantUid, newStatus) => {
      try {
         const response = await apiCall(`/api/orderinfo/updatestatus?merchantuid=${merchantUid}&status=${newStatus}`, "POST");
         if (response.status === 200) {
            return true;
         } else {
            console.log('상태 업데이트 실패:', response.statusText);
            return false;
         }
      } catch (error) {
         console.error('오류 발생:', error);
         return false;
      }
   }

   const handleUpdate = () => {
      toggleEdit();
      updateStatus(order.merchantUid, infostatus);
   };

   return order ? (

      <div className='adminorderlistcontainer' >
         <div className='orderlist1st'>
            <div className='adminorderdetaildate'>
               Order date : {new Date(order.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
            </div>

            {editMode ? (

               <div className="adminorderbtn">
                  <select value={infostatus} onChange={handleStatusChange} className="adminorderliststatus">
                     <option value="Paid">Paid</option>
                     <option value="Ready for ship">Ready for ship</option>
                     <option value="Shipping">Shipping</option>
                     <option value="Delivered">Delivered</option>
                     <option value="Refund">Refund</option>
                     <option value="Ready for Refund">Ready for Refund</option>
                  </select> &nbsp;
                  <button className='adminorderdetailcheck' onClick={() => handleUpdate()}>Save</button> &nbsp;
                  <button className='adminorderdetailcheck' onClick={() => onClick(order)}>Detail</button>
               </div>

            ) : (

               <div className="adminorderbtn">
                  <span className="adminorderliststatus">[ {infostatus} ]</span> &nbsp;
                  <button className='adminorderdetailcheck' onClick={toggleEdit}>Edit</button> &nbsp;
                  <button className='adminorderdetailcheck' onClick={() => onClick(order)}>Detail</button>
               </div>

            )}
         </div >
         <div className='orderlist2nd'>
            <div className='adminorderdetailnumber'>
               Order Number : <span className="adminordernum">{order.merchantUid}</span>
            </div>
            <div>
               Buyer Email: {order.buyerEmail} <br />
               Buyer name: {order.buyerName} <br />
               Address: {order.buyerAddr} <br />
               Phone: {order.buyerTel}<br />

            </div>
         </div>
      </div >
   ) : null
}

export default function OrderList() {
   const [showPopup, setShowPopup] = useState(false);
   const [orders, setOrders] = useState([]);
   const [selectedOrder, setSelectedOrder] = useState(null);
   const [orderDetails, setOrderDetails] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const ordersPerPage = 5;
   const [currCategoryl, setCurrCategoryl] = useState('all');
   const [currKeyword, setCurrKeyword] = useState('');
   const categoryl = ['all', 'merchantUid', 'buyerEmail', 'buyerTel']
   const [orderData, setOrderData] = useState({
      servData: [],
      pageData: {
         page: 1,
         size: 20,
         prev: false,
         next: false,
         start: 0,
         end: 0,
         pageList: [1],
         totalPage: 0
      }
   });

   const popupClick = (order) => {
      if (order) {
         apiCall(`/api/orderdetail/orderlist?merchantUid=${order.merchantUid}`, "GET", null, null)
            .then(response => {
               setOrderDetails(response.data);
               setSelectedOrder(order);
               setShowPopup(true);
            }).catch(err => console.log(err));
      }
   };

   const closePopup = () => {
      setShowPopup(false);
      setOrderDetails([]);
      setSelectedOrder(null);
   };

   const setPageState = (newPage) => {
      if (newPage < 1 || newPage > orderData.pageData.totalPage) return;
      setCurrentPage(newPage);
   };

   useEffect(() => {
      apiCall(`/api/orderinfo/searchlist?searchType=${currCategoryl}&keyword=${currKeyword}&page=${currentPage}`, "GET", null, null)
         .then(response => {
            setOrderData({
               servData: response.data.dtoList,
               pageData: {
                  page: response.data.page,
                  size: response.data.size,
                  prev: response.data.prev,
                  next: response.data.next,
                  start: response.data.start,
                  end: response.data.end,
                  pageList: response.data.pageList,
                  totalPage: response.data.totalPage
               }
            });
         })
         .catch(err => {
            console.error('Error loading data:', err);
         });
   }, [currCategoryl, currKeyword, currentPage, ordersPerPage]);


   useEffect(() => {
      if (orderData.servData.length > 0) {
         setOrders(orderData.servData);
      } else {
         setOrders([]);
      }
   }, [orderData.servData]);

   return (
      <div className="adminorderwhole">
         <div className="productlist_container">
            <div className="productlist_header">
               <TypeIt options={{ loop: false }} className="productlist_type">Order List</TypeIt>
            </div>
         </div>
         <div className="admincategory_search">
            <div>
               <select onChange={(e) => {
                  setCurrCategoryl(e.target.value);
                  setPageState(1);
               }}>
                  {
                     categoryl.map((category, index) =>
                        <option value={category} key={index}>{category}</option>
                     )
                  }
               </select>

            </div>
            <SearchForm setCurrKeyword={setCurrKeyword} setCurrentPage={setCurrentPage} showButton={false} />

            <>
               {orders.map((order, index) => (
                  <OrderItem key={index} order={order} onClick={popupClick} />
               ))}
            </>

            {showPopup && selectedOrder && (
               <div className="orderpopup-overlay">
                  <div>
                     <div className='adminorderdetailscontainer'>
                        <div className='orderlist1st'>
                           <div className='adminorderdetaildate'>Order date : <br />{new Date(selectedOrder.paidAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</div>
                           <div className='adminorderdetailpcode'>Order number : <span>{selectedOrder.merchantUid}</span></div>
                        </div>
                        {orderDetails.map((orderDetail, index) => (
                           <div className='adminorderdetailproductinfo' key={index}>
                              <div className='adminorderdetailinfo'>
                                 <div className='adminorderdetailimg'><img src={imageSrc + orderDetail.image1} alt="product" /></div>
                                 <div className='productmapvalue'>
                                    <div className='adminorderdetailpname'>{orderDetail.productname}</div>
                                    <div className='adminorderdetailalternative'>{orderDetail.alternative}</div>
                                    <div className='adminorderdetailcount'>{orderDetail.detailcount} EA / {orderDetail.price}￦</div>
                                 </div>
                              </div>
                           </div>
                        ))}
                        <div className='orderlist3rd'>
                           <div className='ordertotalprice'>
                              Total amount : {orderDetails.reduce((total, orderDetail) => total + (orderDetail.price * orderDetail.detailcount), 0)} ₩
                           </div>
                        </div>
                        <button className="popup-close-btn" onClick={closePopup}>X</button>
                     </div>
                  </div>
               </div>
            )}
            <div className='ordernum_paging'>
               <AdminPaging pageData={orderData.pageData} setPageState={setPageState} />

            </div>
         </div>
      </div >
   );
}