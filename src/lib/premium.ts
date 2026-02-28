export const isPremiumUser = (profile: { subscription_tier: string } | null): boolean => {
  if (!profile) return false;
  return profile.subscription_tier === "pro" || profile.subscription_tier === "enterprise";
};
