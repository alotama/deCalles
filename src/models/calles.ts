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
        data: {
            name: string,
            '150': string,
            '300': string
        },
        creationDate: Date,
        modificationDate: Date
    ) {
        this.name = name;
        this.numberMax = numberMax;
        this.type = type;
        this.data = data;
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
