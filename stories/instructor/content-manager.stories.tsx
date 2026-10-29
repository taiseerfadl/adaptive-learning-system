import type { Meta, StoryObj } from "@storybook/react";
import { ContentManager } from "../../components/instructor/content-manager";

const meta: Meta<typeof ContentManager> = {
  title: "INSTRUCTOR/ContentManager",
  component: ContentManager,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContentManager>;

export const Default: Story = {
  args: {},
};
