import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

export class Calculator extends React.Component{
    constructor(props){
        super(props);
        console.log("My props",props);
        this.state={fig1:props.fig1 || 0,fig2:props.fig2 || 0};
        /* if (this.props.onResultChange) */ this.props.onResultChange(this.state.fig1+this.state.fig2);
    }

    valueChanged(ev){
        this.setState({[ev.target.id]:Number(ev.target.value)},function(){
            if (this.props.onResultChange) this.props.onResultChange(this.state.fig1+this.state.fig2);
        });
    }

    render(){
        return <div>
            <h2>Calculator</h2>
            {this.props.children}
            <input id="fig1" onChange={ev => this.valueChanged(ev)} value={this.state.fig1}/> 
            + 
            <input id="fig2" onChange={ev => this.valueChanged(ev)} value={this.state.fig2} /> 
            = 
            {this.state.fig1+this.state.fig2}
        </div>
    }
}
Calculator.defaultProps={fig1:20,fig2:90,onResultChange:() => {}};
Calculator.propTypes={
    fig1:PropTypes.number.isRequired,
    fig2:PropTypes.number.isRequired,
    onResultChange:PropTypes.func.isRequired
}

function FuncCalculator( { fig1=10, fig2=20, onResultChange=() => {} }){
    const [f1,fig1Change]=React.useState(fig1);
    const [f2,fig2Change]=React.useState(fig2);

    console.log("Functio",f1,f2);

    let callback = React.useCallback(() => onResultChange(f1+f2));
    useEffect(callback,[f1,f2]);

    function doChange(cf,val){
        cf(Number(val));
        //callback();
        //onResultChange(fig1+fig2);
    }

    return <div>
        <h2>Func-Calculator</h2>
        <input value={f1} onChange={ev => doChange(fig1Change,ev.target.value)}/>
        +
        <input value={f2} onChange={ev => doChange(fig2Change,ev.target.value)} />
        =
        {f1+f2}
    </div>
}

 class RefCalculator extends React.Component{

    render(){
        return <div>
            <h2>Ref-Calculator</h2>
            <input ref={r => this.f1Ref=r} defaultValue={this.props.fig1}/> 
            +
            <input ref={r => this.f2Ref=r} defaultValue={this.props.fig2} />
            <input type="button" value="=" onClick={() => this.calculateClicked()} />
            <span ref={r => this.rRef=r}>Tulos tähän</span>
        </div>
    }

    calculateClicked(){
        //alert("Nyt lasketaan");
        let f1=Number(this.f1Ref.value);
        let f2=Number(this.f2Ref.value);
        this.rRef.innerText=(f1+f2);
        this.props.onResultChange(f1+f2);
    }
 }
 RefCalculator.defaultProps={fig1:20,fig2:90,onResultChange:() => {}};

export class CalculatorContainer extends React.Component {
    constructor(props){
        super(props);
        this.state={calcResult:0,funcResult:0,refResult:0,show:'basic'};
    }


    calcResultChange(calcResult){
        this.setState({calcResult});
    }

    render(){
        return <div>
            <h3>Container</h3>
            <div>
                <a onClick={() => this.setState({show:'basic'})}>Perus</a>
                <a onClick={() => this.setState({show:'func'})}>Funktio</a>
                <a onClick={() => this.setState({show:'ref'})}>Ref</a>
            </div>
            {
                this.state.show=='func' ? <>
                    <FuncCalculator fig1={2}  onResultChange={funcResult => this.setState({funcResult})} />
                    <p>Func-laskimen tulos {this.state.funcResult}</p>
                </> : this.state.show=='ref' ? <>
                    <RefCalculator fig1={4} fig2={6}  onResultChange={refResult => this.setState({refResult})}/>
                    <p>Ref-laskimen tulos {this.state.refResult}</p>
                </> : <>
                    <Calculator fig1={7}  onResultChange={res => this.calcResultChange(res)}>
                        <p>Teepäs jotain laskentaa</p>    
                    </Calculator>
                    <p>Laskimen tulos {this.state.calcResult}</p>
                </>
            }
        </div>
    }
}