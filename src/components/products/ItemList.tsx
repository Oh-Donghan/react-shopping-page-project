import { Link } from "react-router-dom";
import { IProduct, productsList } from "../../store/products";
import { useRecoilValueLoadable } from "recoil";
import { Category } from "../../constants/category";
import { toCurrencyFormat } from "../../helpers/helpers";
import ProductsLoad from "./ProductsLoad";

type Items = {
  title?: string;
  limit?: number;
  // data?: Array<IProduct>;
  scroll?: boolean;
} & typeof defaultProps;

const defaultProps = {
  title: "",
  limit: 4,
  // data: [],
  scroll: false,
};

export default function ItemList({ title, limit, scroll }: Items): JSX.Element {
  const productsLoadable = useRecoilValueLoadable<IProduct[]>(productsList);
  const products: IProduct[] = "hasValue" === productsLoadable.state ? productsLoadable.contents : [];
  const productItem = products.filter((item) => title === Category[item.category]);

  return (
    <>
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 item_list" data-scroll={scroll}>
        {0 < productItem.length ? (
          productItem.slice(0, limit).map((product: IProduct) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
            >
              <figure className="flex h-80 bg-white overflow-hidden">
                <img src={product.image} alt="상품 이미지" className="transition-transform duration-300" />
              </figure>
              <div className="card-body bg-gray-100 dark:bg-gray-700">
                <p className="card-title text-base">{product.title}</p>
                <p className="text-base">{toCurrencyFormat(product.price)}</p>
              </div>
            </Link>
          ))
        ) : (
          <ProductsLoad limit={limit} />
        )}
      </div>
    </>
  );
}
