
import React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';

import { Editor, EditorTools } from '@progress/kendo-react-editor';

const {
    Bold, Italic, Underline
} = EditorTools;

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onChange = (event) => {
        this.setState({ value: event.value });
    }


    render() {
        return (
            <div className="copy-clipboard">
                {this.props.type === 0 ?
                    <Dialog title={"生成工作计划"} onClose={this.props.toggleDialog}>
                        <Editor
                            tools={[
                                [Bold, Italic, Underline]
                            ]}
                            contentStyle={{ height: 600 }}
                            defaultContent={this.props.content}
                        />
                    </Dialog> :
                    <Dialog title={"生成工作总结"} onClose={this.props.toggleDialog}>
                        <Editor
                            tools={[
                                [Bold, Italic, Underline],
                            ]}
                            contentStyle={{ height: 600 }}
                            defaultContent={this.props.content}
                        />
                    </Dialog>}
            </div>
        );
    }
}

export default Modal;
