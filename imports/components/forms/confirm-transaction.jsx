import * as LocalStorage from "meteor/simply:reactive-local-storage";
import CryptoJS from "crypto-js";
import React, {PureComponent, PropTypes} from "react";
import {createContainer} from "meteor/react-meteor-data";
import Dialog from "react-md/lib/Dialogs";
import Toolbar from "react-md/lib/Toolbars";
import TextField from "react-md/lib/TextFields";
import Button from "react-md/lib/Buttons";

export default class TransactionConfirmationOverlay extends PureComponent {
    constructor(props) {
        super(props);
        this.mnemonic = null;
        this.state = {pageX: 1, pageY: 1, ksPassword: ''};
        this._handleChange = this._handleChange.bind(this);
        this._verifyPassword = this._verifyPassword.bind(this);
    }

    componentWillReceiveProps() {
        this._confirm = this.props.confirm;
        this._cancel = this.props.cancel;
    };

    _verifyPassword() {
        if (this.props.passwordOnly) return true;

        if (!this.mnemonic) {
            this.mnemonic = LocalStorage.getItem('encrypted-mnemonic');
        }
        let correctPassword = false;
        try {
            correctPassword = CryptoJS.AES.decrypt(this.mnemonic, this.state.ksPassword).toString(CryptoJS.enc.Utf8).length > 1;
        } catch (err) {
            correctPassword = false;
        }

        return correctPassword;
    };

    _handleChange(value, event) {
        let change = {};
        change[event["target"].id] = value;
        this.setState(change);
    };

    render() {
        const {visible, cost, balance} = this.props;
        const title = this.props.title || "Please confirm or cancel this transaction";
        let cancelButton = null;
        if(this.props.passwordOnly){
            cancelButton = <Button style={{marginLeft: 20}}
                                   className={this.props.cancel ? '' : 'hidden'}
                                   id="cancel"
                                   secondary raised
                                   label="Cancel"
                                   onClick={this.props.cancel}
            >cancel</Button>
        }

        return (
            <Dialog
                id="RegistrationConfirmationOverlay"
                visible={visible}
                fullPage
                aria-label="dialogLabel"
                focusOnMount={false}
            >
                <Toolbar
                    colored
                    title={title}
                    fixed
                />
                <form className="md-toolbar-relative md-grid" onSubmit={(e) => e.preventDefault()}>
                    <div className={this.props.passwordOnly ? "hidden" : "md-cell--12"}>
                        <h1>Transaction costs {cost} ETH your balance is {balance} ETH</h1>
                    </div>
                    <TextField
                        id="ksPassword"
                        label="password"
                        placeholder=""
                        customSize="title"
                        className="md-cell md-cell--12"
                        required
                        onChange={this._handleChange}
                        type="password"
                    />
                    <Button id="confirm"
                            primary raised
                            label="Confirm"
                            disabled={!this._verifyPassword()}
                            onClick={() => this.props.confirm(this.state.ksPassword)}
                    >done</Button>
                    {cancelButton}

                </form>
            </Dialog>
        );
    }
}

TransactionConfirmationOverlay.propTypes = {
    cost: PropTypes.number,
    balance: PropTypes.number,
    confirm: PropTypes.func,
    cancel: PropTypes.func,
    title: PropTypes.string,
    passwordOnly: PropTypes.bool,
};
