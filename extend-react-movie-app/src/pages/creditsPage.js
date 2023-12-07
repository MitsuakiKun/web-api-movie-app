import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom'; 
import { getCredits } from '../api/tmdb-api';
import { LanguageContext } from '../contexts/languageContext';
import { getString }  from '../strings.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CreditsPage = () => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  
  const { data: credits, error, isLoading } = useQuery(['credits', id, language], () => getCredits(id, language));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const openGoogleSearch = (name) => {
    const searchQuery = encodeURIComponent(`${name}`);
    const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
    window.open(searchUrl, '_blank');
  };

  return (
    <div>
      <h2>{getString(language, "credits")}</h2>
      {credits && credits.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {credits.map((credit) => (
              <Card style={{ margin: '16px', minWidth: '200px', display: 'flex' }}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${credit.profile_path}`}
                  alt={`${credit.name} profile`}
                  style={{ width: '100px', height: '150px', objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6">{credit.name}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                  {getString(language, "character")}: {credit.character}
                  </Typography>
                </CardContent>
                <button onClick={() => openGoogleSearch(credit.name)}>{getString(language, "search")}</button>
              </Card>
          ))}
        </div>
      ) : (
        <div>No credits available.</div>
      )}
    </div>
  );
};

export default CreditsPage;