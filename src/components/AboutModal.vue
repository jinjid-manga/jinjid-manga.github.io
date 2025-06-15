<template>
    <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
        <div v-if="modelValue" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
                <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" @click="$emit('update:modelValue', false)" />

                <div class="relative transform overflow-hidden rounded-lg bg-slate-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div class="absolute right-0 top-0 pr-4 pt-4">
                        <button
                            type="button"
                            class="rounded-md bg-slate-800 text-slate-400 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                            @click="$emit('update:modelValue', false)"
                        >
                            <span class="sr-only">{{ $t('about.close') }}</span>
                            <i-mdi-close class="h-6 w-6" />
                        </button>
                    </div>

                    <div class="sm:flex sm:items-start">
                        <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                            <h3 class="text-2xl font-semibold leading-6 text-white mb-4">
                                {{ $t('about.title') }}
                            </h3>
                            <div class="mt-2">
                                <p class="text-slate-300 mb-2">
                                    {{ $t('about.descriptionLine1') }}
                                </p>
                                <p class="text-slate-300 mb-2">
                                    {{ $t('about.descriptionLine2') }}
                                </p>
                                <p class="text-slate-300 mb-2">
                                    {{ $t('about.descriptionLine3') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
defineProps<{
    modelValue: boolean
}>();

defineEmits<{
    'update:modelValue': [value: boolean]
}>();
</script>
