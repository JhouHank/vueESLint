<template>
  <div class="scroll-container" ref="containerRef">
    <div
      v-for="(list, index) in renderedUlLists"
      :key="index"
      class="ul-container"
    >
      <div class="flex justify-between">
        <p>123132</p>
        <p>456</p>
      </div>
      <ul ref="ulRefs">
        <li v-for="item in list.items" :key="item.id">
          <img
            :src="item.imageUrl"
            alt="Image"
            class="image"
            @load="item.loading = false"
          />
        </li>
      </ul>
    </div>
    <p v-if="loading">載入更多列表中...</p>
    <p v-if="finished">已無更多列表</p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

// 所有 ul 的圖片資料
const generateRandomImageUrl = () =>
  `https://fakeimg.pl/350x200/?text=${Math.floor(Math.random() * 1000)}`;

const ulLists = reactive([
  {
    items: Array.from({ length: 5 }, (_, i) => ({
      id: i,
      imageUrl: generateRandomImageUrl(i),
      loading: true,
    })),
    loading: false,
    finished: false,
  },
  {
    items: Array.from({ length: 15 }, (_, i) => ({
      id: i,
      imageUrl: generateRandomImageUrl(i),
      loading: true,
    })),
    loading: false,
    finished: false,
  },
  {
    items: Array.from({ length: 20 }, (_, i) => ({
      id: i,
      imageUrl: generateRandomImageUrl(i),
      loading: true,
    })),
    loading: false,
    finished: false,
  },
  {
    items: Array.from({ length: 8 }, (_, i) => ({
      id: i,
      imageUrl: generateRandomImageUrl(i),
      loading: true,
    })),
    loading: false,
    finished: false,
  },
  {
    items: Array.from({ length: 12 }, (_, i) => ({
      id: i,
      imageUrl: generateRandomImageUrl(i),
      loading: true,
    })),
    loading: false,
    finished: false,
  },
]);

const containerRef = ref(null);
const ulRefs = ref([]); // 用來存放每個 ul 的 DOM 引用
const renderedUlLists = ref([]); // 目前畫面上渲染的 ul

// 控制載入更多的狀態
const loading = ref(false);
const finished = ref(false);

// 初始化渲染的 ul 數量
let initialLoadCount = ref(0);

const calculateInitialLoadCount = async () => {
  await nextTick(); // 確保 DOM 已經被渲染
  const containerHeight = containerRef.value.clientHeight;
  let totalHeight = 0;
  initialLoadCount.value = 0;

  // 遍歷每個 ul，累計它們的高度，直到總高度超過容器的高度
  for (let i = 0; i < ulRefs.value.length; i++) {
    const ulHeight = ulRefs.value[i].clientHeight;
    totalHeight += ulHeight;
    initialLoadCount.value++;
    if (totalHeight >= containerHeight) {
      break;
    }
  }

  // 初始化渲染對應數量的 ul
  renderedUlLists.value = ulLists.slice(0, initialLoadCount.value);
};

// 每次滾動到底部時載入下一個 ul
const loadMore = () => {
  if (loading.value || finished.value) return;

  loading.value = true;

  setTimeout(() => {
    const nextIndex = renderedUlLists.value.length;
    const nextBatch = ulLists.slice(nextIndex, nextIndex + 1);

    if (nextBatch.length > 0) {
      renderedUlLists.value.push(...nextBatch);
    }

    loading.value = false;

    // 如果所有的 ul 都已經渲染完畢，標記為 finished
    if (renderedUlLists.value.length >= ulLists.length) {
      finished.value = true;
    }
  }, 1000); // 模擬加載延遲
};

// 使用 useInfiniteScroll 監聽整個容器的滾動事件
useInfiniteScroll(containerRef, loadMore, {
  distance: 0,
});

onMounted(() => {
  calculateInitialLoadCount(); // 初次加載時動態計算應渲染多少 ul
});
</script>

<style scoped>
.scroll-container {
  height: 100%;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
}

.ul-container {
  margin-bottom: 20px;
}

ul {
  padding: 10px;
  border: 1px solid #ddd;
  display: flex;
  flex-wrap: wrap;
}

li {
  list-style: none;
  margin-bottom: 10px;
}

.image {
  width: 350px;
  height: 200px;
  object-fit: cover;
  border: 1px solid #ddd;
}

.skeleton {
  width: 350px;
  height: 200px;
  background-color: #ddd;
  border: 1px solid #ccc;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    background-color: #eee;
  }
  50% {
    background-color: #ddd;
  }
  100% {
    background-color: #eee;
  }
}
</style>
