import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Stripe from "stripe";
import { CartCheckout } from "../../components/CartCheckout";
import { IProduct } from "../../contexts/CartContext";
import { stripe } from "../../lib/stripe";
import { useCart } from '../../hooks/useCart'
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const { addToCart, hasProductCart } = useCart()

  const itIsCart = hasProductCart(product.id);

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt=""
            blurDataURL={product.imageUrl}
            placeholder="blur"
          />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            disabled={itIsCart}
          >
            {itIsCart
              ? 'Produto adicionado ao carrinho'
              : 'Colocar no carrinho'}
          </button>
        </ProductDetails>
      </ProductContainer>

      <CartCheckout />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MWUAWplVAqwTQy' } }
    ],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price;
    
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
        numberPrice: price.unit_amount / 100
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  }
}