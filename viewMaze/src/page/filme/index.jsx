import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function FilmeDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [season, setSeason] = useState([]);
    const [episode, setEpisode] = useState([]);
    const [renderEp, setRenderEp] = useState(false);


    const handleSeasonClick = async (id) => {
        try {
            console.log("ID da temporada:", id);
            const res = await axios.get(`https://api.tvmaze.com/seasons/${id}/episodes`);
            if (res.status === 200) {
                setEpisode(res.data);
                console.log("Episódios carregados:", episode);
            }
        } catch (error) {
            console.error("Erro ao buscar episódios:", error);
        }
    };

    const showSeason = useCallback(
        async () => {

            try {
                const res = await axios.get(`https://api.tvmaze.com/shows/${id}/seasons`);
                console.log(res.data);
                if (res.status === 200) setSeason(res.data);

            } catch (erro) {
                console.error("Erro ao buscar temporada:", erro);
            }

        }, [])


    useEffect(() => {

        const buscarFilme = async () => {
            try {
                const res = await axios.get(`https://api.tvmaze.com/shows/${id}`);
                setMovie(res.data)

            } catch (erro) {
                console.error("Erro ao buscar o filme:", erro);
            }
        }

        buscarFilme();
        showSeason();
    }, []);



    return (

        <div class="bg-gray-900 h-screen">
            <div class="min-h-full">


                <header class="flex bg-gray-800 after:pointer-events-none  after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">


                    <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div class="sm:max-w-lg">
                            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{movie.name}</h1>
                            <p class="mt-4 text-xl text-gray-500">{movie.summary}</p>
                            <p class="mt-4 text-xl text-gray-500">{movie.genres ? movie.genres.join(", ") : "Sem gênero"}</p>
                            <p className="mt-4 text-xl text-gray-500">{movie.schedule?.days?.length ? `${movie.ended} ${movie.schedule.days.join(", ")} - ${movie.schedule.time}` : "Sem horário definido"}
                            </p>
                            <p class="mt-4  mb-4 text-xl text-gray-500">⭐ Avaliação: {movie.rating?.average || "Sem nota"}</p>
                        </div>
                    </div>
                    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:px-8">
                        <div class="h-64 w-44 rounded-lg ">
                            <img src={movie.image?.original || "Sem imagem"} alt="" />
                        </div>
                    </div>

                </header>

                <nav class="bg-gray-800/50">
                    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div class="flex h-16 items-center justify-between">
                            <div class="flex items-center">
                                <div>
                                    <div class="ml-10 flex items-baseline space-x-4">
                                        {season.map((season) => (

                                            <button key={season.id} onClick={() => { setRenderEp(true), handleSeasonClick(season.id) }} href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">{season.number}</button>
                                        ))}

                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>


                </nav>
                {!renderEp ? (
                    <p></p>
                ) :


                    <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 group-hover:opacity-75 w-auto h-auto bg-gray-800 p-4 rounded-lg" >
                        {episode.map((ep) => {
                            return <div key={ep.id} className="border border-gray-700 rounded-lg p-2 text-center bg-gray-800 shadow hover:opacity-80 transition-opacity">
                                <div className="aspect-video w-full overflow-hidden rounded-md">
                                    <img
                                        src={ep.image?.medium}
                                        alt="Episódio"
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <h2 className="font-semibold mt-2 text-gray-200 text-sm truncate">{ep.name}</h2>
                                <p className="text-xs text-gray-400">{ep.number}</p>
                            </div>

                        })}
                    </main>


                }


            </div>
        </div>

    );
}