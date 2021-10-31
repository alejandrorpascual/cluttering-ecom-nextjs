import React from 'react'
import styled from 'styled-components'
import {useRouter} from 'next/router'

import Page from '@/components/styled/Page'
import {useCartContext} from '@/context/cart-context'

function Checkout() {
  const {cart, total} = useCartContext()
  const route = useRouter()

  const handleClick = () => route.push('/success')

  return (
    <Page>
      <h2>Checkout</h2>
      {cart && cart.length > 0 ? (
        <>
          <Ul>
            {cart.map(item => (
              <Item key={item.slug}>
                <span>
                  {item.qty} x {item.name}
                </span>
                <span>${item.price / 100}</span>
              </Item>
            ))}
          </Ul>

          <Total>
            <span>Total:</span>
            <span>${total}</span>
          </Total>
          <Button onClick={handleClick}>Process Payment</Button>
        </>
      ) : (
        <p>You do not appear to have any items in your cart!</p>
      )}
    </Page>
  )
}

const Ul = styled.ul`
  padding: 0;
`

const Item = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  margin-bottom: 1rem;
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
  color: #f7f5ff;
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

export default Checkout
