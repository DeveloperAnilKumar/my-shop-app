import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch , useSelector} from "react-redux";
import  axios  from 'axios';
import { BASE_URL } from './data.jsx';
import ProductCard from './ProductCard.jsx';


function CategoryByProducts() {

    const  {id} = useParams()

    const dispatch = useDispatch()

    const [product, setProduct] = useState([])



    async function getProductsByCategory(){
        const res = await  axios.get(BASE_URL+"/product/"+id)
        setProduct(res.data.product);
    }

    useEffect(()=>{
        getProductsByCategory()
    },[id])







  return (
    <div>

            {

                product.length ===0?(<div>not item </div>):(
                    product.map((p)=>
                    
                    <ProductCard  key={p._id} products={p}  />


                    )
                )

            }


    </div>
  )
}

export default CategoryByProducts
