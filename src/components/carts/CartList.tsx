import { Link } from "react-router-dom";
import { ICartState, cartState, removeFromCart, addToCart } from "../../store/cart";
import { toCurrencyFormat } from "../../helpers/helpers";
import { useRecoilState, useRecoilValue } from "recoil";
import { productsList } from "../../store/products";

const CartList = ({ data }): JSX.Element => {
  const [cart, setCart] = useRecoilState<ICartState>(cartState);
  const products = useRecoilValue(productsList);

  const addToCartHandler = (id: string) => {
    const product = products.find((p) => p.id.toString() === id);
    if (product) {
      setCart((currentCart) => addToCart(currentCart, id, product));
    }
  };

  // 상품을 장바구니에서 제거하는 핸들러
  const removeFromCartHandler = (id: string) => {
    setCart(removeFromCart(cart, id));
  };

  return (
    <div className="lg:flex lg:items-center mt-4 px-2 lg:px-0">
      <Link to={`/product/${data.id}`}>
        <figure className="w-56 min-w-full flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white">
          <img src={data.image} alt={data.title} className="object-contain w-full h-48" />
        </figure>
      </Link>
      <div className="card-body px-1 lg:px-12">
        <h2 className="card-title">
          <Link to={`/product/${data.id}`} className="link link-hover">
            {data.title}
          </Link>
        </h2>
        <p className="mt-2 mb-4 text-3xl">
          {toCurrencyFormat(data.price)}
          <span className="text-2xl">({toCurrencyFormat(data.price / data.count)})</span>
        </p>
        <div className="card-actions">
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => removeFromCartHandler(data.id)}>
              –
            </button>
            <button className="btn btn-ghost no-animation">{data.count}</button>
            <button className="btn btn-primary" onClick={() => addToCartHandler(data.id)}>
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
