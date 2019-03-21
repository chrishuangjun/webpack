class WebStorage {
    getLocalOrSession(isLocalStorage) {
        return isLocalStorage ? localStorage : sessionStorage;
    }

    /**
     * 设置storage
     * @param key {string} 要存储的key
     * @param value {string | object} 要设置的值
     * @param isLocalStorage 是否要用localStorage默认否
     */
    set(name, value, isLocalStorage = false) {
        let _storage = this.getLocalOrSession(isLocalStorage);
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        _storage.setItem(name, value);
    }

    /**
     * 获取storage
     * @param name {string} 要获取的key
     * @param isLocalStorage {boolean} 是否要用localStorage默认否
     * @return string | object | null
     * string 不可转JSON格式的返回字符串
     * object 可转JSON格式的放回JSON
     * null 找不到的返回null
     */
    get(name, isLocalStorage = false) {
        let _storage = this.getLocalOrSession(isLocalStorage);
        let resStr = _storage.getItem(name);
        if (!resStr) return null; // 获取不到的直接返回null
        try {
            let resJson = JSON.parse(resStr);
            return resJson; // JSON格式的，直接返回JSON
        } catch {
            return resStr; // 非JSON格式的，直接返回字符串
        }
    }

    /**
     * 移除某个缓存
     * @param name {string} 要获取的key
     * @param isLocalStorage {boolean} 是否要用localStorage默认否
     */
    remove(name, isLocalStorage = false) {
        let _storage = this.getLocalOrSession(isLocalStorage);
        _storage.removeItem(name);
    }

    /**
     * 清除整个缓存
     */
    clear(isLocalStorage = false) {
        let _storage = this.getLocalOrSession(isLocalStorage);
        _storage.clear();
    }
}

export default new WebStorage();
