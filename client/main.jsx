import {Meteor} from "meteor/meteor";
import {render} from "react-dom";
import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin"

import maintoolbar from "../imports/ui/toolbar";
//import BottomNavigation from '../imports/ui/bottombar'
const App = () => (
    <MuiThemeProvider>
        <maintoolbar/>
    </MuiThemeProvider>
);

Meteor.startup(() => {
    const renderToolbar = function () {
        injectTapEventPlugin();
        render(
            <App/>, document.getElementById('render-target')
        );
    };
    renderToolbar();
});