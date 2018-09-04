import React, { Component } from 'react';
import './ToDoTask.css';

class ToDoTask extends Component {

    handleImportant = index =>{
        if (typeof this.props.onImportant === 'function'){
            this.props.onImportant(index)
        }
    };
    handleDeleteTask = index => {
        if (typeof this.props.onDelete === 'function'){
            this.props.onDelete(index)
        }
    };


    settingStyle = () =>{
        //na podstawie propsa podawanego zmienia styl danego li

        let styleTask;
        if(this.props.deleted){
            styleTask = {
                color: 'red',
                textDecoration: 'underline',
            }}
        else{
            styleTask = {
                color: 'blue',
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
                <button onClick={() => this.handleImportant(tasks.indexOf(element))}>Ważne</button>
                <button onClick={() => this.handleDeleteTask(tasks.indexOf(element))}>Usuń</button>
            </div>
        );
    }
}

export default ToDoTask;
