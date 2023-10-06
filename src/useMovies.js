import { useEffect, useState } from "react";

const KEY = '475e1ada';

// custom hook 
export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(function () {
        // to be done ...
        //callback?.();

        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError('');

                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });
                //console.log(res);

                if (!res.ok) {
                    throw new Error("Something went wrong with fetching movies!");
                }

                const data = await res.json();
                console.log(data);

                if (data.Response === 'False') {
                    throw new Error("No movie found!");
                }

                setMovies(data.Search);
                setError("");
            }
            catch (err) {
                if (err.name !== "AbortError") {
                    console.error(err.message);
                    setError(err.message);
                }
            }
            finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError('');
            return;
        }

        fetchMovies();

        return () => {
            controller.abort();
        };
    }, [query]);

    return { movies, isLoading, error };
}