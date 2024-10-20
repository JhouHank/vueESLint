<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="my-4">
            <input
              v-model.lazy="filter"
              type="text"
              class="border border-gray-400 rounded px-2 py-2"
              placeholder="Search"
              @input="fetchData"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
              >
                <TableHead
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                  @click="handleSort(header)"
                >
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                  {{ { asc: ' ↑', desc: '↓' }[header.column.getIsSorted()] }}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-for="row in table.getRowModel().rows" :key="row.id">
                <TableRow>
                  <TableCell
                    v-for="cell in row.getVisibleCells()"
                    :key="cell.id"
                    class="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                  >
                    <FlexRender
                      :render="cell.column.columnDef.cell"
                      :props="cell.getContext()"
                    />
                  </TableCell>
                </TableRow>
              </template>
            </TableBody>
          </Table>
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
// import { ref, onMounted, watch } from 'vue';
import { ref, onMounted } from 'vue';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/vue-table';

const sorting = ref([]);
const filter = ref('');
const page = ref(1);
const perPage = ref(10);
const total = ref(0);
const totalPages = ref(0);
const tableData = ref([]);

const columns = ref([
  { accessorKey: 'username', header: 'Username' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Role' },
]);

const fetchData = async () => {
  const response = await fetch(
    `/mock/getUserList?page=${page.value}&per_page=${perPage.value}&sort=${sorting.value}&filter=${filter.value}`,
  );
  const data = await response.json();
  console.log('data:', data);
  tableData.value = data.data.users;
  total.value = data.data.total;
  totalPages.value = data.data.total_pages;
};

const handleSort = (header) => {
  const newSorting = [...sorting.value];
  const existingSort = newSorting.find((s) => s.id === header.column.id);

  if (existingSort) {
    existingSort.desc = !existingSort.desc;
  } else {
    newSorting.push({ id: header.column.id, desc: false });
  }

  sorting.value = newSorting;
  fetchData();
};

const setPage = (newPage) => {
  if (newPage > 0 && newPage <= totalPages.value) {
    page.value = newPage;
    fetchData();
  }
};

onMounted(fetchData);

// const table = useVueTable({
//   data: tableData.value,
//   columns: columns.value,
//   getCoreRowModel: getCoreRowModel(),
//   getPaginationRowModel: getPaginationRowModel(),
//   getSortedRowModel: getSortedRowModel(),
//   getFilteredRowModel: getFilteredRowModel(),
//   state: {
//     sorting,
//     globalFilter: filter,
//   },
// });
const table = useVueTable({
  data: tableData,
  columns: columns.value,
  state: {
    sorting: sorting.value,
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue;
  },
  // 其他配置
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
});

// watch([sorting, page, perPage, filter], fetchData);
</script>
