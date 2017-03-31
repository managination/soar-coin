import React, {PureComponent, PropTypes} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import VerticAlalignTop from 'material-ui/svg-icons/editor/vertical-align-top';
import VerticAlalignBottom from 'material-ui/svg-icons/editor/vertical-align-bottom';
import InfoOutLine from 'material-ui/svg-icons/action/info-outline';


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

export default class HistoricUI extends React.PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            selectable: true,
            showCheckboxes: false,
        };
    }




    render() {

        let iconHistoric;
        if (this.props.historic.inOut === "in"){
            iconHistoric=<VerticAlalignBottom/>
        }else {
            iconHistoric=<VerticAlalignTop/>
        }

        return (
            <Table selectable={false}>
                <TableBody
                    displayRowCheckbox={false}
                >
                    {this.props.historic.map( (row, index) => (
                        <TableRow key={index}>
                            <TableRowColumn>{row.inOut}</TableRowColumn>
                            <TableRowColumn style={styles.center}>
                                {row.amount} <br/>
                                {row.otherAddress}

                            </TableRowColumn>
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

};

HistoricUI.propTypes = {
    historic: PropTypes.any,


};