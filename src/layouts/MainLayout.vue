<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
       <q-toolbar-title>
          Asistente Personal Virtual
        </q-toolbar-title>

        <div>{{user}}</div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
     user: 'Carlos Feliz'
    }
  },
};
</script>
