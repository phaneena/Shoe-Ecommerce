import React, { useContext } from "react";
import { shoecontext } from "../Context/ShopContext";
import Mainshooo from '/assets/mainshoe.jpg'
import Shop from "./Shop";
function Home() {
    const {handleAddToCart}=useContext(shoecontext)

    return (
        <div>
        <div className="w-full flex justify-center items-center">
                <img 
                    src={Mainshooo}
                    alt="Main Shoe"
                    className="w-full h-96 object-cover" 
                />
        </div>
        <Shop />
            
        </div>
    );
}

export default Home;

