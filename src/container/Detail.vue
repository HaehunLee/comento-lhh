<template>
    <!-- 상세 페이지 -->
    <div class="detail-page">
        <div>
            <div class="detail-header">
                <span class="category">{{getCatName()}}</span>
                <span class="board-number">글번호 : {{detail.id}}</span>
            </div>

            <div class="title">
                <h4>제목</h4>
                {{detail.title}}
            </div>

            <span>{{detail.user.email}}</span> |
            <span>{{detail.updated_at}}</span>

            <div class="contents">
                <h5>내용</h5>
                {{detail.contents}}
            </div>
        </div>
        <div v-if="comments">
            <span class="comment-header">댓글</span>
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
import EventBus from '@/modules/EventBus'

export default {
    name : 'Detail',
    data() {
        return {
            serverURL : 'https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production', // api server URL 변수처리
            detail : {},    // 게시글 상세
            comments : [],  // 상세 게시글 댓글
            category : [],  // 카테고리
        }
    },
    created() {
        this.getDetail();
    },
    mounted() {
        this.getCategory();
    },
    watch : {
        detail() {
            this.comments = this.detail.reply;  // 게시글 호출 시, 댓글 따로 관리
        }
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
        // 게시글 상세를 불러오는 함수
        getDetail() {
            EventBus.$emit('start:loading');    //  로딩 시작
            var self = this;
            this.$http.get(self.serverURL+`/api/view`, {
                params : {
                    id : self.$route.params.id, // 쿼리스트링에서 id값을 받아옴.
                }
            })
            .then((response) => {
                // 성공 시
                self.detail = response.data.info;   // 상세글 담기
                EventBus.$emit('end:loading'); 
            })
            .catch((err) => {
                // 실패 시
                console.log('get detail api err :', err)
                EventBus.$emit('end:loading');
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
        font-size: 30px;
        margin-top: 20px;
        margin-bottom : 20px;
    }
    .contents {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .detail-header {
        width : 100%;
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
    }
    .category {
        background: #AAAAAA;
        font-size: 20px;
        padding: 10px;
        border-radius: 10px;
        color: red;
    }
    .comment-header {
        margin-top : 10px;
        margin-bottom : 10px;
        font-size : 15px;
    }
}
</style>