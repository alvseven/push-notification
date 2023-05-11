import { api } from "./api";

async function getNotification(subscription: PushSubscription) {
  await api.post("/notifications/push/send", { subscription });
}

export default getNotification;
