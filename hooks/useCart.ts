import React from 'react'
import {ProductsData} from 'types/content/Products'
import {ID} from 'types/utils/cart'

export type Product = ProductsData & {qty: number}
export type Products = Product[]

function getInitialCart(): Products | undefined {
  const unserializedCart = localStorage.getItem('cart')

  if (!unserializedCart) {
    return
  }

  return JSON.parse(unserializedCart)
}

function useCart() {
  const [cart, setCart] = React.useState<Products | undefined>([])
  const [cartState, setCartState] = React.useState<'open' | 'close'>('close')

  const openCart = React.useCallback(() => setCartState('open'), [])
  const closeCart = React.useCallback(() => setCartState('close'), [])

  //WARNING: fishy code
  const memoizedCart = React.useMemo(() => cart, [cart])

  React.useEffect(() => {
    const initialCart = getInitialCart()

    if (initialCart) {
      setCart(initialCart)
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(memoizedCart))
  }, [memoizedCart])

  const addItemToCart = React.useCallback(
    (product: ProductsData, qty = 1) => {
      if (!memoizedCart) {
        return
      }

      const itemInCart = memoizedCart?.find(item => item.id === product.id)

      if (itemInCart) {
        itemInCart.qty += 1
        setCart([...memoizedCart])
        return
      }

      setCart([...memoizedCart, {...product, qty}])
    },
    [memoizedCart],
  )

  const removeItemFromCart = React.useCallback(
    (id: ID) => {
      if (!memoizedCart) {
        return
      }

      const newCart = memoizedCart.filter(item => item.id !== id)
      setCart(newCart)
    },
    [memoizedCart],
  )

  const clearCart = React.useCallback(() => {
    localStorage.removeItem('cart')
    setCart([])
  }, [])

  const total = React.useMemo(() => {
    if (!memoizedCart) {
      return 0
    }

    const total = memoizedCart.reduce((acc, item) => {
      return acc + item.price * item.qty
    }, 0)

    return total / 100
  }, [memoizedCart])

  return {
    cart: memoizedCart,
    addItemToCart,
    removeItemFromCart,
    cartState,
    openCart,
    closeCart,
    clearCart,
    total,
  }
}

export default useCart
