
import Header from '../../componetes/head/index'
import Footer from '../../componetes/footer';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/Context';
import { Link } from "react-router-dom";

export default function Home() {

    const [movie, setMovies] = useState([]);
    const [favorites, setFavorites] =useState(JSON.parse(localStorage.getItem("idFavorites")) || []);
    const { page } = useGlobalContext();

    const handleFavorite = (e, id) => {
        e.stopPropagation();
        e.preventDefault();

        const stored = JSON.parse(localStorage.getItem("idFavorites")) || [];
        console.log(stored);
        if (stored.includes(id)) {
            const updated = stored.filter(item => item !== id);
            localStorage.setItem("idFavorites", JSON.stringify(updated));
            setFavorites(updated);
        } else {
            const updated = [...stored, id];
            localStorage.setItem("idFavorites", JSON.stringify(updated));
            setFavorites(updated);
        }

    }

    const fetchMovies = useCallback(
        async () => {

            try {
                const res = await axios.get(`https://api.tvmaze.com/shows?page=${page}`);

                if (res.status === 200) setMovies(res.data);
            } catch (erro) {
                console.error("Erro ao buscar filmes:", erro);
            }

        }, [page])

    useEffect(() => {

        fetchMovies();

    }, [page, fetchMovies]);

    const searchMovie = useCallback(async (query) => {
        try {

            if (query) {

                const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`);

                if (res.status === 200 && res.data.length) {
                    setMovies(res.data.map(({ show }) => {
                        return show;
                    }));
                }

            } else {
                fetchMovies();
            }


        } catch (erro) {
            console.error("Erro ao buscar filmes:", erro);
        }
    }, [fetchMovies]);

    return (
        <div className="bg-[#0c0b0b]">
            <Header searchMovie={searchMovie} />

            <div className="p-6 mb-15">
                <h1 className="text-2xl font-bold mb-4 bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text font-extrabold text-transparent ">Filmes e series</h1>

                {movie.length === 0 ? (
                    <p>Carregando...</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 group-hover:opacity-75 " >
                        {movie.map((movie) => {

                            const isFavorite = favorites.some((id)=> id == movie.id );
                            
                            return <Link key={movie.id} to={`/filme/${movie.id}`}>
                                <div className="relative group border rounded-lg p-2 text-center shadow transition-opacity hover:opacity-80">
                                    <img
                                        src={movie.image?.medium}
                                        alt={movie.name}
                                        className="w-full h-64 object-cover rounded"
                                    />

                                    <button
                                        className={`absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full opacity-${isFavorite? "100": "0"} group-hover:opacity-100 transition-opacity duration-300`}
                                        onClick={(e) => handleFavorite(e, movie.id)}
                                    >
                                        ❤️
                                    </button>

                                    <h2 className="font-semibold mt-2 text-gray-300">{movie.name}</h2>
                                    <p className="text-sm text-gray-500">{movie.language}</p>
                                    <p className="text-xs text-gray-400">{movie.genres.join(", ")}</p>
                                </div>
                            </Link>
                        })}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );

}