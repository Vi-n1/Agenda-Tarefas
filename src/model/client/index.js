
export default class clients {

    constructor(name, quantity, description, date) {
        this.name = name;
        this.quantity = quantity;
        this.description = description;
        this.date = date;
    }

    toArray() {
        return [this.name, this.quantity, this.description, this.date];
    }

}

