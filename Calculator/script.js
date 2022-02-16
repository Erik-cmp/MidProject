class Calculator {
    constructor(prevTE, currTE) {
        this.prevTE = prevTE;
        this.currTE = currTE;
        this.clear();
    }

    clear(){
        this.currOp = 0
        this.prevOp = ''
        this.operation = undefined
    }

    delete(){
        if(this.currOp == 0 && this.currOp.toString().length == 1) return
        this.currOp = this.currOp.toString().slice(0, -1)
    }

    appendNumber(number){
        if(number === '.' && this.currOp.includes('.')) return
        this.currOp = this.currOp.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currOp === '') return
        if(this.prevOp !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOp = this.currOp
        this.currOp = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.prevOp)
        const curr = parseFloat(this.currOp)
        if(isNaN(prev) || isNaN(curr)) return

        switch (this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '÷':
                computation = prev / curr
                break
            default:
                return                    
        }
        this.currOp = computation
        this.operation = undefined
        this.prevOp = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = (stringNumber.split('.')[1])
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currTE.innerText = this.getDisplayNumber(this.currOp)
        if (this.operation != null){
            this.prevTE.innerText =
            `${this.getDisplayNumber(this.prevOp)} ${this.operation}` 
        }
        else{
            this.prevTE.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const acButton = document.querySelector('[data-ac]')
const prevTE = document.querySelector('[data-prev]')
const currTE = document.querySelector('[data-curr]')

const calculator = new Calculator(prevTE, currTE)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
