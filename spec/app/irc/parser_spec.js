import parseIrc from '../../../src/app/irc/parser';

describe('IRC parser', () => {
    it('parses a string without a prefix', () => {
        expect(parseIrc('NICK laser')).toEqual({
            tags: null,
            prefix: null,
            command: 'NICK',
            params: ['laser'],
        });
    });
});
