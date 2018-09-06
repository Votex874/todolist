import React, { Component } from 'react';
import './ToDoTask.css';

class ToDoTask extends Component {

    handleDone = index =>{
        if (typeof this.props.onDone === 'function'){
            this.props.onDone(index)
        }
    };
    handleDeleteTask = index => {
        if (typeof this.props.onDelete === 'function'){
            this.props.onDelete(index)
        }
    };
    handleUrgent = index =>{
        if(typeof this.props.onUrgent === 'function'){
            this.props.onUrgent(index)
        }
    };


    settingStyle = () =>{
        //na podstawie propsa podawanego zmienia styl danego li

        let styleTask;
        if(this.props.done){
            styleTask = {
                transition: '1s',
                opacity: '0.4',
                textDecoration: 'line-through',
            }}
        else if (this.props.urgent){
            styleTask = {
                transition: '0.2s',
                opacity: '1',
                textDecoration: 'underline',
                color: 'red',
            }
        }
        else{
            styleTask = {
                transition: '1s',
                textDecoration: 'none',
            }}
            return styleTask
    };

    render() {
        const {tasks,element} = this.props;
        return (

            <div>
                <li style={this.settingStyle()}>{element}
                </li>
                <button onClick={() => this.handleDone(tasks.indexOf(element))}>Zrobione</button>
                <button onClick={() => this.handleDeleteTask(tasks.indexOf(element))}>Usuń</button>
                <button onClick={() => this.handleUrgent(tasks.indexOf(element))}>Pilne</button>
            </div>
        );
    }
}

export default ToDoTask;
