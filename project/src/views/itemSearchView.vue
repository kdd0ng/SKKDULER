<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <a href="https://cs.skku.edu/ko/">
          <v-img src="https://cs.skku.edu/img/topLogo_new_ko.png" width="300px"></v-img>
        </a>
      </v-col>
      <v-col cols="8"></v-col>
      <v-col cols="2">
        <a href="https://cs.skku.edu/ko/">
          <v-img src="https://cs.skku.edu/img/sw_convergence.png" width="300px"></v-img>
        </a>
      </v-col>
    </v-row>

    <v-row>
      <v-divider></v-divider>
      <br>
    </v-row>

    <v-row>
      <h1>&nbsp;&nbsp;학교에서 열리는 다양한 행사에 참여해보세요</h1>
    </v-row>
    <br><br>

    <v-row class="row-size justify-self-center">
        <v-col cols="3"></v-col>
        <v-col cols="6">
        <div class="outer-box">
          <v-card color="#e0ddd5">
            <div class="d-flex" style="margin: 20px;">
                <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png" max-width="600px"></v-img>
            <div>
            <v-card-item>
            <div>
                <div class="text-h12 mt-12 mb-4">
                    주제 : 
                </div>
                <div class="text-h12 mb-4">
                    일시 : 
                </div>
                <div class="text-h12 mb-4">
                    장소 : 
                </div>
                <div class="text-h12 mb-4">
                    링크 : 
                </div>
                
            </div>
            </v-card-item>

            <v-card-actions>
                <v-btn variant="outlined">
                    Button
                </v-btn>
            </v-card-actions>
            </div>
            </div>

            <div>
            <v-card-actions>
                <v-row class="justify-center">
                    <v-col cols="6" class="text-center">
                        <v-btn variant="outlined" class="btn1">
                        돌아가기
                        </v-btn>
                    </v-col>
                    <v-col cols="6" class="text-center">
                        <v-btn variant="outlined" class="btn2">
                        내 일정에 추가하기
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
            </div>

            </v-card>
            </div>
        </v-col>
        <v-col cols="3"></v-col>
        
    </v-row>    





  </v-container>
</template>

<script>
import mainimg1 from '@/assets/main_1.jpg';
</script>

<style>
.outer-box {
  background-color: #e4ae1a; /* 원하는 배경색으로 설정 */
  padding: 40px; /* 원하는 패딩 값으로 설정 */
}
.row-size {
  max-width: 2500px; /* 원하는 최대 너비로 설정 */
}
.btn1{
    width: 40%;
    background-color: #b4b3af;
    font-weight: bold;
}
.btn2{
    width: 40%;
    background-color: #ec9e0e;
    font-weight: bold;
}

</style>
