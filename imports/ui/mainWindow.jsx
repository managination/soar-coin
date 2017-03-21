import React from 'react';

//Imports toolbar
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import VerticAlalignTop from 'material-ui/svg-icons/editor/vertical-align-top';
import VerticAlalignBottom from 'material-ui/svg-icons/editor/vertical-align-bottom';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

//imports card
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

//imports historic table
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

//imports sendRecieve
import {Tabs, Tab} from 'material-ui/Tabs';


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};


export default class MainToolbar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {value: 3, };
        this.handleChange = this.handleChange.bind(this)
    };

    handleChange (event, index, value) { this.setState({value});};

    handleExpandChange (expanded) {
        this.setState({expanded: expanded});
    };

    /*    handleToggle (event, toggle) {
     this.setState({expanded: toggle});
     };

     handleExpand() {
     this.setState({expanded: true});
     };

     handleReduce() {
     this.setState({expanded: false});
     };

     */

    renderHistoric(){
        return(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableRowColumn>1</TableRowColumn>
                        <TableRowColumn>John Smith</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>2</TableRowColumn>
                        <TableRowColumn>Randal White</TableRowColumn>
                        <TableRowColumn>Unemployed</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>3</TableRowColumn>
                        <TableRowColumn>Stephanie Sanders</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                    </TableRow>
                    <TableRow>
                        <TableRowColumn>4</TableRowColumn>
                        <TableRowColumn>Steve Brown</TableRowColumn>
                        <TableRowColumn>Employed</TableRowColumn>
                    </TableRow>
                </TableBody>
            </Table>

        );
    };

    renderCard() {
        return (
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

    renderSendRecieve() {
        return(
            <Tabs
                name="SendRecieve"
                classname="SendRecieve"
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab
                    icon={<VerticAlalignTop />}
                    label="send"
                    value="send"
                >
                    <div>

                    </div>
                </Tab>
                <Tab icon={<VerticAlalignBottom />} label="recieve" value="recieve">
                    <div>

                    </div>
                </Tab>
            </Tabs>
        );
    };

    renderToolbar(){
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <ToolbarTitle text="Soar-Coin" />
                </ToolbarGroup>

                <ToolbarGroup>
                    {this.renderSendRecieve()}
                </ToolbarGroup>

                <ToolbarGroup>
                    <FontIcon className="muidocs-icon-custom-sort" />
                    <IconMenu
                        iconButtonElement={
                            <IconButton touch={true}>
                                <MoreVertIcon />
                            </IconButton>
                        }
                    >
                        <MenuItem primaryText="Copy address" />
                        <MenuItem primaryText="Copy Mnemonic" />
                    </IconMenu>
                </ToolbarGroup>


            </Toolbar>

        );
    };

    render() {
        return(
            <div className="container">
                <ul>{this.renderToolbar()}</ul>
                <ul>{this.renderCard()}</ul>
                <ul>{this.renderHistoric()}</ul>
            </div>

        );
    };
}
