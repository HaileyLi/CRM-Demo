import React from "react";
import './Customer.css';

import ContactHistory from "./ContactHistory";
import CustomerEdit from "./CustomerEdit.jsx";
import CustomerChecklst from "./CustomerChecklst.jsx";
import CustomerStatus from "./CustomerStatus";
import CustomerNote from "./CustomerNote";
import CustomerCaseNote from "./CustomerCaseNote";

import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import axios from 'axios'


class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }

    handleSelect = (e) => {
        this.setState({ selected: e.selected })
    }

    addNewCustomer = (cus) => {
        var newData = this.props.customers
        newData = [...newData, cus]
        this.createCustomer(cus)
            .then(data => {
                this.props.saveCustomers(newData)
            });
    }

    createCustomer = (data) => {
        return axios.post("http://192.168.2.227:8080/api/customers", data)
            .then((res) => {
                return res.data
            })
            .catch(() => {
                console.log("Error")
            })
    }

    render() {

        return (
            <div className="content-container">
                <TabStrip selected={this.state.selected} onSelect={this.handleSelect}>
                    <TabStripTab title="客户资料">
                        <div>
                            <h1>客户资料</h1>
                            {this.props.action === "add" ?
                                <CustomerEdit
                                    addNewCustomer={this.addNewCustomer}
                                    user={this.props.user}
                                /> :
                                <CustomerEdit
                                    data={this.props.data}
                                    customers={this.props.customers}
                                    saveCustomers={this.props.saveCustomers}
                                    user={this.props.user}
                                />
                            }
                        </div>
                    </TabStripTab>
                    {this.props.action === "add" ?
                        null :
                        <TabStripTab title="客户备注">
                            <div style={{ marginBottom: "30px" }}>
                                <h1>客户备注</h1>
                                <CustomerNote
                                    data={this.props.data}
                                    customers={this.props.customers}
                                    saveCustomers={this.props.saveCustomers}
                                />
                            </div>
                        </TabStripTab>
                    }

                    {this.props.action === "add" ?
                        null :
                        <TabStripTab title="联系记录">
                            <div>
                                <h1>联系记录</h1>
                                <ContactHistory
                                    data={this.props.data}
                                    customers={this.props.customers}
                                    saveCustomers={this.props.saveCustomers}
                                />
                            </div>
                        </TabStripTab>
                    }

                    {this.props.action === "add" ?
                        null :
                        <TabStripTab title="客户材料清单">
                            <div style={{ marginBottom: "30px" }}>
                                <h1>客户材料清单</h1>
                                <CustomerChecklst
                                    data={this.props.data}
                                    customers={this.props.customers}
                                    saveCustomers={this.props.saveCustomers}
                                />
                            </div>
                        </TabStripTab>
                    }

                    {this.props.action === "add" ?
                        null :
                        <TabStripTab title="客户状态" className="customer-status-container">
                            <div style={{ marginBottom: "30px" }} className="customer-status-bar">
                                <h1>客户进度状态</h1>
                                <CustomerStatus
                                    data={this.props.data}
                                    customers={this.props.customers}
                                    saveCustomers={this.props.saveCustomers}
                                />
                            </div>
                        </TabStripTab>
                    }

                    {this.props.action === "add" ?
                        null :
                        <TabStripTab title="客户文案部备注">
                            <div style={{ marginBottom: "30px" }}>
                                <h1>客户文案部备注</h1>
                                <CustomerCaseNote
                                    data={this.props.data}
                                    customers={this.props.customers}
                                    saveCustomers={this.props.saveCustomers}
                                />
                            </div>
                        </TabStripTab>
                    }


                </TabStrip>
            </div>
        );
    }


}

export default Customer;
