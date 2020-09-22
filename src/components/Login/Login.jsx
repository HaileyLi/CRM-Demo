import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/authActions";
import classnames from "classnames";

import './Login.css';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import bg from '../../img/login-bg.jpeg'
import logo_dark from '../../img/logo_dark.png'


class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="login-container" style={{
                background: `url(${bg}) no-repeat 0 0`, width: "100%", opacity: 1,
                backgroundSize: "cover", height: "100vh", textAlign: "center", paddingTop: "200px"
            }}>
                <div className="login-form">
                    <div className="login-header">
                        登录界面
                    </div>
                    <div style={{
                        background: `url(${logo_dark}) no-repeat 0 0`, opacity: 1,
                        backgroundSize: "100%", height: "50px"
                    }}>

                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                        <div className="login-input">
                            <Input
                                name="username"
                                label="用户名"
                                onChange={this.onChange}
                                defaultValue={this.state.username}
                                error={errors.username}
                                type="username"
                                className={classnames("", {
                                    invalid: errors.username || errors.usernamenotfound
                                })}
                            />
                            <span className="red-text">
                                {errors.username}
                                {errors.usernamenotfound}
                            </span>
                        </div>
                        <div className="login-input">
                            <Input
                                name="password"
                                label="密码"
                                onChange={this.onChange}
                                defaultValue={this.state.password}
                                error={errors.password}
                                type="password"
                                className={classnames("", {
                                    invalid: errors.password || errors.passwordincorrect
                                })}
                            />
                            <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                            </span>
                        </div>

                        <Button primary={true} className="login-btn"
                            type="submit">登录</Button>
                    </form>
                </div>
            </div>
        );
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(
    mapStateToProps,
    { loginUser }
)(Login);