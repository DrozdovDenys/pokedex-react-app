import React from "react";
import {
  Autocomplete,
  TextField,
} from "@mui/material";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

const PokemonTypesField = ({ pokemonTypes, filters, setFilters, pokemonNames }) => {

  return (
            <Autocomplete 
              options={pokemonTypes}
              value={filters.pokemonType}
              onChange={(event, newValue) => {
                setFilters((oldState) => ({
                  ...oldState,
                  pokemonType: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Pokémon types"
                  placeholder="Pokémon types..."
                />
              )}
              renderOption={(props, option, { inputValue }) => {
                const matches = match(option.type, inputValue, {
                  insideWords: true,
                });
                const parts = parse(option.type, matches);

                return (
                  <li {...props}>
                    <div>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{ fontWeight: part.highlight ? 700 : 400 }}
                        >
                          {part.text}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              }}
              multiple
              limitTags={2}
              getOptionLabel={(option) => option.type}
              sx={{ maxWidth:  100 + '%' }}
            />
  )
}

export default PokemonTypesField;