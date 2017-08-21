const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message');

// none async does not need done
describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Jen';
    const text = 'Some message';
    const message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
      const from = 'Mike';
      const latitude = 15;
      const longitude = 20;
      
      const message = generateLocationMessage( from, latitude,longitude);

      console.log();
      console.log(message.url);
      console.log();
                 
      const url ="https://google.com/maps?q=15,20";

      expect(message.createdAt).toBeA('number');
      expect(message).toInclude({url, from});
      expect(message.url).toEqual(url);
    });
  });