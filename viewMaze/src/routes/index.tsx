import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from '../page/home/index';
import FilmeDetail from '../page/filme';
import Favorite from '../page/favorito';

export default function AppRoutes(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/filme/:id" element={<FilmeDetail/>} />
                <Route path="/favorito" element={<Favorite/>} />
            </Routes>
        </BrowserRouter>

    );
    
}