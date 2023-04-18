import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { debug } from "vitest-preview";
import App from "../App";

describe("App", () => {
  it("Test the Home page", async () => {
    render(<App />);
    expect(screen.getByText(/and save to test HMR/i)).toBeDefined();
    const button = screen.getByText(/Count is 0/i);
    fireEvent.click(button);
    expect(screen.getByText(/Count is 1/i)).toBeDefined();
    // debug();
  });
});
