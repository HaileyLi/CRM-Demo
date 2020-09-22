import React from "react";
import "./Dashboard.css";
import { Button } from '@progress/kendo-react-buttons';


class Setting extends React.Component {
    anchor = null;
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    componentDidMount() {
        var awaitTasks = this.props.tasks.filter(item =>
            this.diffDays(item.endDate) <= 3 && item.status !== "已完成"
        )

        this.setState({
            awaitTasks: awaitTasks,
            dot: awaitTasks.length > 0 ? "with-dot" : null
        })
    }

    diffDays = (date) => {
        var date2 = new Date(date);
        var today = new Date();

        // To calculate the time difference of two dates
        var Difference_In_Time1 = date2.getTime() - today.getTime();

        // To calculate the no. of days between two dates
        var Difference_In_Days1 = Difference_In_Time1 / (1000 * 3600 * 24);
        return Difference_In_Days1
    }
    onClick = () => {
        this.setState({
            show: !this.state.show,
            dot: " "
        });
    }

    render() {

        return (
            <div className="setting-container">
                <Button icon="notification" className={"notification-btn " + this.state.dot}
                    onClick={this.onClick}
                    onBlur={this.onClick}
                    ref={(button) => {
                        this.anchor = button;
                    }}>我的提醒</Button>

                {this.state.show ?
                    <div className="notify-popup">您当前有{this.state.awaitTasks.length}个任务即将到截止日期:<br />
                        {this.state.awaitTasks.map((item, i) =>
                            <div key={"key" + i}>{item.title}</div>
                        )}
                    </div> : null}


            </div>


        );
    }


}

export default Setting;
