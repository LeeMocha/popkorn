
import TypeIt from "typeit-react";
import "./Add.css";
import { useState } from "react";


export default function Add() {

   const categoryList = [
      {
         name: "album",
         subcategorys: [
            { subCategorysId: 3, name: "All" }
         ]
      },
      {
         name: "goods",
         subcategorys: [
            { subCategorysId: 4, name: "Official Fanlight" },
            { subCategorysId: 5, name: "Key Ring" },
            { subCategorysId: 6, name: "Phone Case" },
            { subCategorysId: 7, name: "ETC" }
         ]
      },

      {
         name: "photo",
         subcategorys: [
            { subCategorysId: 8, name: "Photo Book" },
            { subCategorysId: 9, name: "Photo Card" }
         ]
      }
   ]

   const [keyCateL, setKeyCateL] = useState('album');
   const [keyCateM, setKeyCateM] = useState('all');
   const [imageURL, setImageURL] = useState(""); // State to store image URL

   // Handle image upload
   const handleImageUpload = (event) => {
      const file = event.target.files[0]; // Get the first file selected by the user
      const imageURL = URL.createObjectURL(file); // Create URL for the selected image
      setImageURL(imageURL); // Set the image URL in the state
   };


   return (
      <div className="add_wrap">
         <div className="add_header">
            <TypeIt options={{ loop: false }} className="productlist_type">Add Product</TypeIt>
         </div>
         <div className="add_image_input">
            <img src={imageURL} alt="Upload Image" />
            <div className="add_input_wrap">
               <span>Image File</span>
               <input type="file" onChange={handleImageUpload}/>
               <span>Product Name (Title)</span>
               <input type="text" />
               <span>Artist</span>
               <input type="text" />
               <span>Category</span>
               <div>
                  <select onChange={(e) => {
                     setKeyCateL(e.target.value)
                     setKeyCateM(categoryList.find(sub => sub.name === keyCateL)?.subcategorys[0].name)
                  }} value={keyCateL}>
                     <option value="album" key="1">ALBUM</option>
                     <option value="goods" key="2">GOODS</option>
                     <option value="photo" key="3">PHOTO</option>
                  </select>
                  &nbsp;
                  <select onChange={(e) => setKeyCateM(e.target.value)}>
                     {categoryList.find(sub => sub.name === keyCateL)?.subcategorys.map(subcategory =>
                        <option value={subcategory.name} key={subcategory.subCategorysId}>{subcategory.name}</option>
                     )}
                  </select>
               </div>
               <span>Price</span>
               <input type="text" />
               <span>Option</span>
               <input type="text" />
               <span>Stock In</span>
               <input type="number" className="stock_input"/>
            </div>
         </div>
      </div>
   );
}