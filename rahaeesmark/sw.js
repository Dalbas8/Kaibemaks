// Teenustöötaja: vajalik, et brauser (eriti Androidis) saaks meeldetuletusi teavitusena näidata.
// Teavituse klõpsamine avab või toob esile äpi akna.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    const win = list.find(w => "focus" in w);
    return win ? win.focus() : self.clients.openWindow("./");
  }));
});
