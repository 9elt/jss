# JSS

> [!NOTE]
> This is a proof of concept. Some parts require further design work.

JSS is a tiny utility that converts JavaScript objects into CSS and class names.

It is designed to be used like Next.js CSS Modules, but without sacrificing
JavaScript language-server features. This allows you to track where classes are
defined and used, and to easily inspect styles.

_`style.ts`_

```ts
import { use } from "@9elt/jss";

export const style = use({ seed: "example" });

export const container = style.jss({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

export const card = style.jss({
    color: "black",
    boxShadow: "0 0 12px black",
    ":hover": {
        boxShadow: "0 0 4px black",
    },
    "& .title": {
        color: "blue",
    },
    "@media (max-width: 960px)": {
        boxShadow: "0 0 8px black",
        ":hover": {
            boxShadow: "0 0 2px black",
        },
    },
});
```

_`component.ts`_

```tsx
import { container, card } from "./style";

function Component() {
    return (
        <div calssName={container}>
            <div className={card}>
                ...
            </div>
        </div>
    );
}
```

_`somewhere.ts`_

```tsx
import { style } from ".../style";

<style>{style.css}</style>
```
