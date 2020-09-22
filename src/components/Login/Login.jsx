import React from "react";
import './Login.css';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import bg from '../../img/login-bg.jpeg'
import logo_dark from '../../img/logo_dark.png'


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
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
    handleLogin = (username, password) => {
        if (username === "" || password === "") {
            alert("请输入用户名和密码")
        } else {
            var user = this.props.userinfo.filter(item => item.username === username)
            if (user.length === 0) {
                alert("用户名或密码错误")
            } else if (user[0].password === password) {
                this.props.handleLogin(username)
            }
        }

    }
    render() {
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
                    <div className="login-input">
                        <Input
                            name="username"
                            label="用户名"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="login-input">
                        <Input
                            name="password"
                            label="密码"
                            onChange={this.handleChange}
                        />
                    </div>

                    <Button primary={true} className="login-btn"
                        onClick={() => this.handleLogin(this.state.username, this.state.password)}>登录</Button>
                </div>
            </div>


        );
    }


}

export default Login;
