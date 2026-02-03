import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Button } from "~/components";
import { useExampleStore } from "~/core/stores/example-store";
import { logger } from "~/core/logger";
import { useHttp } from "~/core/hooks";
import { Card, Space, Typography } from "antd";

const { Title, Paragraph } = Typography;

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "React Boilerplate - Enterprise Base" },
    { name: "description", content: "Extensible React boilerplate with enterprise features" },
  ];
}

export default function Home() {
  const { count, increment, decrement, reset } = useExampleStore();
  const { isLoading: httpLoading } = useHttp();

  const handleTestLogger = () => {
    logger.info("Button clicked", { button: "test-logger" });
    logger.debug("Debug message", { timestamp: new Date().toISOString() });
    logger.warn("Warning message", { level: "warning" });
  };

  const handleTestHttp = async () => {
    try {
      // Example API call (will fail if no backend, but demonstrates usage)
      logger.info("Testing HTTP client");
      // const response = await httpClient.get('/api/test');
      // logger.info("HTTP response", { data: response.data });
    } catch (error) {
      logger.error("HTTP request failed", error as Error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <Space direction="vertical" size="large" className="w-full">
            <div>
              <Title level={1} className="text-center">
                React Enterprise Boilerplate
              </Title>
              <Paragraph className="text-center text-gray-600">
                A highly extensible React boilerplate with enterprise-grade features
              </Paragraph>
            </div>

            <Card title="Features" className="bg-white">
              <ul className="list-disc list-inside space-y-2">
                <li>✅ Zustand for state management</li>
                <li>✅ Tailwind CSS for styling</li>
                <li>✅ Ant Design components</li>
                <li>✅ React Query for data fetching</li>
                <li>✅ Axios with interceptors</li>
                <li>✅ Centralized logging</li>
                <li>✅ Extensible architecture</li>
              </ul>
            </Card>

            <Card title="Zustand Store Example" className="bg-white">
              <Space direction="vertical" className="w-full">
                <div className="text-center">
                  <Title level={2}>Count: {count}</Title>
                </div>
                <Space className="justify-center w-full">
                  <Button type="primary" onClick={increment}>
                    Increment
                  </Button>
                  <Button onClick={decrement}>Decrement</Button>
                  <Button danger onClick={reset}>
                    Reset
                  </Button>
                </Space>
              </Space>
            </Card>

            <Card title="Test Features" className="bg-white">
              <Space direction="vertical" className="w-full">
                <Button type="default" onClick={handleTestLogger} block>
                  Test Logger
                </Button>
                <Button type="default" onClick={handleTestHttp} block loading={httpLoading}>
                  Test HTTP Client
                </Button>
              </Space>
            </Card>

            <Card title="Extensibility" className="bg-white">
              <Paragraph>
                This project uses a registry pattern that allows you to extend base implementations
                without modifying base code. See{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">EXTENSIBILITY.md</code> for details.
              </Paragraph>
              <Paragraph>
                <strong>Key Principle:</strong> Never modify files in{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">app/core/</code>. Instead, create
                extensions in <code className="bg-gray-100 px-2 py-1 rounded">app/extensions/</code>
                .
              </Paragraph>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link to="/extensions-demo">
                  <Button type="primary">View all extensibility examples →</Button>
                </Link>
                <Link to="/login">
                  <Button>Sign in</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign up</Button>
                </Link>
                <Link to="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              </div>
            </Card>
          </Space>
        </Card>
      </div>
    </div>
  );
}
