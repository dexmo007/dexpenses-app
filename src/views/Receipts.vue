<template>
  <v-container>
    <template v-if="loading.pendingReceipts || pendingReceipts.length > 0">
      <v-subheader>
        Pending Receipts
      </v-subheader>
      <v-progress-linear
        class="pending-receipts-loader"
        v-if="!loading.pendingReceipts"
        indeterminate
        height="3px"
      />
      <v-container v-if="!loading.pendingReceipts">
        <div
          class="image-viewer"
          v-viewer="{toolbar: false, navbar: true, title: false}"
        >
          <img
            v-for="receipt in pendingReceipts"
            :key="receipt.id"
            :src="receipt.downloadUrl"
          />
        </div>
      </v-container>
      <v-container v-else>
        <v-progress-circular indeterminate />
      </v-container>
    </template>
    <template v-if="loading.openReceipts || openReceipts.length > 0">
      <v-subheader>
        We're gonna need your help with these...
      </v-subheader>
      <v-container v-if="!loading.openReceipts">
        <ReceiptCard
          v-for="receipt in openReceipts"
          :key="receipt.id"
          :receipt="receipt"
        />
      </v-container>
      <v-container v-else>
        <v-progress-circular indeterminate />
      </v-container>
    </template>
    <v-subheader>
      Your Receipts
    </v-subheader>
    <v-container>
      <v-progress-circular
        indeterminate
        v-if="loading.receipts"
      />
      <div v-else-if="receipts.length === 0">No receipts</div>
      <div v-else>
        <ReceiptCard
          v-for="receipt in receipts"
          :key="receipt.id"
          :receipt="receipt"
        />
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import ReceiptCard from '@/components/receipts/ReceiptCard.vue';

const { mapActions, mapState } = createNamespacedHelpers('receipts');

export default {
  name: 'receipts',
  components: {
    ReceiptCard,
  },
  data() {
    return {
      first: true,
    };
  },
  computed: {
    ...mapState(['openReceipts', 'receipts', 'pendingReceipts', 'loading']),
  },
  methods: {
    ...mapActions([
      'loadReceipts',
      'loadOpenReceipts',
      'loadPendingReceipts',
      'unbindReceipts',
    ]),
  },
  mounted() {
    this.loadOpenReceipts();
    this.loadReceipts();
    this.loadPendingReceipts();
  },
  destroyed() {
    this.unbindReceipts();
  },
};
</script>
<style scoped>
.image-viewer {
  height: 100px;
  max-height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.image-viewer img {
  max-width: 100px;
  max-height: 100px;
}
.pending-receipts-loader {
  margin: 0;
}
</style>
