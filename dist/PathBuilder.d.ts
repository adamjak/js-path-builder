interface QueryParam {
    key: string;
    value: string;
}
export declare class PathBuilder {
    private _protocol?;
    private _domain?;
    private _path?;
    private _queryParams?;
    private _hash?;
    getProtocol(): string;
    setProtocol(value: string): PathBuilder;
    getDomain(): string;
    setDomain(value: string): PathBuilder;
    getHash(): string;
    setHash(value: string): PathBuilder;
    getQueryParams(): QueryParam[];
    addPathPart(value: string): PathBuilder;
    addQueryParam(key: string, value: string): PathBuilder;
    build(): string;
}
export {};
