import React from 'react';
import {render} from "react-dom";

import card from './card';
import historic from './historic';
import toolbar from './toolbar';


export default class MainToolbar extends React.PureComponent {

    constructor(props) {
        super(props);
    };

    render() {
        return(
           <div className="container">
                <toolbar/>
                <card/>
               <historic/>
           </div>
        )
    };
}
