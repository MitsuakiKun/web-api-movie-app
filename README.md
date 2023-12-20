# Assignment 2 - Web API.

Name: Mitsuaki Okabe

## Features.

 + It connected its own film app to the API to allow login and sign-up.
 + The contents of favourite, must watch and review registered in app can be add, delete and Get to mongoDB via API.
 + Instead of getting the data directly from the TMDB-API, all the data is obtained via my own API.

## Setup requirements.
``` bash
cd movies-api
npm start

cd extend-react-movie-app
npm start
```

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` file and what variables to put in it. Give an example of how this might be done.

REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb+srv://mitsu3368:lcSla1Brn571TLbo@mitsuaki.mn4ku3m.mongodb.net/?retryWrites=true&w=majority
TMDB_KEY=5fed4c8919117b99f6d873fcef3da81f
SECRET=ilikecake
______________________

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies/{language} | GET | Gets a list of movies 
- /api/movies/{movieid}/detail/{language} | GET | Gets a single movie 
- /api/users| POST | Login with username and password
- /api/users?action=register | POST | Sign Up with username and password 
- /api/users/users/{movieid}/favorite | POST | Add favorite 
- /api/users/users/{movieid}/favorite | DELETE | Delete favorites 
- /api/users/favorite | GET | Get favorites
- /api/users/users/{movieid}/mustWatch | POST | Add mustWatch 
- /api/users/users/{movieid}/mustWatch | DELETE | Delete mustWatch
- /api/users/mustWatch | GET | Get mustWatches
- /api/reviews/{movieid} | POST | Add review 
- /api/reviews/{movieid} | DELETE | Delete review
- /api/reviews/{movieid} | GET | Get reviews
- /api/movies/{movieid}/detail/{language} | GET | Get movies detail from TMDB API
- /api/movies/tmdb/geres/{language} | GET | Get genres from TMDB API
- /api/movies/{movieid}/images | GET | Get movie images from TMDB API
- /api/movies/{movieid}/reviews | GET | Get reviews from TMDB API
- /api/movies/tmdb/upcoming/{language} | GET | Get upcoming movies from TMDB API
- /api/movies/{movieid}/similar/{language} | GET | Get similar movies from TMDB API
- /api/movies/{movieid}/credits/{language} | GET | Get credits from TMDB API


## Security and Authentication

+ I added a Protected route to my app route so that all pages are inaccessible.
+ Enabled to save favorite, review and must watch data


## Integrating with React App

Until now, all data was retrieved from the TMDB-API, but I have put it all together so that you can also retrieve that data by accessing the API I have created.
