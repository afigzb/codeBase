import { LitElement, html } from '../../../Dependency/lit-core.min.js';
import treeSelectStyles from './TreeSelect.css.js';

// 数据处理工具
const TreeUtils = {
    validateNode(node) {
        if (!node.id || !node.name) {
            return false;
        }
        return true;
    },

    buildNodeMetadata(node, parentPath = '') {
        const path = parentPath ? `${parentPath}/${node.id}` : node.id.toString();
        const level = path.split('/').length - 1;
        
        return {
            ...node,
            path,
            level,
            children: [],
            parent: null,
            hasChildren: false,
            isLeaf: true,
            expanded: node.expanded ?? true,
            selected: node.selected ?? false,
            type: node.type ?? 'folder',
            icon: node.icon ?? (node.type === 'file' ? 'file' : 'folder'),
            disabled: node.disabled ?? false,
            order: node.order ?? 0,
            checked: false,
            indeterminate: false,
            hidden: false
        };
    },

    convertToTree(flatData) {
        const nodesWithMetadata = flatData
            .filter(this.validateNode)
            .map(node => this.buildNodeMetadata(node));

        const map = new Map(nodesWithMetadata.map(node => [node.id, node]));
        const tree = [];

        nodesWithMetadata.forEach(node => {
            if (node.parentId === null) {
                tree.push(node);
            } else {
                const parent = map.get(node.parentId);
                if (parent) {
                    parent.children.push(node);
                    parent.hasChildren = true;
                    parent.isLeaf = false;
                    node.parent = parent;
                }
            }
        });

        this.sortNodes(tree);
        return tree;
    },

    sortNodes(nodes) {
        nodes.sort((a, b) => a.order - b.order);
        nodes.forEach(node => {
            if (node.hasChildren) {
                this.sortNodes(node.children);
            }
        });
    },

    // 构建节点数据结构,避免传出数据太多太乱
    buildNodeData(node) {
        return {
            id: node.id,
            name: node.name,
            path: node.path,
            type: node.type,
            icon: node.icon,
            level: node.level,
            parentId: node.parent ? node.parent.id : null,
            children: []
        };
    },

    // 获取完整子树
    getFullSubtree(node) {
        const nodeData = this.buildNodeData(node);
        if (node.hasChildren) {
            nodeData.children = node.children.map(child => this.getFullSubtree(child));
        }
        return nodeData;
    },

    // 获取选中的节点（数据驱动）
    getSelectedNodes(treeData) {
        const selectedRoots = [];
        
        const findSelectedRoots = (nodes) => {
            nodes.forEach(node => {
                if (node.checked && !node.indeterminate) {
                    // 完全选中的节点作为根节点
                    selectedRoots.push(node);
                } else if (node.checked || node.indeterminate) {
                    // 部分选中，继续向下查找
                    if (node.hasChildren) {
                        findSelectedRoots(node.children);
                    }
                }
            });
        };

        findSelectedRoots(treeData);
        return selectedRoots.map(node => this.getFullSubtree(node));
    },

    // 获取所有选中的节点（不考虑父子关系）
    getAllSelectedNodes(treeData) {
        const selectedNodes = [];
        
        const findAllSelected = (nodes) => {
            nodes.forEach(node => {
                if (node.checked) {
                    selectedNodes.push(this.buildNodeData(node));
                }
                if (node.hasChildren) {
                    findAllSelected(node.children);
                }
            });
        };

        findAllSelected(treeData);
        return selectedNodes;
    },

    // 应用搜索过滤
    applySearchFilter(nodes, keyword) {
        if (!keyword) {
            nodes.forEach(node => {
                node.hidden = false;
                if (node.hasChildren) {
                    this.applySearchFilter(node.children, keyword);
                }
            });
            return;
        }

        nodes.forEach(node => {
            const isMatch = node.name.toLowerCase().includes(keyword.toLowerCase());
            node.hidden = !isMatch;
            
            if (node.hasChildren) {
                this.applySearchFilter(node.children, keyword);
                // 如果子节点有匹配的，父节点也显示
                if (node.children.some(child => !child.hidden)) {
                    node.hidden = false;
                }
            }
        });
    }
};

