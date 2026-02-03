/**
 * Base 403 Unauthorized Page – do not modify.
 * Override in app/extensions/pages/Unauthorized.tsx
 */

import React from "react";
import { Link } from "react-router";
import { Result, Button } from "antd";

export function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Result
        status="403"
        title="403"
        subTitle="You do not have permission to access this page."
        extra={
          <>
            <Link to="/dashboard">
              <Button type="primary">Go to Dashboard</Button>
            </Link>
            <Link to="/">
              <Button className="ml-2">Sign in</Button>
            </Link>
          </>
        }
      />
    </div>
  );
}
