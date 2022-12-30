import React from "react";
import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import tippy from "tippy.js";

import { IconH1, IconH2, IconList, IconListNumbers, IconBlockquote, IconSeparator, IconFileCode, IconFlag } from '@tabler/icons';

import CommandMenuList from "../CommandMenuList";

const CommandMenu = Extension.create({
  name: "command-menu",

  addOptions: {
    suggestion: {
      char: "/",
      startOfLine: false,
      items: ({ query }) => {
        return [
          {
            label: "Heading 1",
            icon: <IconH1 />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
            }
          },
          {
            label: "Heading 2",
            icon: <IconH2 />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
            }
          },
          {
            label: "Bullet List",
            icon: <IconList />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).toggleBulletList().run();
            }
          },
          {
            label: "Numbered List",
            icon: <IconListNumbers />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).toggleOrderedList().run();
            }
          },
          {
            label: "Blockquote",
            icon: <IconBlockquote />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).toggleBlockquote().run();
            }
          },
          {
            label: "Horizontal Rule",
            icon: <IconSeparator />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setHorizontalRule().run();
            }
          },
          {
            label: "Code Block",
            icon: <IconFileCode />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
            }
          },
          {
            label: "Callout - Gray",
            icon: <IconFlag color="gray" />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setCallout().run();
            }
          },
          {
            label: "Callout - Blue",
            icon: <IconFlag color="blue" />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setCallout().updateAttributes("callout", { 'data-color': "blue" }).run();
            }
          },
          {
            label: "Callout - Green",
            icon: <IconFlag color="green" />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setCallout().updateAttributes("callout", { 'data-color': "green" }).run();
            }
          },
          {
            label: "Callout - Yellow",
            icon: <IconFlag color="gold" />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setCallout().updateAttributes("callout", { 'data-color': "yellow" }).run();
            }
          },
          {
            label: "Callout - Red",
            icon: <IconFlag color="red" />,
            command: ({ editor, range }) => {
              editor.chain().focus().deleteRange(range).setCallout().updateAttributes("callout", { 'data-color': "red" }).run();
            }
          }
        ].filter((item) =>
          item.label.toLowerCase().startsWith(query.toLowerCase())
        );
      },
      render: () => {
        let component;
        let popup;

        return {
          onStart: (props) => {
            component = new ReactRenderer(CommandMenuList, {
              props,
              editor: props.editor,
            });

            if (!props.clientRect) {
              return;
            }

            popup = tippy("body", {
              getReferenceClientRect: props.clientRect,
              appendTo: () => document.body,
              content: component.element,
              showOnCreate: true,
              interactive: true,
              trigger: "manual",
              placement: "bottom-start",
            });
          },

          onUpdate(props) {
            component.updateProps(props);

            if (!props.clientRect) {
              return;
            }

            popup[0].setProps({
              getReferenceClientRect: props.clientRect,
            });
          },

          onKeyDown(props) {
            if (props.event.key === "Escape") {
              popup[0].hide();

              return true;
            }

            return component.ref?.onKeyDown(props);
          },

          onExit() {
            popup[0].destroy();
            component.destroy();
          },
        };
      },
      command: ({ editor, range, props }) => {
        props.command({ editor, range, props });
      },
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default CommandMenu;
