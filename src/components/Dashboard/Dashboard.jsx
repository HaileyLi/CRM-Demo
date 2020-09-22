import React from "react";
import Plans from "../Plans/Plans.jsx";
import Tasks from "../Tasks/Tasks.jsx";
import "./Dashboard.css";
import top_banner from '../../img/db_top.png';
import Setting from "./Setting.jsx";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            < div className="dashboard-container" >
                <div className="log-in">
                    <div className="top_banner" style={{
                        background: `url(${top_banner}) no-repeat 0 0`, width: "100%", height: "176px",
                        backgroundSize: "650px"
                    }}>
                        <h1>Hello, {this.props.user}!</h1>
                        <p>Good Afternoon! Hope you have a fresh productive time!</p>
                    </div>
                </div>
                <div className="dashboard">
                    {/* <Setting tasks={this.props.tasks} />
                    <Tasks tasks={this.props.tasks} saveTasks={this.props.saveTasks} user={this.props.user} />
                    <Plans plans={this.props.plans} savePlans={this.props.savePlans} user={this.props.user} /> */}
                </div>
            </div >
        );
    }
}


export default Dashboard
