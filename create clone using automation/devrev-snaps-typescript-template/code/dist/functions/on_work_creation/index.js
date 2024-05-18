"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.handleEvent = void 0;
const typescript_sdk_1 = require("@devrev/typescript-sdk");
function handleEvent(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const devrevPAT = event.context.secrets.service_account_token;
        const APIBase = event.execution_metadata.devrev_endpoint;
        const devrevSDK = typescript_sdk_1.client.setup({
            endpoint: APIBase,
            token: devrevPAT,
        });
        const workCreated = event.payload.work_created.work;
        const body = {
            type: workCreated.type,
            applies_to_part: workCreated.applies_to_part.id,
            owned_by: [workCreated.owned_by[0].id],
            title: "[CLONE ]" + workCreated.title
        };
        const response = yield devrevSDK.worksCreate(body);
        return response;
    });
}
exports.handleEvent = handleEvent;
const run = (events) => __awaiter(void 0, void 0, void 0, function* () {
    for (let event of events) {
        yield handleEvent(event);
    }
});
exports.run = run;
exports.default = exports.run;
