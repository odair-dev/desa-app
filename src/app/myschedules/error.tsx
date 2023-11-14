'use client';
import { useEffect } from 'react';

interface IErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({ error, reset }: IErrorProps){
    useEffect(()=>{
        console.error(error);
    }, [error]);
    return(
        <div>
            <h1>Falha ao carregar!</h1>
            <button onClick={reset}>Tentar novamente</button>
        </div>
    )
}
