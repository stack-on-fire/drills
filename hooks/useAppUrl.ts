const getAppUrl = () => process.env.APP_URL || "http://localhost:3000";

const useAppUrl = () => {
  return getAppUrl();
};

export { useAppUrl, getAppUrl };
