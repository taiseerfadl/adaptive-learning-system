import type { Meta, StoryObj } from "@storybook/react";
import { LiveQna } from "../../components/live/live-qna";

const meta: Meta<typeof LiveQna> = {
  title: "LIVE/LiveQna",
  component: LiveQna,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveQna>;

export const Default: Story = {
  args: {},
};
