import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import styled from 'styled-components';
import { FaBold, FaItalic, FaListUl, FaListOl, FaQuoteLeft, FaUndo, FaRedo } from 'react-icons/fa';

const EditorWrapper = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: ${props => props.theme.borderRadius.md};
  overflow: hidden;
  transition: border-color ${props => props.theme.transitions.fast};
  
  &:focus-within {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(140, 198, 62, 0.1);
  }
  
  ${props => props.error && `
    border-color: ${props.theme.colors.danger};
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
  `}
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border-bottom: 1px solid #e2e8f0;
  background: ${props => props.theme.colors.lightGray};
  flex-wrap: wrap;
`;

const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid transparent;
  border-radius: ${props => props.theme.borderRadius.sm};
  background: transparent;
  color: ${props => props.theme.colors.mediumGray};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: rgba(140, 198, 62, 0.1);
    color: ${props => props.theme.colors.primary};
  }
  
  &.is-active {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background: #e2e8f0;
  margin: 0 ${props => props.theme.spacing[2]};
`;

const EditorArea = styled.div`
  .ProseMirror {
    padding: ${props => props.theme.spacing[4]};
    min-height: 120px;
    outline: none;
    font-family: ${props => props.theme.fonts.body};
    font-size: ${props => props.theme.fontSizes.base};
    line-height: 1.6;
    color: ${props => props.theme.colors.darkGray};
    
    p {
      margin-bottom: ${props => props.theme.spacing[4]};
      
      &:last-child {
        margin-bottom: 0;
      }
      
      &.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: ${props => props.theme.colors.mediumGray};
        pointer-events: none;
        height: 0;
      }
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-weight: ${props => props.theme.fontWeights.semibold};
      margin-bottom: ${props => props.theme.spacing[3]};
      margin-top: ${props => props.theme.spacing[6]};
      
      &:first-child {
        margin-top: 0;
      }
    }
    
    h1 { font-size: ${props => props.theme.fontSizes['2xl']}; }
    h2 { font-size: ${props => props.theme.fontSizes.xl}; }
    h3 { font-size: ${props => props.theme.fontSizes.lg}; }
    
    ul, ol {
      margin-bottom: ${props => props.theme.spacing[4]};
      padding-left: ${props => props.theme.spacing[6]};
      
      li {
        margin-bottom: ${props => props.theme.spacing[2]};
      }
    }
    
    blockquote {
      border-left: 4px solid ${props => props.theme.colors.primary};
      padding-left: ${props => props.theme.spacing[4]};
      margin: ${props => props.theme.spacing[4]} 0;
      font-style: italic;
      color: ${props => props.theme.colors.mediumGray};
    }
    
    strong {
      font-weight: ${props => props.theme.fontWeights.semibold};
    }
    
    em {
      font-style: italic;
    }
  }
`;

const RichTextEditor = ({ value, onChange, placeholder = "Enter description...", error }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorWrapper error={error}>
      <Toolbar>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="Bold"
        >
          <FaBold />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic"
        >
          <FaItalic />
        </ToolbarButton>
        
        <Separator />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          title="Heading"
        >
          H2
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          title="Subheading"
        >
          H3
        </ToolbarButton>
        
        <Separator />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title="Bullet List"
        >
          <FaListUl />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
          title="Numbered List"
        >
          <FaListOl />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
          title="Quote"
        >
          <FaQuoteLeft />
        </ToolbarButton>
        
        <Separator />
        
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <FaUndo />
        </ToolbarButton>
        
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <FaRedo />
        </ToolbarButton>
      </Toolbar>
      
      <EditorArea>
        <EditorContent editor={editor} />
      </EditorArea>
    </EditorWrapper>
  );
};

export default RichTextEditor;