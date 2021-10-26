import {AppProps} from 'next/app'
import Link from 'next/link'

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <>
      <Link href='/'>
        <a>Home</a>
      </Link>
      <Link href='/about'>
        <a>About</a>
      </Link>
      <Component {...pageProps} />
      <footer>Stuff goes here</footer>
    </>
  )
}
