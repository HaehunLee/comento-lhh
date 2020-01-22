<template>
    <!-- 카테고리 필터 모달 Component -->
    <div v-if="show">
        <div class="filter-box">
            <b-modal id="modal-1" title="필터" v-model="show" centered>
                <b-form-group>
                <b-form-checkbox-group id="checkbox-group-2" v-model="selected" name="flavour-2">
                    <b-form-checkbox :value="category[0].id">{{category[0].name}}</b-form-checkbox>
                    <b-form-checkbox :value="category[1].id">{{category[1].name}}</b-form-checkbox>
                    <b-form-checkbox :value="category[2].id">{{category[2].name}}</b-form-checkbox>
                </b-form-checkbox-group>
                </b-form-group>

                <template v-slot:modal-footer>
                    <div class="w-100">
                    <b-button
                        variant="primary"
                        size="sm"
                        class="float-right"
                        v-on:click="refreshFilter"
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
    props : {
        show : Boolean,
        category : Array,
        filterCategory : Array,
        getBoards : Function,
        toggleModal : Function,
    },
    data() {
        return {
            selected: this.filterCategory,  // 초기 카테고리 전체조회 값 저장 [1,2,3]
        }
    },
    methods : {
        // filter값을 저장하는 함수
        refreshFilter() {
            // Container에 selected 전달
            console.log('change filter : ', this.selected);
            this.$emit("filter",this.selected);
            this.toggleModal();
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