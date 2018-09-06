import React, { Component } from 'react';
import ToDoTask from './ToDoTask'
import './ToDoList.css';

class ToDoList extends Component {
    constructor(props){
        super(props);

        let localTasks = [];
        let tasks = JSON.parse(localStorage.tasks);
        let falseArray = this.createFalseArray(tasks);
        let importantArray = this.createFalseArray(tasks);

        this.state = {
            value: '',
            tasks,
            localTasks,
            falseArray,
            importantArray,
        }
    }

    creatingTasks = () => {
        //mapowanie tablicy z zadaniami oraz przeslanie danego argumentu z tablicy falseArray jako props
        const {tasks,falseArray} = this.state;
        const falseTaskArray = [...falseArray];


        const modifyTasks = tasks.map((element,index) =>{
            return (
                <ToDoTask
                    onDone={this.handleDone}
                    onDelete={this.handleDeleteTask}
                    onUrgent={this.handleUrgent}
                    key={index}
                    element={element}
                    tasks={this.state.tasks}
                    deleted={falseTaskArray[index]}

                />
            );
        });

        return modifyTasks;

    };

    createFalseArray = tasks =>{
        //tworzy tablice z pustymi elementami które potem beda zmieniane na
        //done jako klase dla danego li-ka
        let arrayCheck = [];

        for(let i = 0; i < tasks.length; i++){
            arrayCheck.push(false)
        }
        return arrayCheck;
    };

    saveTasksToLocalStorage = () => {
        //dodanie tasków do local storage

        const newValue = this.state.value;
        const localTasks = [...this.state.tasks];
        localTasks.push(newValue);
        localStorage.setItem('tasks', JSON.stringify(localTasks));
    };

    handleInput = event => {
        // pobiera wartosc aktualna wpisywaną w inputa
        this.setState({
            value: event.target.value.substr(0, 80),
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {value, tasks} = this.state;
        //dodanie nowego zadania z inputa do tablicy zadań

        const newValue = value;
        const currentTasks = [...tasks];

        this.saveTasksToLocalStorage();

        this.setState({
            value: '',
            tasks: [newValue, ...currentTasks],
        });

    };

    handleDeleteTask = index => {
        //pobranie z buttona indexu nastepnie usuniece go z tablicy
        // tasków oraz zaaktualizowanie localStorage
        const {tasks} = this.state;

        const tasksArray = [...tasks];
        tasksArray.splice(index, 1);
        this.setState({
            tasks: tasksArray,
        });

        localStorage.setItem('tasks', JSON.stringify(tasksArray))
    };

    handleDone = index => {
        //zmiana watosci w tablicy na podstawie indexu przeslanego przez click na wazne
        const falseArray = [...this.state.falseArray];

        if(falseArray[index] === false) {
            falseArray[index] = true;
            this.setState({
                falseArray,
            })
        }else{
            falseArray[index] = false;
            this.setState({
                falseArray,
            })
        }
        return console.log(falseArray)
    };

    handleUrgent = index => {
        const importantArray = [...this.state.importantArray];

        if(importantArray[index] === false) {
            importantArray[index] = true;
            this.setState({
                importantArray,
            })
        }else{
            importantArray[index] = false;
            this.setState({
                importantArray,
            })
        }
        return console.log(importantArray)
    };


    render() {
        return (
            <div className="container">
                <div className="logo">
                    <div className="word">
                        <div className="letter">T</div>
                        <div className="letter">O</div>
                    </div>
                    <div className="word">
                        <div className="letter">D</div>
                        <div className="letter">O</div>
                    </div>
                </div>
                <div className='listContainer'>
                    <form action="" onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.value} onChange={this.handleInput} placeholder='dodaj swoje zadanie'/>
                        <input type="submit" value='Dodaj'/>
                    </form>
                    <ul>
                        {this.creatingTasks()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ToDoList;
