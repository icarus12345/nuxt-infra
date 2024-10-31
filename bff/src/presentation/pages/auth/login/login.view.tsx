import { Flex, Button, Box } from "@radix-ui/themes";
import * as Tabs from "@radix-ui/react-tabs";
import LoginForm from "@presentation/pages/auth/components/login-form";
import RegisterForm from "@presentation/pages/auth/components/register-form";

export default function LoginView() {
  return (
    <Flex className="min-h-dvh" justify="center">
      <Box m="auto">
        <Tabs.Root className="TabsRoot" defaultValue="tab1">
          <Tabs.List className="TabsList" aria-label="Manage your account">
            <Tabs.Trigger className="TabsTrigger" value="tab1">
              SIGN IN
            </Tabs.Trigger>
            <Tabs.Trigger className="TabsTrigger" value="tab2">
              FORGOT
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="TabsContent" value="tab1">
            <LoginForm />
          </Tabs.Content>
          <Tabs.Content className="TabsContent" value="tab2">
            <RegisterForm />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Flex>
  );
}