import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from '../page/home/index';
import FilmeDetail from '../page/filme';
import Teste from '../page/filme/index copy';

export default function AppRoutes(){

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/filme/:id" element={<FilmeDetail/>} />
                <Route path="/teste" element={<Teste />} />
            </Routes>
        </BrowserRouter>

    );
    
}