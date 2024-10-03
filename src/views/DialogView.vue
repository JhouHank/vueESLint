<template>
  <Button @click="toggleDialog()">Modal</Button>

  <div class="mt-10">
    <Dialog v-model:open="isDialogOpen">
      <DialogTrigger as-child>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<script setup>
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useToggle } from '@vueuse/core';
const [isDialogOpen, toggleDialog] = useToggle();
</script>
<style scoped></style>
