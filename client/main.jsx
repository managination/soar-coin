import {Meteor} from "meteor/meteor";
import {render} from "react-dom";
import React from "react";
import AppBar from 'material-ui/AppBar';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainToolbar from "../imports/ui/toolbar";

const App = () => (
    <MuiThemeProvider>
        <MainToolbar/>
    </MuiThemeProvider>
);


Meteor.startup(() => {
    const renderMe = function () {
        injectTapEventPlugin();
        render(
            <App/>, document.getElementById('render-target')
        );
    };

    renderMe();
});