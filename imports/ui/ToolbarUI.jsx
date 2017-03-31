import React, {PureComponent, PropTypes} from "react";

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import VerticAlalignTop from 'material-ui/svg-icons/editor/vertical-align-top';
import VerticAlalignBottom from 'material-ui/svg-icons/editor/vertical-align-bottom';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from 'material-ui/Toolbar';
import Home from 'material-ui/svg-icons/action/home';



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
};

export default class ToolbarUI extends React.PureComponent {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this)
    };

    handleChange (value) { this.setState({value});};


    render() {
            return(
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <ToolbarTitle text="Soar-Coin"/>
                        <IconButton iconStyle={styles.mediumIcon} style={styles.medium}>
                            <Home onClick={this.handleChange(0)} />
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
                           <ToolbarTitle text={this.props.username}/>
                        <ToolbarSeparator />
                        <FontIcon className="muidocs-icon-custom-sort"/>
                        <IconMenu
                            iconButtonElement={
                                <IconButton touch={true}>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                        >
                            <MenuItem onClick={this.handleChange(1)} primaryText="Copy address"/>
                            <MenuItem onClick={this.handleChange(2)} primaryText="Copy Mnemonic"/>
                        </IconMenu>
                    </ToolbarGroup>
                </Toolbar>


            );

        };


};


ToolbarUI.propTypes = {
    username: PropTypes.string,

};
