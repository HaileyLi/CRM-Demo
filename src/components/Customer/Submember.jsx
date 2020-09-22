import React from "react";
import './Customer.css';
import { Input } from '@progress/kendo-react-inputs';

import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';



class SubMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: this.props.data.age,
            circulatingAssets: this.props.data.circulatingAssets,
            education: this.props.data.education,
            employment: this.props.data.employment,
            fixedAssets: this.props.data.fixedAssets,
            id: this.props.data.id,
            name: this.props.data.name,
            relation: this.props.data.relation

        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
        var element = this.state
        this.props.updateMember(element)
    };

    render() {
        return (
            <div className="sub-member">
                <div>
                    <span className="sec">客户附带家属{this.props.num}</span>
                </div>

                <Input
                    name="name"
                    label="姓名"
                    required={false}
                    defaultValue={this.state.name}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                />
                <Input
                    name="relation"
                    label="关系"
                    required={false}
                    defaultValue={this.state.relation}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                />
                <Input
                    name="age"
                    label="年龄"
                    required={false}
                    defaultValue={this.state.age}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                />
                <DropDownList
                    name="education"
                    data={["高中以下", "高中", "大学本科", "专科 - 大学专科", "中专 - 中等专业", "中技 - 中等技术", "技工学校", "研究生", "博士", "其他"]}
                    defaultValue={this.state.education || "教育程度"}
                    onChange={this.handleChange} />
                <DropDownList
                    name="employment"
                    data={["在职", "离职", "待业"]}
                    defaultValue={this.state.employment || "就业状况"}
                    onChange={this.handleChange} />


                <Input
                    name="fixedAssets"
                    label="固定资产"
                    required={false}
                    defaultValue={this.state.fixedAssets}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                />
                <Input
                    name="circulatingAssets"
                    label="流动资产"
                    required={false}
                    defaultValue={this.state.circulatingAssets}
                    onChange={this.handleChange}
                    onBlur={this.handleChange}
                />
                {this.props.last === true ?
                    <Button onClick={this.props.handleDelete}>删除</Button> : null}

            </div>
        );
    }


}

export default SubMember;
