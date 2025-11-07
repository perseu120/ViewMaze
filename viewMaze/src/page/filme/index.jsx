import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function FilmeDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [season, setSeason] = useState([]);

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

        <div class="bg-[#0c0b0b]  h-screen">
            <div class="min-h-full">


                <header class="flex bg-gray-800 after:pointer-events-none  after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">


                    <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div class="sm:max-w-lg">
                            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{movie.name}</h1>
                            <p class="mt-4 text-xl text-gray-500">{movie.summary}</p>
                            <p class="mt-4 text-xl text-gray-500">{movie.genres ? movie.genres.join(", ") : "Sem gênero"}</p>
                            <p className="mt-4 text-xl text-gray-500">{movie.schedule?.days?.length? `${movie.ended} ${movie.schedule.days.join(", ")} - ${movie.schedule.time}`: "Sem horário definido"}
                            </p>
                            <p class="mt-4 text-xl text-gray-500">⭐ Avaliação: {movie.rating?.average || "Sem nota"}</p>
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

                                            <a key={season.id} href="#" class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">{season.number}</a>
                                        ))}
                                        
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    {/* 
                    <el-disclosure id="mobile-menu" hidden class="block md:hidden"> 
                        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">

                            <a href="#" aria-current="page" class="block rounded-md bg-gray-950/50 px-3 py-2 text-base font-medium text-white">Dashboard</a>
                            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Team</a>
                            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Projects</a>
                            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Calendar</a>
                            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white">Reports</a>
                        </div>
                        <div class="border-t border-white/10 pt-4 pb-3">

                            <div class="mt-3 space-y-1 px-2">
                                <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white">Your profile</a>
                                <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white">Settings</a>
                                <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white">Sign out</a>
                            </div>
                        </div>
                    </el-disclosure> */}


                </nav>
                <main>
                    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                    </div>
                </main>

            </div>
        </div>

    );
}