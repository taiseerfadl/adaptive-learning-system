import type { Meta, StoryObj } from "@storybook/react";
import { ProtectedRoute } from "../../components/auth/protected-route";

const meta: Meta<typeof ProtectedRoute> = {
  title: "AUTH/ProtectedRoute",
  component: ProtectedRoute,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProtectedRoute>;

export const Default: Story = {
  args: {},
};
