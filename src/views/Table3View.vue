<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="my-4">
            <input
              v-model="filter"
              type="text"
              class="border border-gray-400 rounded px-2 py-2"
              placeholder="Search"
            />
          </div>
          <TableTanstack :data="people" :columns="columnsPeople" />
        </div>
      </div>
      <div class="mt-8">
        Page {{ page }} of {{ totalPages }} - {{ total }} results
      </div>
      <Pagination
        v-slot="{ page }"
        :total="total"
        :sibling-count="1"
        show-edges
        :default-page="page"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst @click="setPage(1)" />
          <PaginationPrev @click="setPage(page - 1)" />
          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-10 h-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
                @click="setPage(item.value)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>
          <PaginationNext @click="setPage(page + 1)" />
          <PaginationLast @click="setPage(totalPages)" />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>

<script setup>
import { h, ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import TableTanstack from '@/components/TableTanstack.vue';
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
const handleEdit = (id) => {
  console.log(`Edit item with id: ${id}`);
};
const renderExpanded = (row) => {
  if (!row.getCanExpand()) {
    return h(Text, '🔵');
  }

  return h(
    'button',
    {
      onClick: row.getToggleExpandedHandler(),
      style: { cursor: 'pointer' },
    },
    row.getIsExpanded() ? '👇' : '👉',
  );
};

const columnsPeople = [
  {
    accessorKey: 'id',
    header: 'ID',
    enableSorting: false,
  },
  {
    accessorKey: 'username',
    header: 'username',
  },
  {
    accessorKey: 'avatar',
    header: 'avatar',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'created_at',
    header: 'Created',
    cell: (info) => formatDate(info.getValue()),
  },
  {
    accessorKey: 'edit',
    header: ' ',
    cell: ({ row }) =>
      h('button', { onClick: () => handleEdit(row.original.id) }, 'Edit'),
    enableSorting: false,
  },
  {
    accessorKey: 'expand',
    header: 'expand',
    cell: ({ row }) => renderExpanded(row),
    enableSorting: false,
  },
];

const people = ref([]);
const filter = ref('');
const total = ref(0);
const totalPages = ref(1);

const route = useRoute();
const router = useRouter();

const page = ref(parseInt(route.query.page, 10) || 1);
const perPage = ref(parseInt(route.query.per_page, 10) || 10);

const fetchUserData = async () => {
  try {
    const response = await axios.get('/mock/getUserList', {
      params: {
        page: page.value,
        per_page: perPage.value,
      },
    });
    const data = response.data.data;
    people.value = data.users;
    total.value = data.total;
    totalPages.value = data.total_pages;
    console.log('data:', data);
  } catch (error) {
    console.error('Failed to fetch user data', error);
  }
};

const setPage = (newPage) => {
  if (newPage < 1 || newPage > totalPages.value) return;
  router.push({ query: { ...route.query, page: newPage } });
};

watch(
  () => route.query,
  (newQuery) => {
    page.value = parseInt(newQuery.page, 10) || 1;
    perPage.value = parseInt(newQuery.per_page, 10) || 10;
    fetchUserData();
  },
  { immediate: true },
);

onMounted(() => {
  fetchUserData();
});
</script>
