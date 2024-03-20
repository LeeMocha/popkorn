



export const Mypagebasic = () => {
  
  return (
    <div className="mypagebasicwhole">
      <div className="basicsituation">
        <div className="situationsmallheader">
      My Order Processing Status &nbsp;[As of the last 3 months]
        </div>
        <div className="situationstatus">
          <div className="situationstatusdeliver1">배송전
          <div className="deliveryvalue">1
          </div>
          </div>
          <div className="situationstatusdeliver2">배송중
          <div className="deliveryvalue">2
          </div>
          </div>
          <div className="situationstatusdeliver3">배송완료
          <div className="deliveryvalue">3
          </div>
          </div>
          <div className="situationstatusdeliver4">
            <ul>
              <li>배송전 : &nbsp; 1</li>
              <br/>
              <li>배송중 : &nbsp; 2</li>
              <br/>
              <li>배송완료 : &nbsp; 3</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypagebasic;