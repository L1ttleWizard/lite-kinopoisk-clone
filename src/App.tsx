import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { MainPage } from './pages/MainPage';
import { MoviePage } from './pages/MoviePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { Header } from './components/Header';
import { FavoritesProvider } from './context/FavoritesContext';
import { FilterProvider } from './context/FilterContext';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <BrowserRouter>
                <FavoritesProvider>
                    <FilterProvider>
                        <Header />
                        <Container sx={{ mt: 4, mb: 4 }}>
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/movie/:id" element={<MoviePage />} />
                                <Route path="/favorites" element={<FavoritesPage />} />
                            </Routes>
                        </Container>
                    </FilterProvider>
                </FavoritesProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;