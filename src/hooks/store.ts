declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent;
  }
}

let providers: EIP6963ProviderDetail[] = [];

export const store = {
  value: () => providers,
  // Takes a callback function to be invoked on each store update
  subscribe: (callback: () => void) => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid)) {
        return;
      }
      providers = [...providers, event.detail];
      callback();
    }
    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    // Return a function to unsubscribe from the
    return () =>
      window.removeEventListener("eip6963:announceProvider", onAnnouncement);
  },
};
