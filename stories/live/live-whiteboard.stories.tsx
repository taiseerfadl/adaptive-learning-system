import type { Meta, StoryObj } from "@storybook/react";
import { LiveWhiteboard } from "../../components/live/live-whiteboard";

const meta: Meta<typeof LiveWhiteboard> = {
  title: "LIVE/LiveWhiteboard",
  component: LiveWhiteboard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveWhiteboard>;

export const Default: Story = {
  args: {},
};
