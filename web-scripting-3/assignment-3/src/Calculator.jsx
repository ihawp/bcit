import { useState } from 'react';
import { calculatorButtons } from './calculator-data/calculator-base-button-data.js';
import './Calculator.css';

export default function Calculator() {

    // brain

    // one operation
    const [currentVal, setCurrentVal] = useState('');
    const [lastVal, setLastVal] = useState('');
    const [currentOperation, setCurrentOperation] = useState('');

    // Not used... yet? no point?
    const [operationHappening, setOperationHappening] = useState(false);

    // Memory
    const [memory, setMemory] = useState('0');

    function calculate() {

        switch (currentOperation) {
            case '*':
                setCurrentVal(String(Number(lastVal) * Number(currentVal)));
                break;
            case '/':
                setCurrentVal(String(Number(lastVal) / Number(currentVal)));
                break;
            case '+':
                setCurrentVal(String(Number(lastVal) + Number(currentVal)));
                break;
            case '-':
                setCurrentVal(String(Number(lastVal) - Number(currentVal)));
                break;
        }

        setCurrentOperation('');
        setOperationHappening(false);
        setLastVal('');
    }

    const takeInput = (event) => {

        if (!event.target.dataset.value) return;

        switch (event.target.dataset.value) {
            case 'AC':
                setCurrentVal('');
                setLastVal('');
                setOperationHappening(false);
                setCurrentOperation('');
                setMemory('0');
                break;
            case 'C':
                setCurrentVal('');
                break;
            case 'MS':
                setMemory(currentVal);
                break;
            case 'MC':
                setMemory('0');
                break;
            case 'MR':
                setCurrentVal(memory);
                break;
            case 'M+':
                setMemory(String(Number(memory) + Number(currentVal)));
                break;
            case 'M-':
                setMemory(String(Number(memory) - Number(currentVal)));
                break;
            case 'M*':
                setMemory(String(Number(memory) * Number(currentVal)));
                break;
            case 'M/':
                setMemory(String(Number(memory) / Number(currentVal)));
                break;
            case 'x':
                setLastVal(currentVal);
                setCurrentVal('');
                setCurrentOperation('*');
                setOperationHappening(true);
                break;
            case '/':
                setLastVal(currentVal);
                setCurrentVal('');
                setCurrentOperation('/');
                setOperationHappening(true);
                break;
            case '+':
                setLastVal(currentVal);
                setCurrentVal('');
                setCurrentOperation('+');
                setOperationHappening(true);
                break;
            case '-':
                setLastVal(currentVal);
                setCurrentVal('');
                setCurrentOperation('-');
                setOperationHappening(true);
                break;
            case '=':
                // This right here is what I need to figure out.
                // how to use the saved operation value (string) amongst
                // the ints here to perform the calculation.
                calculate();
                break;
            case '0':
                setCurrentVal(currentVal + '0');
                break;
            case '1':
                setCurrentVal(currentVal + '1');
                break;
            case '2':
                setCurrentVal(currentVal + '2');
                break;
            case '3':
                setCurrentVal(currentVal + '3');
                break;
            case '4':
                setCurrentVal(currentVal + '4');
                break;
            case '5':
                setCurrentVal(currentVal + '5');
                break;           
            case '6':
                setCurrentVal(currentVal + '6');
                break;
            case '7':
                setCurrentVal(currentVal + '7');
                break;
            case '8':
                setCurrentVal(currentVal + '8');
                break;
            case '9':
                setCurrentVal(currentVal + '9');
                break;
            case '.':
                if (currentVal.indexOf('.') === -1 && currentVal.length >= 1) {
                    setCurrentVal(currentVal + '.');
                }
                break;
            case '+/-':
                if (currentVal[0] === '-') {
                    setCurrentVal(currentVal.slice(0, 0));
                } else {
                    setCurrentVal('-' + currentVal);
                }
                break;
        }
    }

    return <div className={"calculator"} onClick={takeInput}>
        <div className={"screen"}>
            {lastVal} {currentOperation} {currentVal}
        </div>
        <div className={"buttons"}>
            <ul className={"memory"}>
                <li>
                    <button data-value="MS">MS</button>
                </li>
                <li>
                    <button data-value="MC">MC</button>
                </li>
                <li>
                    <button data-value="MR">MR</button>
                </li>
                <li>
                    <button data-value="M+">M+</button>
                </li>
                <li>
                    <button data-value="M-">M-</button>
                </li>
                <li>
                    <button data-value="M*">M*</button>
                </li>
                <li>
                    <button data-value="M/">M/</button>
                </li>
            </ul>
            <ul className={"acs"}>
                <li>
                    <button data-value="AC">AC</button>
                </li>
                <li>
                    <button data-value="C">C</button>
                </li>
            </ul>
            <ul className={"numbers"}>
                <li>
                    <button data-value="7">7</button>
                </li>
                <li>
                    <button data-value="8">8</button>
                </li>
                <li>
                    <button data-value="9">9</button>
                </li>
                <li>
                    <button data-value="4">4</button>
                </li>
                <li>
                    <button data-value="5">5</button>
                </li>
                <li>
                    <button data-value="6">6</button>
                </li>
                <li>
                    <button data-value="1">1</button>
                </li>
                <li>
                    <button data-value="2">2</button>
                </li>
                <li>
                    <button data-value="3">3</button>
                </li>
                <li>
                    <button data-value="0">0</button>
                </li>
                <li>
                    <button data-value=".">.</button>
                </li>
                <li>
                    <button data-value="+/-">+/-</button>
                </li>
            </ul>
            <ul className={"operators"}>
                <li>
                    <button data-value="x">x</button>
                </li>
                <li>
                    <button data-value="/">/</button>
                </li>
                <li>
                    <button data-value="+">+</button>
                </li>
                <li>
                    <button data-value="-">-</button>
                </li>
                <li>
                    <button data-value="=">=</button>
                </li>
            </ul>
        </div>
    </div>
}