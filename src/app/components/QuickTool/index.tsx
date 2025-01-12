import React from 'react';
import { Button, Tooltip, Dropdown, Space } from 'antd';
import {
    BoldOutlined, ItalicOutlined, StrikethroughOutlined,
    HighlightOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined,
    FontSizeOutlined,
    TableOutlined,
    BarsOutlined,
    CodeOutlined,
    DesktopOutlined

} from '@ant-design/icons';
export const tableHTML = `
  <table style="width:100%">
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
  </table>
`

const BoldButton = ({ editor, isTable = true }) => {
    if (!editor) return null
    const buttons = isTable ? [
        {
            label: <Space onClick={() => editor.chain().focus().insertContent(tableHTML, {
                parseOptions: {
                    preserveWhitespace: false,
                },
            }).run()}>
                插入HTML表格
            </Space>,
            key: 'insertTable',
            disabled: !editor.can().insertContent(tableHTML)
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()}>
                在前面添加列
            </Button>,
            key: 'addColumnBefore',
            disabled: !editor.can().addColumnBefore()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()}>
                在后面添加列
            </Button>,
            key: 'addColumnAfter',
            disabled: !editor.can().addColumnAfter()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()}>
                删除列
            </Button>,
            key: 'deleteColumn',
            disabled: !editor.can().deleteColumn()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()}>
                在前面添加行
            </Button>,
            key: 'addRowBefore',
            disabled: !editor.can().addRowBefore()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()}>
                在后面添加行
            </Button>,
            key: 'addRowAfter',
            disabled: !editor.can().addRowAfter()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()}>
                删除行
            </Button>,
            key: 'deleteRow',
            disabled: !editor.can().deleteRow()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()}>
                删除表格
            </Button>,
            key: 'deleteTable',
            disabled: !editor.can().deleteTable()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().mergeCells().run()} disabled={!editor.can().mergeCells()}>
                合并单元格
            </Button>,
            key: 'mergeCells',
            disabled: !editor.can().mergeCells()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().splitCell().run()} disabled={!editor.can().splitCell()}>
                拆分单元格
            </Button>,
            key: 'splitCell',
            disabled: !editor.can().splitCell()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().toggleHeaderColumn().run()} disabled={!editor.can().toggleHeaderColumn()}>
                切换表头列
            </Button>,
            key: 'toggleHeaderColumn',
            disabled: !editor.can().toggleHeaderColumn()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().toggleHeaderRow().run()} disabled={!editor.can().toggleHeaderRow()}>
                切换表头行
            </Button>,
            key: 'toggleHeaderRow',
            disabled: !editor.can().toggleHeaderRow()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().toggleHeaderCell().run()} disabled={!editor.can().toggleHeaderCell()}>
                切换表头单元格
            </Button>,
            key: 'toggleHeaderCell',
            disabled: !editor.can().toggleHeaderCell()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().mergeOrSplit().run()} disabled={!editor.can().mergeOrSplit()}>
                合并或拆分
            </Button>,
            key: 'mergeOrSplit',
            disabled: !editor.can().mergeOrSplit()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()} disabled={!editor.can().setCellAttribute('backgroundColor', '#FAF594')}>
                设置单元格属性
            </Button>,
            key: 'setCellAttribute',
            disabled: !editor.can().setCellAttribute('backgroundColor', '#FAF594')
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().fixTables().run()} disabled={!editor.can().fixTables()}>
                修复表格
            </Button>,
            key: 'fixTables',
            disabled: !editor.can().fixTables()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().goToNextCell().run()} disabled={!editor.can().goToNextCell()}>
                前往下一个单元格
            </Button>,
            key: 'goToNextCell',
            disabled: !editor.can().goToNextCell()
        },
        {
            label: <Button type="text" onClick={() => editor.chain().focus().goToPreviousCell().run()} disabled={!editor.can().goToPreviousCell()}>
                前往上一个单元格
            </Button>,
            key: 'goToPreviousCell',
            disabled: !editor.can().goToPreviousCell()
        }
    ] : [];
    return (
        <div className=' space-x-2 space-y-2'>
            <Dropdown menu={{
                items: [{
                    label: <Space onClick={() => {
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }}> {'H1'}</Space>, key: 'left',

                },

                {
                    label: <Space onClick={() => {
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }}> {'H2'}</Space>, key: 'center',
                },

                {
                    label: <Space onClick={() => {
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }}> {'H3'}</Space>, key: 'right',
                },
                ]
            }} trigger={['hover']}>
                <Space>
                    <Button icon={<FontSizeOutlined />}></Button>
                </Space>
            </Dropdown>
            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</Button>
            <Button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
                Paragraph
            </Button>
            <Tooltip title='加粗'>
                <Button type='primary' icon={<BoldOutlined />} onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>

                </Button>
            </Tooltip>
            <Tooltip title='斜体'>
                <Button type='primary' icon={<ItalicOutlined />} onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>

                </Button>
            </Tooltip>
            <Tooltip title="删除">
                <Button icon={<StrikethroughOutlined />} onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>

                </Button>
            </Tooltip>
            <Tooltip title="高亮">
                <Button icon={<HighlightOutlined></HighlightOutlined>} onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>

                </Button>
            </Tooltip>
            <Tooltip title="左对齐">
                <Button icon={<AlignLeftOutlined />} onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>

                </Button>
            </Tooltip>
            <Tooltip title="居中对齐">
                <Button icon={<AlignCenterOutlined />} onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>

                </Button>
            </Tooltip>
            <Tooltip title="右对齐">
                <Button icon={<AlignRightOutlined />} onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>

                </Button>
            </Tooltip>
            <Tooltip title="无序列表">
                <Button
                    icon={<BarsOutlined></BarsOutlined>}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >

                </Button>
            </Tooltip>
            <Tooltip title="编码">
                <Button
                    icon={<CodeOutlined></CodeOutlined>}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                </Button>
            </Tooltip>
            <Tooltip title="插入代码">
                <Button icon={<CodeOutlined></CodeOutlined>} onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}></Button>
            </Tooltip>
            {isTable && <>
                <Button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
                    Justify
                </Button>
                <Tooltip title="插入表格">
                    <Button icon={<TableOutlined />} onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>

                    </Button>
                </Tooltip>
                <Dropdown menu={{ items: buttons }}>
                    <Space>
                        <Button icon={<TableOutlined />}></Button>
                    </Space>
                </Dropdown>
            </>}

        </div>
    );
};

export default BoldButton;