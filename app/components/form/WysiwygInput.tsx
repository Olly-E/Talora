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
          "prose prose-sm max-w-none focus:outline-none min-h-87.5 px-4 py-3",
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
        <div className="min-h-100 p-4">
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
            .ProseMirror ul {
              list-style-type: disc;
              padding-left: 1.5rem;
              margin: 1rem 0;
            }
            .ProseMirror ol {
              list-style-type: decimal;
              padding-left: 1.5rem;
              margin: 1rem 0;
            }
            .ProseMirror ul li,
            .ProseMirror ol li {
              margin: 0.25rem 0;
              padding-left: 0.25rem;
            }
            .ProseMirror ul ul {
              list-style-type: circle;
              margin: 0.5rem 0;
            }
            .ProseMirror ol ol {
              list-style-type: lower-alpha;
              margin: 0.5rem 0;
            }
            .ProseMirror h2 {
              font-size: 1.5rem;
              font-weight: 700;
              margin: 1.5rem 0 1rem 0;
              line-height: 1.3;
            }
            .ProseMirror blockquote {
              border-left: 3px solid #e5e7eb;
              padding-left: 1rem;
              margin: 1rem 0;
              color: #6b7280;
              font-style: italic;
            }
            .ProseMirror p {
              margin: 0.75rem 0;
              line-height: 1.6;
            }
            .ProseMirror p:first-child {
              margin-top: 0;
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
