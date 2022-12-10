import React from 'react'
import PokemonCard from './PokemonCard/PokemonCard';
import { Grid, } from '@mui/material';

export default function PokemonList({ pokemons, isEmptyResult }) {
  return (
    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} mt={4} justifyContent='center'>
      {pokemons.map((pokemon, i) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} avatar={pokemon.avatar} isEmptyResult={isEmptyResult} i={i + 1} types={pokemon.types.map(({type}) => type).map(({name}) => name)} />
      )
      )}
    </Grid>
  )
}
