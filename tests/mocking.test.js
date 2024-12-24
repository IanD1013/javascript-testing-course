import { vi, it, expect, describe } from 'vitest';

describe('mocking - test suite', () => {
    it('test case', () => {
        const greet = vi.fn();
        // 1
        greet.mockReturnValue('Hello')
        // 2
        greet.mockResolvedValue('Hello') // greet().then(result => console.log(result))
        // 3
        greet.mockImplementation(name => `Hello ${name}`) // greet('John') => 'Hello John'

        const result = greet('Mosh');
        expect(greet).toHaveBeenCalled();
        expect(greet).toHaveBeenCalledOnce();
        expect(greet).toHaveBeenCalledWith('Mosh');
    })
});

describe('mocking exercise - test suite', () => {
    it('test case', () => {
        // Create a mock for the following function: sendText(message) {}
        const sendText = vi.fn();
        sendText.mockReturnValue('ok');

        // Call the mock function 
        const result = sendText('message');

        // Assert that the mock function is called
        expect(sendText).toHaveBeenCalledWith('message');

        // Assert that the result is OK
        expect(result).toBe('ok');
    })
})