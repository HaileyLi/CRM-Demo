
import React from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';

import { MyCommandCell } from './myCommandCell.jsx';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

class ContactHistory extends React.Component {
    editField = "inEdit";
    CommandCell;

    state = {
        data: [...this.props.data.contactHistory]
    };

    constructor(props) {
        super(props);

        this.CommandCell = MyCommandCell({
            edit: this.enterEdit,
            remove: this.remove,

            add: this.add,
            discard: this.discard,

            update: this.update,
            cancel: this.cancel,

            editField: this.editField
        });
    }

    enterEdit = (e, dataItem) => {
        e.preventDefault();
        this.setState({
            data: this.state.data.map(item =>
                item.id === dataItem.id ?
                    { ...item, inEdit: true } : item
            )
        });
    }

    remove = (e, dataItem) => {
        e.preventDefault();
        const data = [...this.state.data];
        this.removeItem(data, dataItem);
        this.removeItem(this.props.data.contactHistory, dataItem);

        this.setState({ data });
    }

    add = (e, dataItem) => {
        e.preventDefault();
        dataItem.inEdit = undefined;
        dataItem.id = uuidv4();

        this.props.data.contactHistory.unshift(dataItem);
        this.setState({
            data: [...this.state.data]
        });
        console.log(this.state.data)
    }

    discard = (e, dataItem) => {
        e.preventDefault();
        const data = [...this.state.data];
        this.removeItem(data, dataItem);

        this.setState({ data });
    }

    update = (e, dataItem) => {
        e.preventDefault();
        const data = [...this.state.data];
        const updatedItem = { ...dataItem, inEdit: undefined };

        this.updateItem(data, updatedItem);
        this.updateItem(this.props.data.contactHistory, updatedItem);

        this.setState({ data });
    }

    cancel = (e, dataItem) => {
        e.preventDefault();
        const originalItem = this.props.data.contactHistory.find(p => p.id === dataItem.id);
        const data = this.state.data.map(item => item.id === originalItem.id ? originalItem : item);

        this.setState({ data });
    }

    updateItem = (data, item) => {
        let index = data.findIndex(p => p === item || (item.id && p.id === item.id));
        if (index >= 0) {
            data[index] = { ...item };
        }
    }

    itemChange = (event) => {
        const data = this.state.data.map(item =>
            item.id === event.dataItem.id ?
                { ...item, [event.field]: event.value } : item
        );

        this.setState({ data });
    }

    addNew = (e) => {
        e.preventDefault()
        const newDataItem = { inEdit: true, Discontinued: false };

        this.setState({
            data: [newDataItem, ...this.state.data]
        });
    }

    cancelCurrentChanges = () => {
        this.setState({ data: [...this.props.data.contactHistory] });
    }

    saveData = () => {
        var newData = this.props.customers
        var newCustomer = this.props.data
        newCustomer.contactHistory = this.state.data.map(item => {
            delete item["Discontinued"];
            delete item["inEdit"];
            delete item["__proto__"];
            return item
        })
        newData = newData.map((item, i) => {
            return item.id === newCustomer.id ? newCustomer : item
        })
        this.updateCustomer(newCustomer)
            .then(data => {
                this.props.saveCustomers(newData)
            });

    }

    updateCustomer = (data) => {
        return axios.put("http://192.168.2.227:8080/api/customers/" + data.id, data)
            .then((res) => {
                return res.data
            })
            .catch(() => {
                console.log("Error")
            })
    }

    // componentWillUnmount() {
    //     if ([...this.props.data.contactHistory] !== this.state.data) {
    //         var r = window.confirm("是否保存此部分更改？");
    //         if (r === true) {
    //             this.saveData()
    //         }
    //     }
    // }

    render() {
        const { data } = this.state;
        const hasEditedItem = data.some(p => p.inEdit);
        return (
            <div>
                <Grid
                    style={{ height: '420px' }}
                    data={data}
                    onItemChange={this.itemChange}
                    editField={this.editField}
                >
                    <GridToolbar>
                        <button
                            title="Add new"
                            className="k-button k-primary"
                            onClick={(e) => this.addNew(e)}
                        >
                            添加记录
                    </button>
                        {hasEditedItem && (
                            <button
                                title="Cancel current changes"
                                className="k-button"
                                onClick={this.cancelCurrentChanges}
                            >
                                取消更改
                            </button>
                        )}
                    </GridToolbar>
                    <Column field="contactType" title="方式" width="130px" />
                    <Column field="direction" title="方向" width="130px" />
                    <Column field="date" title="日期" width="200px" />
                    <Column field="note" title="内容" />
                    <Column cell={this.CommandCell} width="240px" />
                </Grid>
                <div className="text-right">
                    <button type="button" className="k-button k-primary" onClick={this.saveData}>
                        保存
                        </button>
                </div>
            </div>
        );
    }


    removeItem(data, item) {
        let index = data.findIndex(p => p === item || item.id && p.id === item.id);
        if (index >= 0) {
            data.splice(index, 1);
        }
    }
}

export default ContactHistory;