import {Meteor} from "meteor/meteor";
import {render} from "react-dom";
import {renderRoutes} from "./router";
import React from "react";
import BigNumber from "bignumber.js";
import CryptoJS from "crypto-js";
import * as LocalStorage from "meteor/simply:reactive-local-storage";
import Wait from "../imports/components/wait";
import DelayNotification from "../imports/components/delayNotification";
import GetPassword from "../imports/components/forms/confirm-transaction";
import {initializeKeystore} from "../imports/api/ethereum-services";
import {Globals} from "../imports/api/model/globals";
import {Profiles} from "../imports/api/model/profiles";

/*if (!window.console) {
    window.console = {
        log: function () {
            //do nothing this is just for IE
        }
    }
}*/

Meteor.startup(() => {
    let mnemonic = LocalStorage.getItem('encrypted-mnemonic');
    BigNumber.config({ERRORS: false});
    const waitMessage = function () {
        render(
            <Wait visible={true}/>, document.getElementById('render-target')
        );
    };
    const createKeystore = function (password) {
        waitMessage();
        initializeKeystore(password).then((keystore) => {
            Session.set('initialized', true);
            Meteor.subscribe('current-profile', (err) => {
                let profile = Profiles.findOne({owner: Meteor.userId()});
                let userNum = 0;
                if (profile) {
                    userNum = profile.userNum;
                }
                if (userNum > Globals.findOne({name: 'user-count'}).max)
                    render(
                        <DelayNotification/>, document.getElementById('render-target')
                    );
                else
                    render(renderRoutes(),
                        document.getElementById('render-target'));
            })
        })

    };

    const confirm = function (password) {
        let correctPassword = false;
        try {
            correctPassword = password && CryptoJS.AES.decrypt(mnemonic, password).toString(CryptoJS.enc.Utf8).length > 1;
        } catch (err) {
            correctPassword = false;
        }

        if (correctPassword) {
            createKeystore(password);
        } else {
            let title;
            title = "Enter the password to unlock your keystore";
            if (password)
                title = "Wrong password, please enter the correct password to unlock your keystore";

            render(
                <GetPassword visible={true} confirm={confirm} title={title} passwordOnly={true}/>,
                document.getElementById('render-target')
            );
        }
    };

    waitMessage();
    Meteor.subscribe('globals', () => {
        if (mnemonic) {
            confirm(Meteor.settings.public.password);
        } else {
            createKeystore();
        }
    })

});