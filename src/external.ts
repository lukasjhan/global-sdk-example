declare global {
  interface Window {
    data: { label: string };
    setLabel: (label: string) => void;
  }
}

let data = { label: 'Edit src/App.tsx and save to reload.' };
let listeners: Array<() => void> = [];

export const mySDKStore = {
  setLabel(newLabel: string) {
    data = { label: newLabel };
    emitChange();
  },
  subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return data;
  },
};

function emitChange() {
  for (let listener of listeners) {
    console.log(1);
    listener();
  }
}

window.data = data;
window.setLabel = mySDKStore.setLabel;
