import { vi, it, expect, describe } from "vitest";
import {
  getDiscount,
  getPriceInCurrency,
  getShippingInfo,
  isOnline,
  login,
  renderPage,
  signUp,
  submitOrder,
} from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { charge } from "../src/libs/payment";
import { sendEmail } from "../src/libs/email";
import security from "../src/libs/security";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");
vi.mock("../src/libs/payment");
vi.mock("../src/libs/email", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

describe("mocking - test suite", () => {
  it("test case", () => {
    const greet = vi.fn();
    // 1
    greet.mockReturnValue("Hello");
    // 2
    greet.mockResolvedValue("Hello"); // greet().then(result => console.log(result))
    // 3
    greet.mockImplementation((name) => `Hello ${name}`); // greet('John') => 'Hello John'

    expect(greet).toHaveBeenCalled();
    expect(greet).toHaveBeenCalledOnce();
    expect(greet).toHaveBeenCalledWith("Mosh");
  });
});

describe("mocking exercise - test suite", () => {
  it("test case", () => {
    // Create a mock for the following function: sendText(message) {}
    const sendText = vi.fn();
    sendText.mockReturnValue("ok");

    // Call the mock function
    const result = sendText("message");

    // Assert that the mock function is called
    expect(sendText).toHaveBeenCalledWith("message");

    // Assert that the result is OK
    expect(result).toBe("ok");
  });
});

// Lesson: Mocking modules
describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);

    const price = getPriceInCurrency(10, "AUD");

    expect(price).toBe(15);
  });
});

// Exercise: Mocking modules
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

// Lesson: Interaction testing
describe("renderPage", () => {
  it("should return correct content", async () => {
    const result = await renderPage();

    expect(result).toMatch(/content/i);
  });

  // test there is a call to trackPageView()
  it("should call analytics", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

// Exercise: Interaction testing
describe("submitOrder", () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: "1234" };

  // test case 1
  it("should charge the customer", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    await submitOrder(order, creditCard);

    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  // test case 2
  it("should return success if payment is successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: true }); // toEqual because we are comparing 2 objects
  });

  // test case 3
  it("should return fail if payment is unsuccessful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });

    const result = await submitOrder(order, creditCard);

    expect(result).toEqual({ success: false, error: "payment_error" });
  });
});

// Lesson: Partial mocking
describe("signUp", () => {
  const email = "name@domain.com";

  // beforeEach(() => {
  //     // vi.mocked(sendEmail).mockClear();
  //     vi.clearAllMocks();
  // })

  it("should return false if email is not valid", async () => {
    const result = await signUp("a");
    expect(result).toBe(false);
  });

  it("should return true if email is valid", async () => {
    const result = await signUp(email);
    expect(result).toBe(true);
  });

  it("should send the welcome email if email is valid", async () => {
    await signUp(email);

    expect(sendEmail).toHaveBeenCalledOnce();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});

// Lesson: Spying on functions
describe("login", () => {
  it("should email the one-time login code", async () => {
    const email = "name@domain.com";
    const spy = vi.spyOn(security, "generateCode");

    await login(email);

    const securityCode = spy.mock.results[0].value.toString(); // results[0]: { type: 'return', value: 939157 }
    expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
  });
});

// Lesson: Mocking dates
describe("isOnline", () => {
  it("should return false if current hour is outside opening hours", () => {
    vi.setSystemTime(new Date("2024-01-01 07:59"));
    expect(isOnline()).toBe(false);

    vi.setSystemTime(new Date("2024-01-01 20:01"));
    expect(isOnline()).toBe(false);
  });

  it("should return true if current hour is within opening hours", () => {
    vi.setSystemTime(new Date("2024-01-01 08:00"));
    expect(isOnline()).toBe(true);

    vi.setSystemTime(new Date("2024-01-01 19:59"));
    expect(isOnline()).toBe(true);
  });
});

// Exercise: Mocking dates
describe("getDiscount", () => {
  it("should return 0.2 on Christmas day", () => {
    vi.setSystemTime(new Date("2024-12-25 00:01"));
    expect(getDiscount()).toBe(0.2);

    vi.setSystemTime(new Date("2024-12-25 23:59"));
    expect(getDiscount()).toBe(0.2);
  });

  it("should return 0 on any other day", () => {
    vi.setSystemTime(new Date("2024-12-26 00:01"));
    expect(getDiscount()).toBe(0);
  });
});
