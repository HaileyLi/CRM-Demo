
import React from 'react';
import { withRouter } from 'react-router-dom';

import { Drawer, DrawerContent } from '@progress/kendo-react-layout';
import { Button } from '@progress/kendo-react-buttons';
import './DrawerRouterContainer.css';

import logo from '../../img/logo.png'

const items = [
    { text: '我的任务面板', icon: 'k-i-delicious', selected: true, route: '/dashboard' },

    { text: '我的客户', icon: 'k-i-tell-a-friend', route: '/customer' },
    // { text: '我的时间表', icon: 'k-i-calendar', route: '/schedule' },
    { text: '创建新客户', icon: 'k-i-plus', route: '/add-customer' }

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
        console.log(e)
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

    render() {
        console.log(this.props)
        let selected = this.setSelectedItem(this.props.location.pathname);
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
                        <Button icon="logout" className="logout-btn" onClick={this.props.handleLogout} >退出登录</Button>
                    </DrawerContent>
                </Drawer>
            </div>
        );
    }
};

export default withRouter(DrawerRouterContainer);
