import 'dotenv/config';

export default {
  expo: {
    name: "mobile",
    slug: "mobile",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "mobile",
    userInterfaceStyle: "automatic",
    extra: {
      API_URL: process.env.API_URL,
      eas: { projectId: "23b684e9-fd1c-4d87-b299-5a1350f623be" }
    },
    updates: { url: "https://u.expo.dev/23b684e9-fd1c-4d87-b299-5a1350f623be" },
    runtimeVersion: { policy: "appVersion" }
  }
};
