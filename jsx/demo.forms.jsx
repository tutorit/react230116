import React from 'react';

const RadioGroup = ({items,selected, onChange}) => {
    var itemInputs=items.map(i => <div key={i.value}>
        <input type="radio" 
                checked={i.value==selected} 
                onChange={()=>onChange(i.value)} />
        {i.title}
    </div>)
    return <div>{itemInputs}</div>
}

export class FormsDemo extends React.Component{
    constructor(props){
        super(props);
        this.state={controlled:'Hello',uncontrolled:'World',selection:'credit'};
        this.textChanged=this.textChanged.bind(this);
        this.buttonClicked=this.buttonClicked.bind(this);
        this.radioChange=this.radioChange.bind(this);
    }

    textChanged(ev){
        this.setState({controlled:ev.target.value});
    }

    buttonClicked(){
        this.setState({uncontrolled:this.uncontrolled.value});
    }

    radioChange(sel){
        this.setState({selection:sel});
    }

    render(){
        var radioItems=[{title:'Credit',value:'credit'},
            {title:'Bank transfer',value:'transfer'}];
        return <div>
                <input value={this.state.controlled} onChange={this.textChanged} />
                <p>Controlled data: {this.state.controlled}</p>
                <input ref={r => this.uncontrolled=r} defaultValue={this.state.uncontrolled} />
                <p>Uncontrolled data: {this.state.uncontrolled} </p>
                <input type="button" value="Read data" onClick={this.buttonClicked} />
                <RadioGroup items={radioItems} selected={this.state.selection} onChange={this.radioChange} />
                <p>Selected radio {this.state.selection}</p>
            </div>
    }
}