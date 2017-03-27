import React from 'react';


//import card
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

//import toolbar
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import VerticAlalignTop from 'material-ui/svg-icons/editor/vertical-align-top';
import VerticAlalignBottom from 'material-ui/svg-icons/editor/vertical-align-bottom';
import InfoOutLine from 'material-ui/svg-icons/action/info-outline';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import Camera from 'material-ui/svg-icons/image/photo';

import TextField from 'material-ui/TextField';

//import historic
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

//import Snackbar
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';


//QR code
//var ReactDOM = require('react-dom');
var QRCode = require('qrcode-react');



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

//data for historic

let address = 'dfgh4j234h234234jh2';
let amount = 123334;

const tableData = [
    {
        inOut: <VerticAlalignTop/>,
        amountAddress: amount+' '+address,
    },

    {
        inOut: <VerticAlalignBottom/>,
        amountAddress: amount+' '+address,

    },


];


export default class MainToolbar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {value: 3, };
        this.handleChange = this.handleChange.bind(this);
    };

    //Change handlers
    handleChange (event, index, value) { this.setState({value});};

    handleTouchTap() {
        this.setState({
            open: true,
        });
    };

    handleRequestClose(){
        this.setState({
            open: false,
        });
    };

    //renders
    renderToolbar() {
        return(
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle text="Soar-Coin"/>
                </ToolbarGroup>

                <ToolbarGroup>
                    <IconButton iconStyle={styles.mediumIcon} style={styles.medium}>
                        <VerticAlalignBottom />
                    </IconButton>

                    <IconButton onClick={this.renderSnackbar()} iconStyle={styles.mediumIcon} style={styles.medium}>
                        <VerticAlalignTop />
                    </IconButton>
                </ToolbarGroup>

                <ToolbarGroup>
                    <FontIcon className="muidocs-icon-custom-sort"/>
                    <IconMenu
                        iconButtonElement={
                            <IconButton touch={true}>
                                <MoreVertIcon />
                            </IconButton>
                        }
                    >
                        <MenuItem primaryText="Copy address"/>
                        <MenuItem primaryText="Copy Mnemonic"/>
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>

        );

    };

    renderHistoric(){

        return(
            <Table selectable={false}>
                <TableBody
                    displayRowCheckbox={false}
                >
                    {tableData.map( (row, index) => (
                        <TableRow key={index}>
                            <TableRowColumn>{row.inOut}</TableRowColumn>
                            <TableRowColumn style={styles.center}>{row.amountAddress}</TableRowColumn>
                            <TableRowColumn style={styles.right}>
                                <iconButton>
                                    <InfoOutLine/>
                                </iconButton>
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        );
    };

    renderCard(){
        return(
            <Card>
                <Table  style={{ tableLayout: 'auto' }} fixedHeader={false} selectable={false}>
                    <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>
                                <CardText style={styles.left}>
                                    Name surname
                                    1000 SOAR = 100 CHF

                                </CardText>
                            </TableRowColumn>
                        </TableRow>

                        <TableRow>
                            <TableRowColumn>
                                <IconButton iconStyle={styles.mediumIcon} style={styles.medium}>
                                    <Camera />
                                </IconButton>
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

                        <TableRow>
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



    renderSnackbar() {
        return (
            <div>
                <RaisedButton
                    onTouchTap={this.handleTouchTap}
                    label="Add to my calendar"
                />
                <Snackbar
                    open={this.state.open}
                    message="Event added to your calendar"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }

    render() {
        return(
            <div className="container">
                {this.renderToolbar()}
                {this.renderCard()}
                {this.renderHistoric()}
            </div>

        )
    };
}
