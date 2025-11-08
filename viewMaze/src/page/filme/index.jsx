import axios from "axios";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";


export default function FilmeDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [season, setSeason] = useState([]);
    const [episode, setEpisode] = useState([]);
    const [renderEp, setRenderEp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedEpisode, setSelectedEpisode] = useState(null);


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

        <div className="bg-gray-900 h-screen">
            <div className="min-h-full">


                <header className="flex bg-gray-800 after:pointer-events-none  after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">


                    <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                        <div className="sm:max-w-lg">
                            <h1 key={"1"} className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{movie.name}</h1>
                            <p key={"2"}  className="mt-4 text-xl text-gray-500">{movie.summary}</p>
                            <p key={"3"}  className="mt-4 text-xl text-gray-500">{movie.genres ? movie.genres.join(", ") : "Sem gênero"}</p>
                            <p key={"4"}  className="mt-4 text-xl text-gray-500">{movie.schedule?.days?.length ? `${movie.ended} ${movie.schedule.days.join(", ")} - ${movie.schedule.time}` : "Sem horário definido"}
                            </p>
                            <p key={"5"}  className="mt-4  mb-4 text-xl text-gray-500">⭐ Avaliação: {movie.rating?.average || "Sem nota"}</p>
                        </div>
                    </div>
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-8 lg:px-8">
                        <div className="h-64 w-44 rounded-lg ">
                            <img src={movie.image?.original || "Sem imagem"} alt="" />
                        </div>
                    </div>

                </header>

                <nav  className="bg-gray-800/50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div >
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {season.map((season) => (

                                            <button key={season.id} onClick={() => { setRenderEp(true), handleSeasonClick(season.id) }} href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white">{season.number}</button>
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
                        {episode.map((ep) => (
                            <div key={ep.id} className="border border-gray-700 rounded-lg p-2 text-center bg-gray-800 shadow hover:opacity-80 transition-opacity">
                                <div className="aspect-video w-full overflow-hidden rounded-md">
                                    <img
                                        src={ep.image?.medium}
                                        alt="Episódio"
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <h2 className="font-semibold mt-2 text-gray-200 text-sm truncate">{ep.name}</h2>
                                <p className="text-xs text-gray-400">{ep.number}</p>
                                <button className="font-semibold  text-gray-200 text-sm truncate" onClick={() => { setIsOpen(true); setSelectedEpisode(ep); }}>
                                    Ver mais
                                </button>
                            </div>
                        ))}

                        {selectedEpisode && (
                            <Transition appear show={isOpen} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="fixed inset-0 bg-opacity-20" />
                                    </Transition.Child>

                                    <div className="fixed inset-0 overflow-y-auto">
                                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0 scale-95"
                                                enterTo="opacity-100 scale-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100 scale-100"
                                                leaveTo="opacity-0 scale-95"
                                            >
                                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                        {selectedEpisode.name}
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">
                                                            Episódio {selectedEpisode.number} - {selectedEpisode.summary?.replace(/<[^>]+>/g, "") || "Sem descrição"}
                                                        </p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <button
                                                            type="button"
                                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            Fechar
                                                        </button>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </Dialog>
                            </Transition>
                        )}
                    </main>


                }


            </div>
        </div>

    );
}