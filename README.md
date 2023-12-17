# Global SDK Example

## Introduction

This example show how to integrate the SDK with REACT UI components. In the past, it was not possible to synchronize React's life cycle with the global object(window), so we had to use Hack to do so.

like below:

```javascript
const Provider = ({ children }: { children: any }) => {
  const [data, setData] = useState<ContextState>({
    project: null,
    user: null,
    workspaces: [],
    lang: i18n.language.substring(0, 2),
    design: null,
  });

  const setProject = (project: Project) => {
    setData((prev) => ({ ...prev, project }));
  };

  const setDesign = (newDesign: Partial<Design>) => {
    setData((prev) => ({ ...prev, design: { ...prev.design, ...newDesign } }));
  };

  const logout = () => {
    setData((prev) => ({ ...prev, user: null }));
  };
  window.sdk.setProject = setProject;
  window.sdk.setDesign = setDesign;
  window.sdk.logout = logout;
...
```

We make a React Provider component that serve as a bridge between the SDK and the React components. The problem is that we have to use the global object(window) to expose the functions to the SDK, and this is NOT a good practice.

Now, we can use the new SDK to do the same thing, but in a better way using [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore#subscribing-to-an-external-store)

```javascript
function App() {
  const data = useSyncExternalStore(
    mySDKStore.subscribe,
    mySDKStore.getSnapshot
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data.label}</p>

        <button
          onClick={() => {
            window.setLabel('new Label');
          }}
        >
          Button
        </button>
      </header>
    </div>
  );
}
```

We can use global scope object as a hook into the components. This allows us to use the SDK in a more natural way. It's just like a normal React component.

## How to use and check proof of concept

1. Install dependencies

```bash
pnpm install
```

2. Run React Project

```bash
pnpm run start
```

It will start the application in http://localhost:3000

3. You can click the button in the webpage or use the console to change the label.

```javascript
// in your browser console
window.setLabel('new label');
```

![poc](/docs/poc.gif)
