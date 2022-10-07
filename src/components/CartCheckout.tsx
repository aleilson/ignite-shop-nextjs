import { CartAmount, CartProduct, CartProductContainer } from '../styles/components/cart';
import { X } from "phosphor-react";
import Image from "next/image";
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import axios from 'axios';

export function CartCheckout() {
  const [isCreatingCheckoutSession, SetIsCreatingCheckoutSession] = useState(false);
  const { cartProducts, removeCartProduct, cartTotal, handleCartOpen, isOpenCart } = useCart();

  const formattedCartTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cartTotal);


  async function handleBuyProduct() {
    try {
      SetIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        products: cartProducts
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      SetIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout!');
    }
  }
  
  return (
    <>
      {isOpenCart && (
        <CartProductContainer>
          <button onClick={handleCartOpen}><X size={24} /></button>
          <strong>Sacola de compras</strong>

          <div>
            {cartProducts.map(product => (
              <CartProduct key={product.id}>
                <Image
                  src={product.imageUrl}
                  width={101}
                  height={93}
                  alt=""
                  blurDataURL={product.imageUrl}
                  placeholder="blur"
                />
  
                <div>
                  <span>{product.name}</span>
                  <strong>{product.price}</strong>
  
                  <button onClick={() => removeCartProduct(product.id)}>Remover</button>
                </div>
              </CartProduct>
            ))}
          </div>

          <CartAmount>
            <div>
              <p>Quantidade</p>
              <p> {cartProducts.length} iten(s)</p>
            </div>

            <div>
              <span>Valor total</span>
              <strong>{formattedCartTotal}</strong>
            </div>

            <button
              onClick={handleBuyProduct}
              disabled={isCreatingCheckoutSession || cartProducts.length === 0}
            >
              Finalizar compra
            </button>
          </CartAmount>
        </CartProductContainer>
      )}
    </>
  )
}