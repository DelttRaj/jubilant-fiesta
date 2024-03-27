import { clientsClaim } from "workbox-core";
import { precacheAndRoute } from "workbox-precaching";
// For rapid updation process - claim it soon -  activates a sw as soon sw updates takes place
clientsClaim();
//Don't close the tab for new changes - changes will come automatically
self.skipWaiting();
//Pre cache stuff
precacheAndRoute(self.__WB_MANIFEST);
