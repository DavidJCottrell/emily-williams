"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function BuilderLogin() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/builder";

  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/builder/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed");
        setPending(false);
        return;
      }
      // Hard navigation so middleware re-evaluates with the new cookie.
      window.location.href = next.startsWith("/") ? next : "/builder";
    } catch {
      setError("Network error");
      setPending(false);
    }
  };

  return (
    <div className="builder-login">
      <form className="builder-login__form" onSubmit={submit}>
        <h1 className="builder-login__title">Project Builder</h1>
        <p className="builder-login__hint">Enter the builder password to continue.</p>

        <label className="builder-login__field">
          <span>Password</span>
          <input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={pending}
          />
        </label>

        {error && <p className="builder-login__error">{error}</p>}

        <button
          type="submit"
          className="builder-login__submit"
          disabled={pending || password.length === 0}
        >
          {pending ? "Checking…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
