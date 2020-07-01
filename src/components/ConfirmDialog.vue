<template>
  <q-dialog
    v-model="confirm"
    persistent
  >
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          icon="error_outline"
          color="warning"
          text-color="white"
        />
        <span class="q-ml-sm">Esta seguro que desea eliminar este contacto?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cancelar"
          color="blue-grey-4"
          v-close-popup
          @click="closeDialog"
          style="text-transform:capitalize"
        />
        <q-btn
          flat
          label="Eliminar"
          color="blue-grey-4"
          v-close-popup
          @click="confirmed"
          class="text-capitalize"
          style="text-transform:capitalize"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return { confirm: false, ID:'' };
  },
  methods: {
    closeDialog() {
      this.confirm = false;
    },
    confirmed() {
      this.$emit("confirmed", this.ID);
      this.closeDialog();
    },
    openConfirm(id){ 
        this.confirm = true
        this.ID = id
    }
  },
  watch: {
    open: function(value) {
      if (value) {
        this.confirm = true;
      }
    }
  }
};
</script>

<style>
</style>
