<template>
  <Button @click="toggleDialog()">Modal</Button>
  <p>{{ isDialogOpen }}</p>

  <div class="mt-10">
    <Dialog v-model:open="isDialogOpen">
      <DialogTrigger as-child>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <form @submit="onSubmit">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="shadcn"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <DialogFooter>
            <Button type="submit">
              <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
              <p v-else>Save changes</p>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
<script setup>
import { h } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { useToggle } from '@vueuse/core';
import { useToast } from '@/components/ui/toast/use-toast';
import { useApi } from '@/composables/useAPI';
import { Loader2 } from 'lucide-vue-next';
const [isDialogOpen, toggleDialog] = useToggle();
const { toast } = useToast();

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const { callApi, data, error, loading } = useApi();

const onSubmit = form.handleSubmit(async (values) => {
  await callApi('/mock/echo', {
    method: 'POST',
    body: values,
  });

  if (error.value) {
    toast({
      title: 'Error',
      description: `Failed to submit data: ${error.value}`,
      variant: 'destructive',
    });
  } else {
    console.log('Form submitted!', values);

    toast({
      title: 'You submitted the following values:',
      description: h(
        'pre',
        { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
        h('code', { class: 'text-white' }, JSON.stringify(data.value, null, 2)),
      ),
    });

    toggleDialog();
  }
});
</script>
<style scoped></style>
