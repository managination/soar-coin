import {Meteor} from "meteor/meteor";
import {render} from "react-dom";
import React from "react";

import maintoolbar from "../App/ui/toolbar";
import BottomNavigation from '../App/ui/bottombar'


Meteor.startup(() => {
    const maintoolbar = function () {
        render(
            <maintoolbar />, document.getElementById('render-target')
        );
    };

    const BottomNavigation = function () {
        render(
            <BottomNavigation/>, document.getElementById('render-bottom')
        );

    };
    maintoolbar();
    BottomNavigation();
});