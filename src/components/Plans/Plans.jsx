import React from "react";
import './Plans.css';
import { Sortable } from '@progress/kendo-react-sortable';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import Modal from "./Modal.jsx";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'

const getBaseItemStyle = (isActive) => ({
    height: 40,
    width: "300px",
    lineHeight: '42px',
    fontSize: '12px',
    textAlign: 'center',
    outline: 'none',
    border: '1px solid',
    cursor: 'move',
    display: 'inline-block',
    background: isActive ? '#ff4081' : '#f5f5f5',
    color: isActive ? '#fff' : '#ff4081',
    borderColor: isActive ? '#ff4081' : '#fff'
});

const SortableItemUI = (props) => {
    const { isDisabled, isActive, style, attributes, dataItem, forwardRef } = props;
    const classNames = ['col-xs-6 col-sm-3'];

    if (isDisabled) {
        classNames.push('k-state-disabled');
    }

    return (
        <div
            ref={forwardRef}
            {...attributes}
            style={{
                ...getBaseItemStyle(isActive),
                ...style
            }}
            className={classNames.join(' ')}
        >
            {dataItem.text}
        </div>
    );
};

class Plans extends React.Component {
    constructor(props) {
        super(props);

        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            data: this.props.plans,
            planlst: this.props.plans[0] === undefined ? [] :
                this.props.plans.filter(item => item.date === date).length === 0 ?
                    this.props.plans[this.props.plans.length - 1].data :
                    this.props.plans.filter(item => item.date === date)[0].data,
            plan: "",
            visible: false,
            type: 0,
            currentDate: date
        }
    }


    onDragOver = (event) => {
        this.setState({
            planlst: event.newState
        });

        var originPlanlst = this.state.data
        var newPlanlst = this.state.data.filter(item => item.date === this.state.currentDate)
        if (newPlanlst.length === 0) {
            var newPlan = {
                id: uuidv4(),
                date: this.state.currentDate,
                data: event.newState,
                user: this.props.user
            }
            newPlanlst = [newPlan, ...originPlanlst]
            this.createPlan(newPlan)
                .then(data => {
                    this.props.savePlans(newPlanlst)
                });
        } else {
            originPlanlst.filter(item => item.date === this.state.currentDate)[0].data = event.newState
            newPlanlst = originPlanlst
            this.updatePlan(newPlanlst.filter(item => item.date === this.state.currentDate)[0])
                .then(data => {
                    this.props.savePlans(newPlanlst)
                });
        }


    }

    onNavigate = (event) => {
        this.setState({
            planlst: event.newState
        });
    }
    updatePlan = (data) => {
        return axios.put("http://192.168.2.227:8080/api/plans/" + data.id, data)
            .then((res) => {
                return res.data
            })
            .catch(() => {
                console.log("Error")
            })
    }

    createPlan = (data) => {
        return axios.post("http://192.168.2.227:8080/api/plans/", data)
            .then((res) => {
                return res.data
            })
            .catch(() => {
                console.log("Error")
            })
    }

    addPlan = () => {
        if (this.state.planlst.length < 9) {
            var indexes = this.state.planlst.map(item => item.id)
            var new_id = [...new Array(9).keys()].filter(item => indexes.indexOf(item) === -1)
            var add_plan = {
                id: new_id[0],
                text: this.state.plan
            }
            this.setState({
                planlst: [...this.state.planlst, add_plan]
            })

            var originPlanlst = this.state.data
            var newPlanlst = this.state.data.filter(item => item.date === this.state.currentDate)

            if (newPlanlst.length === 0) {
                var newPlan = {
                    id: uuidv4(),
                    date: this.state.currentDate,
                    data: [...this.state.planlst, add_plan],
                    user: this.props.user
                }
                newPlanlst = [newPlan, ...originPlanlst]
                this.createPlan(newPlan)
                    .then(data => {
                        this.props.savePlans(newPlanlst)
                    });
            } else {
                originPlanlst.filter(item => item.date === this.state.currentDate)[0].data = [...this.state.planlst, add_plan]
                newPlanlst = originPlanlst
                this.updatePlan(newPlanlst.filter(item => item.date === this.state.currentDate)[0])
                    .then(data => {
                        this.props.savePlans(newPlanlst)
                    });
            }

        }
    }

    addPlanOnEnter = (e) => {
        if (e.key === 'Enter') {
            this.addPlan()
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    removePlan = (n) => {
        this.setState({
            planlst: [...this.state.planlst.slice(0, n - 1), ...this.state.planlst.slice(n, this.state.planlst.length)]
        })

        var originPlanlst = this.state.data
        var newPlanlst = this.state.data.filter(item => item.date === this.state.currentDate)

        if (newPlanlst.length === 0) {
            var newPlan = {
                id: uuidv4(),
                date: this.state.currentDate,
                data: [...this.state.planlst.slice(0, n - 1), ...this.state.planlst.slice(n, this.state.planlst.length)],
                user: this.props.user
            }
            newPlanlst = [newPlan, ...originPlanlst]
            this.createPlan(newPlan)
                .then(data => {
                    this.props.savePlans(newPlanlst)
                });
        } else {
            originPlanlst.filter(item => item.date === this.state.currentDate)[0].data = [...this.state.planlst.slice(0, n - 1), ...this.state.planlst.slice(n, this.state.planlst.length)]
            newPlanlst = originPlanlst
            this.updatePlan(newPlanlst.filter(item => item.date === this.state.currentDate)[0])
                .then(data => {
                    this.props.savePlans(newPlanlst)
                });
        }
    }

    toggleDialog = (type) => {
        if (this.state.visible === false) {
            var res_str = type === 0 ?
                "Hi Tom, this is my work plan for today. 吴总您好，以下是我今日的工作计划：\n" :
                "Hi Tom, this is my work summary for today. 吴总您好，以下是我今日的工作总结：\n";

            var plans = this.state.planlst.map(item => item.text);
            let unique_plans = plans.filter((v, i) => plans.indexOf(v) === i && v !== "")
            for (var i = 0; i < unique_plans.length; i++) {
                res_str += (i + 1) + ". "
                res_str += unique_plans[i]
                res_str += "\n"
            }
        }
        this.setState({
            visible: !this.state.visible,
            type: type,
            content: res_str
        });
    }

    clearInput = () => {
        this.setState({
            plan: ""
        });
    }

    render() {
        return (
            <div className="plan-container">

                <div className="container-fluid sec-1">
                    <div className="add-plan">
                        <Input
                            value={this.state.plan}
                            name="plan"
                            label="今天准备做什么?（20字符限制）"
                            required={false}
                            maxLength={40}
                            onChange={(event) => this.handleChange(event)}
                            onKeyDown={(e) => this.addPlanOnEnter(e)} />
                        <Button onClick={this.addPlan}>添加</Button>
                        <Button onClick={this.clearInput}>重新输入</Button>
                    </div>

                    <h3>今日{this.state.currentDate}工作安排</h3>
                    <div className="general-container">
                        <div className="time-slot">
                            <p>9:00 - 10:00</p>
                            <p>10:00 - 11:00</p>
                            <p>11:00 - 12:00</p>
                            <p>12:00 - 13:00</p>
                            <p>13:00 - 14:00</p>
                            <p>14:00 - 15:00</p>
                            <p>15:00 - 16:00</p>
                            <p>16:00 - 17:00</p>
                            <p>17:00 - 18:00</p>
                        </div>
                        <Sortable
                            className="sortable_tags"
                            idField={'id'}
                            disabledField={'disabled'}
                            data={this.state.planlst}

                            itemUI={SortableItemUI}

                            onDragOver={this.onDragOver}
                            onNavigate={this.onNavigate}
                        />
                        <div className="delete-plan">
                            <Button className="delete-plan" onClick={() => this.removePlan(1)}>删除</Button>
                            <Button className="delete-plan" onClick={() => this.removePlan(2)}>删除</Button>
                            <Button className="delete-plan" onClick={() => this.removePlan(3)}>删除</Button>
                            <Button className="delete-plan" onClick={() => this.removePlan(4)}>删除</Button>
                            <Button className="delete-plan" onClick={() => this.removePlan(5)}>删除</Button>
                            <Button className="delete-plan" onClick={() => this.removePlan(6)}>删除</Button>
                            <Button className="delete-plan" onClick={() => this.removePlan(7)}>删除</Button>
                            <Button className="delete-plan" onClick={() => this.removePlan(8)}>删除</Button>
                            <Button className="delete-plan" onClick={() => this.removePlan(9)}>删除</Button>
                        </div>
                    </div>

                    <div className="btn-container">
                        <Button look="outline" primary={true} onClick={() => this.toggleDialog(0)}>生成工作计划</Button>
                        <Button look="outline" primary={true} onClick={() => this.toggleDialog(1)}>生成工作总结</Button>
                    </div>

                </div>
                {this.state.visible ?
                    <Modal
                        type={this.state.type}
                        toggleDialog={this.toggleDialog}
                        content={this.state.content} />
                    : null}

            </div>
        );
    }


}

export default Plans;
