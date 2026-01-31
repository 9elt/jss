import { use } from "..";

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
