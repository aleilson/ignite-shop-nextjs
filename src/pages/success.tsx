import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import logoImg from '../assets/logo.svg';

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    image: string;
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      
      <SuccessContainer>
        <Image src={logoImg} width={140} height={140} alt="" />

        <div>
          {products.map( product => (
            <ImageContainer key={product.name}>
              <Image src={product.image} width={140} height={140} alt="" />
            </ImageContainer>
          ))}
        </div>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de 
          <strong> {products.length} </strong> 
          camiseta(s) já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  const customerName = session.customer_details.name;
  const response = session.line_items.data.map(product => product.price.product) as Stripe.Product[];

  const products = response.map(product => {
    return {
      name: product.name,
      image: product.images[0]
    }
  });

  return {
    props: {
      customerName,
      products
    }
  }
}