export class TreeSelect extends LitElement {
    static styles = treeSelectStyles;

    static properties = {
        data: { type: Array },
        selectedNodes: { type: Array },
        showCheckbox: {
            type: Boolean,
            attribute:'show-checkbox',
            converter: {
                fromAttribute(value) {
                    return value !== 'false'; // "false" => false，其它 => true
                }
            }
        },
        autoSelectParent: {
            type: Boolean,
            attribute: 'auto-select-parent',
            converter: {
                fromAttribute(value) {
                    return value !== 'false'; // "false" => false，其它 => true
                }
            }
        },
        keyword: { type: String }
    };

    constructor() {
        super();
        this.data = [];              
        this.selectedNodes = [];     
        this.nodeMap = new Map();    
        this.showCheckbox = true;    
        this.autoSelectParent = true; // 默认开启父节点自动选择
        this.keyword = '';           
        this.treeData = [];          
        this._nodeStates = new Map(); // 内部状态管理
    }

    /** Lit生命周期：属性变化处理 */
    willUpdate(changedProperties) {
        if (changedProperties.has('data')) {
            this._handleDataChange();
        }
        if (changedProperties.has('keyword')) {
            this._handleKeywordChange();
        }
    }

    /** 处理数据变化 */
    _handleDataChange() {
        // 保存当前状态
        this._saveNodeStates();
        // 重建树结构
        this.treeData = TreeUtils.convertToTree(this.data);
        // 恢复状态
        this._restoreNodeStates();
        // 重建映射
        this._buildNodeMap();
    }

    /** 处理搜索关键字变化 */
    _handleKeywordChange() {
        TreeUtils.applySearchFilter(this.treeData, this.keyword);
    }

    /** 保存节点状态 */
    _saveNodeStates() {
        this._nodeStates.clear();
        this._traverseTree(this.treeData, node => {
            this._nodeStates.set(node.id, {
                checked: node.checked,
                indeterminate: node.indeterminate,
                expanded: node.expanded
            });
        });
    }

    /** 恢复节点状态 */
    _restoreNodeStates() {
        this._traverseTree(this.treeData, node => {
            const state = this._nodeStates.get(node.id);
            if (state) {
                Object.assign(node, state);
            }
        });
    }

    /** 构建节点映射 */
    _buildNodeMap() {
        this.nodeMap.clear();
        this._traverseTree(this.treeData, node => {
            this.nodeMap.set(node.id, node);
        });
    }

    /** 通用树遍历方法 */
    _traverseTree(nodes, callback) {
        if (!nodes) return;
        nodes.forEach(node => {
            callback(node);
            if (node.hasChildren) {
                this._traverseTree(node.children, callback);
            }
        });
    }

    /** 切换节点展开状态 */
    toggleNode(nodeId) {
        const node = this.nodeMap.get(nodeId);
        if (!node || !node.hasChildren) return;
        node.expanded = !node.expanded;
        this.requestUpdate();
    }

    /** 切换复选框状态 */
    toggleCheckbox(nodeId) {
        const node = this.nodeMap.get(nodeId);
        if (!node || node.disabled) return;
        this.updateNodeState(nodeId, !node.checked);
    }

    /** 更新节点状态（数据驱动） */
    updateNodeState(nodeId, checked) {
        const node = this.nodeMap.get(nodeId);
        if (!node || node.disabled) return;

        // 更新当前节点
        node.checked = checked;
        node.indeterminate = false;

        // 更新子节点（仅在开启父节点自动选择模式时）
        if (this.autoSelectParent) {
            this._updateChildrenState(node, checked);
        }
        
        // 更新父节点（仅在开启父节点自动选择模式时）
        if (this.autoSelectParent) {
            this._updateParentsState(node);
        }
        
        // 触发更新
        this._notifySelectedNodesChanged();
        this.requestUpdate();
    }

