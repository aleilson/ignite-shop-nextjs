import { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { stripe } from "../lib/stripe";
import { useKeenSlider } from 'keen-slider/react';
import { HomeContainer, Product } from "../styles/pages/home";
import Link from "next/link";

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe";
import { Handbag } from "phosphor-react";
import { CartCheckout } from "../components/CartCheckout";

interface HomeProps {
  products: {
    id: string;
    name: string;
    image: string;
    price: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRed] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRed} className='keen-slider'>
        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className='keen-slider__slide'>
                <Image
                  src={product.image}
                  width={520}
                  height={480}
                  alt=""
                  blurDataURL={product.image}
                  placeholder="blur"
                />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <button onClick={() => { console.log('dsadas')}}>
                    <Handbag size={32} />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
      <CartCheckout />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    
    return {
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
    }
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}