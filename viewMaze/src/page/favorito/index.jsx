import axios from "axios";
import { useEffect, useState } from "react";

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedIds = JSON.parse(localStorage.getItem("idFavorites")) || [];

      if (storedIds.length === 0) {
        console.log("Nenhum favorito encontrado");
        return;
      }

      try {
   
        const responses = await Promise.all(
          storedIds.map((id) => axios.get(`https://api.tvmaze.com/shows/${id}`))
        );

        // Extrai os dados e atualiza o estado
        const data = responses.map((res) => res.data);
        setFavorites(data);
      } catch (error) {
        console.error("Erro ao buscar filmes favoritos:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="bg-[#0c0b0b] opacity-90 min-h-screen w-full">
      <div className="p-6 mb-15">
        <h1 className="text-2xl font-bold mb-4 text-white">Favoritos</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 group-hover:opacity-75">
          {favorites.length === 0 ? (
            <p className="text-gray-400 text-center col-span-full">
              Nenhum favorito salvo ainda 😢
            </p>
          ) : (
            favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="border rounded-lg p-2 text-center shadow hover:opacity-50 transition-opacity"
              >
                <img
                  src={favorite.image?.medium || ""}
                  alt={favorite.name}
                  className="w-full h-64 object-cover rounded"
                />
                <h2 className="font-semibold mt-2 text-gray-300">{favorite.name}</h2>
                <p className="text-sm text-gray-500">{favorite.language}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}