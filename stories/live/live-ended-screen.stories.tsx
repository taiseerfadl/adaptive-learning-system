import type { Meta, StoryObj } from "@storybook/react";
import { LiveEndedScreen } from "../../components/live/live-ended-screen";

const meta: Meta<typeof LiveEndedScreen> = {
  title: "LIVE/LiveEndedScreen",
  component: LiveEndedScreen,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveEndedScreen>;

export const Default: Story = {
  args: {},
};
