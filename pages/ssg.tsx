import {InferGetStaticPropsType} from 'next'
import React from 'react'
import {PokemonResponse} from 'types/responses/PokemonResponse'
import {SinglePokemonResponse} from 'types/responses/SinglePokemonResponse'

const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'

type Props = InferGetStaticPropsType<typeof getStaticProps>

function StaticSide({pokemons}: Props) {
  return pokemons.map(poke => (
    <div key={poke.name}>
      <img src={poke.imgUrl} alt={poke.name} />
      <p>{poke.name}</p>
    </div>
  ))
}

export async function getStaticProps() {
  const response: PokemonResponse = await fetch(url).then(res => res.json())

  const promises: Promise<SinglePokemonResponse>[] = response.results.map(
    res => {
      return fetch(res.url).then(pokemon => pokemon.json())
    },
  )

  const responses = await Promise.all(promises)
  const pokeData = responses.map(r => {
    return {
      name: r.name,
      imgUrl: r.sprites.front_default,
    }
  })

  return {
    props: {pokemons: pokeData},
  }
}

export default StaticSide
