import { Workbox } from "workbox-window";

const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/build/sw.js");
    console.log("about workbox ", wb);
    wb.addEventListener("installed", (event) => {
      if (event.isUpdate) {
        window.location.reload();
      }
    });

    wb.register()
      .then((registration) => {
        console.log("Service Worker registered successfully:", registration);
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
};

export default registerServiceWorker;
