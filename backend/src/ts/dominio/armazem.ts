import Acomodacao from "../modelos/acomodacao";
import Cliente from "../modelos/cliente";
import Hospedagem from "../modelos/hospedagem";

export default class Armazem {
    private static instanciaUnica: Armazem = new Armazem()
    private clientes: Cliente[] = []
    private acomodacoes: Acomodacao[] = []
    private hospedagens: Hospedagem[] = []
    
    private constructor() { }

    public static get InstanciaUnica() {
        return this.instanciaUnica
    }

    public get Clientes() {
        return this.clientes
    }
    public set Clientes(clientes: Cliente[]) {
        this.clientes = clientes
    }
    public get Acomodacoes(){
        return this.acomodacoes
    }
    public set Acomodacoes(acomodacoes: Acomodacao[]){
        this.acomodacoes = acomodacoes
    }
    public get Hospedagens(){
        return this.hospedagens
    }
    public set Hospedagens(hospedagens: Hospedagem[]){
        this.hospedagens = hospedagens
    }
}