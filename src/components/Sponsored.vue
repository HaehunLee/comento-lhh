<template>
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
        turn : Number,
        getSponsored : Function,
    },
    data() {
        return {
            imageURL : 'https://cdn.comento.kr/assignment/',
            isShow : false,
            ads : {
                img : "",
                title : "",
                contents : ""
            },
            contents : "",
        }
    },
    created() {
        var self = this;
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

    @media all and ( max-width : 450px ){
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