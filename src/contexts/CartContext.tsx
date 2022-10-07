import { createContext, ReactNode, useState } from 'react';

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface CartContextData {
  cartProducts: IProduct[];
  addToCart: (product: IProduct) => void;
  removeCartProduct: (produtId: string) => void;
  hasProductCart: (productId: string) => boolean;
  cartTotal: number;
  handleCartOpen: () => void;
  isOpenCart: boolean;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const [isOpenCart, setIsOpenCart] = useState(false);
  
  const cartTotal = cartProducts.reduce(
    (total, product) => {
      return total + product.numberPrice
  }, 0);

  function addToCart(product: IProduct) {
    setCartProducts(state => [...state, product]);
  }

  function removeCartProduct(productId: string) {
    setCartProducts(state => state.filter(prodcut => prodcut.id !== productId));
  }

  function hasProductCart(productId: string) {
    return cartProducts.some(product => product.id === productId);
  }

  function handleCartOpen() {
    setIsOpenCart(!isOpenCart);
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        addToCart,
        hasProductCart,
        removeCartProduct,
        cartTotal,
        handleCartOpen,
        isOpenCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}