
export default function MoreCeleb({ celeb, index }) {

   const imgSrc = process.env.PUBLIC_URL + "/celebIMG/"

   return (
      <div className="moreceleb_wrap">
         {
               <li key={index} className='itemLi'>
                  <button className='itemLi_btn' onClick={() => {}}>
                     <img src={imgSrc+celeb.celebimg} alt="" className='item' />
                     <span className='itemname'>{celeb.artist}</span>
                  </button>
               </li>
         }
      </div>
   );
}