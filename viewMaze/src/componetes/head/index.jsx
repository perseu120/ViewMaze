export default function Header() {
    return (
        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row items-center">

                <div class="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-8xl font-extrabold text-transparent ml-10 mt-5">
                    ViewMaze
                </div>
                <div class="bg-linear-to-r from-pink-500 text-white bg-clip-text text-5xl font-extrabold text-transparent ml-10 mt-5">
                    favoritos
                </div>

            </div>
            <div>

                <div class="mt-2 mr-10">
                    <div class="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-500">
                        <input id="price" type="text" name="price" placeholder="Buscar" class="block min-w-0 grow bg-gray-800 py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                        <div class="grid shrink-0 grid-cols-1">

                            <div class="flex lg:ml-6">
                                <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                                    <span class="sr-only">Search</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
                                        <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </div>

    );

}
