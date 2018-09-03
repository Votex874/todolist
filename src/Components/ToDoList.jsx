import React, { Component } from 'react';

import './ToDoList.css';

class ToDoList extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: '',
        }
    }

    handleInput = event => {
        this.setState({
            value: event.target.value,
        })
    };

    handleSubmit = event => {
      event.preventDefault();

      

    };

    render() {
        return (
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleInput}/>
                    <input type="submit" value='Dodaj'/>
                </form>
            </div>
        );
    }
}

export default ToDoList;