    /** 更新子节点状态 */
    _updateChildrenState(node, checked) {
        if (!node.hasChildren) return;
        
        node.children.forEach(child => {
            if (!child.disabled) {
                child.checked = checked;
                child.indeterminate = false;
                this._updateChildrenState(child, checked);
            }
        });
    }

    /** 更新父节点状态 */
    _updateParentsState(node) {
        let parent = node.parent;
        while (parent && !parent.disabled) {
            const allChecked = parent.children.every(child => child.checked);
            const someChecked = parent.children.some(child => child.checked || child.indeterminate);
            parent.checked = allChecked;
            parent.indeterminate = !allChecked && someChecked;
            parent = parent.parent;
        }
    }

    /** 获取选中节点（使用TreeUtils） */
    getSelectedNodes() {
        if (this.autoSelectParent) {
            // 开启父节点自动选择模式：返回完全选中的节点作为根节点
            return TreeUtils.getSelectedNodes(this.treeData);
        } else {
            // 关闭父节点自动选择模式：返回所有选中的节点
            return TreeUtils.getAllSelectedNodes(this.treeData);
        }
    }

    /** 通知选中节点变化 */
    _notifySelectedNodesChanged() {
        this.selectedNodes = this.getSelectedNodes();
        this.dispatchEvent(new CustomEvent('selected-nodes-changed', {
            detail: this.selectedNodes,
            bubbles: true,
            composed: true
        }));
    }

    /** 渲染树节点 */
    createTreeNode(node) {
        if (node.hidden) return '';
        const isHighlighted = this.keyword && node.name.toLowerCase().includes(this.keyword.toLowerCase());
        return html`
            <div class="tree-node" data-node-id="${node.id}">
                <div class="tree-node-content">
                    <div class="tree-node-toggle ${node.expanded ? '' : 'collapsed'}" 
                         @click="${(e) => { e.stopPropagation(); this.toggleNode(node.id); }}"
                         style="${node.hasChildren ? '' : 'display: none;'}">
                    </div>
                    <div class="tree-node-selectable ${node.disabled ? 'opacity-50 cursor-not-allowed' : ''}"
                         @click="${() => this.toggleCheckbox(node.id)}"
                         style="cursor: ${node.disabled ? 'not-allowed' : 'pointer'}"
                         data-checked="${node.checked}">
                        ${this.showCheckbox ? html`
                            <div class="tree-node-checkbox"
                                 data-checked="${node.checked}"
                                 data-indeterminate="${node.indeterminate}">
                            </div>
                        ` : ''}
                        <span class="tree-node-name ${!this.showCheckbox ? 'tree-node-name-no-checkbox' : ''}"
                              data-highlight="${isHighlighted}"
                              data-checked="${node.checked}">
                            ${node.name}
                        </span>
                    </div>
                </div>
                <div class="tree-node-children ${node.expanded ? '' : 'collapsed'}">
                    ${node.children.map(child => this.createTreeNode(child))}
                </div>
            </div>
        `;
    }

    /** 渲染整个树 */
    render() {
        return html`
            <div class="tree-select-container">
                <div class="tree-container">
                    ${this.treeData.map(node => this.createTreeNode(node))}
                </div>
            </div>
        `;
    }

    /** 切换复选框可见性 */
    toggleCheckboxVisibility() {
        this.showCheckbox = !this.showCheckbox;
        this.requestUpdate();
    }

    /** 切换父节点自动选择模式 */
    toggleAutoSelectParent() {
        this.autoSelectParent = !this.autoSelectParent;
        // 重新计算选中节点并触发事件
        this._notifySelectedNodesChanged();
        this.requestUpdate();
    }

    /** 删除选中节点 */
    removeSelectedNode(nodeId) {
        const node = this.nodeMap.get(nodeId);
        if (!node) return;
        
        this.updateNodeState(nodeId, false);
        this.dispatchEvent(new CustomEvent('node-removed', {
            detail: { nodeId },
            bubbles: true,
            composed: true
        }));
    }
}
customElements.define('tree-select', TreeSelect);