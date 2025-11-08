import { useRef } from "react";
import { Link } from "react-router-dom";

export default function Header({ searchMovie }) {

    const timeout = useRef(null);

    function handleChange(e) {

        e.preventDefault();
        timeout.current && clearTimeout(timeout.current);

        const currentTimeout = setTimeout(() => {
            searchMovie(e.target.value);
        }, 500);

        timeout.current = currentTimeout;
    }

    return (
        <div className="flex flex-row justify-between items-center ">
            <div className="flex flex-row items-center">

                <div className="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-8xl font-extrabold text-transparent ml-10 mt-5">
                    ViewMaze
                </div>
                <Link to={"/favorito"}>
                    <button className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white text-2xl font-bold px-6 py-3 ml-10 mt-5 hover:opacity-90 transition">
                        favoritos
                    </button>
                </Link>
            </div>
            <div>

                <div className="mt-2 mr-10 ">
                    <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                        <input id="price" type="text" name="price" placeholder="Buscar" onChange={handleChange} className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                        <div className="grid shrink-0 grid-cols-1">

                            <div className="flex lg:ml-6">
                                <button className="p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                                        <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </div>

    );

}
