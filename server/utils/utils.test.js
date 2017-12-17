const expect = require('expect');

const { generateMessage } = require("./utils");
const { generateLocationMessage } = require('./utils');

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

describe("Location message generation", () => {
    it('Should generate msg with the correct long lang coords', () => {
        let from1 = 'user1';
        let lat = 1;
        let long = 1;

        let res = generateLocationMessage(from1, lat, long);

        expect(res.from).toBe(from1);
        expect(res.url).toBe("https://google.com/maps?q=1,1");
        expect(res.createdAt)
          .toExist()
          .toBeA("number");
        
    });
});