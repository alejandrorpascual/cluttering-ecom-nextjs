import {useCartContext} from '@/context/cart-context'
import {useRouter} from 'next/router'
import React from 'react'
import {FiX} from 'react-icons/fi'
import styled from 'styled-components'

function Cart() {
  const {cart, cartState, closeCart, total} = useCartContext()
  const router = useRouter()

  function navigateToCheckout() {
    closeCart()
    router.push('/checkout')
  }

  return (
    <Container isOpen={cartState === 'open'}>
      <XContainer>
        <X onClick={closeCart} />
      </XContainer>
      <Content>
        <Title>Cart</Title>
        {cart && cart.length > 0 ? (
          <>
            <Ul>
              {cart.map(item => (
                <Item key={`item-${item.id}`}>
                  <span>
                    {item.qty} x {item.name}
                  </span>{' '}
                  <span>${item.price / 100}</span>
                </Item>
              ))}
            </Ul>
            <Total>
              <span>Total:</span>
              <span>${total}</span>
            </Total>
            <Button onClick={navigateToCheckout}>Checkout</Button>
          </>
        ) : (
          <p>Cart is empty!</p>
        )}
      </Content>
    </Container>
  )
}

const Container = styled.div<{isOpen: boolean}>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 350px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  transform: translateX(${props => (props.isOpen ? '0' : '110%')});
  transition: transform 300ms ease-out;
`

const XContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

const X = styled(FiX)`
  font-size: 2.5rem;
  cursor: pointer;
`

const Content = styled.div`
  padding: 1rem 2rem;
`

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  border-bottom: 1px solid #efefef;
`

const Ul = styled.ul`
  padding: 0;
`

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 0.45rem;
`

const Total = styled.p`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.5rem;
`

const Button = styled.button`
  background: linear-gradient(to right, #fc00ff, #00dbde);
  font-size: 2rem;
  color: #dcd6fd;
  border: none;
  cursor: pointer;
  width: 100%;
  padding: 1rem 2rem;
  margin-top: 2rem;
  transition: opacity 200ms;

  &:hover {
    opacity: 0.85;
  }
`

export default Cart
