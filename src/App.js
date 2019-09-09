import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';

function useJsonFetch(url) {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(response.statusText);
                const data = await response.json();
                setData(data);
                setError(null);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);
    return [data, isLoading, hasError];
}

function AppHook({ url }) {
    const [data, isLoading, hasError] = useJsonFetch(url);
    return (
        <div className='App'>
            <h1>{data && data.status}</h1>
            <h1>{isLoading && 'Is Loading'}</h1>
            <h1>{hasError && 'Has Error'}</h1>
        </div>
    );
}

export default function App() {
    return (
        <div>
            <AppHook url={process.env.REACT_APP_DATA_URL} />
            <hr />
            <AppHook url={process.env.REACT_APP_ERROR_URL} />
            <hr />
            <AppHook url={process.env.REACT_APP_LOADING_URL} />
            <hr />
        </div>
    );
}
