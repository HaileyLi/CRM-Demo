
import React from 'react';
import { HashRouter, Switch, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import '@progress/kendo-theme-material/dist/all.css';
import DrawerRouterContainer from './components/DrawerRouterContainer/DrawerRouterContainer.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Schedule from './components/Schedule/Schedule.jsx';
import Customer from './components/Customer/Customer.jsx';
import CustomerList from './components/CustomerList/CustomerList.jsx';
import "./App.css";
import { doFetchTasks, doSaveTasks, doFetchUsers, doFetchPlans, doSavePlans, doFetchCustomers, doSaveCustomers } from './store/actions.js';
import { connect } from 'react-redux';
import Login from './components/Login/Login';
import axios from 'axios'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      login: false

    }
  }

  componentDidMount() {
    this.getUsers()
      .then(data => {
        this.props.fetchUsers(data)
      })
    this.getTasks()
      .then(data => {
        this.props.fetchTasks(data)
      });
    this.getPlans()
      .then(data => {
        this.props.fetchPlans(data)
      });
    this.getCustomers()
      .then(data => {
        this.props.fetchCustomers(data)
      });

  }

  getTasks = (username) => {
    return axios.get("http://192.168.2.227:8080/api/tasks?user=" + username)
      .then((res) => {
        return res.data
      })
      .catch(() => {
        console.log("Error")
      })
  }
  getPlans = (username) => {
    return axios.get("http://192.168.2.227:8080/api/plans?user=" + username)
      .then((res) => {
        return res.data
      })
      .catch(() => {
        console.log("Error")
      })
  }
  getCustomers = (username) => {
    return axios.get("http://192.168.2.227:8080/api/customers?user=" + username)
      .then((res) => {
        return res.data
      })
      .catch(() => {
        console.log("Error")
      })
  }

  getUsers = () => {
    return axios.get("http://192.168.2.227:8080/api/users")
      .then((res) => {
        return res.data
      })
      .catch(() => {
        console.log("Error")
      })
  }

  handleLogin = (username) => {
    this.setState({
      login: true,
      username: username
    })
    this.getTasks(username)
      .then(data => {
        this.props.fetchTasks(data)
      });
    this.getPlans(username)
      .then(data => {
        this.props.fetchPlans(data)
      });
    this.getCustomers(username)
      .then(data => {
        this.props.fetchCustomers(data)
      });
    this.props.fetchUsers(this.props.users.filter(item => item.username === username))
  }

  handleLogout = () => {
    this.setState({
      login: false,
      username: ""
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Route path="/login" component={(history) =>
            <Login
              handleLogin={username => this.handleLogin(username)}
              userinfo={this.props.users}
              {...history}
            />} />
          <Route path="/dashboard" render={() => {
            return (
              <div>
                <h2>front menu</h2>
                <Link to="/customer">help</Link>
                <Link to="/add-customer">about</Link>
              </div>
            );
          }} />
          {/* <DrawerRouterContainer
            handleLogout={this.handleLogout}
          > */}
          <Route exact={true} path="/dashboard"
            component={(history) =>
              <Dashboard
                savePlans={this.props.savePlans}
                saveTasks={this.props.saveTasks}
                tasks={this.props.tasks}
                plans={this.props.plans}
                user={this.props.users[0].username}
                {...history} />}
          />
          <Route exact={true} path="/customer"
            component={(history) =>
              <CustomerList
                saveCustomers={this.props.saveCustomers}
                customers={this.props.customers}
                user={this.props.users[0].username}
                {...history} />}
          />
          <Route exact={true} path={`/add-customer`} component={(history) =>
            <Customer
              saveCustomers={this.props.saveCustomers}
              customers={this.props.customers}
              user={this.props.users[0].username}
              action={"add"}
              {...history} />}
          />
          {/* </DrawerRouterContainer> */}


        </Router>
      </div>
    );
  }

};

const mapStateToProps = (state) => ({
  tasks: state.task,
  plans: state.plan,
  customers: state.customer,
  users: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchUsers: (data) => dispatch(doFetchUsers(data)),
  fetchPlans: (data) => dispatch(doFetchPlans(data)),
  fetchTasks: (data) => dispatch(doFetchTasks(data)),
  fetchCustomers: (data) => dispatch(doFetchCustomers(data)),
  savePlans: data => dispatch(doSavePlans(data)),
  saveTasks: data => dispatch(doSaveTasks(data)),
  saveCustomers: data => dispatch(doSaveCustomers(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);