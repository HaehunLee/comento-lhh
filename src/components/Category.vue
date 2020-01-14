<template>
<div>
    <div class="filter-box">
        <b-button v-b-modal.modal-1>필터</b-button>

        <b-modal id="modal-1" title="필터" v-model="show" centered>
            <div>
                <input type="checkbox" />
                <input type="checkbox" />
                <input type="checkbox" />
            </div>

            <template v-slot:modal-footer>
                <div class="w-100">
                <b-button
                    variant="primary"
                    size="sm"
                    class="float-right"
                    @click="show=false"
                >
                    저장
                </b-button>
                </div>
            </template>
        </b-modal>
    </div>
</div>
</template>
<script>
export default {
    name : 'category',
    data() {
        return {
            show : false,
        }
    }
}
</script>
<style lang="less">
    .filter-box {
        text-align: left;
        padding : 0px 0px 0px 10px;
    }
</style>