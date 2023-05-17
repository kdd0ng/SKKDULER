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
                <v-img src="require('@/assets/main_1.jpg')" max-width="600px"></v-img>
            <div>
            <v-card-item>
            <div>
                <div class="text-h12 mt-12 mb-4" style="font-weight: bold">
                    주제 : 
                </div>
                <div class="text-h12 mb-4" style="font-weight: bold">
                    일시 : 
                </div>
                <div class="text-h12 mb-4" style="font-weight: bold">
                    장소 : 
                </div>
                <div class="text-h12 mb-4" style="font-weight: bold">
                    링크 : 
                </div>
                <div>
                    <v-card color="#33d18f" style="padding: 10px; font-weight: bold">
                        <v-icon>mdi-calendar-plus</v-icon>
                        <span>아래를 수정하여 내 일정에 바로 추가해보세요!</span>
                    </v-card>
                </div>
                <div>
                    <v-textarea v-model="text" label="내용을 입력하세요" rows="2"></v-textarea>
                </div>
                <div>
                    <v-icon>mdi-lock</v-icon>
                    <v-switch v-model="toggleValue" :label="toggleLabel" class="font-weight-bold"></v-switch>
                </div>
            </div>
            </v-card-item>

            
            </div>
            </div>

            <div>
            <v-card-actions>
                <v-row class="justify-center">
                    <v-col cols="4" class="text-center">
                        <v-btn variant="outlined" class="btn1" @click="$router.go(-1)">
                        돌아가기
                        </v-btn>
                    </v-col>
                    <v-col cols="4" class="text-center">
                        <v-dialog v-model="dialog" max-width="500px">
                            <template #activator="{ on }">
                                <v-btn variant="outlined" class="btn3" v-on="on" @click="dialog = true">
                                문의사항
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    문의사항
                                </v-card-title>
                                <v-card>
                                    <v-card-text>
                                        <v-text-field v-model="commentText" label="댓글 작성" outlined></v-text-field>
                                        <v-btn @click="addComment" color="primary" small>댓글 작성</v-btn>
                                    </v-card-text>
                                </v-card>

                            <v-list>
                            <v-subheader>댓글</v-subheader>
                            <v-list-item v-for="(comment, index) in comments" :key="index">
                                <v-list-item-content>
                                <v-list-item-title>{{ comment.text }}</v-list-item-title>
                                <v-list-item-subtitle>{{ comment.author }}</v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                <v-btn icon small @click="addReply(index)">
                                    <v-icon>mdi-reply</v-icon>
                                </v-btn>
                                </v-list-item-action>
                                <v-list-item v-if="comment.showReply">
                                <v-list-item-content>
                                    <v-text-field v-model="comment.replyText" label="답글 작성" outlined></v-text-field>
                                    <v-btn @click="addReplyComment(index)" color="primary" small>답글 작성</v-btn>
                                </v-list-item-content>
                                </v-list-item>
                                <v-list-item v-if="comment.replies">
                                    <v-list v-for="(reply, replyIndex) in comment.replies" :key="replyIndex">
                                        <v-list-item-content>
                                            <v-list-item-title>{{ reply.text }}</v-list-item-title>
                                            <v-list-item-subtitle>{{ reply.author }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list>
                                </v-list-item>
                            </v-list-item>
                            </v-list>
                            </v-card>
                        </v-dialog>
                    </v-col>
                    <v-col cols="4" class="text-center">
                        <v-btn variant="outlined" class="btn2">
                        내 일정에 추가
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
export default {
  data() {
    return {
      dialog: false,
      text: '',
      toggleValue: false,
      toggleLabel: '비공개',
      commentText: '',
      comments: [
        { text: '언제 마치나요?', author: '권동욱', showReply: false, replyText: '' },
        { text: '장소가 바뀌었나요?', author: '김원종', showReply: false, replyText: '' },
      ],
    };
  },
  watch: {
    toggleValue(value){
        this.toggleLabel = value ? '비공개' : '공개';
    }
  },
  methods: {
    addComment() {
      if (this.commentText) {
        this.comments.push({
          text: this.commentText,
          author: '익명',
          showReply: false,
          replyText: '',
        });
        this.commentText = '';
      }
    },
    addReply(index) {
      this.comments[index].showReply = true;
    },
    addReplyComment(index) {
      const replyText = this.comments[index].replyText;
      if (replyText) {
        this.comments[index].replyText = '';
        this.comments[index].showReply = false;
        this.comments[index].replies = this.comments[index].replies || [];
        this.comments[index].replies.push({
          text: replyText,
          author: '담당자',
        });
      }
    },
  },
};
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
    width: 90%;
    background-color: #b4b3af;
    font-weight: bold;
}
.btn2{
    width: 90%;
    background-color: #ec9e0e;
    font-weight: bold;
}
.btn3{
    width: 90%;
    background-color: #33d18f;
    font-weight: bold;
}
</style>
