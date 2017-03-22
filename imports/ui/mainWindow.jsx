import React from 'react';
import {render} from "react-dom";

import card from './card';
import historic from './historic';
import toolbar from './toolbar';


const CompHistoric = function () {
    render(
        <historic /> ,document.getElementById('render-target')
    );
};

const CompCard = function () {
    render(
        <card />, document.getElementById('render-target')
    );
};

const CompToolbar = function () {
    render(
        <toolbar />, document.getElementById('render-target')
    );
};


export default class MainToolbar extends React.PureComponent {

    constructor(props) {
        super(props);
    };


    render() {
        return(
           <div className="container">
                <CompToolbar/>
                <CompCard/>
               <CompHistoric/>
           </div>

        )
    };
}
