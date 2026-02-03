/**
 * Button component tests.
 * Tests app/core/components/Button – base code stays untouched.
 */
import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfigProvider } from "antd";
import { Button } from "~/core/components/Button";

function renderWithProvider(ui: React.ReactElement) {
  return render(<ConfigProvider>{ui}</ConfigProvider>);
}

describe("Button", () => {
  it("renders children", () => {
    renderWithProvider(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    renderWithProvider(<Button onClick={onClick}>Submit</Button>);
    await userEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("supports type primary", () => {
    renderWithProvider(<Button type="primary">Primary</Button>);
    const btn = screen.getByRole("button", { name: /primary/i });
    expect(btn).toHaveClass("ant-btn-primary");
  });
});
