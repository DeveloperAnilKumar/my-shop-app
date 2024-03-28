import {useSelector} from "react-redux";

export const data =[

    {
        "id": 1,
        "name": "Nike React Infinity Run Flyknit",
        "brand": "NIKE",
        "gender": "MEN",
        "category": "RUNNING",
        "price": 160,
        "is_in_inventory": true,
        "items_left": 3,
        "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg",
        "slug": "nike-react-infinity-run-flyknit",
        "featured": 0
    },
    {
        "id": 2,
        "name": "Nike React Miler",
        "brand": "NIKE",
        "gender": "MEN",
        "category": "RUNNING",
        "price": 130,
        "is_in_inventory": true,
        "items_left": 3,
        "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-5cc7de3b-2afc-49c2-a1e4-0508997d09e6/react-miler-mens-running-shoe-DgF6nr.jpg",
        "slug": "nike-react-miler",
        "featured": 1
    },
    {
        "id": 3,
        "name": "Nike Air Zoom Pegasus 37",
        "brand": "NIKE",
        "gender": "WOMEN",
        "category": "RUNNING",
        "price": 120,
        "is_in_inventory": true,
        "items_left": 3,
        "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-33b0a0a5-c171-46cc-ad20-04a768703e47/air-zoom-pegasus-37-womens-running-shoe-Jl0bDf.jpg",
        "slug": "nike-air-zoom-pegasus-37",
        "featured": 0
    },
    {
        "id": 4,
        "name": "Nike Joyride Run Flyknit",
        "brand": "NIKE",
        "gender": "WOMEN",
        "category": "RUNNING",
        "price": 180,
        "is_in_inventory": true,
        "items_left": 3,
        "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99a7d3cb-e40c-4474-91c2-0f2e6d231fd2/joyride-run-flyknit-womens-running-shoe-HcfnJd.jpg",
        "slug": "nike-joyride-run-flyknit",
        "featured": 0
    },
    {
        "id": 5,
        "name": "Nike Mercurial Vapor 13 Elite FG",
        "brand": "NIKE",
        "gender": "WOMEN",
        "category": "FOOTBALL",
        "price": 250,
        "is_in_inventory": true,
        "items_left": 3,
        "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg",
        "slug": "nike-mercurial-vapor-13-elite-fg",
        "featured" : 0
    },
    {
        "id": 6,
        "name": "Nike Phantom Vision Elite Dynamic Fit FG",
        "brand": "NIKE",
        "gender": "WOMEN",
        "category": "FOOTBALL",
        "price": 150,
        "is_in_inventory": true,
        "items_left": 3,
        "imageURL": "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/s1amp7uosrn0nqpsxeue/phantom-vision-elite-dynamic-fit-fg-firm-ground-soccer-cleat-19Kv1V.jpg",
        "slug": "nike-phantom-vision-elite-dynamic-fit-fg",
        "featured": 0
    },


]

// export  const  BASE_URL="https://server-inky-beta.vercel.app/api/v1"

export  const  BASE_URL="http://localhost:4000/api/v1"




  export  const  GetToken = ()=>{
      const  {user} = useSelector((state)=> state.auth)
      return user? user.token :null
  }