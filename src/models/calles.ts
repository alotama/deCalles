interface Street {
    number_max: number;
    name: string;
    complete_name: {
        name: string;
        full_name: string;
    };
    category: string;
    district: string[];
    data: {
        [key: string]: string;
    };
}

class Calle {
    private streets: { [key: string]: Street };

    constructor() {
        this.streets = {};
    }

    addStreet(name: string, fullName: string, category: string, departmentName: string, maxNumber: number, data: { name: string, key: '150' | '300', value: string }): void {
        this.streets[name] = {
            number_max: maxNumber,
            name: name,
            complete_name: {
                name: name,
                full_name: fullName,
            },
            category: category,
            district: [departmentName],
            data: data
        };
    }

    updateStreet(name: string, departmentName: string, maxNumber: number): void {
        if (this.streets[name]) {
            if (!this.streets[name].district.includes(departmentName)) {
                this.streets[name].district.push(departmentName);
            }
            if (maxNumber > this.streets[name].number_max) {
                this.streets[name].number_max = maxNumber;
            }
        }
    }

    setData(name: string, key: '150' | '300', value: string): void {
        if (this.streets[name] && (key === '150' || key === '300')) {
            this.streets[name].data[key] = value;
        } else {
            throw new Error(`Invalid key: ${key} or street name: ${name}`);
        }
    }

    getData(name: string, key: '150' | '300'): string {
        if (this.streets[name] && this.streets[name].data[key]) {
            return this.streets[name].data[key];
        } else {
            throw new Error(`Data not found for key: ${key} in street: ${name}`);
        }
    }
}

export default Calle;