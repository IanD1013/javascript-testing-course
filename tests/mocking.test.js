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
})