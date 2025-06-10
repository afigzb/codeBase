/**
 * ContentLoader - 统一的内容获取工具
 * 职责：判断内容类型、加载文件内容、处理相对路径
 * 专注于内容获取，不涉及iframe处理
 */
export class ContentLoader {
    
    /**
     * 检测是否为文件路径
     * 统一的文件路径判断逻辑
     */
    static isFilePath(str) {
        if (!str || typeof str !== 'string') return false;
        
        return str.startsWith('/') || 
               str.startsWith('./') || 
               str.startsWith('../') ||
               str.startsWith('http') ||
               /\.(html|htm|js|css|json|xml)$/i.test(str);
    }

    /**
     * 加载内容 - 统一入口
     * 自动判断是文件路径还是内容字符串
     */
    static async loadContent(contentOrPath) {
        return this.isFilePath(contentOrPath) 
            ? await this.loadFromFile(contentOrPath)
            : contentOrPath || '';
    }

    /**
     * 从文件加载内容
     * 处理文件加载和相对路径解析
     */
    static async loadFromFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (response.ok) {
                const content = await response.text();
                return this.processRelativePaths(content, filePath);
            } else {
                console.warn(`无法加载文件: ${filePath}, 状态: ${response.status}`);
                return `<!-- 无法加载文件: ${filePath} -->`;
            }
        } catch (error) {
            console.warn(`加载文件失败: ${filePath}`, error);
            return `<!-- 加载文件失败: ${filePath} -->`;
        }
    }

    // 处理HTML内容中的相对路径，转换为绝对路径
    static processRelativePaths(htmlContent, basePath) {
        if (!htmlContent || !basePath) return htmlContent;
        
        const baseDir = basePath.substring(0, basePath.lastIndexOf('/'));
        
        return htmlContent
            .replace(/(<script[^>]+src=["'])([^"']+)(["'][^>]*>)/g, (match, prefix, src, suffix) => 
                this.isAbsolutePath(src) ? match : prefix + this.resolveRelativePath(src, baseDir) + suffix)
            .replace(/(<link[^>]+href=["'])([^"']+)(["'][^>]*>)/g, (match, prefix, href, suffix) => 
                this.isAbsolutePath(href) ? match : prefix + this.resolveRelativePath(href, baseDir) + suffix)
            .replace(/(<img[^>]+src=["'])([^"']+)(["'][^>]*>)/g, (match, prefix, src, suffix) => 
                this.isAbsolutePath(src) ? match : prefix + this.resolveRelativePath(src, baseDir) + suffix)
            .replace(/(import\s+[^;]+from\s+["'])([^"']+)(["'])/g, (match, prefix, path, suffix) => 
                this.isAbsolutePath(path) ? match : prefix + this.resolveRelativePath(path, baseDir) + suffix)
            .replace(/(import\s*\(\s*["'])([^"']+)(["']\s*\))/g, (match, prefix, path, suffix) => 
                this.isAbsolutePath(path) ? match : prefix + this.resolveRelativePath(path, baseDir) + suffix);
    }

    // 检查是否为绝对路径
    static isAbsolutePath(path) {
        return path.startsWith('http') || 
               path.startsWith('/') ||
               path.startsWith('data:') ||
               path.startsWith('blob:');
    }

    // 解析相对路径为绝对路径
    static resolveRelativePath(relativePath, baseDir) {
        let resultPath = baseDir;
        
        for (let segment of relativePath.split('/')) {
            if (segment === '..') {
                resultPath = resultPath.substring(0, resultPath.lastIndexOf('/'));
            } else if (segment && segment !== '.') {
                resultPath += '/' + segment;
            }
        }
        
        return resultPath;
    }

    /**
     * 获取内容（优先 htmlPath，备用 htmlContent）
     * 兼容旧的数据结构
     */
    static getContent(item) {
        return item?.htmlPath || item?.htmlContent || '';
    }
} 