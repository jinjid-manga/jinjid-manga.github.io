import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import i18n from "@intlify/unplugin-vue-i18n/vite";
import icons from "unplugin-icons/vite";
import components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
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
                if (id.endsWith(".zip")) {
                    return acc;
                }

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
                        ).filter(
                            (page) =>
                                page.endsWith(".jpg") &&
                                !page.startsWith("thumbnail"),
                        ),
                        ...meta,
                    },
                };
            }, {});

            return `export default ${JSON.stringify(manga)};`;
        },
    };
}

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        virtualManga(),
        i18n({
            include: fileURLToPath(new URL("./src/lang/*.yml", import.meta.url)),
            strictMessage: false,
        }),
        icons(),
        components({
            dts: "src/types/components.d.ts",
            resolvers: [IconsResolver()],
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
