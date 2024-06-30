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
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  :class="{
                    'cursor-pointer select-none': header.column.getCanSort(),
                  }"
                  @click="header.column.getToggleSortingHandler()?.($event)"
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
                <TableRow v-if="row.getIsExpanded()">
                  <TableCell :colspan="row.getAllCells().length">
                    <pre :style="{ fontSize: '10px' }">
                      <code>{{ JSON.stringify(row.original, null, 2) }}</code>
                    </pre>
                  </TableCell>
                </TableRow>
              </template>
            </TableBody>
          </Table>
        </div>
      </div>
      <div class="mt-8">
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }} -
        {{ table.getFilteredRowModel().rows.length }} results
      </div>
      <Pagination
        v-slot="{ page }"
        :total="100"
        :sibling-count="1"
        show-edges
        :default-page="2"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationFirst @click="table.firstPage()" />
          <PaginationPrev @click="table.previousPage()" />
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
                @click="table.setPageIndex(item.value - 1)"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>
          <PaginationNext @click="table.nextPage()" />
          <PaginationLast @click="table.lastPage()" />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
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
    getExpandedRowModel,
  } from '@tanstack/vue-table';

  const props = defineProps({
    data: Array,
    columns: Array,
  });

  const data = ref(props.data);

  const sorting = ref([]);
  const filter = ref('');
  const expanded = ref({});

  const table = useVueTable({
    data: data.value,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      get sorting() {
        return sorting.value;
      },
      get globalFilter() {
        return filter.value;
      },
      get expanded() {
        return expanded.value;
      },
    },
    onSortingChange: (updaterOrValue) => {
      sorting.value =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(sorting.value)
          : updaterOrValue;
    },
    onExpandedChange: (updaterOrValue) => {
      expanded.value =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(expanded.value)
          : updaterOrValue;

      console.log('expanded:', expanded.value);
    },
  });
</script>
