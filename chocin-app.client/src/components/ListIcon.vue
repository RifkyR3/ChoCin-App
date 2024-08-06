<script setup>
import { ref, onMounted, computed } from 'vue';

const icons = ref(null);
const filter = ref(null);

const filteredIcons = computed(() => {
    if (filter.value) return icons.value.filter((icon) => icon.properties.name.indexOf(filter.value.toLowerCase()) > -1);
    else return icons.value;
});

onMounted(() => {

    // https://primevue.org/demo/data/icons.json
    fetch('/serviceIcons.json', { headers: { 'Cache-Control': 'no-cache' } })
        .then((res) => res.json())
        .then((d) => {
            let data = d.icons.filter((value) => {
                return value.icon.tags.indexOf('deprecate') === -1;
            });
            data.sort((icon1, icon2) => {
                if (icon1.properties.name < icon2.properties.name) return -1;
                else if (icon1.properties.name > icon2.properties.name) return 1;
                else return 0;
            });

            icons.value = data;
        });
});
</script>

<template>
    <div class="card">
        <h4>List of Icons</h4>
        <p>
            Here is the current list of PrimeIcons, more icons are added periodically. You may also <a
                href="https://github.com/primefaces/primeicons/issues"
                class="font-medium text-primary hover:underline">request new icons</a> at the issue tracker.
        </p>

        <InputText v-model="filter" class="w-full p-4 mt-4 mb-8" placeholder="Search an icon" />

        <div class="grid grid-cols-12 gap-4 icons-list text-center">
            <div class="col-span-6 sm:col-span-4 lg:col-span-3 xl:col-span-2 pb-8" v-for="icon of filteredIcons"
                :key="icon.properties.name">
                <i :class="'text-2xl mb-2 pi pi-' + icon.properties.name"></i>
                <div>pi-{{ icon.properties.name }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.icons-list {
    i {
        color: var(--text-color-secondary);
    }
}
</style>
