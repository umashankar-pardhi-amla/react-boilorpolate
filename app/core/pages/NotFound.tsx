/**
 * Base 404 Page – do not modify.
 * Override in app/extensions/pages/NotFound.tsx
 */

import React from "react";
import { Link } from "react-router";
import { Result, Button } from "antd";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Result
        status="404"
        title="404"
        subTitle="The page you requested could not be found."
        extra={
          <Link to="/">
            <Button type="primary">Go to Sign in</Button>
          </Link>
        }
      />
    </div>
  );
}
