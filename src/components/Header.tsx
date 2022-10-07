import Link from "next/link";
import logoImg from '../assets/logo.svg';
import { Handbag } from "phosphor-react";
import { HeaderContainer } from "../styles/components/Header";
import { useCart } from "../hooks/useCart";


export function Header() {
  const { cartProducts, handleCartOpen } = useCart();

  return (
    <HeaderContainer>
      <Link href={"/"} >
        <img src={logoImg.src} alt="" />
      </Link>

      <button onClick={handleCartOpen}>
        <span>{cartProducts.length}</span>
        <Handbag size={32} />
      </button>
    </HeaderContainer>
  )
}