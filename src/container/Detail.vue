<template>
    <!-- 상세 페이지 -->
    <div class="detail-page">
        <div>
            <span class="category">{{getCatName()}}</span>
            <span class="board-number">글번호 : {{detail.id}}</span>

            <div class="title">
                <h4>제목</h4>
                {{detail.title}}
            </div>

            <span>{{detail.user.email}}</span> |
            <span>{{detail.updated_at}}</span>

            <div class="contents">
                {{detail.contents}}
            </div>
        </div>
        <div v-if="comments">
            <b-card v-for="reply in comments" :key="reply.no">
            <b-media>
                <small>댓글 {{reply.id}}</small>
                <h5>{{reply.user.email}}</h5>
                <p>{{reply.updated_at}}</p>
                <p>{{reply.contents}}</p>
            </b-media>
            </b-card>
        </div>
    </div>
</template>
<script>

// Detail Component
export default {
    name : 'Detail',
    data() {
        return {
            serverURL : 'https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production', // api server URL 변수처리
            detail : {},
            comments : [],
            category : [],
        }
    },
    created() {
        this.getDetail();
    },
    mounted() {
        this.getCategory();
    },
    watch : {
    },
    methods : {
        // 카테고리 리스트를 불러오는 함수
        getCategory() {
            var self = this;
            var tempCategory = [];
            this.$http.get(self.serverURL+`/api/category`)
            .then((response) => {
                // 성공 시
                self.category = response.data.list
            })
            .catch((err) => {
                // 실패 시
                console.log('get category api err :', err)
            })
        },
        getDetail() {
            var self = this;
            this.$http.get(self.serverURL+`/api/view`, {
                params : {
                    id : self.$route.params.id,
                }
            })
            .then((response) => {
                // 성공 시
                console.log('detail', response.data.info);
                self.detail = response.data.info;
                console.log('reply?', response.data.info.reply);
                self.comments = response.data.info.reply
            })
            .catch((err) => {
                // 실패 시
                console.log('get detail api err :', err)
            })
        },
        // 카테고리 이름 변환 함수
        getCatName() {
            var categoryName = this.category.filter(
                list => list.id === this.detail.category_id
            );
            return categoryName[0].name;
        }
    },
}
</script>
<style lang="less">
.detail-page {
    background-color: #EEEEEE;
    padding : 1%;
    .title {
        font-size: 2rem;
        margin-top: 2rem;
    }
    .contents {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
    .category {
        background: blue;
        font-size: 20px;
        padding: 10px;
        margin-right : 80%;
        border-radius: 20px;
        color: white;
    }
    .board-number {
        float: right;
    }
}
</style>