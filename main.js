
ssize = 0
var stackarr = [];
var z = -1;
var topp = -1;
var delayInMilliseconds = 1000;
var time = 500
function outputMessage(message) {
    for (var i = 0; i < 1; i++) {
        setTimeout(() => {
            const div = document.createElement('div');
            div.classList.add('message');
            const p = document.createElement('p');
            p.classList.add('meta');
            p.innerText = message;
            div.appendChild(p);
            document.querySelector('.stack').appendChild(div);
        }, time);
        console.log(time);
        time += 2000;
    }
}

function popping(topp) {
    for (var i = 0; i < 1; i++) {
        setTimeout(() => {
            const list = document.getElementById("stack");
            const a = list.lastElementChild;
            list.removeChild(list.lastElementChild);
        }, time);
        console.log(time);
        time += 2000;

    }
}
function push(e) {
    topp++;
    stackarr[topp] = e;
    outputMessage(e);

}
var idx = 0;
function pop(i) {
    if (topp == -1)
        return 0;
    else {
        var popped_ele = stackarr[topp];
        popping(topp);

        topp--;
        return popped_ele;
    }
}

function operator(op) {
    if (op == '+' || op == '-' ||
        op == '^' || op == '*' ||
        op == '/' || op == '(' ||
        op == ')') {
        return true;
    }
    else
        return false;
}

function precedency(pre) {
    if (pre == '@' || pre == '(' || pre == ')') {
        return 1;
    }
    else if (pre == '+' || pre == '-') {
        return 2;
    }
    else if (pre == '/' || pre == '*') {
        return 3;
    }
    else if (pre == '^') {
        return 4;
    }
    else
        return 0;
}


function InfixtoPostfix() {

    var postfix = [];
    var temp = 0;
    push('@');
    infixval = document.getElementById("infixvalue").value;
    var code, i, len;

    for (i = 0, len = infixval.length; i < len; i++) {
        code = infixval.charCodeAt(i);

        console.log(infixval[i], code)
        if ((!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123) && !infixval[i] == ')')) { // lower alpha (a-z)
            ssize = ssize + 1;

        }
    }

    console.log(ssize)
    for (var i = 0; i < infixval.length; i++) {
        idx++;
        var el = infixval[i];
        if (operator(el)) {
            if (el == ')') {
                while (stackarr[topp] != "(") {
                    postfix[temp++] = pop(i);
                }
                pop(i);
            }
            else if (el == '(') {
                push(el);
            }
            else if (precedency(el) > precedency(stackarr[topp])) {
                push(el);
            }
            else {
                while (precedency(el) <=
                    precedency(stackarr[topp]) && topp > -1) {
                    postfix[temp++] = pop(i);
                }
                push(el);
            }
        }
        else {
            postfix[temp++] = el;
        }
    }
    while (stackarr[topp] != '@') {
        postfix[temp++] = pop(i);
    }

    var st = "";
    for (var i = 0; i < postfix.length; i++)
        st += postfix[i];

    document.getElementById("text").innerHTML = st;
    pop(i);
}
function ReverseString(str) {

    // Returning reverse string
    return [...str].reduce((x, y) => y.concat(x));
}
function InfixtoPostfixon() {
    document.querySelector(".infixtopost").classList.add("active");
    document.querySelector(".output").classList.add("active");
}
function InfixtoPrefixon() {
    document.querySelector(".infixtopre").classList.add("active");
    document.querySelector(".output").classList.add("active");
}
function InfixtoPrefix() {

    var postfix = [];
    var temp = 0;
    push('@');
    // console.log(list)
    var infixvall = document.getElementById("infixvalue2").value;
    var code, i, len;
    var infixval2 = ReverseString(infixvall);
    var infixval = infixval2.replaceAll('(', '_').replaceAll(')', '(').replaceAll('_',')');

    for (i = 0, len = infixval.length; i < len; i++) {
        code = infixval.charCodeAt(i);

        console.log(infixval[i], code)
        if ((!(code > 47 && code < 58) && // numeric (0-9)
            !(code > 64 && code < 91) && // upper alpha (A-Z)
            !(code > 96 && code < 123) && !infixval[i] == ')')) { // lower alpha (a-z)
            ssize = ssize + 1;

        }
    }


    for (var i = 0; i < infixval.length; i++) {
        idx++;
        var el = infixval[i];
        // Checking whether operator or not
        if (operator(el)) {
            if (el == ')') {
                while (stackarr[topp] != "(") {
                    postfix[temp++] = pop(i);
                }
                // popping();
                pop(i);
            }

            // Checking whether el is ( or not
            else if (el == '(') {
                push(el);
            }

            // Comparing precedency of el and
            // stackarr[topp]
            else if (precedency(el) > precedency(stackarr[topp])) {
                push(el);
            }
            else {
                while (precedency(el) <=
                    precedency(stackarr[topp]) && topp > -1) {
                    //popping();
                    postfix[temp++] = pop(i);
                }
                push(el);
            }
        }
        else {
            postfix[temp++] = el;
        }


    }
    while (stackarr[topp] != '@') {
        postfix[temp++] = pop(i);
    }

    // String to store postfix expression
    var stt = "";
    for (var i = 0; i < postfix.length; i++)
        stt += postfix[i];
    st = ReverseString(stt);
    // To print postfix expression in HTML
    document.getElementById("text").innerHTML = st;
    pop(i);
}

function postfixeval(){
    var postfix = [];
    var temp = 0;
    push('@');

    var exp = document.getElementById("infixvalue3").value;
    for(var i = 0 ; i<exp.length; i++){
        var el = exp[i];
        if(! isNaN( parseInt(el) )){
            push(el);
        }
        else{
           let val1 = parseInt(pop(i));
           let val2 = parseInt(pop(i));

           switch(el){
            case '+':
                push(val2+val1);
                break;
                  
                case '-':
                push(val2- val1);
                break;
                  
                case '/':
                push(val2/val1);
                break;
                  
                case '*':
                push(val2*val1);
                break;
           }
        }
    }
    st = pop(i);
    document.getElementById("text").innerHTML = st;
    pop(i);
}

function postfixevalon(){
    document.querySelector(".postfixeval").classList.add("active");
    document.querySelector(".output").classList.add("active");
}