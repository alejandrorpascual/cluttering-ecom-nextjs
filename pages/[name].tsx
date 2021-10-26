import {useRouter} from 'next/router'

function title(string: string) {
  return string[0].toUpperCase() + string.slice(1)
}

function Name() {
  const router = useRouter()
  const {name} = router.query

  if (typeof name === 'undefined') {
    return <p>Loading...</p>
  }

  if (typeof name !== 'string') {
    return <p>Error...</p>
  }

  return (
    <div>
      <h1>Welcome {title(name)}</h1>
    </div>
  )
}

export default Name
