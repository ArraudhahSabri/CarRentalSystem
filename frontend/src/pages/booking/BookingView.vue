<script setup lang="ts">
import Layout from '@layouts/auth/Layout.vue';
import Card from '@components/Card.vue'; 

</script>

<template>
  <Layout>
    <template #content>
        <div style="margin-top: 2rem;"></div>
        <div class="mx-auto px-4 mb-8">
            <Card>
              <router-view></router-view>
            </Card>
        </div>
    </template>
  </Layout>
</template>
