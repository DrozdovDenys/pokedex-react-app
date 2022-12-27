import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material'
import SearchByName from "./SearchByName/SearchByName";


const Header = (props) => {
  return (
    <ThemeProvider theme={props.theme}>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static" >
          <Toolbar >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 0, display: { sm: 'block' } }}
              >
                Pokedex
              </Typography>
              <SearchByName pokemonsNames={props.pokemonsNames} searchClickHendler={props.searchClickHendler} setSearchValue={props.setSearchValue} searchValue={props.searchValue} isOpen={props.isOpen} searchedPokemon={props.searchedPokemon} itemClickHendler={props.itemClickHendler} />
            </Grid>

          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  )
}

export default Header;