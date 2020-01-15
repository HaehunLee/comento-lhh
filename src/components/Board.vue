<template>
    <!-- 게시글 Component -->
    <div class="board-container">
        <b-card
        header-tag="header" 
        style="margin-top:10px;"
        >
            <template v-slot:header>
                <div class="board-title">
                    <h6 class="mb-0 board-header">{{getCatName()}}</h6>
                    <h6 class="mb-0 board-header">{{board.id}}</h6>
                </div>
            </template>
            <b-card-text>
                <div class="board-info">
                    <h5 class="info-header">{{board.user_id}}</h5>
                    <h5 class="info-header">{{board.created_at}}</h5>
                </div>
            </b-card-text>
            <b-card-text>
                <h2 class="info-text">{{board.title}}</h2>
            </b-card-text>
            <b-card-text>
                <div class="info-text">
                    {{board.contents}}
                </div>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
export default {
    name : 'board',
    props : {
        board : Object,
        category :Array,
    },
    methods : {
        // 카테고리 이름 변환 함수
        getCatName() {
            const categoryName = this.category.filter(
                list => list.id === this.board.category_id
            );
            return categoryName[0].name;
        }
    }
}
</script>

<style lang="less">
.board-container {
    .flexBox {
        display: flex;
    }
    .board-title {
        .flexBox;
        justify-content: space-between;
    }

    .board-info {
        .flexBox;
    }
    .info-header {
        padding: 0px 10px;
    }
    .info-header:nth-child(1) {
        border-right : 1px solid gray;
    }
    .info-text {
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
    }
}
</style>