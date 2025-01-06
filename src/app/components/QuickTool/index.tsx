import React from 'react';
import { Button } from 'antd';
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
const BoldButton = ({ editor }) => {
    if (!editor) return null

    return (
        <div className=' space-x-2 space-y-2'>
            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>
                H1
            </Button>
            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
                H2
            </Button>
            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
                H3
            </Button>
            <Button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
                Paragraph
            </Button>
            <Button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
                Bold
            </Button>
            <Button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
                Italic
            </Button>
            <Button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
                Strike
            </Button>
            <Button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
                Highlight
            </Button>
            <Button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
                Left
            </Button>
            <Button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
                Center
            </Button>
            <Button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
                Right
            </Button>
            <Button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
                Justify
            </Button>
            <Button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
                Insert table
            </Button>
            <Button onClick={() => editor.chain().focus().insertContent(tableHTML, {
                parseOptions: {
                    preserveWhitespace: false,
                },
            }).run()}>
                Insert HTML table
            </Button>
            <Button onClick={() => editor.chain().focus().addColumnBefore().run()} disabled={!editor.can().addColumnBefore()}>
                Add column before
            </Button>
            <Button onClick={() => editor.chain().focus().addColumnAfter().run()} disabled={!editor.can().addColumnAfter()}>
                Add column after
            </Button>
            <Button onClick={() => editor.chain().focus().deleteColumn().run()} disabled={!editor.can().deleteColumn()}>
                Delete column
            </Button>
            <Button onClick={() => editor.chain().focus().addRowBefore().run()} disabled={!editor.can().addRowBefore()}>
                Add row before
            </Button>
            <Button onClick={() => editor.chain().focus().addRowAfter().run()} disabled={!editor.can().addRowAfter()}>
                Add row after
            </Button>
            <Button onClick={() => editor.chain().focus().deleteRow().run()} disabled={!editor.can().deleteRow()}>
                Delete row
            </Button>
            <Button onClick={() => editor.chain().focus().deleteTable().run()} disabled={!editor.can().deleteTable()}>
                Delete table
            </Button>
            <Button onClick={() => editor.chain().focus().mergeCells().run()} disabled={!editor.can().mergeCells()}>
                Merge cells
            </Button>
            <Button onClick={() => editor.chain().focus().splitCell().run()} disabled={!editor.can().splitCell()}>
                Split cell
            </Button>
            <Button onClick={() => editor.chain().focus().toggleHeaderColumn().run()} disabled={!editor.can().toggleHeaderColumn()}>
                ToggleHeaderColumn
            </Button>
            <Button onClick={() => editor.chain().focus().toggleHeaderRow().run()} disabled={!editor.can().toggleHeaderRow()}>
                Toggle header row
            </Button>
            <Button onClick={() => editor.chain().focus().toggleHeaderCell().run()} disabled={!editor.can().toggleHeaderCell()}>
                Toggle header cell
            </Button>
            <Button onClick={() => editor.chain().focus().mergeOrSplit().run()} disabled={!editor.can().mergeOrSplit()}>
                Merge or split
            </Button>
            <Button onClick={() => editor.chain().focus().setCellAttribute('backgroundColor', '#FAF594').run()} disabled={!editor.can().setCellAttribute('backgroundColor', '#FAF594')}>
                Set cell attribute
            </Button>
            <Button onClick={() => editor.chain().focus().fixTables().run()} disabled={!editor.can().fixTables()}>
                Fix tables
            </Button>
            <Button onClick={() => editor.chain().focus().goToNextCell().run()} disabled={!editor.can().goToNextCell()}>
                Go to next cell
            </Button>
            <Button onClick={() => editor.chain().focus().goToPreviousCell().run()} disabled={!editor.can().goToPreviousCell()}>
                Go to previous cell
            </Button>
        </div>
    );
};

export default BoldButton;