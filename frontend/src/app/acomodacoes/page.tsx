"use client"
import { useEffect, useState } from "react";
import Card from "@/components/card"

import styles from './acomodacao.module.css'
import { Acomodacao } from "@/interfaces/acomodacao";
import { acomodacaoServices } from "@/services/acomodacaoServices";


export default function Acomodacoes() {
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[] | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const fetchAcomodacoes = async () => {
        try{
            const data = await acomodacaoServices.getAllAcomodacao();
            console.log("Dados recebidos:", data); // Debug
            setAcomodacoes(Array.isArray(data) ? data : []);
            setIsLoading(false);
        }catch (err) {
            console.error("Erro ao carregar as acomodações:", err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAcomodacoes()
    }, [])

    return(
      <>
        {isLoading ? (
            <span>Carregando...</span>
        ): (
            <>
                <div className="flex w-full items-center justify-between">
                    <h2>Acomodações</h2>
                </div>

                <div className={styles.container}>
                    {Array.isArray(acomodacoes) && acomodacoes.length > 0 ? (
                        acomodacoes.map((acomodacao, index) => (
                            <Card key={index} className="w-[20rem] h-[17rem] transition-transform duration-300 hover:scale-105">
                                <div className={styles.text}>
                                    <h1>{acomodacao.nomeAcomadacao?.nome || 'Nome não disponível'}</h1>
                                </div>
                                
                                <div className={styles.card}>
                                    <span>Cama de Casal: {acomodacao.camaCasal}</span>
                                    <span>Cama de Solteiro: {acomodacao.camaSolteiro} </span>
                                    <span>Garagem: {acomodacao.garagem}</span> 
                                    <span>Climatização: {acomodacao.climatizacao ? 'Sim': 'Não'}</span>
                                    <span>Suite: {acomodacao.suite}</span>       
                                    <span>Quartos Disponíveis: {acomodacao.quantidadeDisponivel}</span>        
                                    
                                </div>
                            </Card>
                        ))
                    ) : (
                        <p>Nenhuma acomodação encontrada.</p>
                    )}
                </div>
            </>
        )}
      </>      
    );
}