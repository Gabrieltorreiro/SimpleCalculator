let display = document.querySelector("#textArea");
let clearAll = document.querySelector("#clearAll");
let igual = document.querySelector("#igual");
let plus = document.querySelector("#plus");
let menos = document.querySelector("#menos");
let virgula = document.querySelector("#virgula");

let num = [];
for (let i = 0; i < 10; i++) {
    num[i] = document.querySelector(`#num${i}`);
}

let calc;

clearAll.onclick = function () {
    display.value = "";
    calc.index = 0;
    calc.calcArray = [];
}

menos.onclick = function () {
    calc.calcArray[++calc.index] = "-";
    calc.index++;
    display.value += "-";
}

plus.onclick = function () {
    calc.calcArray[++calc.index] = "+";
    calc.index++;
    display.value += "+";
}

virgula.onclick = function () {
    if (calc.calcArray[calc.index] == undefined) {
        calc.calcArray[calc.index] = "";
    }
    calc.calcArray[calc.index] += ".";
    display.value += ",";
}

igual.onclick = function () {
    calc.calculate();
    calc.index = 0;
    calc.calcArray[0] = calc.calcArray[0].toString();
    calc.calcArray[0] = calc.calcArray[0].replace(".", ",");
    display.value = calc.calcArray[0];
    calc.calcArray[0] = calc.calcArray[0].replace(",", ".");
}

for (let i = 0; i < 10; i++) {
    num[i].onclick = function () {
        if (calc.calcArray[calc.index] == undefined) {
            calc.calcArray[calc.index] = "";
        }
        calc.calcArray[calc.index] += i.toString();
        display.value += i;
    }
}

Calculator = function () {
    
    this.index = 0;         //Esse indice é usado para adicinar operações ou numeros na esquação
    this.calcArray = [];    //Essa é a array principal onde é armazenada as formulas e resultado final

    // Esse metodo verifica se a string é uma operação ou um numero
    this.isItOp = function(str) {
        if (str == "+") {
            return 1;
        }
        if (str == "-") {
            return 2;
        }
        return -1;
    }

    // Esse metodo altera os valores de string para number
    this.toNumber = function() {
        for (let i in this.calcArray) {
            if (this.isItOp(this.calcArray[i]) == -1) {
                this.calcArray[i] = parseFloat(this.calcArray[i]);
            }
        }
    }

    // Esse método retira duas itens de um array ao mesmo tempo
    this.remove = function(pos1, pos2) {
        let buf = [];
        for (let i in this.calcArray) {
            if (i != pos1 && i != pos2) {
                buf.push(this.calcArray[i]);
            }
        }
        this.calcArray = buf;
    }

    // Esse metodo conta os numeros de operações que teem para realizar
    this.opLen = function() {
        let cont = 0;
        for (let i in this.calcArray) {
            if (this.isItOp(this.calcArray[i]) != -1) {
                cont++;
            }
        }
        return cont;
    }

    // Essa função altera na array principal e deixa o resultado no array[0]
    this.calculate = function() {
        let buf;
        let jump = false;
        let ops = this.opLen();
        this.toNumber();

        for (let x = 0; x < ops; x++) {
            for (let i = 0; i < this.calcArray.length && jump == false; i++) {
                if (this.isItOp(this.calcArray[i]) == 1) {
                    buf = this.calcArray[i - 1] + this.calcArray[i + 1];
                    this.calcArray[i] = buf;
                    this.remove(i - 1, i + 1);
                    jump == true;
                }
                if (this.isItOp(this.calcArray[i]) == 2) {
                    buf = this.calcArray[i - 1] - this.calcArray[i + 1];
                    this.calcArray[i] = buf;
                    this.remove(i - 1, i + 1);
                    jump == true;
                }
            }
        }
    }
}

calc = new Calculator();