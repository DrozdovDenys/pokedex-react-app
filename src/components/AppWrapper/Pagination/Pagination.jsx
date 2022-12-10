// import React from "react";
import {
    TablePagination,
  } from "@mui/material";

const Pagination = (props) => {
    return (
        <TablePagination
        component="div"
        count={props.totalPokemons}
        page={props.currentPage}
        onPageChange={props.handleChangePage}
        rowsPerPage={props.pokemonsPerPage}
        rowsPerPageOptions={props.pokemonsPerPageOptions}
        onRowsPerPageChange={props.handleChangeRowsPerPage}
        showFirstButton
        showLastButton
        labelRowsPerPage="Cards per page:"
      />
    )
}

export default Pagination;


// import React from 'react'

// export default function Pagination({pokemonsPerPage, totalPokemons, paginate}) {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
//     pageNumbers.push(i);
//   }
 
//   return (
//     <div>
//       <ul style={{display: 'flex', gap: 10, listStyleType: 'none'}}>
//         {pageNumbers.map(num => (
//           <li key={num}>
//             <a onClick={() => paginate(num)} style={{cursor: 'pointer'}}>{num}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
