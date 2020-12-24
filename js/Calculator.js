//Principal constructor
export default function Calculator() {

    this.index = 0; //Esse indice é usado para adicinar operações ou numeros na esquação
    this.calcArray = []; //Essa é a array principal onde é armazenada as formulas e resultado final

    //Check if this item is a number or operation
    this.isItOperation = (str) => {
        if (str == "+") {
            return 1;
        }
        if (str == "-") {
            return 2;
        }
        if (str == "*") {
            return 3;
        }
        if (str == "/") {
            return 4;
        }
        return -1;
    };

    //change principal array to number
    this.toNumber = () => {
        for (let i in this.calcArray) {
            if (this.isItOperation(this.calcArray[i]) == -1) {
                this.calcArray[i] = parseFloat(this.calcArray[i]);
            }
        }
    };
    //Change principal array to string
    this.toString = () => {
        for (let i in this.calcArray) {
            if (this.isItOperation(this.calcArray[i]) == -1) {
                this.calcArray[i] = this.calcArray[i].toString();
            }
        }
    };

    // Esse método retira duas itens de um array ao mesmo tempo
    this.removeAfterAndBefore = (pos1, pos2) => {
        let buf = [];
        for (let i in this.calcArray) {
            if (i != pos1 && i != pos2) {
                buf.push(this.calcArray[i]);
            }
        }
        this.calcArray = buf;
    };

    // Esse metodo conta os numeros de operações que tem para realizar
    this.operationLength = () => {
        let cont = 0;
        for (let i in this.calcArray) {
            if (this.isItOperation(this.calcArray[i]) != -1) {
                cont++;
            }
        }
        return cont;
    };

    // Essa função altera na array principal e deixa o resultado no array[0]
    this.calculate = () => {
        let buf;
        let numbersOfOperation = this.operationLength();
        this.toNumber();

        //External 'for' is used to fetch for operations
        for (let x = 0; x < numbersOfOperation; x++) {

            for (let i = 0; i < this.calcArray.length; i++) {

                if (this.isItOperation(this.calcArray[i]) == 3) {
                    buf = this.calcArray[i - 1] * this.calcArray[i + 1];
                    this.calcArray[i] = buf;
                    this.removeAfterAndBefore(i - 1, i + 1);
                }

                if (this.isItOperation(this.calcArray[i]) == 4) {
                    buf = this.calcArray[i - 1] / this.calcArray[i + 1];
                    this.calcArray[i] = buf;
                    this.removeAfterAndBefore(i - 1, i + 1);
                }
            }

            for (let i = 0; i < this.calcArray.length; i++) {

                if (this.isItOperation(this.calcArray[i]) == 1) {
                    buf = this.calcArray[i - 1] + this.calcArray[i + 1];
                    this.calcArray[i] = buf;
                    this.removeAfterAndBefore(i - 1, i + 1);
                }

                if (this.isItOperation(this.calcArray[i]) == 2) {
                    buf = this.calcArray[i - 1] - this.calcArray[i + 1];
                    this.calcArray[i] = buf;
                    this.removeAfterAndBefore(i - 1, i + 1);
                }
            }
        }
        this.toString();
    };
};
