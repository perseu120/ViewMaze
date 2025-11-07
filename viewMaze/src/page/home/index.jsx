
import Header from '../../componetes/head/index'
import Footer from '../../componetes/footer';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/Context';
import { Link } from "react-router-dom";

export default function Home() {

    const [movies, setMovies] = useState([]);
    const { page } = useGlobalContext();

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
        <div class="bg-[#0c0b0b]">
            <Header searchMovie={searchMovie} />

            <div className="p-6 mb-15">
                <h1 className="text-2xl font-bold mb-4 bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text font-extrabold text-transparent ">Filmes e series</h1>

                {movies.length === 0 ? (
                    <p>Carregando...</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 group-hover:opacity-75 " >
                        {movies.map((movies) => (
                            <Link key={movies.id} to={`/filme/${movies.id}`}>
                                <div  className="border rounded-lg p-2 text-center shadow hover:opacity-50 transition-opacity">
                                    <img
                                        src={movies.image?.medium}
                                        alt={movies.name}
                                        className="w-full h-64 object-cover rounded"
                                    />
                                    <h2 className="font-semibold mt-2 text-gray-300">{movies.name}</h2>
                                    <p className="text-sm text-gray-500">{movies.language}</p>
                                    <p className="text-xs text-gray-400">{movies.genres.join(", ")}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );

}