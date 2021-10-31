import fs from 'fs/promises'
import matter from 'gray-matter'
import {MouseEvent} from 'react'
import {InferGetStaticPropsType} from 'next'
import Link from 'next/link'
import styled from 'styled-components'

import {ProductsData} from 'types/content/Products'
import UnstyledLink from '@/components/styled/UnstyledLink'
import {useCartContext} from '@/context/cart-context'

type Props = InferGetStaticPropsType<typeof getStaticProps>

function HomePage({products}: Props) {
  const {addItemToCart, cart} = useCartContext()
  console.log(cart)
  const handleClick =
    (product: ProductsData) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      addItemToCart(product)
    }

  return (
    <ProductsContainer>
      {products.map(product => (
        <Link key={product.slug} href={product.slug}>
          <UnstyledLink>
            <Container>
              <header>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
              </header>
              <PriceContainer>
                <button onClick={handleClick(product)}>Add to cart</button>
                <span>${product.price / 100}</span>
              </PriceContainer>
            </Container>
          </UnstyledLink>
        </Link>
      ))}
    </ProductsContainer>
  )
}

const ProductsContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  padding: 0.5rem 0;
`
const Container = styled.div`
  background: #fff;
  padding: 1rem 2rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  transition: transform 300ms ease-out;

  &:is(:hover, :focus) {
    transform: scale(1.02);
  }
`

const PriceContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: auto;

  & span {
    margin-left: auto;
    font-size: 2.5rem;
  }
`

export async function getStaticProps() {
  const directory = `${process.cwd()}/content`
  const filenames = await fs.readdir(directory)

  const productPromises = filenames.map(async filename => {
    const fileBuffer = await fs.readFile(`${directory}/${filename}`)
    const {data} = matter(fileBuffer)
    const slug = `/products/${filename.replace('.md', '')}`

    return {...data, slug} as ProductsData
  })

  const products = await Promise.all(productPromises)

  return {
    props: {products},
  }
}

export default HomePage
