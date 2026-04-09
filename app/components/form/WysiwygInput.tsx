"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { FieldError } from "react-hook-form";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Undo,
  Redo,
} from "lucide-react";

interface WysiwygInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  hasError?: FieldError;
}

export const WysiwygInput: React.FC<WysiwygInputProps> = ({
  value,
  onChange,
  placeholder = "Enter content...",
  label,
  isRequired,
  hasError,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        className:
          "prose prose-sm max-w-none focus:outline-none min-h-[350px] px-4 py-3",
      },
    },
  });

  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div
        className={`border rounded-lg overflow-hidden bg-white ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
      >
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("bold") ? "bg-gray-300" : ""
            }`}
            title="Bold"
          >
            <Bold className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("italic") ? "bg-gray-300" : ""
            }`}
            title="Italic"
          >
            <Italic className="size-4" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
            }`}
            title="Heading"
          >
            <Heading2 className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("bulletList") ? "bg-gray-300" : ""
            }`}
            title="Bullet List"
          >
            <List className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("orderedList") ? "bg-gray-300" : ""
            }`}
            title="Numbered List"
          >
            <ListOrdered className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("blockquote") ? "bg-gray-300" : ""
            }`}
            title="Quote"
          >
            <Quote className="size-4" />
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo className="size-4" />
          </button>
        </div>

        {/* Editor */}
        <div className="min-h-[400px] p-4">
          <style jsx global>{`
            .ProseMirror p.is-editor-empty:first-child::before {
              color: #9ca3af;
              content: attr(data-placeholder);
              float: left;
              height: 0;
              pointer-events: none;
            }
            .ProseMirror:focus {
              outline: none;
            }
          `}</style>
          <EditorContent editor={editor} />
        </div>
      </div>
      {hasError && (
        <p className="text-red-500 text-xs mt-1">{hasError.message}</p>
      )}
    </div>
  );
};
