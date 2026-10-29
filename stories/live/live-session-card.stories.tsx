import type { Meta, StoryObj } from "@storybook/react";
import { LiveSessionCard } from "../../components/live/live-session-card";

const meta: Meta<typeof LiveSessionCard> = {
  title: "LIVE/LiveSessionCard",
  component: LiveSessionCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveSessionCard>;

export const Default: Story = {
  args: {},
};
