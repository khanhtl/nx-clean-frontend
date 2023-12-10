<script setup lang="ts">
import { provideProductsBloc } from '@genz-shop/dependency-injection';
import { usePlocState } from '../../composables/useProductsBloc';
import { onMounted } from 'vue';

const productsBloc = provideProductsBloc();
const state = usePlocState(productsBloc);
onMounted(() => productsBloc.search(''));
</script>

<template>
  <template v-if="state.kind === 'LoadingState'"> loading..... </template>
  <template v-if="state.kind === 'LoadedState'">
    <a-flex wrap="wrap" gap="large">
      <div
        v-for="product in state.data"
        :key="product.id"
      >
        <a-card hoverable style="width: 240px;height: 380px">
          <template #cover>
            <img alt="example" width="180" height="200" :src="product.image" />
          </template>
          <template #actions>
            <a-button type="primary">Add to cart</a-button>
          </template>
          <a-card-meta :title="'$' + product.price">
            <template #description>{{ product.title }}</template>
          </a-card-meta>
        </a-card>
      </div>
    </a-flex>
  </template>
  <template v-if="state.kind === 'ErrorState'"> Error..... </template>
</template>
