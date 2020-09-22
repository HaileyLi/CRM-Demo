import React from "react";
import "./Tasks.css";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import axios from 'axios'

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      edit: false,
      id: this.props.item.id,
      startDate: this.props.item.startDate,
      endDate: this.props.item.endDate,
      title: this.props.item.title,
      status: this.props.item.status,
      detail: this.props.item.detail,
      priority: this.props.item.priority,
    };
  }
  componentDidMount() {
    var res;
    switch (this.state.status) {
      case "正在进行":
        res = "inprogress";
        break;
      case "未开始":
        res = "notstart";
        break;
      case "已完成":
        res = "finished";
        break;
      default:
        break;
    }
    this.setState({
      classToggle: res,
    });
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    var res;
    switch (value) {
      case "正在进行":
        res = "inprogress";
        break;
      case "未开始":
        res = "notstart";
        break;
      case "已完成":
        res = "finished";
        break;
      default:
        break;
    }
    this.setState({
      [name]: value,
      classToggle: res,
    });

    var newData = this.props.tasks
    var newTask = this.props.item
    delete newTask["item"]
    delete newTask["edit"]
    delete newTask["classToggle"]
    newTask.status = value

    newData = newData.map(item => item.id === newTask.id ? newTask : item)

    this.updateTask(newTask)
      .then(data => {
        this.props.saveTasks(newData)
      });
  };

  updateTask = (data) => {
    return axios.put("http://192.168.2.227:8080/api/tasks/" + this.state.id, data)
      .then((res) => {
        return res.data
      })
      .catch(() => {
        console.log("Error")
      })
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({
        item: this.props.item,
        edit: false,
        startDate: this.props.item.startDate,
        id: this.props.item.id,
        endDate: this.props.item.endDate,
        title: this.props.item.title,
        status: this.props.item.status,
        detail: this.props.item.detail,
        priority: this.props.item.priority
      });
      var res;
      switch (this.props.item.status) {
        case "正在进行":
          res = "inprogress";
          break;
        case "未开始":
          res = "notstart";
          break;
        case "已完成":
          res = "finished";
          break;
        default:
          break;
      }
      this.setState({
        classToggle: res,
      });
    }
  }



  render() {
    var date1 = new Date(this.state.item.startDate);
    var date2 = new Date(this.state.item.endDate);
    var today = new Date();
    // To calculate the time difference of two dates
    var Difference_In_Time1 = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days1 = Difference_In_Time1 / (1000 * 3600 * 24);

    // To calculate the time difference of two dates
    var Difference_In_Time2 = today - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days2 = Difference_In_Time2 / (1000 * 3600 * 24);

    var ratio = Difference_In_Days2 / Difference_In_Days1
    return (
      <div className="card-container">
        {this.state.item.priority === "高" ? (
          <div className="priority-bar high-priority"></div>
        ) : (
            <div className="priority-bar low-priority"></div>
          )}
        <div>
          {this.state.edit ? (
            <DropDownList
              className="task-status-edit"
              data={["未开始", "正在进行", "已完成"]}
              defaultValue={this.state.status}
              onBlur={this.toggleEdit}
              onChange={this.handleChange}
              name="status"
            />
          ) : (
              <label
                className={"task-status " + this.state.classToggle}
                onClick={this.toggleEdit}
              >
                {this.state.status}
              </label>
            )}
        </div>
        <h2>{this.state.item.title}</h2>
        <p className="detail">{this.state.item.detail}</p>
        <div className="progress">
          <div className="progress-line">
            <div className="start-dot"></div>
            <div className="end-dot"></div>
            {ratio >= 0 && ratio <= 1 ? (
              <span
                className="today-container"
                style={{ marginLeft: ratio * 100 + "%" }}
              >
                <div className="today-dot"></div>
                <span className="today-text">今天</span>
              </span>
            ) : null}
          </div>
          <div className="start-date">
            <span>开始时间</span>
            <span>{this.state.item.startDate}</span>
          </div>
          <div className="end-date">
            <span>截止时间</span>
            <span>{this.state.item.endDate}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
