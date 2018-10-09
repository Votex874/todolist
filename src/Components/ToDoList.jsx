import React, { Component } from 'react';
import ToDoTask from './ToDoTask'
import './ToDoList.css';
import '../../node_modules/font-awesome/css/font-awesome.css';

class ToDoList extends Component {
    constructor(props) {
        super(props);

        let localTasks = [];
        let tasks = [];
        if (localStorage.tasks === undefined){
            localStorage.setItem('tasks', JSON.stringify(localTasks))
        }else {
            tasks = JSON.parse(localStorage.tasks);
        }
        let falseArray = this.createFalseArray(tasks);
        let importantArray = this.createFalseArray(tasks);
        let displayTooltip = {
            visibility: 'hidden',
        };
        let inputStyle = {
            borderBottom: 'none',
        };
        let display = 'none';


        this.state = {
            value: '',
            tasks,
            localTasks,
            falseArray,
            importantArray,
            inputStyle,
            displayTooltip,
            display,
            date: new Date(),
        };
    }

    creatingTasks = () => {
        //mapowanie tablicy z zadaniami oraz przeslanie danego argumentu z tablicy falseArray jako props

        const {tasks,falseArray,importantArray} = this.state;
        const falseTaskArray = [...falseArray];
        const falseImportantArray = [...importantArray];

        const modifyTasks = tasks.map((element,index) =>{
            return (
                <ToDoTask
                    onDone={this.handleDone}
                    onDelete={this.handleDeleteTask}
                    onUrgent={this.handleUrgent}
                    key={index}
                    element={element}
                    tasks={this.state.tasks}
                    done={falseTaskArray[index]}
                    urgent={falseImportantArray[index]}
                />
            );
        });

        return modifyTasks;


    };

    createFalseArray = tasks =>{
        //tworzy tablice z pustymi elementami które potem beda zmieniane na
        //done jako klase dla danego li-ka
        let arrayCheck = [];
            for(let i = 0; i <= tasks.length; i++){
                arrayCheck.push(false)
            }
        return arrayCheck;
    };

    saveTasksToLocalStorage = () => {
        //dodanie tasków do local storage

            const newValue = this.state.value;
            const localTasks = [newValue,...this.state.tasks];
            localStorage.setItem('tasks', JSON.stringify(localTasks));
    };

    handleInput = event => {
        // pobiera wartosc aktualna wpisywaną w inputa
        if(this.state.tasks.length >= 8){
            this.setState({
                inputStyle: {
                    borderBottom: '2px solid red',
                },
            })
        }else{
            this.setState({
                inputStyle: {
                    borderBottom: '',
                }
            })
        }
        this.setState({
            value: event.target.value.substr(0, 80),
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const {value, tasks, falseArray,importantArray} = this.state;
        if(tasks.indexOf(value) === -1 && this.state.tasks.length < 8) {
            //dodanie nowego zadania z inputa do tablicy zadań

            const newValue = value;
            const currentTasks = [...tasks];
            const fArray = [...falseArray];
            const iArray = [...importantArray];

            this.saveTasksToLocalStorage();

            this.setState({
                value: '',
                tasks: [newValue, ...currentTasks],
                falseArray: [false, ...fArray],
                importantArray: [false, ...iArray],
            });
        }
    };

    handleDeleteTask = index => {
        //pobranie z buttona indexu nastepnie usuniece go z tablicy
        // tasków oraz zaaktualizowanie localStorage
        const {tasks,falseArray, importantArray} = this.state;

        const tasksArray = [...tasks];
        const falArray = [...falseArray];
        const impArray = [...importantArray];
        tasksArray.splice(index, 1);
        falArray.splice(index, 1);
        impArray.splice(index, 1);


        this.setState({
            tasks: tasksArray,
            falseArray: falArray,
            importantArray: impArray,
            inputStyle: {
                borderBottom: '',
            }
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
        }};

    handleReset = () => {
      const emptyArray = [];
      localStorage.setItem('tasks', JSON.stringify(emptyArray));

      this.setState({
          tasks: emptyArray,
          inputStyle: {
              borderBottom: '',
          }
      })

    };

    handleEnterToolTip = () => {
      this.setState({
          displayTooltip: {
              visibility: 'visible',
          }
      })
    };

    handleLeaveToolTip = () => {
        this.setState({
            displayTooltip: {
                visibility: 'hidden',
            }
        })
    };




    render() {
        const {inputStyle, value, tasks,displayTooltip} = this.state;



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
                        <input
                            type="text"
                            style={inputStyle}
                            value={value}
                            onChange={this.handleInput}
                            placeholder='dodaj swoje zadanie'/>
                        <input
                            type="submit"
                            value='Dodaj' />
                        <div className='count'
                            onClick={this.handleReset}
                            onMouseEnter={this.handleEnterToolTip}
                            onMouseLeave={this.handleLeaveToolTip}
                            >{tasks.length} / 8
                        </div>
                        <div
                            className='tooltip'
                            style={displayTooltip}
                            >
                            Kliknij aby usunąć wszystkie zadania
                        </div>
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
