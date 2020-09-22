
import React from 'react';
import { withRouter } from 'react-router-dom';

import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import './DrawerRouterContainer.css';

import logo from '../../img/logo.png'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/authActions";

const items = [
    { text: '我的任务面板', icon: 'k-i-delicious', selected: true, route: '/dashboard/tasks' },

    { text: '我的客户', icon: 'k-i-tell-a-friend', route: '/dashboard/customer' },
    // { text: '我的时间表', icon: 'k-i-calendar', route: '/schedule' },
    { text: '创建新客户', icon: 'k-i-plus', route: '/dashboard/add-customer' }

];

class DrawerRouterContainer extends React.Component {
    state = {
        expanded: true,
        selectedId: items.findIndex(x => x.selected === true)
    }

    handleClick = () => {
        this.setState((e) => ({ expanded: !e.expanded }));
    }

    onSelect = (e) => {
        this.setState({ selectedId: e.itemIndex, expanded: true });
        this.props.history.push(e.itemTarget.props.route);
    }

    setSelectedItem = (pathName) => {
        let currentPath = items.find(item => item.route === pathName);
        if (currentPath.text) {
            return currentPath.text;
        }
    }

    drawerProps = {
        position: 'start',
        mode: 'push',
        mini: true
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        let selected = this.setSelectedItem(this.props.location.pathname);
        const { user } = this.props.auth;
        return (
            <div>

                <Drawer
                    expanded={this.state.expanded}
                    items={items.map(
                        (item) => ({ ...item, selected: item.text === selected }))}
                    {...this.drawerProps}

                    onSelect={this.onSelect}
                >
                    <DrawerContent>
                        <div style={{
                            background: `url(${logo}) no-repeat 0 0`, width: "50px", height: "50px", opacity: 0.1,
                            backgroundSize: "50px", position: "absolute", left: 0, bottom: 0
                        }}></div>
                        <Button icon="menu" look="flat" onClick={this.handleClick} />
                        {this.props.children}
                        <Button icon="logout" className="logout-btn" onClick={this.onLogoutClick} >退出登录</Button>
                    </DrawerContent>
                </Drawer>
            </div>
        );
    }
};

DrawerRouterContainer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(DrawerRouterContainer);

