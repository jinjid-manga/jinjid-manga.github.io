<template>
    <div
        class="flex items-center justify-center w-full h-[100dvh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
        <img v-if="currentManga" :src="pageImageUrl" class="max-h-full" />
        <div
            v-else
            class="flex flex-col items-center gap-8 p-8 max-w-4xl w-full"
        >
            <div class="text-center">
                <h1
                    class="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2"
                >
                    Manga Reader
                </h1>
                <p class="text-slate-300 text-lg">
                    Choose a manga to start reading
                </p>
            </div>

            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
            >
                <div v-for="(manga, id) of Manga" :key="id" class="group">
                    <button
                        type="button"
                        @click="currentManga = manga"
                        class="w-full p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl hover:bg-slate-700/50 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        <div class="text-center">
                            <h3
                                class="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors"
                            >
                                {{ manga.name }}
                            </h3>
                            <p class="text-slate-400 text-sm">
                                {{ manga.pages?.length || 0 }} pages
                            </p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import Manga from "virtual:manga";
import { useMagicKeys, useEventListener } from "@vueuse/core";

const { arrowLeft, arrowRight } = useMagicKeys();
const currentManga = ref(null);
const currentPage = ref(0);
const pageImageUrl = computed(() => {
    if (!currentManga.value) {
        return;
    }

    return `manga/${currentManga.value.id}/${currentManga.value.pages[currentPage.value]}`;
});

function nextPage() {
    currentPage.value = Math.min(
        currentPage.value + 1,
        currentManga.value.pages.length - 1,
    );
}

function previousPage() {
    currentPage.value = Math.max(currentPage.value - 1, 0);
}

watch(arrowLeft, () => arrowLeft.value && previousPage());
watch(arrowRight, () => arrowRight.value && nextPage());
useEventListener(document, "mousedown", ({ clientX }) =>
    clientX > window.innerWidth * 0.5 ? nextPage() : previousPage(),
);
</script>
