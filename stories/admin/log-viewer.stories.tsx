import type { Meta, StoryObj } from "@storybook/react";
import { LogViewer } from "../../components/admin/log-viewer";

const meta: Meta<typeof LogViewer> = {
  title: "ADMIN/LogViewer",
  component: LogViewer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LogViewer>;

export const Default: Story = {
  args: {},
};
