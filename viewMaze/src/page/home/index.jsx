import Header from '../../componetes/head/index'
import Footer from '../../componetes/footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {

    const [filmes, setFilmes] = useState([]);
    // const [pagina, setPagina] = useState(10);


    useEffect(() => {

        const buscarFilmes = async () => {

            try {
                // cria um array de 10 requisições (IDs de 1 a 10, por exemplo)
                const requisicoes = Array.from({ length: 10 }, (_, i) =>
                    axios.get(`https://api.tvmaze.com/shows/${i + 1}`)
                );

                const respostas = await Promise.all(requisicoes);

                const dados = respostas.map((res) => res.data);
                setFilmes(dados);

            } catch (erro) {
                console.error("Erro ao buscar filmes:", erro);
            }
        }

        buscarFilmes();

    }, [])

    return (
        <div class="bg-0c0b0b">
            <Header />

            <div className="p-6 mb-15">
                <h1 className="text-2xl font-bold mb-4 bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text font-extrabold text-transparent ">Filmes e series</h1>

                {filmes.length === 0 ? (
                    <p>Carregando...</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {filmes.map((filme) => (
                            <div key={filme.id} className="border rounded-lg p-2 text-center shadow">
                                <img
                                    src={filme.image?.medium}
                                    alt={filme.name}
                                    className="w-full h-64 object-cover rounded"
                                />
                                <h2 className="font-semibold mt-2 text-gray-300">{filme.name}</h2>
                                <p className="text-sm text-gray-500">{filme.language}</p>
                                <p className="text-xs text-gray-400">{filme.genres.join(", ")}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );

}
