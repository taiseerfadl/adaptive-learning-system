import type { Meta, StoryObj } from "@storybook/react";
import { ModuleViewer } from "../../components/student/module-viewer";

const meta: Meta<typeof ModuleViewer> = {
  title: "STUDENT/ModuleViewer",
  component: ModuleViewer,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModuleViewer>;

export const Default: Story = {
  args: {},
};
