import { BinaryReader } from "../../../../binary";
import { createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryDenomTraceRequest, QueryDenomTraceResponse, QueryDenomTracesRequest, QueryDenomTracesResponse, QueryParamsRequest, QueryParamsResponse } from "./query";
export class QueryClientImpl {
    rpc;
    constructor(rpc) {
        this.rpc = rpc;
        this.denomTrace = this.denomTrace.bind(this);
        this.denomTraces = this.denomTraces.bind(this);
        this.params = this.params.bind(this);
    }
    denomTrace(request) {
        const data = QueryDenomTraceRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "DenomTrace", data);
        return promise.then(data => QueryDenomTraceResponse.decode(new BinaryReader(data)));
    }
    denomTraces(request = {
        pagination: undefined
    }) {
        const data = QueryDenomTracesRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "DenomTraces", data);
        return promise.then(data => QueryDenomTracesResponse.decode(new BinaryReader(data)));
    }
    params(request = {}) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.applications.transfer.v1.Query", "Params", data);
        return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
    }
}
export const createRpcQueryExtension = (base) => {
    const rpc = createProtobufRpcClient(base);
    const queryService = new QueryClientImpl(rpc);
    return {
        denomTrace(request) {
            return queryService.denomTrace(request);
        },
        denomTraces(request) {
            return queryService.denomTraces(request);
        },
        params(request) {
            return queryService.params(request);
        }
    };
};
//# sourceMappingURL=query.rpc.Query.js.map