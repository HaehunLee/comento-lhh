<template>
    <!-- Container가 될 목록 페이지 -->
    <div>
        <h1>COMENTO 과제 - 이해훈</h1>
        <div class="option-box">
            <b-button v-on:click="toggleModal" v-b-modal.modal-1>필터</b-button>
            <category :show="modalShow" :category="category" :filterCategory="filterCategory" :getBoards="getBoards" :toggleModal="toggleModal" v-on:filter="confirmFilter"/>
            <div class="sort-box">
                <h5 v-on:click="toggleOrd" :class="{active: ord=='asc'}">오름차순</h5>
                <h5 v-on:click="toggleOrd" :class="{active: ord=='desc'}">내림차순</h5>
            </div>
        </div>
        <div v-infinite-scroll="showMore" infinite-scroll-disabled="loading" infinite-scroll-distance="pageLimit">
            <div v-for="(board, index) in boards" :key="index">
                <board :board="board" :category="category" />
                <sponsored :turn="index" :getSponsored="getSponsored"/>
            </div>
        </div>
    </div>
</template>
<script>

// Component
import Category from '../components/Category'
import Board from '../components/Board'
import Sponsored from '../components/Sponsored'
export default {
    name : 'List',
    components : {
        Category, Board, Sponsored
    },
    data() {
        return {
            serverURL : 'https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production', // api server URL 변수처리

            boards : [],   // 게시글 리스트
            pageLimit : 10, // 페이지 수 기본값
            loading : false,    // 무한스크롤링 중복 호출 방지 로딩
            category : [],  // 카테고리 id,name
            filterCategory : [1,2,3],   // 필터할 카테고리 id
            ord : 'asc',    // 정렬 기본값 오름차순
            modalShow : false,  // 필터 모달 view 유무
        }
    },
    created() {
            this.getCategory();
    },
    mounted() {
        this.getBoards();
    },
    watch : {
        ord() {
            this.pageLimit = 10; // desc로 기본페이지 수 초기화
            this.boards = [];   // 기존 게시글 초기화
            this.getBoards();   // 바뀐 ord로 게시글 업데이트
        },
        pageLimit() {
            this.getBoards();   // 스크롤로 늘어났을 때 게시글 업데이트
        },
        filterCategory() {
                this.getBoards();   // 필터값 변경 시 게시글 업데이트
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
                console.log('list :', self.list)

                response.data.list.map((list) => (
                    tempCategory.push(list.id)
                ))
                // 바뀐 카테고리 필터값 저장
                self.filterCategory = tempCategory;
                console.log('filter category : ', self.filterCategory)
            })
            .catch((err) => {
                // 실패 시
                console.log('get category api err :', err)
            })
        },
        // 게시글 리스트 불러오는 함수
        getBoards() {
            var qs = require('qs');
            var self = this;
            // 무한 스크롤 시 중복 방지 로딩
            this.loading = true;
            console.log('get Boards : ', typeof(self.filterCategory));

            var category = JSON.parse(JSON.stringify(self.filterCategory))
            console.log(category)

            this.$http.get(self.serverURL+`/api/list`, {
                params : {
                    page : 1,
                    ord : self.ord,
                    category : self.filterCategory,
                    limit : self.pageLimit
                },
                // 쿼리스트링 array 파람값 에러 해결 qs이용.
                paramsSerializer: params => {
                    return qs.stringify(params)
                }
            })
            .then((response) => {
                // SUCCESS
                console.log('boards', response)
                self.boards = response.data.list.data
                self.loading = false;
            })
            .catch((err) => {
                // 실패 시
                console.log('get boards api err :', err)
                self.loading = false;
            })
        },
        // 광고글 불러오는 함수
        getSponsored(that) {
            var self = this;
            this.$http.get(self.serverURL+`/api/ads`, {
                params : {
                    // 게시글 index가 4번째 일 때, page수 변경
                    page : Math.round(that.turn / 4),
                    limit : 1
                }
            })
            .then((response) => {
                // 성공 시 가져온 해당 index 광고글 저장
                that.ads = response.data.list.data[0]
            })
            .catch((err) => {
                // 실패 시
                console.log('get sponsored api err :', err)
            })
        },
        // 더보기 함수
        showMore() {
            this.pageLimit += 10;

        },
        // 정렬 탭 변경 함수
        toggleOrd(e) {
            var self = this;
            const ordName = e.target;
            if (ordName.textContent === "오름차순") { self.ord = 'asc';
            } else if (ordName.textContent === "내림차순") {
                self.ord = 'desc';
            }
        },
        // filter modal view 유무 함수
        toggleModal() {
            this.modalShow = !this.modalShow;
        },
        // filter 저장 시 필터 체크 함수
        confirmFilter(value) {
            console.log('confrim filter : ', value);
            this.filterCategory = value;
            console.log('filter category confirm : ', this.filterCategory);
        },
    },
}
</script>
<style lang="less">

@red : red ;

.option-box {
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.sort-box {
    .option-box;

    h5 {
        padding-right : 5px;
        cursor: pointer;
    }

    h5.active {
        color : @red;
    }
}
</style>