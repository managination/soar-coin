import React from 'react';
import CardUI from './CardUI';
import ToolbarUI from './ToolbarUI';
import HistoricUI from './HistoricUI';
import RegisterUI from './RegisterUI';

const userData = {
    username: "TestUsername",
    balance: 1000,
    address: 'e4be78fb91bd0fcbedc81a3d213d5e64',
    historic:
        [
            {
                inOut: "in",
                amount: 20,
                otherAddress: '0826865d84d5047a82f55c952bf6db53',
            },

            {
                inOut: "out",
                amount: 15,
                otherAddress: '0826865d84d5047a82f55c952bf6db53',

            },


        ],

};


export default class MainWindow extends React.PureComponent {
    constructor(props) {
        super(props);
    };



    render() {

            return(
                <div className="container">
                    <ToolbarUI username={userData.username}/>
                    {/*<ToolbarUI username={userData.username}/>*/}
                    <CardUI sendOrReceive={1} user={userData}/>
                    <HistoricUI historic={userData.historic}/>
                    <RegisterUI open={true}/>
                </div>
            );





    };
}
