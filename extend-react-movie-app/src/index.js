import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import SubHeader from './components/subHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import { LanguageProvider } from './contexts/languageContext';
import LoginPage from "./pages/LoginPage";
import CreditsPage from "./pages/creditsPage";
import AuthContextProvider from "./contexts/authContext";
import ProtectedRoutes from "./protectedRoutes";
import SignUpPage from "./pages/signUpPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LanguageProvider>
          <AuthContextProvider>
            <SiteHeader />
            <SubHeader />
            <MoviesContextProvider>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={ <SignUpPage /> } />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
                  <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                  <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} /> 
                  <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
                  <Route path="/movies/:id" element={<MoviePage />} />
                  <Route path="/movies/:id/credits" element={<CreditsPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </MoviesContextProvider>
            </AuthContextProvider>
          </LanguageProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);

