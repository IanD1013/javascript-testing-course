import { vi, it, expect, describe } from 'vitest';
import { getPriceInCurrency, getShippingInfo } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');

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
});

describe('getPriceInCurrency', () => {
    it('should return price in target currency', () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5);

        const price = getPriceInCurrency(10, 'AUD');

        expect(price).toBe(15);
    })
});

describe("getShippingInfo", () => {
    it("should return shipping unavailable if quote cannot be fetched", () => {
      vi.mocked(getShippingQuote).mockReturnValue(null);
  
      const result = getShippingInfo("London");
  
      expect(result).toMatch(/unavailable/i);
    });
  
    it("should return shipping info if quote can be fetched", () => {
      vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });
  
      const result = getShippingInfo("London");
  
    //   expect(result).toMatch("$10");
    //   expect(result).toMatch(/2 days/i);
      expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
    });
});