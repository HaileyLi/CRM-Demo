import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/authActions";
import DrawerRouterContainer from "../DrawerRouterContainer/DrawerRouterContainer.jsx"
import Customer from "../Customer/Customer.jsx";
import CustomerList from "../CustomerList/CustomerList.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";

import { HashRouter, Switch, Route } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";


class Success extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
        return (
            <div style={{ height: "75vh" }} className="container valign-wrapper">



                <button
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "1rem"
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                    Logout
            </button>

            </div>
        );
    }
}
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Success);