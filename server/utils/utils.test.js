const expect = require('expect');

const {generateMessage} = require('./utils');

describe('Generate message -', () => {
    
    it('Should generate correct message object', () =>{
        let from1 = 'user1';
        let message = 'This is from test.';
        
        res = generateMessage(from1, message);

        expect(res.from).toBe(from1);
        expect(res.text).toBe(message);
        expect(res.createdAt).toExist().toBeA('number');
    });
});