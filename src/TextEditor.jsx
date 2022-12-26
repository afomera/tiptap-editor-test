import React, { useRef } from "react";

import { useEditor, EditorContent } from '@tiptap/react'
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align";

import EditorBubbleMenu from "./editor/BubbleMenu";
import MenuBar from  "./editor/MenuBar";

const TextEditor = ({ content, showMenuBar = true }) => {
  const editorRef = useRef(null);

  const onUpdate = (element, editor) => {
    // Emit a custom event with the current editor content
    const event = new CustomEvent('editor:update', { detail: editor.getHTML(), bubbles: true })

    element.dispatchEvent(event)
  }

  const editor = useEditor({
    extensions: [
      Focus.configure({
        mode: "shallowest"
      }),
      Highlight,
      Placeholder.configure({
        placeholder: 'Write something awesome...'
      }),
      StarterKit,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => onUpdate(editorRef.current, editor),
  })

  return (
    <div className="editor" ref={editorRef}>
      {showMenuBar && <MenuBar editor={editor} />}

      <EditorBubbleMenu editor={editor} />

      <div className="editor--content">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
export default TextEditor;
