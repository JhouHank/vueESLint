<script setup>
  import { h } from 'vue';
  import TableTanstack from '@/components/TableTanstack.vue';
  import people from './mockDataPeople.json';

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  function renderExpanded(row) {
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
  }

  const columnsPeople = [
    {
      accessorKey: 'id',
      header: 'ID',
      enableSorting: false,
    },
    {
      accessorKey: 'first_name',
      header: 'First name',
    },
    {
      accessorKey: 'last_name',
      header: 'Last name',
    },
    // {
    //   accessorKey: 'email',
    //   header: 'Email',
    // },
    // {
    //   accessorKey: 'title',
    //   header: 'Title',
    // },
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

  const handleEdit = (id) => {
    console.log(`Edit item with id: ${id}`);
  };
</script>

<template>
  <div class="container mx-auto px-8 py-8">
    <TableTanstack :data="people" :columns="columnsPeople" />
  </div>
</template>
