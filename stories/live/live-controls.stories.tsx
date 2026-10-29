import type { Meta, StoryObj } from "@storybook/react";
import { LiveControls } from "../../components/live/live-controls";

const meta: Meta<typeof LiveControls> = {
  title: "LIVE/LiveControls",
  component: LiveControls,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveControls>;

export const Default: Story = {
  args: {},
};
