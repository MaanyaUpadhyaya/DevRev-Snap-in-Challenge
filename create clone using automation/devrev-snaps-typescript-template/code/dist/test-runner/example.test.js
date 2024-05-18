"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const on_work_creation_1 = require("../functions/on_work_creation");
describe('Test some function', () => {
    it('Something', () => {
        (0, on_work_creation_1.run)([{
                payload: {
                    work_created: {
                        work: {
                            id: 'some-id'
                        }
                    }
                }
            }]);
    });
});
