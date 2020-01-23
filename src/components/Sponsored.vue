<template>
    <!-- 광고글 Component -->
    <div v-if="isShow" class="sponsored-container">
        <h6 class="ads-title">Sponsored</h6>
        <b-card :img-src="imageURL+ads.img" img-alt="Card image" img-left class="rounded=0">
            <div class="ads-box">
                <h3 class="info-text">{{ads.title}}</h3>
                <div class="ads-contents">
                    {{ads.contents}}
                </div>
            </div>
        </b-card>
    </div>
</template>
<script>
export default {
    name : 'sponsored',
    props : {
        turn : Number,  // 게시글 index
        getSponsored : Function,    // 광고글을 호출하는 api 함수
    },
    data() {
        return {
            imageURL : 'https://cdn.comento.kr/assignment/',    // imageURL 등록
            isShow : false, // 4번째일때 보이기 위한 변수
            ads : { // 광고글 초기화
                img : "",   // ******** 초기값 광고이미지 불러올 때의 에러 수정 실패...
                title : "",
                contents : ""
            },
        }
    },
    created() {
        var self = this;
        // 4번째 게시글일 때 호출하여 보여주는 함수
        if (self.turn % 4 === 3) {
            self.isShow = true;
            self.getSponsored(self);
        } else {
            self.isShow = false;
        }
  }
}
</script>
<style lang="less">
.sponsored-container{
    .card-body {
        width : 33%;
    }
    .ads-box {
        display: inline-block;
        width : 100%;
    }
    .ads-title {
        text-align: left;
        padding : 10px 0px 0px 10px;
    }
     .info-text {
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
    }
    .ads-contents {
      .info-text;
      margin-top : 20px;
      white-space: normal; 
      word-wrap: break-word; 
      display: -webkit-box; 
      -webkit-line-clamp: 4; 
      -webkit-box-orient: vertical;
    }

    // width 450px 이하일 때 반응형 css
    @media all and ( max-width : 480px ){
        // 이미지 비율 유지
        .sponsored-container img {
            width: -webkit-fill-available;
        }
        .flex-row {
            flex-direction: column !important;
        }
        .card-body {
            width: 100% !important;
        }
    }
}
</style>