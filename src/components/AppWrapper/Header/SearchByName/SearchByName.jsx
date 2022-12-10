import { style } from "@mui/system";
import styles from './SearchByName.module.css'

export default function ({ pokemons, searchClickHendler, setSearchValue, searchValue, isOpen, searchedPokemon, itemClickHendler }) {
    return (
        <div>
            <input type="text" placeholder='Search...' onClick={searchClickHendler} onChange={e => setSearchValue(e.target.value)} value={searchValue} style={{ position: 'relative' }} />
            <ul style={{ listStyle: 'none', maxHeight: 150, backgroundColor: 'white', overflow: 'auto', marginTop: 5, width: 177, padding: 0, position: 'absolute', zIndex: 5 }}>
                {
                    searchValue && isOpen ?
                        searchedPokemon.map(p => (
                            <li key={p.name} className={styles.item} style={{ cursor: 'pointer', border: 2 + 'px' + ' outset #A8A8A8', margin: 5, padding: 5, color: 'black' }} onClick={itemClickHendler}>{p.name}</li>
                        ))
                        : null
                }
            </ul>
        </div>
    )
}

