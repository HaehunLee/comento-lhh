<template>
    <div>
        <h1>COMENTO 과제 - 이해훈</h1>
        <div class="option-box">
            <category />
            <div class="sort-box">
                <h5 v-on:click="toggleOrd" :class="{active: ord=='asc'}">오름차순</h5>
                <h5 v-on:click="toggleOrd" :class="{active: ord=='desc'}">내림차순</h5>
            </div>
        </div>
        <div v-infinite-scroll="showMore" infinite-scroll-disabled="loading" infinite-scroll-distance="pageLimit">
            <div v-for="(board, index) in boards" :key="index">
                <board :board="board" :category="category" />
                <sponsored :turn="index" :imageURL="imageURL" :getSponsored="getSponsored"/>
            </div>
        </div>
    </div>
</template>
<script>
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
            serverURL : 'https://1rcwozojf0.execute-api.ap-northeast-2.amazonaws.com/production',
            imageURL : 'https://cdn.comento.kr/assignment/',

            boards : [],   // 빈 리스트 초기화
            pageLimit : 10,
            loading : false,
            category : [],
            filterCategory : [1,2,3],
            ord : 'asc',
        }
    },
    created() {
        this.getCategory();
    },
    mounted() {
        this.getBoards();
        // this.getSponsored();
    },
    watch : {
        ord() {
            this.pageLimit = 10;
            this.boards = [];
            this.getBoards();
        },
        pageLimit() {
            if (this.pageLimit !== 10) {this.getBoards();}
        },
    },
    methods : {
        getCategory() {
            var self = this;
            this.$http.get(self.serverURL+`/api/category`)
            .then((response) => {
                // SUCCESS
                self.category = response.data.list
                console.log('lits ?? :', self.list)

                response.data.list.map((list) => (
                    self.filterCategory.push(list.id)
                ))
                console.log('filter category', self.filterCategory)
            })
        },
        getBoards() {
            var self = this;
            this.loading = true;
            this.$http.get(self.serverURL+`/api/list`, {
                params : {
                    page : 1,
                    ord : self.ord,
                    category : self.filterCategory,
                    limit : self.pageLimit
                }
            })
            .then((response) => {
                // SUCCESS
                console.log('boards', response)
                self.boards = response.data.list.data
                self.loading = false;
            })
            .catch((err) => {
                console.log('err :', err)
                self.loading = false;
            })
        },
        getSponsored(that) {
            var self = this;
            this.$http.get(self.serverURL+`/api/ads`, {
                params : {
                    page : Math.round(that.turn / 4),
                    limit : 1
                }
            })
            .then((response) => {
                // SUCCESS
                that.ads = response.data.list.data[0]
                // that.$forceUpdate();
            })
        },
        showMore() {
            this.pageLimit += 10;

        },
        toggleOrd(e) {
            var self = this;
            const ordName = e.target;
            if (ordName.textContent === "오름차순") { self.ord = 'asc';
            } else if (ordName.textContent === "내림차순") {
                self.ord = 'desc';
            }
        }
    },
}
</script>
<style lang="less">

@red : red;

.option-box {
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.sort-box {
    .option-box;
}
.sort-box h5 {
    padding-right : 5px;
    cursor: pointer;
}
.sort-box h5.active {
  color: @red;
}
</style>