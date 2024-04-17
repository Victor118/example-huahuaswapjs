"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSubmitMisbehaviourResponse = exports.MsgSubmitMisbehaviour = exports.MsgUpgradeClientResponse = exports.MsgUpgradeClient = exports.MsgUpdateClientResponse = exports.MsgUpdateClient = exports.MsgCreateClientResponse = exports.MsgCreateClient = void 0;
const any_1 = require("../../../../google/protobuf/any");
const binary_1 = require("../../../../binary");
const registry_1 = require("../../../../registry");
const helpers_1 = require("../../../../helpers");
function createBaseMsgCreateClient() {
    return {
        clientState: undefined,
        consensusState: undefined,
        signer: ""
    };
}
exports.MsgCreateClient = {
    typeUrl: "/ibc.core.client.v1.MsgCreateClient",
    aminoType: "cosmos-sdk/MsgCreateClient",
    is(o) {
        return o && (o.$typeUrl === exports.MsgCreateClient.typeUrl || typeof o.signer === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgCreateClient.typeUrl || typeof o.signer === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgCreateClient.typeUrl || typeof o.signer === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.clientState !== undefined) {
            any_1.Any.encode(message.clientState, writer.uint32(10).fork()).ldelim();
        }
        if (message.consensusState !== undefined) {
            any_1.Any.encode(message.consensusState, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateClient();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientState = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.consensusState = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgCreateClient();
        message.clientState = object.clientState !== undefined && object.clientState !== null ? any_1.Any.fromPartial(object.clientState) : undefined;
        message.consensusState = object.consensusState !== undefined && object.consensusState !== null ? any_1.Any.fromPartial(object.consensusState) : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgCreateClient();
        if (object.client_state !== undefined && object.client_state !== null) {
            message.clientState = any_1.Any.fromAmino(object.client_state);
        }
        if (object.consensus_state !== undefined && object.consensus_state !== null) {
            message.consensusState = any_1.Any.fromAmino(object.consensus_state);
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.client_state = message.clientState ? any_1.Any.toAmino(message.clientState) : undefined;
        obj.consensus_state = message.consensusState ? any_1.Any.toAmino(message.consensusState) : undefined;
        obj.signer = message.signer === "" ? undefined : message.signer;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgCreateClient.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgCreateClient",
            value: exports.MsgCreateClient.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgCreateClient.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCreateClient.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/ibc.core.client.v1.MsgCreateClient",
            value: exports.MsgCreateClient.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCreateClient.typeUrl, exports.MsgCreateClient);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgCreateClient.aminoType, exports.MsgCreateClient.typeUrl);
function createBaseMsgCreateClientResponse() {
    return {};
}
exports.MsgCreateClientResponse = {
    typeUrl: "/ibc.core.client.v1.MsgCreateClientResponse",
    aminoType: "cosmos-sdk/MsgCreateClientResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgCreateClientResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgCreateClientResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgCreateClientResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateClientResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgCreateClientResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgCreateClientResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgCreateClientResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgCreateClientResponse",
            value: exports.MsgCreateClientResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgCreateClientResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgCreateClientResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/ibc.core.client.v1.MsgCreateClientResponse",
            value: exports.MsgCreateClientResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgCreateClientResponse.typeUrl, exports.MsgCreateClientResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgCreateClientResponse.aminoType, exports.MsgCreateClientResponse.typeUrl);
function createBaseMsgUpdateClient() {
    return {
        clientId: "",
        header: undefined,
        signer: ""
    };
}
exports.MsgUpdateClient = {
    typeUrl: "/ibc.core.client.v1.MsgUpdateClient",
    aminoType: "cosmos-sdk/MsgUpdateClient",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpdateClient.typeUrl || typeof o.clientId === "string" && typeof o.signer === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpdateClient.typeUrl || typeof o.client_id === "string" && typeof o.signer === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpdateClient.typeUrl || typeof o.client_id === "string" && typeof o.signer === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.header !== undefined) {
            any_1.Any.encode(message.header, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateClient();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.header = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateClient();
        message.clientId = object.clientId ?? "";
        message.header = object.header !== undefined && object.header !== null ? any_1.Any.fromPartial(object.header) : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpdateClient();
        if (object.client_id !== undefined && object.client_id !== null) {
            message.clientId = object.client_id;
        }
        if (object.header !== undefined && object.header !== null) {
            message.header = any_1.Any.fromAmino(object.header);
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.client_id = message.clientId === "" ? undefined : message.clientId;
        obj.header = message.header ? any_1.Any.toAmino(message.header) : undefined;
        obj.signer = message.signer === "" ? undefined : message.signer;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateClient.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgUpdateClient",
            value: exports.MsgUpdateClient.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateClient.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateClient.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/ibc.core.client.v1.MsgUpdateClient",
            value: exports.MsgUpdateClient.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateClient.typeUrl, exports.MsgUpdateClient);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgUpdateClient.aminoType, exports.MsgUpdateClient.typeUrl);
function createBaseMsgUpdateClientResponse() {
    return {};
}
exports.MsgUpdateClientResponse = {
    typeUrl: "/ibc.core.client.v1.MsgUpdateClientResponse",
    aminoType: "cosmos-sdk/MsgUpdateClientResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpdateClientResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpdateClientResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpdateClientResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateClientResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateClientResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpdateClientResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpdateClientResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgUpdateClientResponse",
            value: exports.MsgUpdateClientResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgUpdateClientResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpdateClientResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/ibc.core.client.v1.MsgUpdateClientResponse",
            value: exports.MsgUpdateClientResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpdateClientResponse.typeUrl, exports.MsgUpdateClientResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgUpdateClientResponse.aminoType, exports.MsgUpdateClientResponse.typeUrl);
function createBaseMsgUpgradeClient() {
    return {
        clientId: "",
        clientState: undefined,
        consensusState: undefined,
        proofUpgradeClient: new Uint8Array(),
        proofUpgradeConsensusState: new Uint8Array(),
        signer: ""
    };
}
exports.MsgUpgradeClient = {
    typeUrl: "/ibc.core.client.v1.MsgUpgradeClient",
    aminoType: "cosmos-sdk/MsgUpgradeClient",
    is(o) {
        return o && (o.$typeUrl === exports.MsgUpgradeClient.typeUrl || typeof o.clientId === "string" && (o.proofUpgradeClient instanceof Uint8Array || typeof o.proofUpgradeClient === "string") && (o.proofUpgradeConsensusState instanceof Uint8Array || typeof o.proofUpgradeConsensusState === "string") && typeof o.signer === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgUpgradeClient.typeUrl || typeof o.client_id === "string" && (o.proof_upgrade_client instanceof Uint8Array || typeof o.proof_upgrade_client === "string") && (o.proof_upgrade_consensus_state instanceof Uint8Array || typeof o.proof_upgrade_consensus_state === "string") && typeof o.signer === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgUpgradeClient.typeUrl || typeof o.client_id === "string" && (o.proof_upgrade_client instanceof Uint8Array || typeof o.proof_upgrade_client === "string") && (o.proof_upgrade_consensus_state instanceof Uint8Array || typeof o.proof_upgrade_consensus_state === "string") && typeof o.signer === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.clientState !== undefined) {
            any_1.Any.encode(message.clientState, writer.uint32(18).fork()).ldelim();
        }
        if (message.consensusState !== undefined) {
            any_1.Any.encode(message.consensusState, writer.uint32(26).fork()).ldelim();
        }
        if (message.proofUpgradeClient.length !== 0) {
            writer.uint32(34).bytes(message.proofUpgradeClient);
        }
        if (message.proofUpgradeConsensusState.length !== 0) {
            writer.uint32(42).bytes(message.proofUpgradeConsensusState);
        }
        if (message.signer !== "") {
            writer.uint32(50).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpgradeClient();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.clientState = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.consensusState = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.proofUpgradeClient = reader.bytes();
                    break;
                case 5:
                    message.proofUpgradeConsensusState = reader.bytes();
                    break;
                case 6:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgUpgradeClient();
        message.clientId = object.clientId ?? "";
        message.clientState = object.clientState !== undefined && object.clientState !== null ? any_1.Any.fromPartial(object.clientState) : undefined;
        message.consensusState = object.consensusState !== undefined && object.consensusState !== null ? any_1.Any.fromPartial(object.consensusState) : undefined;
        message.proofUpgradeClient = object.proofUpgradeClient ?? new Uint8Array();
        message.proofUpgradeConsensusState = object.proofUpgradeConsensusState ?? new Uint8Array();
        message.signer = object.signer ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgUpgradeClient();
        if (object.client_id !== undefined && object.client_id !== null) {
            message.clientId = object.client_id;
        }
        if (object.client_state !== undefined && object.client_state !== null) {
            message.clientState = any_1.Any.fromAmino(object.client_state);
        }
        if (object.consensus_state !== undefined && object.consensus_state !== null) {
            message.consensusState = any_1.Any.fromAmino(object.consensus_state);
        }
        if (object.proof_upgrade_client !== undefined && object.proof_upgrade_client !== null) {
            message.proofUpgradeClient = (0, helpers_1.bytesFromBase64)(object.proof_upgrade_client);
        }
        if (object.proof_upgrade_consensus_state !== undefined && object.proof_upgrade_consensus_state !== null) {
            message.proofUpgradeConsensusState = (0, helpers_1.bytesFromBase64)(object.proof_upgrade_consensus_state);
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.client_id = message.clientId === "" ? undefined : message.clientId;
        obj.client_state = message.clientState ? any_1.Any.toAmino(message.clientState) : undefined;
        obj.consensus_state = message.consensusState ? any_1.Any.toAmino(message.consensusState) : undefined;
        obj.proof_upgrade_client = message.proofUpgradeClient ? (0, helpers_1.base64FromBytes)(message.proofUpgradeClient) : undefined;
        obj.proof_upgrade_consensus_state = message.proofUpgradeConsensusState ? (0, helpers_1.base64FromBytes)(message.proofUpgradeConsensusState) : undefined;
        obj.signer = message.signer === "" ? undefined : message.signer;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpgradeClient.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgUpgradeClient",
            value: exports.MsgUpgradeClient.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgUpgradeClient.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpgradeClient.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/ibc.core.client.v1.MsgUpgradeClient",
            value: exports.MsgUpgradeClient.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpgradeClient.typeUrl, exports.MsgUpgradeClient);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgUpgradeClient.aminoType, exports.MsgUpgradeClient.typeUrl);
function createBaseMsgUpgradeClientResponse() {
    return {};
}
exports.MsgUpgradeClientResponse = {
    typeUrl: "/ibc.core.client.v1.MsgUpgradeClientResponse",
    aminoType: "cosmos-sdk/MsgUpgradeClientResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgUpgradeClientResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgUpgradeClientResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgUpgradeClientResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpgradeClientResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgUpgradeClientResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgUpgradeClientResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgUpgradeClientResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgUpgradeClientResponse",
            value: exports.MsgUpgradeClientResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgUpgradeClientResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgUpgradeClientResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/ibc.core.client.v1.MsgUpgradeClientResponse",
            value: exports.MsgUpgradeClientResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgUpgradeClientResponse.typeUrl, exports.MsgUpgradeClientResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgUpgradeClientResponse.aminoType, exports.MsgUpgradeClientResponse.typeUrl);
function createBaseMsgSubmitMisbehaviour() {
    return {
        clientId: "",
        misbehaviour: undefined,
        signer: ""
    };
}
exports.MsgSubmitMisbehaviour = {
    typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviour",
    aminoType: "cosmos-sdk/MsgSubmitMisbehaviour",
    is(o) {
        return o && (o.$typeUrl === exports.MsgSubmitMisbehaviour.typeUrl || typeof o.clientId === "string" && typeof o.signer === "string");
    },
    isSDK(o) {
        return o && (o.$typeUrl === exports.MsgSubmitMisbehaviour.typeUrl || typeof o.client_id === "string" && typeof o.signer === "string");
    },
    isAmino(o) {
        return o && (o.$typeUrl === exports.MsgSubmitMisbehaviour.typeUrl || typeof o.client_id === "string" && typeof o.signer === "string");
    },
    encode(message, writer = binary_1.BinaryWriter.create()) {
        if (message.clientId !== "") {
            writer.uint32(10).string(message.clientId);
        }
        if (message.misbehaviour !== undefined) {
            any_1.Any.encode(message.misbehaviour, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitMisbehaviour();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.clientId = reader.string();
                    break;
                case 2:
                    message.misbehaviour = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(object) {
        const message = createBaseMsgSubmitMisbehaviour();
        message.clientId = object.clientId ?? "";
        message.misbehaviour = object.misbehaviour !== undefined && object.misbehaviour !== null ? any_1.Any.fromPartial(object.misbehaviour) : undefined;
        message.signer = object.signer ?? "";
        return message;
    },
    fromAmino(object) {
        const message = createBaseMsgSubmitMisbehaviour();
        if (object.client_id !== undefined && object.client_id !== null) {
            message.clientId = object.client_id;
        }
        if (object.misbehaviour !== undefined && object.misbehaviour !== null) {
            message.misbehaviour = any_1.Any.fromAmino(object.misbehaviour);
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        return message;
    },
    toAmino(message) {
        const obj = {};
        obj.client_id = message.clientId === "" ? undefined : message.clientId;
        obj.misbehaviour = message.misbehaviour ? any_1.Any.toAmino(message.misbehaviour) : undefined;
        obj.signer = message.signer === "" ? undefined : message.signer;
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSubmitMisbehaviour.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgSubmitMisbehaviour",
            value: exports.MsgSubmitMisbehaviour.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgSubmitMisbehaviour.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSubmitMisbehaviour.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviour",
            value: exports.MsgSubmitMisbehaviour.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSubmitMisbehaviour.typeUrl, exports.MsgSubmitMisbehaviour);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgSubmitMisbehaviour.aminoType, exports.MsgSubmitMisbehaviour.typeUrl);
function createBaseMsgSubmitMisbehaviourResponse() {
    return {};
}
exports.MsgSubmitMisbehaviourResponse = {
    typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviourResponse",
    aminoType: "cosmos-sdk/MsgSubmitMisbehaviourResponse",
    is(o) {
        return o && o.$typeUrl === exports.MsgSubmitMisbehaviourResponse.typeUrl;
    },
    isSDK(o) {
        return o && o.$typeUrl === exports.MsgSubmitMisbehaviourResponse.typeUrl;
    },
    isAmino(o) {
        return o && o.$typeUrl === exports.MsgSubmitMisbehaviourResponse.typeUrl;
    },
    encode(_, writer = binary_1.BinaryWriter.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof binary_1.BinaryReader ? input : new binary_1.BinaryReader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSubmitMisbehaviourResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromPartial(_) {
        const message = createBaseMsgSubmitMisbehaviourResponse();
        return message;
    },
    fromAmino(_) {
        const message = createBaseMsgSubmitMisbehaviourResponse();
        return message;
    },
    toAmino(_) {
        const obj = {};
        return obj;
    },
    fromAminoMsg(object) {
        return exports.MsgSubmitMisbehaviourResponse.fromAmino(object.value);
    },
    toAminoMsg(message) {
        return {
            type: "cosmos-sdk/MsgSubmitMisbehaviourResponse",
            value: exports.MsgSubmitMisbehaviourResponse.toAmino(message)
        };
    },
    fromProtoMsg(message) {
        return exports.MsgSubmitMisbehaviourResponse.decode(message.value);
    },
    toProto(message) {
        return exports.MsgSubmitMisbehaviourResponse.encode(message).finish();
    },
    toProtoMsg(message) {
        return {
            typeUrl: "/ibc.core.client.v1.MsgSubmitMisbehaviourResponse",
            value: exports.MsgSubmitMisbehaviourResponse.encode(message).finish()
        };
    }
};
registry_1.GlobalDecoderRegistry.register(exports.MsgSubmitMisbehaviourResponse.typeUrl, exports.MsgSubmitMisbehaviourResponse);
registry_1.GlobalDecoderRegistry.registerAminoProtoMapping(exports.MsgSubmitMisbehaviourResponse.aminoType, exports.MsgSubmitMisbehaviourResponse.typeUrl);
//# sourceMappingURL=tx.js.map