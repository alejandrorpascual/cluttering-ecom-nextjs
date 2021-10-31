import Page from '@/components/styled/Page'
import {useCartContext} from '@/context/cart-context'
import React from 'react'

function Success() {
  const {clearCart} = useCartContext()

  React.useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <Page>
      <h2>Payment successful</h2>
      <p>Thank you for your purchase!</p>
    </Page>
  )
}

export default Success
