/**
 * Extensibility demo – function, component, Zustand, and CSS examples.
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/extensions-demo";
import { Button, Card } from "~/components";
import { useCounterStore, useAppStore } from "~/extensions/stores";
import { getFormatDate } from "~/core/utils";
import { logger } from "~/extensions/logger/logger";
import { Space, Typography, Divider, Tag } from "antd";

const { Title, Paragraph, Text } = Typography;

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Extensibility Examples" },
    { name: "description", content: "Function, component, Zustand, and CSS extensions" },
  ];
}

export default function ExtensionsDemo() {
  const { count, step, history, increment, decrement, setStep, reset } = useCounterStore();
  const { theme, sidebarCollapsed, setTheme, toggleSidebar } = useAppStore();
  const [formatDateFn, setFormatDateFn] = useState<((d: Date | string, f?: string) => string) | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    getFormatDate().then((fn) => {
      setFormatDateFn(() => fn);
      setFormattedDate(fn(new Date()));
    });
  }, []);

  const handleLog = () => {
    logger.info("Demo button clicked", { screen: "extensions-demo" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <Link to="/home" className="text-indigo-600 hover:underline text-sm">← Home</Link>
            <Title level={1} className="!mt-2">Extensibility Examples</Title>
            <Paragraph type="secondary">
              Function, component, Zustand state, and CSS overrides – all without touching base code.
            </Paragraph>
          </div>
        </div>

        {/* 1. Extensible function: formatDate */}
        <Card title="1. Extensible function" headerAction={<Tag color="blue">formatDate</Tag>}>
          <Paragraph>
            Base <code>formatDate</code> is in <code>core/utils/formatDate.ts</code>.
            Extension in <code>extensions/utils/formatDate.ts</code> uses dayjs and custom format.
          </Paragraph>
          <Space direction="vertical">
            <Text strong>Current date (extended formatter):</Text>
            <Text code>{formattedDate || "…"}</Text>
            {formatDateFn && (
              <Text type="secondary">With format YYYY-MM-DD: {formatDateFn(new Date(), "YYYY-MM-DD")}</Text>
            )}
          </Space>
        </Card>

        {/* 2. Extensible components: Button, Card */}
        <Card title="2. Extensible components" headerAction={<Tag color="green">Button, Card</Tag>}>
          <Paragraph>
            Base components in <code>core/components/</code>. Extended in{" "}
            <code>extensions/components/</code> (extra class, optional tracking). Use <code>~/components</code> in app.
          </Paragraph>
          <Space>
            <Button type="primary" onClick={handleLog}>Extended Button</Button>
            <Button onClick={toggleSidebar}>
              Sidebar: {sidebarCollapsed ? "Expand" : "Collapse"}
            </Button>
          </Space>
        </Card>

        {/* 3. Zustand extended store */}
        <Card title="3. Zustand extended store" headerAction={<Tag color="orange">useCounterStore</Tag>}>
          <Paragraph>
            Extended store adds <code>step</code> and <code>history</code>. Defined in{" "}
            <code>extensions/stores/counter-store.ts</code>.
          </Paragraph>
          <Space direction="vertical" className="w-full">
            <div className="flex items-center gap-4 flex-wrap">
              <Text strong>Count: {count}</Text>
              <Text type="secondary">Step: {step}</Text>
            </div>
            <Space>
              <Button onClick={decrement}>−</Button>
              <Button type="primary" onClick={increment}>+</Button>
              <Button onClick={reset}>Reset</Button>
              <input
                type="number"
                min={1}
                value={step}
                onChange={(e) => setStep(Number(e.target.value) || 1)}
                className="w-16 px-2 py-1 border rounded"
              />
            </Space>
            {history.length > 0 && (
              <Text type="secondary">History (last 10): {history.join(", ")}</Text>
            )}
          </Space>
        </Card>

        {/* 4. App store (theme / UI state) */}
        <Card title="4. App store (theme / UI)" headerAction={<Tag color="purple">useAppStore</Tag>}>
          <Paragraph>
            Store only in extensions: <code>extensions/stores/app-store.ts</code>. Theme and sidebar state.
          </Paragraph>
          <Space>
            <Text>Theme:</Text>
            {(["light", "dark", "system"] as const).map((t) => (
              <Button
                key={t}
                type={theme === t ? "primary" : "default"}
                size="small"
                onClick={() => setTheme(t)}
              >
                {t}
              </Button>
            ))}
            <Text type="secondary">Sidebar collapsed: {String(sidebarCollapsed)}</Text>
          </Space>
        </Card>

        {/* 5. CSS / theme extension */}
        <Card title="5. CSS & theme extension" headerAction={<Tag color="cyan">extensions.css</Tag>}>
          <Paragraph>
            <code>extensions/ui/provider.tsx</code> wraps app with <code>BaseUIProvider</code> and custom Ant Design
            tokens. <code>extensions/ui/extensions.css</code> adds classes like <code>.ext-button</code>,{" "}
            <code>.ext-card</code>, <code>.ext-app-shell</code>.
          </Paragraph>
          <Text type="secondary">This page is inside .ext-app-shell; buttons and cards use extended styles.</Text>
        </Card>

        <Divider />

        <Paragraph type="secondary" className="text-center text-sm">
          All examples override or extend base behavior by adding files under <code>app/extensions/</code>.
          Base code in <code>app/core/</code> is unchanged.
        </Paragraph>
      </div>
    </div>
  );
}
