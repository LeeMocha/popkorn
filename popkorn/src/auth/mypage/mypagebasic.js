import { useEffect, useState } from "react";
import { apiCall } from "../../service/apiService";



export const Mypagebasic = () => {

  const [responseData, setResponseData] = useState('');

  useEffect(() => {
  const handleDelivery = async () => {
    const buyerEmail = sessionStorage.getItem("loginID");
    const status = "paid";

    try {
      const response = await apiCall(`/api/orderinfo/countByStatus?buyerEmail=${buyerEmail}&status=${status}`, "GET", null, null);
      if (response.data) {
      setResponseData(response.data);
       return responseData;
      } else {
        console.log(response);
        throw new Error('Failed to fetch delivery status');
      }
    } catch (error) {
      console.error('Error occurred while fetching delivery status:', error);
    }
  };
  handleDelivery();
}, []);

  return (
    <div className="mypagebasicwhole">
      <div className="basicsituation">
        <div className="situationsmallheader">
          My Order Processing Status
        </div>
        <div className="situationstatus">
          <div className="situationstatusdeliver1">Paid
            <div className="deliveryvalue">{responseData[0]}
            </div>
          </div>
          <div className="situationstatusdeliver2">Shipping
            <div className="deliveryvalue">{responseData[1]}
            </div>
          </div>
          <div className="situationstatusdeliver3">Delivered
            <div className="deliveryvalue">{responseData[2]}
            </div>
          </div>
          <div className="situationstatusdeliver4">
            <ul>
              <li>Paid : &nbsp;{responseData[0]} </li>
              <br />
              <li>Shipping  : &nbsp; {responseData[1]} </li>
              <br />
              <li>Delivered : &nbsp;{responseData[2]} </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypagebasic;