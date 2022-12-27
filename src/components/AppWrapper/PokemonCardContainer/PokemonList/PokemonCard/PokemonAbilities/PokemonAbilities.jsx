import React from 'react';
import { Chip } from '@mui/material';

export default function PokemonAbilities({ types }) {
    let typesColor;
    return (
        <div> {types.map(t => (
            t === 'grass' ? typesColor = '#489b2c' :
                t === 'poison' ? typesColor = '#F64C7D' :
                    t === 'fire' ? typesColor = '#F63019' :
                        t === 'water' ? typesColor = '#61B7DD' :
                            t === 'bug' ? typesColor = '#E8D400' :
                                t === 'normal' ? typesColor = '#E1D9A7' :
                                    t === 'ground' ? typesColor = 'grey' :
                                        t === 'electric' ? typesColor = '#F3CB00' :
                                            t === 'fairy' ? typesColor = '#A1568C' :
                                                t === 'ghost' ? typesColor = '#D6D9D9' :
                                                    t === 'dark' ? typesColor = '#2C3454' :
                                                        t === 'fighting' ? typesColor = '#C48AB5' :
                                                            t === 'ice' ? typesColor = '#C3DAE8' :
                                                                t === 'steel' ? typesColor = '#B4B8C9' :
                                                                    t === 'rock' ? typesColor = '#B2A398' :
                                                                        t === 'dragon' ? typesColor = '#B52025' :
                                                                            t === 'psychic' ? typesColor = '#e5248b' :
                                                                                t === 'flying' ? typesColor = 'lightblue' : typesColor = '#FF5722',
            <Chip key={t} sx={{ mr: 1, borderRadius: 5 + 'px', bgcolor: `${typesColor}` }} label={t} />
        ))}</div>
    )
}
