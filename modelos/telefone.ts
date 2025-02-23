import Prototipo from "../interfaces/prototipo"

export default class Telefone implements Prototipo {
    public ddd: string
    public numero: string

    clonar(): Prototipo {
        let tel_copy = new Telefone()
        tel_copy.ddd = this.ddd
        tel_copy.numero = this.numero
        return tel_copy
    }
}