import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "../../components/forms/multi-select";

const meta: Meta<typeof MultiSelect> = {
  title: "FORMS/MultiSelect",
  component: MultiSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  args: {},
};
