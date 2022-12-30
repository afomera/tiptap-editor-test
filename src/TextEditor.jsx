import React, { useRef } from "react";

import { useEditor, EditorContent } from '@tiptap/react'
import Dropcursor from "@tiptap/extension-dropcursor";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from "@tiptap/extension-text-align";

import Callout from "./editor/extensions/Callout";
import CommandMenu from "./editor/extensions/CommandMenu";

import EditorBubbleMenu from "./editor/BubbleMenu";
import MenuBar from  "./editor/MenuBar";

const TextEditor = ({ 
  content,
  placeholder="Write something...",
  showMenuBar = true,
  bubbleMenuOptions = { highlight: true }
}) => {
  const editorRef = useRef(null);

  const onUpdate = (element, editor) => {
    // Emit a custom event with the current editor content
    const event = new CustomEvent('editor:update',{
      detail: { html: editor.getHTML(), json: editor.getJSON() },
      bubbles: true
    });

    element.dispatchEvent(event)
  }

  const editor = useEditor({
    extensions: [
      Callout,
      CommandMenu,
      Dropcursor.configure({
        color: 'var(--editor-content-focus-color)'
      }),
      Focus.configure({
        mode: "shallowest"
      }),
      Highlight.configure({
        multicolor: true
      }),
      Link.configure({
        openOnClick: false,
        protocols: ["https", "mailto"]
      }),
      Placeholder.configure({
        placeholder: placeholder
      }),
      StarterKit.configure({
        dropcursor: false,
        heading: {
          levels: [1, 2]
        }
      }),
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

      <EditorBubbleMenu editor={editor} bubbleMenuOptions={bubbleMenuOptions} />

      <div className="editor--content">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}


export default TextEditor;
