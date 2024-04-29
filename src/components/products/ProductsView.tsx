import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import BreadCrumb from "../common/Breadcrumb";
import { IProduct, productsList } from "../../store/products";
import { Link, useParams } from "react-router-dom";
import Rating from "../common/Rating";
import { toCurrencyFormat } from "../../helpers/helpers";
import ProductsViewLoad from "./ProductsViewLoad";
import { cartState } from "../../store/cart";

export default function ProductsView() {
  const productsLoadable = useRecoilValueLoadable<IProduct[]>(productsList);
  const products: IProduct[] = "hasValue" === productsLoadable.state ? productsLoadable.contents : [];
  const productParam = useParams();
  const productItem = products.find((item) => productParam.id === item.id.toString())!;
  const setCartItems = useSetRecoilState(cartState);

  const handleAddToCart = (id: string) => {
    setCartItems((prevCartState) => {
      const newItems = { ...prevCartState.items };
      if (newItems[id]) {
        newItems[id] = { ...newItems[id], count: newItems[id].count + 1 };
      } else {
        newItems[id] = { id: parseInt(id), count: 1 };
      }
      return { ...prevCartState, items: newItems };
    });
  };

  if ("loading" === productsLoadable.state) {
    return <ProductsViewLoad />;
  }

  return (
    <div>
      <BreadCrumb category={productItem.category} crumb={productItem.title} />
      <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
        <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
          <img src={productItem.image} alt={productItem.title} className="object-contain w-full h-72" />
        </figure>
        <div className="card-body px-1 lg:px-12">
          <h2 className="card-title">
            {productItem.title}
            <span className="badge badge-accent ml-2">NEW</span>
          </h2>
          <p>{productItem.description}</p>
          <Rating rate={productItem.rating.rate} count={productItem.rating.count} />
          <p className="mt-2 mb-4 text-3xl">{toCurrencyFormat(productItem.price)}</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={() => handleAddToCart(productItem.id?.toString())}>
              장바구니에 담기
            </button>
            <Link to="/cart" className="btn btn-outline ml-1">
              장바구니로 이동
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
