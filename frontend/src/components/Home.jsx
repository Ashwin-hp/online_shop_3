import { useGetAllProductsQuery } from "../features/productsApi";
import {useNavigate} from "react-router" 
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

const Home = () => {
    let {data, error, isLoading} = useGetAllProductsQuery()
    let data1=data;
    const dispatch = useDispatch()
    const navigate  = useNavigate()
    const handleAddToCart = (product) =>{
       dispatch(addToCart(product))
       navigate("/cart")
    }
    const setSort = (t) =>{
      data1 = data?.filter(item => {return item.id===parseInt(t)})
    }
    return <div className="home-container">
    {isLoading? 
    <p>Loading...</p> : error?
    <p>An error occured</p>:
    <>
      <h2>New Arrivals</h2>
      <div className="products">
        {data1?.map((product) =><div key= {product.id} className="product">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name}/>
            <div className="details">
                <span>{product.desc}</span>
                <span className="price">${product.price}</span>
            </div>
            <button onClick={() =>handleAddToCart(product)}>Add To Cart</button>
        </div>)}
      </div>
    </>
    }
    </div>;
}
export default Home;
