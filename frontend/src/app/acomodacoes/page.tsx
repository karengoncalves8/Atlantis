"use-client"

import Card from "@/components/card"

import styles from './acomodacao.module.css'

export default function Acomodacoes() {
    return(
      <>
        <div className="flex w-full items-center justify-between">
            <h2>Acomodações</h2>
        </div>

        <div className={styles.container}>
             <Card className="w-[20rem] h-[17rem] transition-transform duration-300 hover:scale-105">
                 <div className={styles.text}>
                    <h1>Solteiro simples 🧑</h1>
                </div>
                
                <div className={styles.card}>
                    <span>Cama de Casal: 1 </span>
                    <span>Cama de Solteiro: 1 </span>
                    <span>Garagem: 1</span> 
                    <span>Climatização: Não</span>
                    <span>Suite: Não</span>       
                    <span>Quartos Disponíveis: 40</span>        
                    
                </div>
            </Card>
            <Card className="w-[20rem] h-[17rem] transition-transform duration-300 hover:scale-105">
                 <div className={styles.text}>
                    <h1>Casal simples 👩‍❤️‍👨</h1>
                </div>
                
                <div className={styles.card}>
                    <span>Cama de Casal: 1 </span>
                    <span>Cama de Solteiro: 1 </span>
                    <span>Garagem: 1</span> 
                    <span>Climatização: Não</span>
                    <span>Suite: Não</span>       
                    <span>Quartos Disponíveis: 40</span>        
                    
                </div>
            </Card>

            <Card className="w-[20rem] h-[17rem] transition-transform duration-300 hover:scale-105">
                 <div className={styles.text}>
                    <h1>Familia Simples 👨‍👩‍👧‍👦</h1>
                </div>
                
                <div className={styles.card}>
                    <span>Cama de Casal: 1 </span>
                    <span>Cama de Solteiro: 2</span>
                    <span>Garagem: 1</span> 
                    <span>Climatização: Não</span>
                    <span>Suite: Sim</span>       
                    <span>Quartos Disponíveis: 40</span>        
                    
                </div>
            </Card>
            <Card className="w-[20rem] h-[17rem] transition-transform duration-300 hover:scale-105">
                <div className={styles.text}>
                    <h1>Solteiro Plus 🧑</h1>
                </div>
                
                
                <div className={styles.card}>
                    <span>Cama de Casal: 1 </span>
                    <span>Cama de Solteiro: 1 </span>
                    <span>Garagem: 1</span> 
                    <span>Climatização: Não</span>
                    <span>Suite: Não</span>       
                    <span>Quartos Disponíveis: 40</span>        
                    
                </div>
            </Card>
            <Card className="w-[20rem] h-[17rem] transition-transform duration-300 hover:scale-105">
                 <div className={styles.text}>
                    <h1>Casal Plus 👩‍❤️‍👨</h1>
                </div>
                
                <div className={styles.card}>
                    <span>Cama de Casal: 1 </span>
                    <span>Cama de Solteiro: 1 </span>
                    <span>Garagem: 1</span> 
                    <span>Climatização: Não</span>
                    <span>Suite: Não</span>       
                    <span>Quartos Disponíveis: 40</span>        
                    
                </div>
            </Card>
            <Card className="w-[20rem] h-[17rem] transition-transform duration-300 hover:scale-105">
                 <div className={styles.text}>
                    <h1>Familia Plus 👨‍👩‍👧‍👦</h1>
                </div>
                
                <div className={styles.card}>
                    <span>Cama de Casal: 1 </span>
                    <span>Cama de Solteiro: 1 </span>
                    <span>Garagem: 1</span> 
                    <span>Climatização: Não</span>
                    <span>Suite: Não</span>       
                    <span>Quartos Disponíveis: 40</span>        
                    
                </div>
            </Card>
        </div>
      </>      
    );
}