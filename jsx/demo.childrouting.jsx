import React from 'react';
import {Link,Routes,Route, useParams} from 'react-router-dom';

const BasicChild = () => <div>Just basic information</div>
const ExtraChild = () => <div>Some extra information</div>


export class ChildRoutingOrig extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }

    render(){
        let id=this.props.params.id;
        return <div><h3>Child routing</h3>
            <div>
                <Link to="">Basic </Link>
                <Link to='extra'>Extra </Link>
            </div>
            <p>Got parameter {id}!</p>
            <Routes>
                <Route exact path="" element={<BasicChild />} />,
                <Route path="extra" element={<ExtraChild />} />,    
            </Routes>
        </div>
    }
}

export const ChildRouting=() => {

    return <ChildRoutingOrig params={useParams()} />
}