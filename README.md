# Vue.js를 이용한 광고성 게시글 프로젝트
- COMENTO CODING TEST
- Dev : LEE HAE HUN

## Cross Browsing
<table>

| 대응 브라우저 | 버전 | 테스트 |
|---|:---:|:---:|
|Chrome|79.0.3945.117|`o`
|Safari|13.0.4|`o`
|FireFox|72.0.2|`o`
|IE|11.592.18362.0|`o`
|Edge|44.18362.449.0|`o`

</table>

## Use Library

<ol>
    <li>vue-cli : vue 프로젝트 초기 설정 라이브러리
    <li>axios : API 서버통신 라이브러리
    <li>qs : Query String 쿼리 객체 변환 라이브러리
    <li>bootstrap, bootstrap-vue : bootstrap을 vue에서 사용하는 라이브러리
    <li>vue-infinite-scroll : 무한 스크롤 라이브러리
    <li>vue-router : router를 vue에서 사용하는 라이브러리
    <li>babel-polyfill : polyfill을 전역으로 사용할 수 있게하는 라이브러리 ( IE 11 크로스 브라우징에 사용 )
    <li>vue-full-loading : loading spinner 라이브러리
</ol>

## Goal

<table>

| 달성 | 과업명 | 비고 |
|---|:---:|---:|
|`o`|광고 반응형|
|`o`|크로스 브라우징|
|`o`|리스트 불러오기|
|`o`|정렬|
|`o`|필터|
|`o`|광고 삽입|
|`?`|VOC(고객센터 접수건)|
|`o`|디테일 페이지|

</table>


<hr/>


> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```