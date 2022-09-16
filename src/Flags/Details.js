import {
    Button, Dialog, DialogContent, Grid, Card,
    CardMedia, Chip
} from "@mui/material"
import { useState } from "react";
import { getDataFromPokemon } from "../../src/services"

const FlagDetail = (props) => {
    const [abrir, setAbrir] = useState(false);
    const [countryData, setCountryData] = useState([]);

    const fetchDetailFromPokemon = async () => {
        const country = await getDataFromPokemon(`https://restcountries.com/v2/name/${props.banderita}`);
        console.log(country);
        setCountryData(country);
    }

    const handleOpenDialog = async () => {
        if (!abrir) {
            await fetchDetailFromPokemon()
        }
        setAbrir(!abrir);
    }
    return (
        <div>
            <Button onClick={handleOpenDialog} variant="contained" color="error"> Detalle del Pais</Button>
            <Dialog open={abrir} onClose={handleOpenDialog}>
                <DialogContent>
                    {
                        Object.keys(countryData).length > 0 && (
                            <div>
                                <h2>{props.banderita}</h2>
                                <Grid container spacing={3} mt={5}>
                                    <Grid item md={6}>
                                        <p>Capital: {countryData[0].capital}</p>
                                        <p>Subregion: {countryData[0].subregion}</p>
                                        <p>Region: {countryData[0].region}</p>
                                        <p>Poblacion: {countryData[0].population}</p>
                                        <p>Area: {countryData[0].area}</p>
                                    </Grid>
                                    <Grid item md={6}>
                                        <CardMedia
                                            component="img"
                                            height={200}
                                            image={countryData[0].flags.svg}
                                        />
                                    </Grid>

                                </Grid>

                            </div>
                        )
                    }
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FlagDetail;