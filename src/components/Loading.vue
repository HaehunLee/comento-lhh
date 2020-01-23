<template>
<!--  로딩창 컴포넌트
      VOC No. 22 Loading 구현
 -->
 <loading
     :show="show"
     :label="label">
 </loading>
</template>
<script>
import loading from 'vue-full-loading'

export default {
    name : 'Loading',
    components: {
        loading
    },
    props : {
        // 로딩 여부
        show : Boolean,
    },
    data(){
        return {
            // 로딩 메세지
            label: 'Loading...'
        }
    }
    }
</script>