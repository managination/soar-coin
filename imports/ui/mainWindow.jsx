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

//import historic
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


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
    infoColumn: {
        float: 'right',
        textAlign: 'right',
    },

    amountAddressColumn: {
        float: 'center',
        textAlign: 'center',
    },
};

//data for historic
const tableData = [
    {
        inOut: <VerticAlalignTop/>,
        amountAddress: '1234567876543 asdfgh4j234h234234jh2',
    },

    {
        inOut: <VerticAlalignBottom/>,
        amountAddress: '1234567876543 asdfgh4j234h234234jh2',

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

                    <IconButton iconStyle={styles.mediumIcon} style={styles.medium}>
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
                            <TableRowColumn style={styles.amountAddressColumn}>{row.amountAddress}</TableRowColumn>
                            <TableRowColumn style={styles.infoColumn}>
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
                <CardHeader
                    title="Without Avatar"
                    subtitle="Subtitle"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardActions>
                    <FlatButton label="Action1" />
                    <FlatButton label="Action2" />
                </CardActions>
                <CardText expandable={true}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
            </Card>

        );

    };


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
