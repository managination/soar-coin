import React, {PureComponent, PropTypes} from "react";

//import card
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Camera from 'material-ui/svg-icons/image/camera-alt';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


//QR code
let QRCode = require('qrcode.react');

//styles
const styles = {
    mediumIcon: {
        width: 48,
        height: 48,
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24,
    },
    right: {
        float: 'right',
        textAlign: 'right',
    },

    center: {
        float: 'center',
        textAlign: 'center',
    },

    left: {
        float: 'left',
        textAlign: 'left',
    },
};

export default class CardUI extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sendOrReceive: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    };

//Change handlers
    handleChange(value) {
        this.setState({value});
    };

    handleTouchTap() {
        this.setState({
            open: true,
        });
    };

    handleRequestClose() {
        this.setState({
            open: false,
        });
    };

    handleClick(sendOrReceive) {
        this.setState({sendOrReceive})

    };

    render() {

        let sendOrReceive = this.props.sendOrReceive;
        let icon;
        let display;
        let username = this.props.user.username;
        let balance = this.props.user.balance;
        let address = this.props.user.address;

        switch (sendOrReceive) {
            case 1:
                icon =
                    <IconButton iconStyle={styles.mediumIcon} style={styles.medium}>
                        <QRCode size="48" value={address}/>
                    </IconButton>;
                break;
            case 2:
                icon =
                    <IconButton iconStyle={styles.mediumIcon} style={styles.medium}>
                        <Camera/>
                    </IconButton>;
                break;
            default:
                icon = null;
                display = {display: "none"};
                break;
        }
        return (
            <Card>
                <Table style={{tableLayout: 'auto'}} fixedHeader={false} selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn style={styles.center}>
                                {icon}
                            </TableRowColumn>
                            <TableRowColumn>
                                <CardText style={styles.center}>
                                    {username} <br/>
                                    {balance} SOAR = 100 CHF
                                </CardText>
                            </TableRowColumn>
                        </TableRow>

                        <TableRow>
                            <TableRowColumn>
                                {this.icon}
                            </TableRowColumn>

                            <TableRowColumn>
                                <CardText style={styles.left}>
                                    Amount to transfer
                                    <br />
                                    <TextField
                                        hintText="1'000"
                                    /><br />
                                </CardText>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        );


    };

};

CardUI.propTypes = {
    sendOrReceive: PropTypes.number,
    user: PropTypes.any,

};