import { useState } from 'react';
import { calculatorButtons } from './calculator-bonus-03-button-data.js';
import './Calculator.css';

export default function Calculator() {

    // Current Operation
    const [currentVal, setCurrentVal] = useState('0');
    const [lastVal, setLastVal] = useState('');
    const [currentOperation, setCurrentOperation] = useState('');

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
        setLastVal('');
    }

    function addToCurrentVal(val) {
        if (currentVal === '0') {
            setCurrentVal(val);
        } else {
            setCurrentVal(currentVal + val);
        }
    }

    function updateCurrentOperation(operator) {
        setLastVal(currentVal);
        setCurrentVal('0');
        setCurrentOperation(operator);
    }

    const takeInput = (event) => {

        if (!event.target.dataset.value) return;

        switch (event.target.dataset.value) {
            case 'All Clear':
                setCurrentVal('0');
                setLastVal('');
                setCurrentOperation('');
                setMemory('0');
                break;
            case 'Clear':
                setCurrentVal('0');
                break;
            case 'Clear Entry':
                if (currentVal.slice(0, currentVal.length - 1).length === 0) {
                    return setCurrentVal('0');
                }
                setCurrentVal(currentVal.slice(0, currentVal.length - 1));
                break;
            case 'Memory Save':
                setMemory(currentVal);
                break;
            case 'Memory Clear':
                setMemory('0');
                break;
            case 'Memory Recall':
                setCurrentVal(memory);
                break;
            case 'Memory Addition':
                setMemory(String(Number(memory) + Number(currentVal)));
                break;
            case 'Memory Subtract':
                setMemory(String(Number(memory) - Number(currentVal)));
                break;
            case 'Memory Multiply':
                setMemory(String(Number(memory) * Number(currentVal)));
                break;
            case 'Memory Divide':
                setMemory(String(Number(memory) / Number(currentVal)));
                break;
            case 'Multiply':
                updateCurrentOperation('*');
                break;
            case 'Divide':
                updateCurrentOperation('/');
                break;
            case 'Add':
                updateCurrentOperation('+');
                break;
            case 'Subtract':
                updateCurrentOperation('-');
                break;
            case 'Percent':
                setCurrentVal(String(Number(currentVal) / 100));
                break;
            case 'Square Root':
                setCurrentVal(String(Math.sqrt(Number(currentVal))));
                break;
            case 'Equal':
                calculate();
                break;
            case '0':
                addToCurrentVal('0');
                break;
            case '1':
                addToCurrentVal('1');
                break;
            case '2':
                addToCurrentVal('2');
                break;
            case '3':
                addToCurrentVal('3');
                break;
            case '4':
                addToCurrentVal('4');
                break;
            case '5':
                addToCurrentVal('5');
                break;           
            case '6':
                addToCurrentVal('6');
                break;
            case '7':
                addToCurrentVal('7');
                break;
            case '8':
                addToCurrentVal('8');
                break;
            case '9':
                addToCurrentVal('9');
                break;
            case '.':
                let check = currentVal.indexOf('.') === -1;
                if (check && currentVal.length === 0) {
                    setCurrentVal('0.');
                } else if (check) {
                    setCurrentVal(currentVal + '.');
                }
                break;
            case '+/-':
                if (currentVal[0] === '-') {
                    setCurrentVal(currentVal.slice(1, currentVal.length));
                } else if (currentVal[0] === '0') {
                    setCurrentVal('-');
                } else {
                    setCurrentVal('-' + currentVal);
                }
                break;
        }
    }

    const ulGroups = [
        { className: "memory", types: ["memory"] },
        { className: "acs", types: ["clear"] },
        { className: "numbers", types: ["number", "decimal", "sign"] },
        { className: "operators", types: ["operator", "enter"] }
    ];

    function formatNumber(numString) {
        return new Intl.NumberFormat().format(Number(numString));
    }

    return <section className={"calculator"} onClick={takeInput}>
        <div className={"screen"}>
            <p className="memory-display">M: {formatNumber(memory)}</p>
            <p>{lastVal === '' ? '' : formatNumber(lastVal)} {currentOperation} {formatNumber(currentVal)}</p>
        </div>
        <div className={"buttons"}>
        {ulGroups.map(group => (
            <ul key={group.className} className={group.className}>
            {calculatorButtons.filter(item => group.types.includes(item.type)).map(item => (
                <li key={item.text} className={item.className}>
                    <button data-value={item.value}>{item.text}</button>
                </li>
            ))}
            </ul>
        ))}
        </div>
    </section>
}