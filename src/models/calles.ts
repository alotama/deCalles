// Clase del objeto Calle
class Calle {
    name: string;
    numberMax: number;
    type: string;
    data: { [key: string]: string; };
    creationDate: Date;
    modificationDate: Date;

    constructor(
        name: string,
        numberMax: number,
        type: string,
        creationDate: Date,
        modificationDate: Date
    ) {
        this.name = name;
        this.numberMax = numberMax;
        this.type = type;
        this.data = {
            '150': '',
            '300': ''
        };
        this.creationDate = creationDate;
        this.modificationDate = modificationDate;
    }

    setData(key: '150' | '300', value: string) {
        this.data[key] = value;
    }

    getData(key: '150' | '300'): string {
        return this.data[key];
    }
}

export default Calle;
