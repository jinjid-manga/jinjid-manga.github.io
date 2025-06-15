<template>
    <div
        class="relative w-full flex items-center justify-center h-[100dvh]"
        @mousemove="handleMouseMove"
        @mouseleave="handleMouseLeave"
    >
        <img v-if="manga" :src="pageImageUrl" class="max-h-[100dvh]" />
        <div
            v-else
            class="flex flex-col items-center justify-center w-full h-full"
        >
            <div class="text-slate-300">
                {{ $t("reader.notFound") }}
            </div>
            <router-link
                :to="{ name: 'home' }"
                class="text-purple-400 hover:underline flex items-center gap-2"
            >
                <i-mdi-home class="w-5 h-5" />
                {{ $t("reader.home") }}
            </router-link>
        </div>

        <!-- Navigation Overlay -->
        <div
            v-if="manga"
            class="absolute inset-0 hidden md:flex items-center justify-between p-4 pointer-events-none transition-opacity duration-200"
            :class="{ 'opacity-0': !showControls, 'opacity-100': showControls }"
        >
            <button
                class="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors pointer-events-auto"
                :disabled="currentPage === 0"
            >
                <i-mdi-chevron-left class="w-8 h-8" />
            </button>
            <button
                class="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors pointer-events-auto"
                :disabled="currentPage >= manga.pages.length - 1"
            >
                <i-mdi-chevron-right class="w-8 h-8" />
            </button>
        </div>

        <!-- Page Counter -->
        <div
            v-if="manga"
            class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full pointer-events-none transition-opacity duration-200 hidden md:block"
            :class="{ 'opacity-0': !showControls, 'opacity-100': showControls }"
        >
            {{ currentPage + 1 }} / {{ manga.pages.length }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useMagicKeys, useEventListener } from "@vueuse/core";
import { useRoute, useRouter } from "vue-router";
import library, { type Manga } from "virtual:manga";

const route = useRoute();
const router = useRouter();
const manga = computed(() =>
    Object.values(library).find((m: Manga) => m.id === route.params.id),
);
const { arrowLeft, arrowRight } = useMagicKeys();
const currentPage = ref((parseInt(route.query.page as string) || 1) - 1);
const showControls = ref(false);

const pageImageUrl = computed(() => {
    if (!manga.value) {
        return;
    }

    return `manga/${manga.value.id}/${manga.value.pages[currentPage.value]}`;
});

function handleMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    // Show controls when mouse is near edges (within 100px)
    const nearLeft = clientX < 100;
    const nearRight = clientX > innerWidth - 100;
    const nearTop = clientY < 100;
    const nearBottom = clientY > innerHeight - 100;

    showControls.value = nearLeft || nearRight || nearTop || nearBottom;
}

function handleMouseLeave() {
    showControls.value = false;
}

function nextPage() {
    if (!manga.value) {
        return;
    }

    currentPage.value = Math.min(
        currentPage.value + 1,
        manga.value.pages.length - 1,
    );
}

function previousPage() {
    currentPage.value = Math.max(currentPage.value - 1, 0);
}

// Update URL when page changes
watch(currentPage, (newPage) => {
    router.replace({
        query: { ...route.query, page: (newPage + 1).toString() },
    });
});

// Watch for query parameter changes
watch(
    () => route.query.page,
    (newPage) => {
        if (!newPage) {
            return;
        }

        const pageNum = parseInt(newPage as string) - 1;

        if (!isNaN(pageNum) && pageNum >= 0) {
            currentPage.value = pageNum;
        }
    },
);

watch(arrowLeft, () => arrowLeft.value && previousPage());
watch(arrowRight, () => arrowRight.value && nextPage());
useEventListener(document, "mousedown", ({ clientX }) =>
    clientX > window.innerWidth * 0.5 ? nextPage() : previousPage(),
);
</script>
