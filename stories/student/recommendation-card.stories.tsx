import type { Meta, StoryObj } from "@storybook/react";
import { RecommendationCard } from "../../components/student/recommendation-card";

const meta: Meta<typeof RecommendationCard> = {
  title: "STUDENT/RecommendationCard",
  component: RecommendationCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RecommendationCard>;

export const Default: Story = {
  args: {},
};
