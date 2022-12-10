import React from 'react'
import { Box, Container, Grid } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import PokemonList from './PokemonCardContainer/PokemonList/PokemonList';
import Header from './Header/Header';
import { Pokedex } from 'pokeapi-js-wrapper';
import { useState, useEffect } from 'react';
import Preloader from './Preloader/Preloader';
import Pagination from './Pagination/Pagination';
import AlertNotFound from './PokemonCardContainer/Alert/AlertNotFound';
import SearchByType from './PokemonCardContainer/SearchByType';

const theme = createTheme({
  palette: {
    primary: deepOrange,
    secondary: deepOrange,
  },
});

export default function AppWrapper() {
  const P = new Pokedex();
  // 2.create initial state for pokemons
  const [pokemonsNames, setPokemonsNames] = useState([]);

  // 3.get all pokemons [{...}, 1154] and set it
  useEffect(() => {
    P.getPokemonsList().then(({ results }) => {
      setPokemonsNames(results)
    }
    )
  }, []);

  // 4.search input
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const itemClickHendler = (e) => {
    setSearchValue(e.target.textContent);
    setIsOpen(!isOpen);
  }

  const searchClickHendler = () => {
    setIsOpen(true);
  }

  // 7.set up page
  const [currentPage, setCurrentPage] = useState(0);
  const [pokemonsPerPage, setPokemnsPerPage] = useState(10);
  const pokemonsPerPageOptions = [10, 20, 50];

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPokemnsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const lastPokemonIndex = currentPage * pokemonsPerPage + pokemonsPerPage;
  const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;

  // ==================================================================================================================
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [filters, setFilters] = useState({
    pokemonName: "",
    pokemonType: [],
  });
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  useEffect(() => {
    setIsEmptyResult(false);

    if (pokemonTypes.length === 0) {
      P.getTypesList().then(({ results }) => {
        setPokemonTypes(results.map(({ name }) => ({ type: name })));
      });
    }
    if (pokemonsNames.length === 0) {
      P.getPokemonsList().then(({ results }) => {
        setPokemonsNames(results.map(({ name }) => ({ name })));
      });
    }

    (async function () {
      let filtered = filters.pokemonType.length > 0 ? [] : pokemonsNames;

      if (filters.pokemonType.length > 0) {
        const results = await P.getTypeByName(
          filters.pokemonType.map(({ type }) => type)
        );
        filtered = results
          .map(({ pokemon }) => pokemon)
          .reduce((acc, arr) => [...acc, ...arr])
          .map(({ pokemon }) => ({ name: pokemon.name }));
      }
      

      if (filters.pokemonName) {
        filtered = filtered.filter(({ name }) =>
          name.includes(filters.pokemonName)
        );
      }

      if (filtered.length === 0 && pokemonsNames.length !== 0) {
        setIsEmptyResult(true);
      }
      setFilteredPokemons(filtered);
      // setPokemonCount(filtered.length);
    })();
    setCurrentPage(0);
  }, [pokemonsNames, filters]);

  useEffect(() => {
    P.getPokemonByName(filteredPokemons.slice(firstPokemonIndex, lastPokemonIndex).map(p => p.name))
      .then(results => setPokemons(results.map(({ name, sprites, types, stats }) => ({
        name,
        avatar:
          sprites.other.home.front_default ??
          sprites.other["official-artwork"].front_default,
        types,
        stats,
      }))))
  }, [pokemonsNames.length, pokemonsPerPage, currentPage, searchValue, filteredPokemons]);

  // 5.function for search pokemon 
  const searchedPokemon = pokemonsNames.filter(p => p.name.includes(searchValue));

  // 6.get filtered pokemons [{...}, ...]
  useEffect(() => {
    setFilteredPokemons(searchedPokemon);
    setCurrentPage(0);
  }, [pokemonsNames.length, searchValue]);

  // ================================================
  const [pokemonTypes, setPokemonTypes] = useState([]);
  useEffect(() => {
    P.getTypesList().then(({ results }) => {
      setPokemonTypes(results.map(({ name }) => ({ type: name })));
    });
  }, []);



  // console.log('pokemons', pokemons,'pokemons types:', pokemons.map(p => p.types.map(p => p.type).map(p => p.name)));
  // console.log('pokemons:', pokemons, '\n', 'pokemons Names:', pokemonsNames.filter(p => p.name.includes(searchValue)), '\n', 'filtered pokemons:', filteredPokemons);

  // console.log(pokemons.map(({ types }) => types.map(({ type }) => type).map(({ name }) => name).filter(name => name === 'poison')));  
  // console.log('pokemons', pokemonTypes);

  return (
    <div>
      <Container maxWidth="xl">
        {pokemonsNames.length === 0 ?
          <Preloader /> : <Header theme={theme} pokemonsNames={pokemonsNames} searchClickHendler={searchClickHendler} setSearchValue={setSearchValue} searchValue={searchValue} isOpen={isOpen} searchedPokemon={searchedPokemon} itemClickHendler={itemClickHendler} />}
        {filteredPokemons.length === 0 ? <AlertNotFound /> :
          <Container maxWidth="lg">
          <Grid container spacing={2} mt={2} justifyContent='center'>
           <Grid item lg={6} md={4} xs={12} > <SearchByType pokemonTypes={pokemonTypes} filters={filters} setFilters={setFilters} pokemonNames={pokemonsNames}/></Grid>
          <Grid item>
                <Pagination currentPage={currentPage} totalPokemons={filteredPokemons.length === 0 ? pokemonsNames.length : filteredPokemons.length}
                  pokemonsPerPage={pokemonsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} pokemonsPerPageOptions={pokemonsPerPageOptions} />
          </Grid>
          </Grid>
            <PokemonList pokemons={pokemons} isEmptyResult={isEmptyResult}/>
            <Pagination currentPage={currentPage} totalPokemons={filteredPokemons.length === 0 ? pokemonsNames.length : filteredPokemons.length} pokemonsPerPage={pokemonsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} pokemonsPerPageOptions={pokemonsPerPageOptions} />
          </Container>
        }
      </Container>
    </div>
  )
}
