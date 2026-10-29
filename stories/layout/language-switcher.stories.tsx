import type { Meta, StoryObj } from "@storybook/react";
import { LanguageSwitcher } from "../../components/layout/language-switcher";

const meta: Meta<typeof LanguageSwitcher> = {
  title: "LAYOUT/LanguageSwitcher",
  component: LanguageSwitcher,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {
  args: {},
};
