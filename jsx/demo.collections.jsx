import React from 'react';

const cars=[
    {id:1,make:'Volvo',model:'V40'},
    {id:2,make:'Toyota',model:'Auris'}
];

const CarRow=({car}) => <tr><td>{car.make}</td><td>{car.model}</td></tr>

export class CarList extends React.Component{
    constructor(props){
        super(props);
        this.state={cars};
    }

    render(){
        let rows=this.state.cars.map(c => <CarRow key={c.id} car={c} />);
        return <table className="table"><tbody>{rows}</tbody></table>;
    }
}