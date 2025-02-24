import Menu from "../interfaces/menu";

export default class MenuCadastroTelefones implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Cadastro de telefones `)
        console.log(`----------------------`)
        console.log(`| 1 - Adicionar novo`)
        console.log(`| 0 - Finalizar cadastro de telefones`)
        console.log(`----------------------`)
    }
}