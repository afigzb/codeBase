import { css } from '../../../Dependency/lit-core.min.js';

export default [
    css`
        .tree-node { 
            margin-left: 1.5rem; 
            position: relative; 
        }
        .tree-node::before {
            content: '';
            position: absolute;
            left: -1.5rem;
            top: 0;
            bottom: 0;
            width: 1px;
            background-color: #e2e8f0;
            opacity: 0.6;
        }
        .tree-node:last-child::before { 
            height: 1.5rem; 
        }
        .tree-node-content {
            display: flex;
            align-items: center;
            padding: 0.5rem 0;
            position: relative;
            transition: all 0.2s ease;
        }
        .tree-node-content:hover { 
            background-color: transparent; 
        }
        .tree-node-content::before {
            content: '';
            position: absolute;
            left: -1.5rem;
            top: 50%;
            width: 1.5rem;
            height: 1px;
            background-color: #e2e8f0;
            opacity: 0.6;
        }
        .tree-node-children {
            margin-left: 1.5rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tree-node-children.collapsed {
            display: none;
        }
    `,
    css`
        .tree-node-checkbox {
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 0.375rem;
            border: 2px solid #cbd5e1;
            cursor: pointer;
            position: relative;
            transition: all 0.2s ease;
            background-color: white;
            flex-shrink: 0;
        }
        .tree-node-checkbox:hover {
            border-color: #60a5fa;
            background-color: #f0f9ff;
        }
        .tree-node-checkbox[data-checked="true"] {
            background-color: #3b82f6;
            border-color: #3b82f6;
        }
        .tree-node-checkbox[data-checked="true"]::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 45%;
            width: 6px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: translate(-50%, -50%) rotate(45deg);
        }
        .tree-node-checkbox[data-indeterminate="true"] {
            background-color: #3b82f6;
            border-color: #3b82f6;
        }
        .tree-node-checkbox[data-indeterminate="true"]::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 10px;
            height: 2px;
            background-color: white;
            transform: translate(-50%, -50%);
            border-radius: 1px;
        }
    `,
    css`
        .tree-node-toggle {
            width: 1.5rem;
            height: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-right: 0.5rem;
            color: #64748b;
            transition: all 0.2s ease;
            border-radius: 0.375rem;
            flex-shrink: 0;
            position: relative;
        }
        .tree-node-toggle:hover {
            background-color: #f1f5f9;
            color: #3b82f6;
        }
        .tree-node-toggle:active {
            transform: scale(0.95);
        }
        .tree-node-toggle::before {
            content: '▼';
            font-size: 0.75rem;
            transition: transform 0.2s ease;
        }
        .tree-node-toggle.collapsed::before {
            transform: rotate(-90deg);
        }
    `,
    css`
        .tree-node-name {
            margin-left: 0.75rem;
            color: #1e293b;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.2s ease;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
        }
        .tree-node-name[data-highlight="true"] {
            color: #2563eb;
            font-weight: 600;
        }
        .tree-node-selectable {
            display: flex;
            align-items: center;
            padding: 0.25rem 0.5rem;
            border-radius: 0.375rem;
            transition: all 0.2s ease;
        }
        .tree-node-selectable:hover {
            background-color: #eff6ff;
        }
        .tree-node-selectable:hover .tree-node-name {
            color: #2563eb;
        }
        .tree-node-selectable[data-checked="true"] {
            background-color: #eff6ff;
        }
        .tree-node-selectable[data-checked="true"] .tree-node-name {
            color: #2563eb;
        }
        .tree-node-name-no-checkbox {
            margin-left: 0;
            position: relative;
            padding-left: 1.5rem;
        }
        .tree-node-name-no-checkbox::before {
            content: '';
            position: absolute;
            left: 0.5rem;
            top: 50%;
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background-color: #cbd5e1;
            transform: translateY(-50%);
            transition: all 0.2s ease;
        }
        .tree-node-name-no-checkbox:hover::before {
            background-color: #60a5fa;
        }
        .tree-node-name-no-checkbox[data-checked="true"]::before {
            background-color: #3b82f6;
        }
    `
];
