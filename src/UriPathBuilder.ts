import {IllegalInputError} from "./IllegalInputError";

interface QueryParam {
    key: string
    value: string
}

export class UriPathBuilder {

    public static reservedChars : string[] = [";","/","?",":","@","&","=","+","$",","]

    private _protocol? : string
    private _userinfo? : string
    private _host? : string
    private _port? : number
    private _path? : string[]
    private _queryParams?: QueryParam[]
    private _hash? : string

    private _withoutProtocolAndHost : boolean = false

    getProtocol(): string {
        return this._protocol;
    }

    setProtocol(value: string) : UriPathBuilder {
        this.checkCorrectString(value)
        this._protocol = value;
        return this;
    }

    getUserinfo() : string {
        return this._userinfo
    }

    setUserinfo (value) : UriPathBuilder {
        this.checkCorrectString(value)
        this._userinfo = value;
        return this;
    }

    getHost(): string {
        return this._host;
    }

    setHost(value: string) :UriPathBuilder {
        this.checkCorrectString(value)
        this._host = value;
        return this;
    }


    getPort(): number {
        return this._port;
    }

    setPort(value: number) : UriPathBuilder {
        this._port = value;
        return this
    }

    getHash(): string {
        return this._hash;
    }

    setHash(value: string) : UriPathBuilder {
        this.checkCorrectString(value)
        this._hash = value;
        return this
    }

    getQueryParams(): QueryParam[] {
        return this._queryParams;
    }

    addPathPart(value : string) : UriPathBuilder {
        this.checkCorrectString(value)
        if (value) {
            if (this._path === undefined) {
                this._path = []
            }
            this._path.push(value)
        }
        return this
    }

    addQueryParam (key: string, value: string) : UriPathBuilder {
        this.checkCorrectString(key)
        this.checkCorrectString(value)
        if (key && value) {
            if (this._queryParams === undefined) {
                this._queryParams = [] as QueryParam[]
            }
            this._queryParams.push({key : key, value: value} as QueryParam)
        }
        return this
    }

    withoutProtocolAndHost() : UriPathBuilder {
        this._withoutProtocolAndHost = true
        return this
    }

    withProtocolAndHost() : UriPathBuilder {
        this._withoutProtocolAndHost = false
        return this
    }

    private containsReservedCharacters( inputString : string) : boolean {
        return UriPathBuilder.reservedChars.some(char => inputString.includes(char))
    }
    private checkCorrectString( inputString : string) : void {
        if (this.containsReservedCharacters(inputString)) {
            let message = "String " + inputString + " contains one or more from reserved characters. Reserved characters are " + UriPathBuilder.reservedChars.map(m => "'" + m + "'").join(" | ");
            throw new IllegalInputError(message)
        }
    }

    build () : string {
        let path: string = "";
        if (this._withoutProtocolAndHost == false) {
            if (this._protocol && this._protocol !== "") {
                path += this._protocol
                if (!path.endsWith("://")) {
                    path += "://"
                }
            }

            if (this._userinfo && this._userinfo !== "") {
                path += this._userinfo + "@"
                if (path.endsWith("/")) {
                    path += path.substring(0, path.length - 1)
                }
            }

            if (this._host && this._host !== "") {
                path += this._host
                if (path.endsWith("/")) {
                    path += path.substring(0, path.length - 1)
                }
            }

            if (this._port && this._port > 0) {
                path += ":" + this._port
                if (path.endsWith("/")) {
                    path += path.substring(0, path.length - 1)
                }
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