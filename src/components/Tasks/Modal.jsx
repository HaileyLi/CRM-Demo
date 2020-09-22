
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Input } from '@progress/kendo-react-inputs';

import { DropDownList } from "@progress/kendo-react-dropdowns";
import axios from 'axios'

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.tasks,
            title: this.props.item.title,
            id: this.props.item.id,
            detail: this.props.item.detail,
            priority: this.props.item.priority || "优先级",
            startDate: new Date(this.props.item.startDate),
            endDate: new Date(this.props.item.endDate),
            status: this.props.item.status,
            user: this.props.item.user,
            success: true
        };
    }

    // update state
    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
        if (name === "title" && value.length > 0) {
            this.setState({
                success: true
            })
        }
    };

    handleStartDate = (event) => {
        this.setState({
            startDate: new Date(event.value)
        })
    }

    handleEndDate = (event) => {
        this.setState({
            endDate: new Date(event.value)
        })
    }

    handleSave = () => {
        if (this.state.title.length !== 0) {
            this.setState({ success: true })

            var newData = this.props.tasks
            var newTask = newData.filter(item => item.id === this.state.id)[0]

            if (newTask !== undefined) {
                // existed task
                newTask.title = this.state.title
                newTask.detail = this.state.detail
                newTask.priority = this.state.priority
                newTask.startDate = this.stringfyDate(this.state.startDate)
                newTask.endDate = this.stringfyDate(this.state.endDate)
                newTask.status = this.state.status
                newTask.user = this.state.user
                newData.map(item => item.id === newTask.id ? newTask : item)
                this.updateTask(newTask)
                    .then(data => {
                        this.props.saveTasks(newData)
                    });
            } else {
                // new task created
                newTask = {
                    id: this.state.id,
                    title: this.state.title,
                    detail: this.state.detail,
                    priority: this.state.priority === "优先级" ? "低" : this.state.priority,
                    startDate: this.stringfyDate(this.state.startDate),
                    endDate: this.stringfyDate(this.state.endDate),
                    status: this.state.status,
                    user: this.state.user
                }
                newData = [newTask, ...newData]
                this.createTask(newTask)
                    .then(data => {
                        this.props.saveTasks(newData)
                    });
            }
            this.props.toggleDialog();
        } else {
            this.setState({ success: false })
        }

    }

    updateTask = (data) => {
        return axios.put("http://192.168.2.227:8080/api/tasks/" + this.state.id, data)
            .then((res) => {
                return res.data
            })
            .catch(() => {
                console.log("Error")
            })
    }
    createTask = (data) => {
        return axios.post("http://192.168.2.227:8080/api/tasks", data)
            .then((res) => {
                return res.data
            })
            .catch(() => {
                console.log("Error")
            })
    }

    stringfyDate = (date) => {
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString()
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString()
        day = day.length > 1 ? day : '0' + day;

        return month + '/' + day + '/' + year
    }

    render() {
        return (
            <div className="copy-clipboard thin-modal">
                <Dialog title={"我的任务"} onClose={this.props.toggleDialog}>
                    <Input
                        name="title"
                        label="标题"
                        required={true}
                        defaultValue={this.state.title}
                        onChange={this.handleChange}
                    />
                    {this.state.success !== true ? <span style={{ color: "red" }}>请填写任务标题</span> : null}
                    <br />
                    <Input
                        name="detail"
                        label="备注"
                        required={false}
                        defaultValue={this.state.detail}
                        onChange={this.handleChange} />
                    <br />
                    <span className="priority-span">
                        优先级：
                    <DropDownList
                            data={["高", "低"]}
                            required={true}
                            defaultValue={this.state.priority}
                            name="priority"
                            onChange={this.handleChange}
                        />
                    </span>

                    <div style={{ display: "flex" }}>
                        <span style={{ marginRight: "10px" }}>
                            <p>开始时间</p>
                            <DatePicker
                                defaultValue={this.state.startDate}
                                onChange={this.handleStartDate} />
                        </span>
                        <span>
                            <p>截止日期</p>
                            <DatePicker
                                onChange={this.handleEndDate}
                                defaultValue={this.state.endDate} />
                        </span>
                    </div>
                    <DialogActionsBar>
                        <button className="k-button" onClick={() => { this.props.toggleDialog(); }}>退出</button>
                        <button className="k-button" onClick={() => { this.handleSave(); }}>保存</button>
                    </DialogActionsBar>
                </Dialog>
            </div>
        );
    }
}

export default Modal;
