import React from "react";
import './CustomerList.css';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';

import Modal from "./Modal.jsx";


class CustomerList extends React.Component {
    state = this.createAppState({
        skip: 0,
        take: 100,
        group: [
            { field: 'status' }
        ],
        visible: true
    });

    toggleDialog = (e) => {
        this.setState({
            result: process(this.props.customers, this.state),
            dataState: {
                skip: 0,
                take: 100,
                group: [],
                visible: true
            }
        })
        this.setState({
            visible: !this.state.visible,
            data: e.dataItem
        });
    }


    render() {
        return (
            <div className="content-container">
                <h1>我的客户列表</h1>
                <Grid
                    style={{ height: '520px' }}
                    filterable={false}
                    sortable={true}
                    groupable={{ footer: 'visible' }}

                    data={this.state.result}

                    {...this.state.dataState}
                    onDataStateChange={this.dataStateChange}

                    onExpandChange={this.expandChange}
                    expandField="expanded"

                    onRowClick={(e) => this.toggleDialog(e)}
                >
                    <Column field="name" title="姓名" />
                    <Column field="status" title="状态" />
                    <Column field="serviceDetail" title="服务" />
                </Grid>
                {this.state.visible &&
                    <Modal
                        toggleDialog={this.toggleDialog}
                        data={this.state.data}
                        saveCustomers={this.props.saveCustomers}
                        customers={this.props.customers}
                    />}
            </div>
        );
    }

    createAppState(dataState) {
        return {
            result: process(this.props.customers, dataState),
            dataState: dataState
        };
    }

    dataStateChange = (event) => {
        this.setState(this.createAppState(event.data));
    }

    expandChange = (event) => {
        event.dataItem[event.target.props.expandField] = event.value;
        this.setState({
            result: Object.assign({}, this.state.result),
            dataState: this.state.dataState
        });
    }



}

export default CustomerList;
