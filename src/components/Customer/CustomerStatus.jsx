
import React from 'react';

// ES2015 module syntax
import { ChunkProgressBar } from '@progress/kendo-react-progressbars';

import { Checkbox } from '@progress/kendo-react-inputs';
import { Input } from '@progress/kendo-react-inputs';
import axios from 'axios'


class CustomerStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status_arr: this.props.data.progress.map(item => item.passed),
            note_arr: this.props.data.progress.map(item => item.note),
            portion: 17 * (6 - this.props.data.progress.filter(item => item.passed === true).length)

        };
    }

    handleChecklst = (n) => {
        var portion;
        var new_status_arr;
        if (this.state.status_arr[n] === false) {
            var fill = Array(n + 1).fill(true)
            new_status_arr = [...fill, ...this.state.status_arr.slice(n + 1, 6)]
            portion = 100 - ((n + 1) / 6) * 100
            this.setState({
                status_arr: new_status_arr,
                portion: portion
            })
        } else {
            var fill_true = Array(n).fill(true)
            var fill_false = Array(6 - n).fill(false)
            new_status_arr = [...fill_true, ...fill_false]
            portion = 100 - (n / 6) * 100
            this.setState({
                status_arr: new_status_arr,
                portion: portion
            })
        }
    }
    handleChange = (event, i) => {
        const target = event.target;
        const value = target.value;

        var newNotearr = this.state.note_arr
        newNotearr = newNotearr.map((item, index) => index === i ? value : item)

        this.setState({
            note_arr: newNotearr
        })
    };

    saveData = () => {
        var newData = this.props.customers
        var newCustomer = this.props.data
        newCustomer.progress = newCustomer.progress.map((item, i) => {
            var newItem = item
            newItem.passed = this.state.status_arr[i]
            newItem.note = this.state.note_arr[i]
            return newItem
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
    render() {
        return (
            <div>
                <div className="status-container">
                    <ChunkProgressBar value={this.state.portion} chunkCount={this.state.status_arr.length} orientation={'vertical'} />
                    <div className="status-checklst">
                        {this.props.data.progress.map((item, i) => {
                            return <div key={i + "key"}>
                                <Checkbox
                                    label={item.title}
                                    className="check-field"
                                    onChange={() => this.handleChecklst(i)}
                                    checked={this.state.status_arr[i]} />
                                <div style={{ width: "77%" }}>
                                    <Input
                                        placeholder={item.title + "备忘录"}
                                        className="note-field"
                                        defaultValue={item.note}
                                        onChange={(event) => this.handleChange(event, i)}
                                    />
                                </div>

                            </div>
                        })}
                    </div>

                </div>
                <div className="text-right">
                    <button type="button" className="k-button k-primary" onClick={this.saveData}>
                        保存
                </button>
                </div>
            </div>
        );
    }
}

export default CustomerStatus;
