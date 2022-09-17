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
  CardContent, CircularProgress,Button
} from "@mui/material";
import { useEffect, useState } from "react";
import { getDataFromPokemon } from "../services";
import FlagDetail from "./Details";
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";

const Flags = () => {
  const history = useNavigate();

  const [countries, setCountries] = useState([]);

  const [region, setRegion] = useState("");

  const fetchCountries = async () => {
    const response = await getDataFromPokemon(
      "https://restcountries.com/v3.1/all"
    );
    setCountries(response);
  };

  const handleRegion = async (e) => {
    setRegion(e.target.value);
    // vamos a evaluar si el valor es igual a all entonces ejecutsa la funcion
    // fetchCountries
    if (e.target.value === "all") {
      fetchCountries();
      return;
    }

    // primero debemos limpiar para poder llenarlo con la nueva informacion
    setCountries([]);
    const response = await getDataFromPokemon(
      `https://restcountries.com/v3.1/region/${e.target.value}`
    );
    setCountries(response);
  };

  // vamos a crear una funcion la cual se encargue de buscar los paises
  const handleSearchCountry = (e) => {
    // Es una buena practica decirle que inicie a contar cuando tengamos mas de 3 letras
    const countryName = e.target.value;

    if (countryName.length === 0) {
      fetchCountries();
    }

    if (countryName.length > 3) {
      // aca debemos iniciar la busqueda
      // para poder hacer la busqueda debeo transformar todo el text a UPPERCASE or LOWECASE
      const filterCountries = countries.filter((country) =>
        country.name.official.toUpperCase().includes(countryName.toUpperCase())
      );
      setCountries(filterCountries);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <Container>
      <Button variant="contained" onClick={()=>history(-1)} >BACK</Button>     
      <Grid container spacing={3} mt={5}>
        <Grid item md={6}>
          <TextField
            onChange={handleSearchCountry}
            label="Busca tu Pais..."
            fullWidth
          />
        </Grid>
        <Grid item md={6}>
          <FormControl fullWidth>
            <InputLabel>Filter by Region</InputLabel>
            <Select
              label="Filtra por Region"
              value={region}
              onChange={handleRegion}
            >
              <MenuItem value="all">Todas las regiones</MenuItem>
              <MenuItem value="Africa">Africa</MenuItem>
              <MenuItem value="Americas">Americas</MenuItem>
              <MenuItem value="Asia">Asia</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Oceania">Oceania</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {countries.length > 0 ? (
          countries.map((country) => (
            <Grid item md={3} xs={12}>
              <Link to ={`/banderas/detail/${country.name.common}`}>
                <Card>
                  <CardMedia
                    component="img"
                    height={200}
                    image={country.flags.svg}
                  />
                  <CardContent>
                    <h4>{country.name.common}</h4>
                    <FlagDetail banderita={country.name.common} />
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))
        ) : (
          <div className="center loading">
            <CircularProgress />
            <h4>Cargando...</h4>
          </div>
        )}
      </Grid>
    </Container>
  );
};

export default Flags;