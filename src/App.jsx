import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Pagination from './components/Pagination';

function App() {
    const [pokemon, setPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState(
        'https://pokeapi.co/api/v2/pokemon'
    );
    const [nextPageUrl, setNextPageUrl] = useState([]);
    const [prevPageUrl, setPrevPageUrl] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let cancel;
        axios
            .get(currentPage, {
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
            .then((res) => {
                setLoading(false);
                setNextPageUrl(res.data.next);
                setPrevPageUrl(res.data.previous);
                setPokemon(res.data.results);
            });

        return () => cancel();
    }, [currentPage]);

    const goToNextPage = () => {
        setCurrentPage(nextPageUrl);
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPageUrl);
    };

    return (
        <div className='container'>
            <h2 className='title'>Pokemon list</h2>
            <ul className='pokemon-list'>
                {pokemon.map((p) => (
                    <li key={p.name} className='pokemon-item'>
                        <h2 className='pokemon-name'>{p.name}</h2>
                        <img
                            className='pokemon-image'
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                                p.url.split('/')[6]
                            }.png`}
                            alt={`${p.name} sprite`}
                        />
                    </li>
                ))}
            </ul>
            <Pagination
                goToNextPage={nextPageUrl ? goToNextPage : null}
                goToPrevPage={prevPageUrl ? goToPreviousPage : null}
            />
        </div>
    );
}

export default App;
