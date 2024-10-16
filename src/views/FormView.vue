<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="phone">
      <FormItem>
        <FormLabel>Phone</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your public display phone.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="number">
      <FormItem>
        <FormLabel>Number</FormLabel>
        <FormControl>
          <Input type="number" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>This is your number display phone.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Submit</Button>
  </form>
</template>
<script setup>
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// 定義電話號碼的正則表達式
const phoneRegex = /^09\d{8}$/;

const formSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(2, { message: '用戶名必須至少包含 2 個字元' })
      .max(10, { message: '用戶名最多包含 10 個字元' }),
    phone: z
      .string()
      .regex(phoneRegex, { message: '電話號碼必須是09開頭的10位數字' }),
    number: z
      .number({ invalid_type_error: '必須是數字' })
      .min(10, { message: '數字必須大於或等於 10' })
      .max(100, { message: '數字必須小於或等於 100' }),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values);
});
</script>
