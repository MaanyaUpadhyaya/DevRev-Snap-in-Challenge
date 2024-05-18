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
const test_runner_1 = require("../../test-runner/test-runner");
const typescript_sdk_1 = require("@devrev/typescript-sdk");
const _1 = require(".");
jest.mock('@devrev/typescript-sdk', () => ({
    client: {
        setup: jest.fn(),
    },
    publicSDK: {
        WorkType: {
            Ticket: 'ticket',
        },
    },
}));
describe('Example Index Test file', () => {
    it('Testing handleEvent', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockSetup = jest.fn();
        typescript_sdk_1.client.setup = mockSetup;
        const mockWorkList = jest.fn();
        mockSetup.mockReturnValue({
            worksList: mockWorkList,
        });
        mockWorkList.mockReturnValue({
            data: {
                works: [
                    {
                        id: '123',
                    },
                ],
            },
        });
        const event = {
            payload: {
                work_created: {
                    work: {
                        id: '123',
                    },
                },
            },
            context: {
                secrets: {
                    service_account_token: 'TEST-PAT',
                },
            },
            execution_metadata: {
                devrev_endpoint: 'https://devrev.com',
            },
        };
        const expectedResp = {
            works: [
                {
                    id: '123',
                },
            ],
        };
        const response = yield (0, _1.handleEvent)(event);
        expect(response).toEqual(expectedResp);
    }));
});
describe('Example Index Test file', () => {
    it('Testing the method', () => {
        (0, test_runner_1.testRunner)({
            fixturePath: 'on_work_created_event.json',
            functionName: 'on_work_creation',
        });
    });
});
