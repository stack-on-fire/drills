const getAppUrl = () =>
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const useAppUrl = () => {
  return getAppUrl();
};

export { useAppUrl, getAppUrl };
