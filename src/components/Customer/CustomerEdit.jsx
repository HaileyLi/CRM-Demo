import React from "react";
import './Customer.css';
import { Input } from '@progress/kendo-react-inputs';

import { Button } from '@progress/kendo-react-buttons';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import SubMember from "./Submember";
import { v4 as uuidv4 } from 'uuid';
import { Redirect } from "react-router-dom";
import { DateInput } from '@progress/kendo-react-dateinputs';
import axios from 'axios'


const checklst = [
    {
        "text": "（一）个人文件（所有资料在做公证之前需先提交审核）",
        "expanded": true,
        "finished": false,
        "note": "",
        "items": [
            {
                "text": "最近六个月内拍摄的数码照片",
                "finished": false,
                "note": ""
            },
            {
                "text": "新旧护照彩色护照扫描件（即护照所有页扫描件）",
                "finished": false,
                "note": ""
            },
            {
                "text": "任何加拿大签证（包括学签，工签，和旅游签证）",
                "finished": false,
                "note": ""
            },
            {
                "text": "户口本及其中英文公证书",
                "finished": false,
                "note": ""
            },
            {
                "text": "身份证（正反面）及其中英文公证书",
                "finished": false,
                "note": ""
            },
            {
                "text": "出生证明中英文公证书，子女的出生医学证明中英文公证书",
                "finished": false,
                "note": ""
            },
            {
                "text": "结婚证及其中英文公证书",
                "finished": false,
                "note": ""
            }
        ]
    },
    {
        "text": "(二）教育+语言+证书文件（所有资料在做公证之前需先提交审核）",
        "expanded": true,
        "finished": false,
        "note": "",
        "items": [
            {
                "text": "大学毕业证，学士学位证中英文公证书，大学成绩单中英文公证书",
                "finished": false,
                "note": ""
            },
            {
                "text": "职业资格证书及其中英文公证书（如有，请提供）",
                "finished": false,
                "note": ""
            },
            {
                "text": "职业技能培训证书及其中英文公证书（如有，请提供）",
                "finished": false,
                "note": ""
            },
            {
                "text": "雅思G类成绩单原件（如有，请提供）",
                "finished": false,
                "note": ""
            }
        ]
    },
    {
        "text": "（三）工作经历证明文件（所有资料在做公证之前需先提交审核）",
        "expanded": true,
        "finished": false,
        "note": "",
        "items": [
            {
                "text": "工作证明元件及其中英文公证书",
                "finished": false,
                "note": ""
            },
            {
                "text": "最近两年的工资单及其中英文公证书",
                "finished": false,
                "note": ""
            },
            {
                "text": "最近两年的劳动合同及其中英文公证书",
                "finished": false,
                "note": ""
            },
            {
                "text": "最近两年的个人所得税税单及其中英文公证书",
                "finished": false,
                "note": ""
            },
            {
                "text": "最近两年的银行工资账户流水清单及其中英文公证书",
                "finished": false,
                "note": ""
            },
            {
                "text": "最近两年的缴纳社保记录及其中英文公证书",
                "finished": false,
                "note": ""
            },
            {
                "text": "个人中文/英文简历",
                "finished": false,
                "note": ""
            }
        ]
    },
    {
        "text": "(四）个人资产文件",
        "expanded": true,
        "finished": false,
        "note": "",
        "items": [
            {
                "text": "银行存款证明原件",
                "finished": false,
                "note": ""
            }
        ]
    }
]
const progress = [
    {
        "title": "材料准备",
        "passed": false,
        "note": ""
    },
    {
        "title": "名额申请",
        "passed": false,
        "note": ""
    },
    {
        "title": "提名获批",
        "passed": false,
        "note": ""
    },
    {
        "title": "提交联邦",
        "passed": false,
        "note": ""
    },
    {
        "title": "指纹/体检通知",
        "passed": false,
        "note": ""
    },
    {
        "title": "登录纸",
        "passed": false,
        "note": ""
    }
]

class CustomerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            id: this.props.data === undefined ? "" : this.props.data.id,
            name: this.props.data === undefined ? "" : this.props.data.name,
            status: this.props.data === undefined ? "" : this.props.data.status,
            gender: this.props.data === undefined ? "" : this.props.data.gender,
            birthDate: this.props.data === undefined ? "" : this.props.data.birthDate,
            maritalStatus: this.props.data === undefined ? "" : this.props.data.maritalStatus,
            address: this.props.data === undefined ? "" : this.props.data.address,
            phone: this.props.data === undefined ? "" : this.props.data.phone,
            alternativePhone: this.props.data === undefined ? "" : this.props.data.alternativePhone,
            wechatID: this.props.data === undefined ? "" : this.props.data.wechatID,
            email: this.props.data === undefined ? "" : this.props.data.email,
            passportID: this.props.data === undefined ? "" : this.props.data.passportID,
            passportIssueDate: this.props.data === undefined ? "" : this.props.data.passportIssueDate,
            passportExpireDate: this.props.data === undefined ? "" : this.props.data.passportExpireDate,
            serviceDetail: this.props.data === undefined ? "" : this.props.data.serviceDetail,
            education: this.props.data === undefined ? "" : this.props.data.education,
            major: this.props.data === undefined ? "" : this.props.data.major,
            employmentStatus: this.props.data === undefined ? "" : this.props.data.employmentStatus,
            employmentDepartment: this.props.data === undefined ? "" : this.props.data.employmentDepartment,
            employmentPosition: this.props.data === undefined ? "" : this.props.data.employmentPosition,
            employmentDuration: this.props.data === undefined ? "" : this.props.data.employmentDuration,
            IELTS: this.props.data === undefined ? "" : this.props.data.IELTS,
            IELTSDate: this.props.data === undefined ? "" : this.props.data.IELTSDate,
            subMember: this.props.data === undefined ? [] : this.props.data.subMember,
            user: this.props.user,
            success: true,
            submitted: false
        }
    }

    addMem = (e) => {
        e.preventDefault();
        var newsubMember = {
            age: "",
            circulatingAssets: "",
            education: "",
            employment: "",
            fixedAssets: "",
            id: uuidv4(),
            name: "",
            relation: ""
        }
        this.setState({
            subMember: [...this.state.subMember, newsubMember]
        })
    }

    handleDelete = (e, index) => {
        e.preventDefault();
        var newsubMember = [...this.state.subMember]
        newsubMember = [...newsubMember.slice(0, index),
        ...newsubMember.slice(index + 1)]

        this.setState({
            subMember: newsubMember
        })
        console.log(newsubMember)

    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    };

    addNewCustomer = () => {
        if (this.state.status.length === 0 ||
            this.state.name.length === 0 ||
            this.state.serviceDetail === 0) {
            this.setState({
                success: false
            })
        } else {
            this.setState({
                success: true,
                submitted: true
            })
            var newCustomer = this.state
            delete newCustomer["data"]
            newCustomer.contactHistory = []
            newCustomer.id = uuidv4()
            newCustomer.progress = progress
            newCustomer.checklst = checklst

            this.props.addNewCustomer(newCustomer)
        }
    }

    updateMember = (ele) => {
        this.setState({
            subMember: this.state.subMember.map(item =>
                item.id === ele.id ? ele : item)
        })
    }

    saveData = () => {
        if (this.state.status.length === 0 ||
            this.state.name.length === 0 ||
            this.state.serviceDetail === 0) {
            this.setState({
                success: false
            })
        } else {
            if (this.props.data) {
                var newData = this.props.customers
                var newCustomer = this.props.data

                newCustomer.IELTS = this.state.IELTS
                newCustomer.IELTSDate = this.state.IELTSDate
                newCustomer.address = this.state.address
                newCustomer.alternativePhone = this.state.alternativePhone
                newCustomer.birthDate = this.state.birthDate
                newCustomer.caseDepNote = this.state.caseDepNote
                newCustomer.education = this.state.education
                newCustomer.email = this.state.email
                newCustomer.employmentDepartment = this.state.employmentDepartment
                newCustomer.employmentDuration = this.state.employmentDuration
                newCustomer.employmentPosition = this.state.employmentPosition
                newCustomer.employmentStatus = this.state.employmentStatus
                newCustomer.gender = this.state.gender
                newCustomer.major = this.state.major
                newCustomer.maritalStatus = this.state.maritalStatus
                newCustomer.marketingDepNote = this.state.marketingDepNote
                newCustomer.name = this.state.name
                newCustomer.passportExpireDate = this.state.passportExpireDate
                newCustomer.passportID = this.state.passportID
                newCustomer.passportIssueDate = this.state.passportIssueDate
                newCustomer.phone = this.state.phone
                newCustomer.serviceDetail = this.state.serviceDetail
                newCustomer.subMember = this.state.subMember
                newCustomer.wechatID = this.state.wechatID
                newCustomer.status = this.state.status
                newCustomer.user = this.props.user

                newData = newData.map(item =>
                    item.id === newCustomer.id ? newCustomer : item)
                this.setState({
                    success: true
                })
                this.updateCustomer(newCustomer)
                    .then(data => {
                        this.props.saveCustomers(newData)
                    });

            }
        }
    }

    updateCustomer = (data) => {
        return axios.put("http://192.168.2.227:8080/api/customers/" + this.state.id, data)
            .then((res) => {
                return res.data
            })
            .catch(() => {
                console.log("Error")
            })
    }

    render() {
        return (
            <div className="content-container">
                {this.props.data === undefined ?
                    <div className="fixed-bar">
                        <Button onClick={this.addNewCustomer}>保存</Button>
                        {this.state.submitted === true ? <Redirect to="/customer" push={true} /> : null}
                    </div> : null}
                <div className="customer-edit">
                    <div>
                        <div className="status">
                            <div>
                                <span className="sec">客户状态</span>
                                {this.state.success === true ? null : <span style={{ color: "red", float: "right" }}>请选择客户状态 并 填写服务类型</span>}
                            </div>
                            <DropDownList
                                name="status"
                                data={["已签约", "未签约", "冻结", "有纠纷", "结束"]}
                                defaultValue={this.state.status || "状态"}
                                onChange={this.handleChange} />
                            <DropDownList
                                name="serviceDetail"
                                data={["咨询", "安雇 - 海外劳工", "安雇 - 国际学生",
                                    "安雇 - 紧缺职业", "联邦快速通道", "联邦自雇移民",
                                    "安省企业家移民", "联邦创业移民", "BC省雇主担保", "BC省企业家移民",
                                    "签证办理", "其他"]}
                                defaultValue={this.state.serviceDetail || "服务类型"}
                                onChange={this.handleChange} />
                        </div>
                        <div className="profile">
                            <div>
                                <span className="sec">客户个人资料</span>
                                {this.state.success === true ? null : <span style={{ color: "red", float: "right" }}>请填写姓名</span>}
                            </div>

                            <Input
                                name="name"
                                label="姓名 *"
                                required={true}
                                defaultValue={this.state.name}
                                onChange={this.handleChange}
                            />
                            <DropDownList
                                name="gender"
                                data={["男", "女"]}
                                defaultValue={this.state.gender || "性别"}
                                onChange={this.handleChange} />
                            <DateInput
                                name="birthDate"
                                label="出生日期"
                                format="MM/dd/yyyy"
                                defaultValue={this.state.birthDate}
                                onChange={this.handleChange}
                            />
                            <DropDownList
                                name="maritalStatus"
                                data={["未婚", "已婚", "离婚", "鳏寡", "同居", "分居"]}
                                defaultValue={this.state.maritalStatus || "婚姻状况"}
                                onChange={this.handleChange} />
                            <Input
                                name="address"
                                label="地址"
                                required={false}
                                defaultValue={this.state.address}
                                onChange={this.handleChange}
                            />
                            <Input
                                name="phone"
                                label="电话"
                                required={false}
                                defaultValue={this.state.phone}
                                onChange={this.handleChange}
                            />
                            <Input
                                name="alternativePhone"
                                label="备用电话"
                                required={false}
                                defaultValue={this.state.alternativePhone}
                                onChange={this.handleChange}
                            />
                            <Input
                                name="wechatID"
                                label="微信号"
                                required={false}
                                defaultValue={this.state.wechatID}
                                onChange={this.handleChange}
                            />
                            <Input
                                name="email"
                                label="邮箱"
                                required={false}
                                defaultValue={this.state.email}
                                onChange={this.handleChange}
                            />
                            <Input
                                name="passportID"
                                label="护照号"
                                required={false}
                                defaultValue={this.state.passportID}
                                onChange={this.handleChange}
                            />
                            <DateInput
                                name="passportIssueDate"
                                label="护照办理日期"
                                format="MM/dd/yyyy"
                                defaultValue={this.state.passportIssueDate}
                                onChange={this.handleChange}
                            />
                            <DateInput
                                name="passportExpireDate"
                                label="护照过期日期"
                                format="MM/dd/yyyy"
                                defaultValue={this.state.passportExpireDate}
                                onChange={this.handleChange}
                            />
                            <DropDownList
                                name="education"
                                data={["高中以下", "高中", "大学本科", "专科 - 大学专科", "中专 - 中等专业", "中技 - 中等技术", "技工学校", "研究生", "博士", "其他"]}
                                defaultValue={this.state.education || "教育程度"}
                                onChange={this.handleChange} />
                            <Input
                                name="major"
                                label="专业"
                                required={false}
                                defaultValue={this.state.major}
                                onChange={this.handleChange}
                            />
                            <DropDownList
                                name="employmentStatus"
                                data={["在职", "离职", "待业"]}
                                defaultValue={this.state.employmentStatus || "就业状况"}
                                onChange={this.handleChange} />
                            <Input
                                name="employmentDepartment"
                                label="就业部门"
                                required={false}
                                defaultValue={this.state.employmentDepartment}
                                onChange={this.handleChange}
                            />
                            <Input
                                name="employmentPosition"
                                label="职位"
                                required={false}
                                defaultValue={this.state.employmentPosition}
                                onChange={this.handleChange} />
                            <Input
                                name="employmentDuration"
                                label="在职时长"
                                required={false}
                                defaultValue={this.state.employmentDuration}
                                onChange={this.handleChange}
                            />
                            <Input
                                name="IELTS"
                                label="雅思"
                                required={false}
                                defaultValue={this.state.IELTS}
                                onChange={this.handleChange}
                            />
                            <DateInput
                                name="IELTSDate"
                                label="雅思考试日期"
                                format="MM/dd/yyyy"
                                defaultValue={this.state.IELTSDate}
                                onChange={this.handleChange}
                            />
                        </div>
                        {this.state.subMember.map((item, i) =>
                            <SubMember
                                data={item}
                                key={i + '-key'}
                                handleDelete={(e, index) => this.handleDelete(e, i)}
                                updateMember={this.updateMember}
                                num={i + 1}
                                last={i === this.state.subMember.length - 1 ? true : false}
                            />
                        )}
                        <div className="add-submember">
                            <Button onClick={(e) => this.addMem(e)}>+ 添加客户附带家属</Button>
                        </div>
                    </div>
                </div>
                {this.props.data === undefined ?
                    null :
                    <div className="text-right">
                        <button type="button" className="k-button k-primary" onClick={this.saveData}>
                            保存
                        </button>
                    </div>
                }
            </div>
        );
    }


}

export default CustomerEdit;
