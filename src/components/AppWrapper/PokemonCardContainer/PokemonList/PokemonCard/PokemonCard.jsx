import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid, Chip } from '@mui/material';
import PokemonAbilities from "./PokemonAbilities/PokemonAbilities";
import styles from './PokemonCard.module.css'




const PokemonCard = ({ name, avatar, types }) => {
    return (
        <Grid key={name} item xs={3} sm={4} md={4} sx={{ maxWidth: { xs: 100 + '%', sm: 50 + '%', md: 33 + '%', lg: 33 + '%' }, flexBasis: { xs: 100 + '%' } }}>

            <Card sx={{ maxWidth: 325, boxShadow: 5, minHeight: { lg: 490, md: 400, sm: 400 }, margin: '0 auto' }} className={styles.scale}>
                <CardMedia
                    component="img"
                    sx={{ height: { lg: 345, md: 300, sm: 350, xs: 300 } }}
                    image={avatar}
                    alt={name}
                />
                <CardContent>
                    <Chip sx={{ bgcolor: '#FF5722' }} label={'#' + avatar?.match(/\d+/)} />
                    <Typography gutterBottom variant="h5" component="div">
                        {name.toUpperCase()}
                    </Typography>
                    <PokemonAbilities types={types} />
                </CardContent>
            </Card>

        </Grid>
    )
}

export default PokemonCard;