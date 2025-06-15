interface QueryParam {
    key: string
    value: string
}

export class PathBuilder {
    private _protocol? : string
    private _domain? : string
    private _path? : string[]
    private _queryParams?: QueryParam[]
    private _hash? : string

    getProtocol(): string {
        return this._protocol;
    }

    setProtocol(value: string) : PathBuilder {
        this._protocol = value;
        return this;
    }

    getDomain(): string {
        return this._domain;
    }

    setDomain(value: string) :PathBuilder {
        this._domain = value;
        return this;
    }

    getHash(): string {
        return this._hash;
    }

    setHash(value: string) : PathBuilder{
        this._hash = value;
        return this
    }

    getQueryParams(): QueryParam[] {
        return this._queryParams;
    }

    addPathPart(value : string) : PathBuilder {
        if (value) {
            if (this._path === undefined) {
                this._path = []
            }
            this._path.push(value)
        }
        return this
    }

    addQueryParam (key: string, value: string) : PathBuilder {
        if (key && value) {
            if (this._queryParams === undefined) {
                this._queryParams = [] as QueryParam[]
            }
            this._queryParams.push({key : key, value: value} as QueryParam)
        }
        return this
    }

    build () : string {
        let path: string = "";
        if (this._protocol && this._protocol !== "") {
            path += this._protocol
            if (!path.endsWith("://")) {
                path += "://"
            }
        }
        if (this._domain && this._domain !== "") {
            path += this._domain
            if (path.endsWith("/")) {
                path += path.substring(0, path.length - 1)
            }
        }
        path += "/"
        if (this._path && this._path.length > 0) {
            for (let i = 0; i < this._path.length; i++) {
                path += this._path[i] + "/"
            }
        }
        if (this._queryParams && this._queryParams.length > 0) {
            path += "?" + this._queryParams.map(p => p.key + "=" + p.value).join("&")
        }
        if (this._hash && this._hash != "") {
            path += "#" + this._hash
        }

        return path
    }
}