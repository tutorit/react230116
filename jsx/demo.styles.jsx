import React from 'react';
import Transition from 'react-transition-group/Transition';

const duration = 1000;  //ms

const baseStyle = {
  transition: `all ${duration}ms ease-in-out`,
  padding: 10,
  border: '1px solid black',
  borderRadius: '10px',
  backgroundColor: '#a0c0f0'
}

const transitionStyles = {
    entering: { color:'white',fontStyle:'italic',transform:'scale(1.0)' },
    entered: { color:'white',transform:'scale(1.0)' },
    exiting: { color:'green',fontStyle:'italic',transform:'scale(0.5)' },
    exited: { color:'green',transform:'scale(0.5)' },
};


const TransitionDemo = ({ in: inProp }) => {
    console.log("Inprop ",inProp);
	return <Transition in={inProp} timeout={duration}>
		{(state) => {
            console.log(state);
            var st=Object.assign({},baseStyle,transitionStyles[state]);
            console.log(st);
            return <div style={st}>
				Some transitions here!!!
			</div>}
		}
	</Transition>
};

export class StylesDemo extends React.Component {
    constructor(props){
        super(props);
        this.state={styles:{color:'red',cursor:'pointer'},visible:true};
        this.clicked=this.clicked.bind(this);
    }

    clicked(){
        var c=this.state.styles.color;
        c=c=='red' ? 'blue' : 'red' ;
		var vis=!this.state.visible;
        this.setState({styles:{color:c,cursor:'pointer'},visible:vis});
    }

    render(){
        var spread={style:{color:'green',border:'1px solid black'}}
        return <div>
			<p onClick={this.clicked} style={this.state.styles}>Click me</p>
            <Transition in={!!this.state.visible} timeout={duration}>
		        {(state) => <div style={baseStyle}>
				    No transition, just display state {state}
			    </div>
		        }
	        </Transition>
			<TransitionDemo in={!!this.state.visible} />	
        </div>
    }
}

