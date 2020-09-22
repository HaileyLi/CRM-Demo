
import React from 'react';
import { Window } from '@progress/kendo-react-dialogs';
import Customer from '../Customer/Customer.jsx';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }




    render() {
        return (
            <div>
                <Window
                    title={this.props.data.name + "的客户资料"}
                    onClose={this.props.toggleDialog} initialHeight={350}
                    initialHeight={700}
                    initialWidth={1250}
                >
                    <form className="k-form">
                        <Customer
                            data={this.state.data}
                            saveCustomers={this.props.saveCustomers}
                            customers={this.props.customers}
                        />
                    </form>
                </Window>
            </div>
        );
    }
}


export default Modal;
