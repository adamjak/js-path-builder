"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathBuilder = void 0;
class PathBuilder {
    getProtocol() {
        return this._protocol;
    }
    setProtocol(value) {
        this._protocol = value;
        return this;
    }
    getDomain() {
        return this._domain;
    }
    setDomain(value) {
        this._domain = value;
        return this;
    }
    getHash() {
        return this._hash;
    }
    setHash(value) {
        this._hash = value;
        return this;
    }
    getQueryParams() {
        return this._queryParams;
    }
    addPathPart(value) {
        if (value) {
            if (this._path === undefined) {
                this._path = [];
            }
            this._path.push(value);
        }
        return this;
    }
    addQueryParam(key, value) {
        if (key && value) {
            if (this._queryParams === undefined) {
                this._queryParams = [];
            }
            this._queryParams.push({ key: key, value: value });
        }
        return this;
    }
    build() {
        let path = "";
        if (this._protocol && this._protocol !== "") {
            path += this._protocol;
            if (!path.endsWith("://")) {
                path += "://";
            }
        }
        if (this._domain && this._domain !== "") {
            path += this._domain;
            if (path.endsWith("/")) {
                path += path.substring(0, path.length - 1);
            }
        }
        path += "/";
        if (this._path && this._path.length > 0) {
            for (let i = 0; i < this._path.length; i++) {
                path += this._path[i] + "/";
            }
        }
        if (this._queryParams && this._queryParams.length > 0) {
            path += "?" + this._queryParams.map(p => p.key + "=" + p.value).join("&");
        }
        if (this._hash && this._hash != "") {
            path += "#" + this._hash;
        }
        return path;
    }
}
exports.PathBuilder = PathBuilder;
