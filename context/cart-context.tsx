import useCart from '@/hooks/useCart'
import React from 'react'

const CartContext = React.createContext<ReturnType<typeof useCart> | undefined>(
  undefined,
)

export function useCartContext() {
  const context = React.useContext(CartContext)

  if (!context) {
    throw new Error(`Cart context should be used within a CartProvider`)
  }

  return context
}

interface Props {
  children: React.ReactNode
}

function CartProvider({children}: Props) {
  const value = useCart()

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export default CartProvider
