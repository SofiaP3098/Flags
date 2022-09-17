//import {useParams} from 'react-router-dom';
import { useState } from 'react';
import {
    Container,
    Grid,
    FormControl,
    InputLabel,
    TextField,
    Select,
    MenuItem,
    Card,
    CardMedia,
    CardContent, CircularProgress, Button,
} from "@mui/material";
import { getDataFromPokemon } from '../services';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { width } from '@mui/system';

const Detail = () => {
    const { name } = useParams();
    const history = useNavigate();

    const [countryData, setCountryData] = useState([]);

    const fetchDetailFromPokemon = async () => {
        const country = await getDataFromPokemon(`https://restcountries.com/v3.1/name/${name}`);
        console.log(country);
        setCountryData(country[0]);
    }

    useEffect(() => {
        fetchDetailFromPokemon();
    }, []);

    return (        
        <Container>
        <Button  onClick={()=>history(-1)} >BACK</Button>        
            {
                Object.keys(countryData).length > 0 && (
                    <div>
                        <h2>{countryData.name?.official}</h2>
                        <Grid container spacing={3} mt={5}>
                            <Grid item md={6}>
                                <p><b>Nombre Nativo</b>: {countryData.name?.official}</p>
                                <p><b>Poblacion</b>: {countryData.population}</p>
                                <p><b>Region</b>: {countryData.region}</p>
                                <p><b>Sub Region</b>: {countryData.subregion}</p>
                                <p><b>Capital</b>: {countryData.capital}</p>
                            </Grid>
                            <Grid item md={6}>
                                <CardMedia
                                    component="img"
                                    height={200}
                                    image={countryData.flags.svg}
                                />
                            </Grid>
                        </Grid>
                    </div>
                )
            }

        </Container>
    );
};

export default Detail