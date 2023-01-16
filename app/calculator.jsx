import React from 'react';


export class Calculator extends React.Component{
    constructor(props){
        super(props);
        console.log("My props",props);
        this.state={fig1:props.fig1 || 0,fig2:props.fig2 || 0};
    }

    valueChanged(ev){
        this.setState({[ev.target.id]:Number(ev.target.value)});
    }

    render(){
        return <div>
            <h2>Calculator</h2>
            <input id="fig1" onChange={ev => this.valueChanged(ev)} value={this.state.fig1}/> 
            + 
            <input id="fig2" onChange={ev => this.valueChanged(ev)} value={this.state.fig2} /> 
            = 
            {this.state.fig1+this.state.fig2}
        </div>
    }
}