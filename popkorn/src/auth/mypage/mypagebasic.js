



export const Mypagebasic = () => {
  
  return (
    <div className="mypagebasicwhole">
      <div className="basicsituation">
        <div className="situationsmallheader">
      My Order Processing Status
        </div>
        <div className="situationstatus">
          <div className="situationstatusdeliver1">Preparing
          <div className="deliveryvalue">1
          </div>
          </div>
          <div className="situationstatusdeliver2">Shipping
          <div className="deliveryvalue">2
          </div>
          </div>
          <div className="situationstatusdeliver3">Delivered
          <div className="deliveryvalue">3
          </div>
          </div>
          <div className="situationstatusdeliver4">
            <ul>
              <li>Preparing : &nbsp; 1</li>
              <br/>
              <li>Shipping  : &nbsp; 2</li>
              <br/>
              <li>Delivered : &nbsp; 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypagebasic;