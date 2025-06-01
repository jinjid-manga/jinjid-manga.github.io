import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import { readdirSync, readFileSync } from "node:fs";
import { URL, fileURLToPath } from "node:url";

function virtualManga(): Plugin {
    return {
        name: "virtual-manga",
        resolveId(id) {
            if (id !== "virtual:manga") {
                return;
            }

            return id;
        },
        load(id) {
            if (id !== "virtual:manga") {
                return;
            }

            const mangaIds = readdirSync(
                fileURLToPath(new URL("./public/manga/", import.meta.url)),
            );

            const manga = mangaIds.reduce((acc, id) => {
                const meta = JSON.parse(
                    readFileSync(
                        fileURLToPath(
                            new URL(
                                `./public/manga/${id}/meta.json`,
                                import.meta.url,
                            ),
                        ),
                    ).toString(),
                );

                return {
                    ...acc,
                    [id]: {
                        id,
                        pages: readdirSync(
                            fileURLToPath(
                                new URL(
                                    `./public/manga/${id}/`,
                                    import.meta.url,
                                ),
                            ),
                        ).filter((page) => page.endsWith(".jpg")),
                        ...meta,
                    },
                };
            }, {});

            return `export default ${JSON.stringify(manga)};`;
        },
    };
}

export default defineConfig({
    plugins: [vue(), tailwindcss(), virtualManga()],
});
