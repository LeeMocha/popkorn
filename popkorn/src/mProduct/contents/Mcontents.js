import Slot from "../slot/Slot";

export default function Mcontents() {

   const imageSrc = process.env.PUBLIC_URL + '/mproductIMG/';
   const logoSrc = process.env.PUBLIC_URL + '/celebIMG/';

   const artist = {
      artistName : "Le sserafim",
      image : logoSrc + "lesserafim.png"
   }

   const topItems = [
      {
         artist: "Le sserafim",
         productName: "LE SSERAFIM's DAY OFF IN JEJU PHOTOBOOK",
         price: 27000,
         image: imageSrc + "1.png",
         goto: ""
      },
      {
         artist: "Le sserafim",
         productName: "FEARNOT MEMBERSHIP GIFT",
         price: 7000,
         image: imageSrc + "3.png",
         goto: ""
      },
      {
         artist: "Le sserafim",
         productName: "1st Studio Album 'UNFORGIVEN'",
         price: 16700,
         image: imageSrc + "7.png",
         goto: ""
      },
      {
         artist: "Le sserafim",
         productName: "JAPAN 2nd Single [UNFORGIVEN] Solo Jacket",
         price: 13400,
         image: imageSrc + "6.png",
         goto: ""
      },
      {
         artist: "Le sserafim",
         productName: "1st Studio Album 'UNFORGIVEN'(COMPA..)",
         price: 12600,
         image: imageSrc + "4.png",
         goto: ""
      },
      {
         artist: "Le sserafim",
         productName: "FEARNOT MEMBERSHIP",
         price: 25000,
         image: imageSrc + "2.png",
         goto: ""
      },
      {
         artist: "Le sserafim",
         productName: "1st Studio Album 'UNFORGIVEN' (RANDOM)",
         price: 27500,
         image: imageSrc + "8.png",
         goto: ""
      },
      {
         artist: "Le sserafim",
         productName: "LE SSERAFIM's DAY OFF IN JEJU PHOTOBOOK",
         price: 27000,
         image: imageSrc + "1.png",
         goto: ""
      },
      {
         artist: "Le sserafim",
         productName: "LENIVERSE PHOTOBOOK : FIMbidi-Bobbidi-Boo",
         price: 25000,
         image: imageSrc + "5.png",
         goto: ""
      }
   ]

   const sortType = ["Album", "Photo", "Goods", "Album2", "Photo2", "Goods2", "Goods3"]

   return (
      <div className="mcontent_grid_container">
         <div className="artistLogo">
            <img src={artist.image} alt="celeb_img" className="mp_artistLogo_img"/>
            <span>MORE</span>
         </div>
         {
            topItems.map((item, i) => {
                  return <div key={i} className="mp_i_wrap"><Slot item={item} index={i}/></div>;
            })
         }

      </div>
   );
}