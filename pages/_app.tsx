import {AppProps} from 'next/app'
import {Normalize} from 'styled-normalize'
import styled from 'styled-components'

import NavBar from '@/components/nav-bar'
import CartProvider from '@/context/cart-context'
import Cart from '@/components/cart'

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <CartProvider>
      <Container>
        <Normalize />
        <NavBar />
        <Page>
          <Component {...pageProps} />
        </Page>
        <Cart />
      </Container>
    </CartProvider>
  )
}

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Padauk:wght@400;700&display=swap');

  font-family: 'Padauk', sans-serif;
  background: linear-gradient(to right, #fc00ff, #00dbde);
  color: #444;
  min-height: 100vh;
`

const Page = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`
