import React, {useContext, useEffect}  from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import { LanguageContext } from '../../contexts/languageContext';
import { getString }  from '../../strings.js';


const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { language } = useContext(LanguageContext);
  const { data, error, isLoading, isError, refetch } = useQuery("genres",()=> getGenres(language));

  useEffect(() => {
    refetch();
  }, [language, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortChange = (e) => {
    handleChange(e, "sort", e.target.value);
  };

  return (
    <Card 
      sx={{
        maxWidth: 345,
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          {getString(language,"filterMovies")}
        </Typography>
        <TextField
         sx={{...formControl}}
          id="filled-search"
          label={getString(language,"search")}
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">{getString(language,"genre")}</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>


      </CardContent>

      <CardContent>
        <Typography variant="h5" component="h1">
          <SortIcon fontSize="large" />
          {getString(language, "sortBy")}
          <br />
        </Typography>

        <FormControl sx={{ ...formControl }}>
          <InputLabel id="sort-label">{getString(language, "sortBy")}</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            defaultValue=""
            value={props.sortFilter}
            onChange={handleSortChange}
          >
            <MenuItem value="vote_average.desc">{getString(language, "ratingDesc")}</MenuItem>
            <MenuItem value="vote_average.asc">{getString(language, "ratingAsc")}</MenuItem>
            <MenuItem value="pub_date.desc">{getString(language, "dateDesc")}</MenuItem>
            <MenuItem value="pub_date.asc">{getString(language, "dateAsc")}</MenuItem>
          </Select>
        </FormControl>
      </CardContent>

      <CardMedia
        sx={{ height: 300 }}
        image={img}
        title="Filter"
      />
    </Card>
  );
}