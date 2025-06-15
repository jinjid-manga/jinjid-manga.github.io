<template>
    <div class="flex grow flex-col items-center gap-8 p-8 max-w-4xl w-full">
        <div class="text-center">
            <h1 class="text-6xl font-bold text-white mb-2">
                {{ $t("home.title") }}
            </h1>
        </div>
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
            <div
                v-for="(manga, id) of library"
                :key="id"
                class="w-full p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl"
            >
                <h3 class="text-3xl font-semibold text-white mb-2 text-center">
                    {{ manga.name }}
                </h3>
                <img
                    :src="`manga/${manga.id}/thumbnail.jpg`"
                    :alt="manga.name"
                    class="w-full h-auto rounded-lg mb-4"
                />
                <div class="flex flex-col gap-3">
                    <router-link
                        :to="{ name: 'reader', params: { id: manga.id } }"
                        target="_blank"
                        class="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center gap-2"
                    >
                        <i-mdi-book-open-page-variant class="size-5" />
                        {{ $t("home.readNow") }}
                    </router-link>
                    <a
                        :href="`manga/${manga.id}.zip`"
                        class="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center gap-2"
                    >
                        <i-mdi-download class="size-5" />
                        {{ $t("home.download") }}
                    </a>
                </div>
            </div>
            <div
                class="flex flex-col w-full p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl"
            >
                <h3 class="text-2xl font-semibold text-white mb-2 text-center">
                    {{ $t("home.requestTitle") }}
                </h3>
                <p class="text-white text-center mb-4">
                    {{ $t("home.requestDescription") }}
                </p>
                <a
                    href="mailto:jinjidmanga@gmail.com?subject=Manga+Translation"
                    class="mt-auto w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 flex items-center justify-center gap-2"
                >
                    <i-mdi-email class="size-5" />
                    {{ $t("home.contact") }}
                </a>
            </div>
        </div>

        <div class="grow"></div>
        <footer class="w-full text-center mt-4">
            <button
                @click="showAbout = true"
                class="text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-2 mx-auto"
            >
                <i-mdi-information class="size-5" />
                {{ $t("home.about") }}
            </button>
        </footer>

        <AboutModal v-model="showAbout" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import library from "virtual:manga";
import AboutModal from "@/components/AboutModal.vue";

const showAbout = ref(false);
</script>
