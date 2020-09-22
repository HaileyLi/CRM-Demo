
import React from 'react';
import { Input } from '@progress/kendo-react-inputs';

import { TreeView, processTreeViewItems, handleTreeViewCheckChange } from '@progress/kendo-react-treeview';
import axios from 'axios'
class CostomerChecklst extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.data.checklst,
            singleMode: false,
            checkChildren: true,
            checkParents: true,
            check: {
                ids: this.props.data.checklst.map((item, i) =>
                    item.items.map((it, index) =>
                        it.finished === true ? i + "_" + index : "")
                ).flat().filter(item => item !== ""),
                applyCheckIndeterminate: true
            },
            note_arr: this.props.data.checklst.map((item, i) => {
                var subsec = item.items.map(it => it.note)
                return [item.note, ...subsec]
            }).flat()
        }
    }

    onCheckChange = (event) => {
        const { singleMode, checkChildren, checkParents } = this.state;
        const settings = { singleMode, checkChildren, checkParents };
        this.setState({ check: handleTreeViewCheckChange(event, this.state.check, this.state.items, settings) });
    }

    handleChange = (event, i) => {
        const target = event.target;
        const value = target.value;

        var newNotearr = this.state.note_arr
        newNotearr = newNotearr.map((item, index) => index === i ? value : item)

        this.setState({
            note_arr: newNotearr
        })
    };

    saveData = () => {
        var newData = this.props.customers
        var newCustomer = this.props.data
        var res = this.state.check.ids
        var parentRes = res.map(item => Number(item[0]))
        newCustomer.checklst = newCustomer.checklst.map((item, i) => {
            var parentInd = [0, 8, 13, 21]
            item.finished = parentRes.indexOf(i) !== -1 ? true : false
            item.note = this.state.note_arr[parentInd[i]]
            return item
        })
        newCustomer.checklst = newCustomer.checklst.map((item, i) => {
            var childRes = res.filter(item => Number(item[0]) === i).map(item => Number(item[2]))
            var parentInd = [0, 8, 13, 21]
            item.items = item.items.map((it, ind) => {
                it.finished = childRes.indexOf(ind) !== -1 ? true : false
                it.note = this.state.note_arr[parentInd[i] + 1 + ind]
                return it
            })
            return item
        })
        newData = newData.map(item =>
            item.id === newCustomer.id ? newCustomer : item)
        this.updateCustomer(newCustomer)
            .then(data => {
                this.props.saveCustomers(newData)
            });
    }

    updateCustomer = (data) => {
        return axios.put("http://192.168.2.227:8080/api/customers/" + data.id, data)
            .then((res) => {
                return res.data
            })
            .catch(() => {
                console.log("Error")
            })
    }


    render() {
        return (
            <div>
                <div className="checklst">
                    <TreeView
                        data={processTreeViewItems(this.state.items, { check: this.state.check })}
                        checkboxes={true}
                        onCheckChange={this.onCheckChange}
                    />
                    <div className="checklst-note">
                        {this.state.note_arr.map((element, i) => {
                            return <Input
                                placeholder={"备忘录" + i}
                                key={i + "key"}
                                defaultValue={element}
                                onChange={(event) => this.handleChange(event, i)} />
                        })}

                    </div>

                </div>
                <div className="text-right">
                    <button type="button" className="k-button k-primary" onClick={this.saveData}>
                        保存
                 </button>
                </div>
            </div>
        );
    }
    onCheckParentsChange = ({ target: { checked } }) => {
        let { singleMode } = this.state;
        if (checked) {
            singleMode = false;
        }
        this.setState({ singleMode, checkParents: checked });
    }
}

export default CostomerChecklst;
