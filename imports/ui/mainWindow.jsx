import React from 'react';


//import card
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Camera from 'material-ui/svg-icons/image/camera-alt';
import TextField from 'material-ui/TextField';

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
import Home from 'material-ui/svg-icons/action/home';
//import historic
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

//import Snackbar
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';


//QR code
//var ReactDOM = require('react-dom');
//let QRCode = require('qrcode-react');
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

//data for historic

let address = '353d2e756f5db18d0fdbc34c4736a514';
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
        this.state = {
            value: 3,
            sendOrReceive: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
        this.handleRequestClose= this.handleRequestClose.bind(this);
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

    handleClick(sendOrReceive){
      this.setState({sendOrReceive})

    };

    //renders
    renderToolbar() {
        return(
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle text="Soar-Coin"/>
                    <IconButton iconStyle={styles.mediumIcon} style={styles.medium}>
                        <Home onClick={() => this.handleClick(0)}/>
                    </IconButton>
                </ToolbarGroup>

                <ToolbarGroup>
                    <IconButton  iconStyle={styles.mediumIcon} style={styles.medium}>
                        <VerticAlalignBottom onClick={() => this.handleClick(1)}/>
                    </IconButton>

                    <IconButton  iconStyle={styles.mediumIcon} style={styles.medium}>
                        <VerticAlalignTop onClick={() =>this.handleClick(2)}/>
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
                        <MenuItem onClick={this.handleTouchTap} primaryText="Copy address"/>
                        <MenuItem onClick={this.handleTouchTap} primaryText="Copy Mnemonic"/>
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
        let sendOrReceive= this.state.sendOrReceive;

        switch(sendOrReceive) {
            case 1:
                //send
                return(
                    <Card>
                        <Table  style={{ tableLayout: 'auto' }} fixedHeader={false} selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    <TableRowColumn visible={false} style={styles.center}>
                                        <QRCode size="48" value="http://facebook.github.io/react/"/>
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <CardText style={styles.center}>
                                            Name surname <br/>
                                            1000 SOAR = 100 CHF

                                        </CardText>
                                    </TableRowColumn>
                                </TableRow>

                                <TableRow>
                                    <TableRowColumn>
                                        <IconButton iconStyle={styles.mediumIcon} style={styles.medium}>
                                            <QRCode size="48" value="http://facebook.github.io/react/" />
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
                            </TableBody>
                        </Table>
                    </Card>
                );
                break;
            case 2:
                //receive
                return(
                    <Card>
                        <Table  style={{ tableLayout: 'auto' }} fixedHeader={false} selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    <TableRowColumn style={styles.center}>
                                        <QRCode  size="48" value="http://facebook.github.io/react/"/>
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <CardText style={styles.center}>
                                            Name surname <br/>
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


                            </TableBody>
                        </Table>
                    </Card>
                );
                break;
            case 0:
                //home screen
                return(
                    <Card>
                        <Table  style={{ tableLayout: 'auto' }} fixedHeader={false} selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                <TableRow>
                                    <TableRowColumn style={styles.center}>
                                        <QRCode size="48" value="http://facebook.github.io/react/"/>
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <CardText style={styles.left}>
                                            Name Surname <br/>
                                            1000 SOAR = 100 CHF

                                        </CardText>
                                    </TableRowColumn>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                );
        }


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
