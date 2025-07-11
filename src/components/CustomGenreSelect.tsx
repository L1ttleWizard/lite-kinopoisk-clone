import  { useState, useRef, useEffect } from 'react';
import {
    Box, Paper, Checkbox, FormControlLabel, TextField, InputAdornment
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface IGenre {
    name: string;
    slug: string;
}

interface CustomGenreSelectProps {
    allGenres: IGenre[];
    selectedGenres: string[];
    onGenreChange: (genres: string[]) => void;
}

export const CustomGenreSelect = ({ allGenres, selectedGenres, onGenreChange }: CustomGenreSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleGenreClick = (genreName: string) => {
        const currentIndex = selectedGenres.indexOf(genreName);
        const newSelectedGenres = [...selectedGenres];

        if (currentIndex === -1) {
            newSelectedGenres.push(genreName);
        } else {
            newSelectedGenres.splice(currentIndex, 1);
        }
        onGenreChange(newSelectedGenres);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const displayValue = selectedGenres.length > 0
        ? `Выбрано: ${selectedGenres.length}`
        : '';

    return (
        <Box sx={{ position: 'relative' }} ref={wrapperRef}>
            <TextField
                label="Жанры"
                value={displayValue}
                fullWidth
                onClick={handleToggle}
                InputProps={{
                    readOnly: true,
                    endAdornment: (
                        <InputAdornment position="end">
                            <ArrowDropDownIcon sx={{
                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }} />
                        </InputAdornment>
                    ),
                }}
            />
            {isOpen && (
                <Paper
                    elevation={8}
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        mt: 1,
                        zIndex: 1300,
                        maxHeight: 300,
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                    }}
                >
                    {allGenres.map(genre => (
                        <FormControlLabel
                            key={genre.name}
                            control={
                                <Checkbox
                                    checked={selectedGenres.includes(genre.name)}
                                    onChange={() => handleGenreClick(genre.name)}
                                />
                            }
                            label={genre.name}
                            sx={{
                                display: 'flex',
                                width: '100%',
                                ml: 1,
                                mr: 1,
                                '&:hover': { bgcolor: 'action.hover' }
                            }}
                        />
                    ))}
                </Paper>
            )}
        </Box>
    );
};