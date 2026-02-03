/**
 * Auth store unit tests.
 * Tests app/core/stores/auth-store – base code stays untouched.
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAuthStore } from "~/core/stores/auth-store";

describe("auth-store", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    vi.stubGlobal("sessionStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
    });
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it("has initial state", () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it("setAuth updates state", () => {
    const user = { id: "1", email: "test@example.com", name: "Test" };
    const token = "jwt-token";
    useAuthStore.getState().setAuth(user, token);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(user);
    expect(state.token).toBe(token);
    expect(state.isAuthenticated).toBe(true);
  });

  it("logout clears state", () => {
    useAuthStore.getState().setAuth(
      { id: "1", email: "a@b.com" },
      "token"
    );
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
