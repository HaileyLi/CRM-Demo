
import React from 'react';
import { Editor, EditorTools, EditorUtils } from '@progress/kendo-react-editor';
import axios from 'axios'
const {
    Bold, Italic, Underline, Strikethrough, Subscript, Superscript,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Indent, Outdent, OrderedList, UnorderedList,
    Undo, Redo, FontSize, FontName, FormatBlock,
    Link, Unlink, InsertImage, ViewHtml,
    InsertTable,
    AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter,
    DeleteRow, DeleteColumn, DeleteTable,
    MergeCells, SplitCell
} = EditorTools;

class CustomerCaseNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.props.data.caseDepNote
        }
    }

    handleExecute = () => {
        const view = this.editor.view;
        const content = "<div>" + EditorUtils.getHtml(view.state) + '</div>'
        this.setState({
            content: content
        })
    }

    saveData = () => {
        var newData = this.props.customers
        var newCustomer = this.props.data
        newCustomer.caseDepNote = this.state.content
        newData = newData.map((item, i) => {
            return item.id === newCustomer.id ? newCustomer : item
        })
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
                <Editor
                    tools={[
                        [Bold, Italic, Underline, Strikethrough],
                        [Subscript, Superscript],
                        [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                        [Indent, Outdent],
                        [OrderedList, UnorderedList],
                        FontSize, FontName, FormatBlock,
                        [Undo, Redo],
                        [Link, Unlink, InsertImage, ViewHtml],
                        [InsertTable],
                        [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                        [DeleteRow, DeleteColumn, DeleteTable],
                        [MergeCells, SplitCell]
                    ]}
                    ref={editor => this.editor = editor}
                    contentStyle={{ height: 600 }}
                    defaultContent={this.state.content}
                    onExecute={this.handleExecute}
                    onBlur={this.handleExecute}
                />
                <div className="text-right">
                    <button type="button" className="k-button k-primary" onClick={this.saveData}>
                        保存
                        </button>
                </div>
            </div>
        );
    }
}

export default CustomerCaseNote;
