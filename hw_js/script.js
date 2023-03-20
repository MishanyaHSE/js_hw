const inputField = document.querySelector("#input");
let expr = "";

function calcclick(value) {
    expr += value;
    inputField.value = expr;
}

function clear_field() {
    expr = "";
    inputField.value = "";
}

function undo() {
    expr = expr.substring(0, expr.length - 1);
    inputField.value = expr;
}

function count() {
    if (validation(expr)) {
        let answer = eval(expr)
        if (answer == "Infinity") {
            inputField.value = "NaN";
            expr = "";
            return;
        }
        inputField.value = answer;
        if (inputField.value != "0") {
            expr = inputField.value;
        } else {
            expr = "";
        }
    } else {
        alert("Некорректный ввод! Выражение не должно содержать:\n -Двух операторов или двух точек подряд \n -Букв \n -Скобки должны быть расставлены корректно");
    }
}


function validation(line) {
    let osk = 0;
    let isValid = true;

    for (i = 0; i < line.length; i++) {
        if (line.charAt(i) == "(") {
            osk = osk + 1;
        }
        if (line.charAt(i) == ")") {
            osk = osk - 1;
        }
        if (osk < 0) { 
            isValid = false;
         }
    }
    if (!(osk == 0)) { 
        isValid = false; 
    }
    if (line.charAt(0) == "/" | line.charAt(0) == "*" | line.charAt(0) == "%") {
        isValid = false;
    }
    for (i = 0; i < line.length; i++) {
        if ((line.charAt(i) == "(" | line.charAt(i) == "+" | line.charAt(i) == "-" | line.charAt(i) == "*" | 
        line.charAt(i) == "/" | line.charAt(i) == "%" | line.charAt(i) == ".") &&
        (line.charAt(i + 1) == ")" | line.charAt(i + 1) == "+" | line.charAt(i + 1) == "-" |
        line.charAt(i + 1) == "*" | line.charAt(i + 1) == "/" | line.charAt(i + 1) == "%" | line.charAt(i + 1) == ".")) 
        { 
            isValid = false; 
        }
    }
    var reg = new RegExp("\\d|\\.")
    for (i = 0; i < line.length; i++) {
        if ((line.charAt(i).search(reg) == -1) && 
        (!(line.charAt(i) == "+" | line.charAt(i) == "-" | line.charAt(i) == "*" | line.charAt(i) == "/" |
        line.charAt(i) == "(" | line.charAt(i) == ")" | line.charAt(i) == "%")))
        { 
            isValid = false;
        }
    }
    if ((line.charAt(line.length - 1).search(reg) == -1) && (!(line.charAt(line.length - 1) == ")"))) 
    { 
        isValid = false; 
    }
    return isValid;
}