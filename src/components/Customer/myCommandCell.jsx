
import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';

export function MyCommandCell({ edit, remove, add, update, discard, cancel, editField }) {
    return class extends GridCell {
        render() {
            const { dataItem } = this.props;
            const inEdit = dataItem[editField];
            const isNewItem = dataItem.id === undefined;

            return inEdit ? (
                <td className="k-command-cell">
                    <button
                        className="k-button k-grid-save-command"
                        onClick={(e) => isNewItem ? add(e, dataItem) : update(e, dataItem)}
                    >
                        {isNewItem ? '添加' : '更新'}
                    </button>
                    <button
                        className="k-button k-grid-cancel-command"
                        onClick={(e) => isNewItem ? discard(e, dataItem) : cancel(e, dataItem)}
                    >
                        {isNewItem ? '删除' : '取消'}
                    </button>
                </td>
            ) : (
                    <td className="k-command-cell">
                        <button
                            className="k-primary k-button k-grid-edit-command"
                            onClick={(e) => edit(e, dataItem)}
                        >
                            编辑
                    </button>
                        <button
                            className="k-button k-grid-remove-command"
                            onClick={(e) => remove(e, dataItem)}
                        >
                            删除
                    </button>
                    </td>
                );
        }
    }
};
