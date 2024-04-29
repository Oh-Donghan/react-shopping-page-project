import { atom, selector } from "recoil";
import { CART_ITEM } from "../constants/category";
import { IProduct, productsList } from "./products";

export interface ICartInfo {
  readonly id: number;
  readonly count: number;
}

export interface ICartItems {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly count: number;
  readonly image: string;
}

export interface ICartState {
  readonly items?: Record<string | number, ICartInfo>;
}

/**
 * 카트의 상태는 localStorage 기준으로 초기화 됩니다.
 * 카트의 상태는 새로고침해도 유지되어야 하기 때문입니다.
 */
export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      localStorage.getItem(CART_ITEM) && setSelf(JSON.parse(localStorage.getItem(CART_ITEM) as string));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});

/**
 * cartList를 구현 하세요.
 * id, image, count 등을 return합니다.
 */
export const cartList = selector<ICartItems[]>({
  key: "cartList",
  get: ({ get }) => {
    const products = get(productsList);
    const cartItems = get(cartState)?.items;
    if (!cartItems) return [];

    return Object.keys(cartItems).flatMap((id) => {
      const item = cartItems[id];
      const product = products.find((p) => p.id === parseInt(id));
      if (!product) return [];
      return [
        {
          id: item.id.toString(),
          image: product.image,
          title: product.title,
          count: item.count,
          price: item.count * product.price,
        },
      ];
    });
  },
});

// addToCart는 구현 해보세요.
export const addToCart = (cart: ICartState, id: string, product: IProduct): ICartState => {
  // cart.items이 undefined일 수 있으므로, 이를 고려한 처리가 필요
  const items = cart.items ? { ...cart.items } : {};

  if (items[id]) {
    items[id] = {
      ...items[id],
      count: items[id].count + 1,
    };
  } else {
    items[id] = {
      id: product.id,
      count: 1,
    };
  }

  return { items };
};

// removeFromCart는 참고 하세요.
export const removeFromCart = (cart: ICartState, id: string) => {
  const tempCart = { ...cart.items };

  if (!tempCart[id]) {
    console.error("Item not found in cart:", id);
    return cart;
  }

  if (tempCart[id].count > 1) {
    tempCart[id] = {
      ...tempCart[id],
      count: tempCart[id].count - 1,
    };
  } else {
    delete tempCart[id];
  }

  return {
    ...cart,
    items: { ...tempCart },
  };
};

/**
 * 그 외에 화면을 참고하며 필요한 기능들을 구현 하세요.
 */
