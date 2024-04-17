"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = void 0;
const transfer_1 = require("./transfer");
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
function createBaseGenesisState() {
    return {
        portId: "",
        denomTraces: [],
        params: transfer_1.Params.fromPartial({})
    };
}
exports.GenesisState = {
    typeUrl: "/ibc.applications.transfer.v1.GenesisState",
    aminoType: "cosmos-sdk/GenesisState",
    is(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || typeof o.portId === "string" && Array.isArray(o.denomTraces) && (!o.denomTraces.length || transfer_1.DenomTrace.is(o.denomTraces[0])) && transfer_1.Params.is(o.params));
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || typeof o.port_id === "string" && Array.isArray(o.denom_traces) && (!o.denom_traces.length || transfer_1.DenomTrace.isSDK(o.denom_traces[0])) && transfer_1.Params.isSDK(o.params));
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.GenesisState.typeUrl || typeof o.port_id === "string" && Array.isArray(o.denom_traces) && (!o.denom_traces.length || transfer_1.DenomTrace.isAmino(o.denom_traces[0])) && transfer_1.Params.isAmino(o.params));
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.portId !== "") {
            writer.uint32(10).string(message.portId);
        }
        for (const v of message.denomTraces) {
            transfer_1.DenomTrace.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (message.params !== undefined) {
            transfer_1.Params.encode(message.params, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.portId = reader.string();
                    break;
                case 2:
                    message.denomTraces.push(transfer_1.DenomTrace.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.params = transfer_1.Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.portId = object.portId ?? "";
        message.denomTraces = object.denomTraces?.map(e => transfer_1.DenomTrace.fromPartial(e)) || [];
        message.params = object.params !== undefined && object.params !== null ? transfer_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
    fromAmino(object) {
        const message = createBaseGenesisState();
        if (object.port_id !== undefined && object.port_id !== null) {
            message.portId = object.port_id;
        }
        message.denomTraces = object.denom_traces?.map(e => transfer_1.DenomTrace.fromAmino(e)) || [];
        if (object.params !== undefined && object.params !== null) {
            message.params = transfer_1.Params.fromAmino(object.params);
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.port_id = message.portId === "" ? undefined : message.portId;
        if (message.denomTraces) {
            obj.denom_traces = message.denomTraces.map(e => e ? transfer_1.DenomTrace.toAmino(e) : undefined);
        }
        else {
            obj.denom_traces = message.denomTraces;
        }
        obj.params = message.params ? transfer_1.Params.toAmino(message.params) : undefined;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.GenesisState.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/GenesisState",
            value: exports.GenesisState.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.GenesisState.decode(message.value);
    },
    toProto(message) {
        return exports.GenesisState.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/ibc.applications.transfer.v1.GenesisState",
            value: exports.GenesisState.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.GenesisState.typeUrl, exports.GenesisState);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.GenesisState.aminoType, exports.GenesisState.typeUrl);
//# sourceMappingURL=genesis.js.map