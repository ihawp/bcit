import { useState } from 'react';
import { calculatorButtons } from './calculator-bonus-03-button-data.js';
import './Calculator.css';

export default function Calculator() {

    // Current Operation
    const [currentVal, setCurrentVal] = useState('0');
    const [lastVal, setLastVal] = useState('');
    const [currentOperation, setCurrentOperation] = useState('');
    const [operationHappening, setOperationHappening] = useState(false);

    // Memory
    const [memory, setMemory] = useState('0');

    const calculate = () => {

        let result;

        switch (currentOperation) {
            case '*':
                result = String(Number(lastVal) * Number(currentVal));
                break;
            case '/':
                result = String(Number(lastVal) / Number(currentVal));
                break;
            case '+':
                result = String(Number(lastVal) + Number(currentVal));
                break;
            case '-':
                result = String(Number(lastVal) - Number(currentVal));
                break;
        }

        if (result === 'Infinity' || result === 'NaN') {
            setCurrentVal(0);
            alert('Invalid Operation!!');
        } else {
            setCurrentVal(result);
        }

        setCurrentOperation('');
        setLastVal('');
    }

    const addToCurrentVal = (val) => {
        if (currentVal === '0') {
            setCurrentVal(val);
        } else {
            setCurrentVal(currentVal + val);
        }
    }

    const updateCurrentOperation = (operator) => {
        if (!operationHappening) {
            setLastVal(currentVal);
            setCurrentVal('0');
            setCurrentOperation(operator);
            setOperationHappening(true);       
        }
    }

    const takeInput = (event) => {

        if (!event.target.dataset.value) return;

        switch (event.target.dataset.value) {
            case 'All Clear':
                setCurrentVal('0');
                setLastVal('');
                setCurrentOperation('');
                setMemory('0');
                setOperationHappening(false);
                break;
            case 'Clear':
                setCurrentVal('0');
                break;
            case 'Clear Entry':
                let q = currentVal.slice(0, currentVal.length - 1);
                if (q.length === 0) {
                    return setCurrentVal('0');
                }
                setCurrentVal(q);
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
                setOperationHappening(false);
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
                let check = currentVal.includes('.');
                if (!check) {
                    addToCurrentVal('.');
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

    return <section className={"calculator"}>
        <div className={"screen"}>
            <p className="memory-display">M: {memory}</p>
            <p>{lastVal === '' ? '' : lastVal} {currentOperation} {currentVal}</p>
        </div>
        <div className={"buttons"} onClick={takeInput}>
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