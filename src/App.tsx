import "./App.css";
import getPublicKey from "./services/getPublicKey";
import getNotification from "./services/getNotification";
import { useEffect, useState } from "react";

function App() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  useEffect(() => {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(async (serviceWorker) => {
        let pushSubscription =
          await serviceWorker.pushManager.getSubscription();

        if (!pushSubscription) {
          const { publicKey } = await getPublicKey();

          pushSubscription = await serviceWorker.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey,
          });

          return setSubscription(pushSubscription);
        }
      });
  }, []);

  function showNotification() {
    if (subscription) {
      getNotification(subscription);
    }
  }

  return (
    <>
      <h1>Web push node + React</h1>
      <div className="card">
        <button onClick={showNotification}>Solicitar notificação</button>
      </div>
    </>
  );
}

export default App;
