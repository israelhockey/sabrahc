// Campaign configuration — update these values as the campaign progresses
export const CAMPAIGN = {
  goalAmount: 300000,
  raisedAmount: 12600,
  goalMembers: 500,
  currentMembers: 21,
  membershipPrice: 299,
  installmentPrice: 100,
  installmentCount: 3,
} as const;

export const FOUNDING_MEMBERS = Array.from({ length: CAMPAIGN.currentMembers }, (_, i) => ({
  id: i + 1,
  name: `Founding Member #${String(i + 1).padStart(3, "0")}`,
}));
