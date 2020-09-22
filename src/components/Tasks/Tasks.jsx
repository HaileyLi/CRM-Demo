import React from "react";
import './Tasks.css';
import Card from "./Card.jsx";
import { Button } from '@progress/kendo-react-buttons';
import { Checkbox } from '@progress/kendo-react-inputs';
import Modal from "./Modal.jsx"
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { v4 as uuidv4 } from 'uuid';


class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card_data: this.props.tasks,
            highPrioritySelected: false,
            filterSelected: "全部",
            visible: false,
            selectedCard: {}
        }
    }
    // handle filter
    handleCheckbox = (n) => {
        switch (n) {
            case 0:
                this.setState({ highPrioritySelected: !this.state.highPrioritySelected })
                break;
            default:
                break;
        }
    }
    handleDropbox = (e) => {
        this.setState({
            filterSelected: e.value
        })
    }
    // handle events
    toggleDialog = (item) => {
        item === "new" ?
            this.setState({
                visible: !this.state.visible,
                selectedCard: {
                    id: uuidv4(),
                    endDate: new Date(),
                    startDate: new Date(),
                    priority: "优先级",
                    status: "未开始",
                    title: "",
                    detail: "",
                    user: this.props.user
                }
            })
            :
            this.setState({
                visible: !this.state.visible,
                selectedCard: item
            });

    }

    render() {
        var filtered_card = this.props.tasks.filter(item => {
            var priority = this.state.highPrioritySelected === true ?
                item.priority === "高" :
                item.priority === "高" || item.priority === "低"
            var dropdown = this.state.filterSelected === "全部" ? true :
                item.status === this.state.filterSelected
            return (priority && dropdown)
        })

        return (
            <div className="tasks-container">
                <div>
                    <h1>我的任务</h1>
                    <Button className="add-btn" onClick={() => this.toggleDialog("new")}>添加新任务</Button>
                </div>
                <div className="task-filter">
                    <span>快速筛选:</span>
                    <div>
                        <Checkbox label={'只看高优先级'} defaultChecked={this.state.highPrioritySelected} onChange={() => this.handleCheckbox(0)} />
                        <DropDownList
                            className="dropdown-filter"
                            data={["全部", "未开始", "正在进行", "已完成"]}
                            defaultValue={this.state.filterSelected}
                            onChange={(e) => this.handleDropbox(e)}
                        />
                    </div>


                </div>

                {filtered_card.map((item, i) => {
                    return <div style={{ position: "relative" }} key={i + "key"}>
                        <Card
                            item={item}
                            tasks={this.props.tasks}
                            saveTasks={this.props.saveTasks}
                        />
                        <Button icon="edit" className="edit-task" onClick={() => this.toggleDialog(item)}>编辑任务</Button>
                    </div>
                })}

                {this.state.visible ?
                    <Modal
                        item={this.state.selectedCard}
                        toggleDialog={this.toggleDialog}
                        tasks={this.props.tasks}
                        saveTasks={this.props.saveTasks}
                    />
                    : null}
            </div>
        );
    }


}

export default Tasks;
