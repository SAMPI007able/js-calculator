let result = '0.0';
let operationString = '';
let resultBuffer = [];

const btnClicked = (item, type) => {
    if( isScreenBlank() === true ) {
        if( type !== 'OPR')    return;
    }

    switch(type){
        case 'OPR' : {
            operationString += item;
            if( resultBuffer.length > 1 ){
                    doOperation(resultBuffer[1], item);
            }
            break;
        }
        case 'CLEAR' : {
            operationString = '';
            result = '0.0';
            resultBuffer = [];
            break;
        }
        case 'DEL' : {
            operationString = operationString.substr(0, operationString.length-1);
            break;
        }
        case 'OPND' : {
            setOperatorForNextInput(item); 
            if( item !== '=' )   {
                operationString += item;
            } else{
                // result = resultBuffer[0].toString(); // Without using eval
                result = eval(operationString);         // Using Eval
            }    
            break;
        }
    }
    updateScreen();
}

const isScreenBlank = () => {
    return operationString === '';
}

const updateScreen = () => {
    document.querySelector('.result').textContent = result;
    document.querySelector('.operations').textContent = operationString;    
}

const setOperatorForNextInput = (operator) => {
    resultBuffer[1] = operator;
}

const updateResultBuffer = (output) => {
    resultBuffer = [];
    resultBuffer.push(output);
}

const doOperation = (operator, item) => {
    switch(operator){
        case '+' : {
            const sourceOperand = resultBuffer[0] ?? parseFloat(operationString.substr(0, operationString.length-1));   // Only applicable for first operator
            const output = sourceOperand + parseFloat(item);        
            updateResultBuffer(output);
            break;
        }
        case '-' : {
            const sourceOperand = resultBuffer[0] ?? parseFloat(operationString.substr(0, operationString.length-1));   // Only applicable for first operator
            const output = sourceOperand - parseFloat(item);        
            updateResultBuffer(output);
            break;
        }
        case '*' : {
            const sourceOperand = resultBuffer[0] ?? parseFloat(operationString.substr(0, operationString.length-1));   // Only applicable for first operator
            const output = sourceOperand * parseFloat(item);        
            updateResultBuffer(output);
            break;
        }
        case '/' : {
            const sourceOperand = resultBuffer[0] ?? parseFloat(operationString.substr(0, operationString.length-1));   // Only applicable for first operator
            const output = sourceOperand / parseFloat(item);        
            updateResultBuffer(output);
            break;
        }
    }
}

window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented) {
      return;
    }
    let operator = '';
    if( ['+', '-', '*', '/', '='].includes(event.key) ){
        operator = 'OPND'
    } else if( event.key === '.' || !isNaN(parseFloat( event.key )) ){
        operator = 'OPR'
    }
    else if( event.key === 'Delete' ){
        operator = 'DEL'
    }
    if(operator !== ''){
        btnClicked(event.key, operator);
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);

updateScreen();
