import {GetStaticPropsContext, InferGetStaticPropsType} from 'next'
import fs from 'fs/promises'
import matter from 'gray-matter'
import marked from 'marked'
import {ProductsData} from 'types/content/Products'
import styled from 'styled-components'
import Page from '@/components/styled/Page'

type Props = InferGetStaticPropsType<typeof getStaticProps>

function Product({product}: Props) {
  const html = marked(product.content)

  return (
    <Page>
      <div>
        <Title>
          <h1>{product.name}</h1>
          <SubTitle>{product.description}</SubTitle>
        </Title>
        <Price>${product.price / 100}</Price>
        <div style={{width: '72ch'}} dangerouslySetInnerHTML={{__html: html}} />
      </div>
    </Page>
  )
}

const Title = styled.div`
  display: flex;
  align-items: flex-end;
`

const SubTitle = styled.p`
  padding: 0.75rem 0.5rem;
  color: #666;
`

const Price = styled.span`
  font-size: 2rem;
  background: #05d7df;
  padding: 0.25rem 1rem;
  border-radius: 5px;
  color: #c9f5f6;
  font-weight: 700;
  margin-bottom: 1rem;
  display: inline-block;
`

export async function getStaticPaths() {
  const paths = await fs.readdir(`${process.cwd()}/content`)

  return {
    paths: paths.map(file => {
      return {
        params: {
          product: file.replace('.md', ''),
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const {product} = ctx.params || {}

  const filePath = product ? `${process.cwd()}/content/${product}.md` : ''
  const fileContent = (await fs.readFile(filePath)).toString()
  const {data, content} = matter(fileContent)

  return {
    props: {
      product: {...(data as ProductsData), content},
    },
  }
}

export default Product
