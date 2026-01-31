for (const path of process.argv.slice(2)) {
    const parts = path.split(".");

    const ext = parts.pop()!;
    const name = parts.join(".");

    const file = Bun.file(path);

    if (await file.exists()) {
        const mod = require(path);

        if (!mod.style) {
            continue;
        }

        await Bun.write(name + ".css", mod.style.css);

        let classNames = "";
        for (const className in mod) {
            if (className !== "style") {
                classNames += `export const ${className} = "${mod[className]}";\n`;
            }
        }

        await Bun.write(name + ".names." + ext, classNames);
    }
}
