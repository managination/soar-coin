import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import VerticAlalignTop from 'material-ui/svg-icons/editor/vertical-align-top';
import VerticAlalignBottom from 'material-ui/svg-icons/editor/vertical-align-bottom';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';


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

export default class toolbar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {value: 3, };
        this.handleChange = this.handleChange.bind(this)
    };

    handleChange (event, index, value) { this.setState({value});};



    render() {
        return (
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

};