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
                <v-img :src="item.src" max-width="600px"></v-img>
            <div>
            <v-card-item>
            <div>
                <div class="text-h12 mt-12 mb-4" style="font-weight: bold">
                    주제 : {{ item.title }}
                </div>
                <br><br>
                <div class="text-h12 mb-4" style="font-weight: bold">
                    일시 : {{ item.date }}
                </div>
                <br><br>
                <div class="text-h12 mb-4" style="font-weight: bold">
                    장소 : {{ item.location }}
                </div>
                <br><br>
                <div class="text-h12 mb-4" style="font-weight: bold">
                    링크 : <a :href="item.url">{{ item.url }}</a>
                </div>
                <br><br>
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
                        <v-btn variant="outlined" class="btn2" @click="addToMySchedule">
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
import searchimg1 from '@/assets/1.png';
import searchimg2 from '@/assets/2.png';
import searchimg3 from '@/assets/3.png';
import searchimg4 from '@/assets/4.png';
import searchimg5 from '@/assets/5.png';
import searchimg6 from '@/assets/6.png';
import searchimg7 from '@/assets/7.png';
import searchimg8 from '@/assets/8.png';
import searchimg9 from '@/assets/9.jpg';
import searchimg10 from '@/assets/10.png';
import searchimg11 from '@/assets/11.png';
import searchimg12 from '@/assets/12.png';
import searchimg13 from '@/assets/13.png';
import searchimg14 from '@/assets/14.png';
import searchimg15 from '@/assets/15.png';
import searchimg16 from '@/assets/16.png';
import searchimg17 from '@/assets/17.png';
import searchimg18 from '@/assets/18.png';
import searchimg19 from '@/assets/19.png';
import searchimg20 from '@/assets/20.png';
import searchimg21 from '@/assets/21.png';
import searchimg22 from '@/assets/22.png';
import searchimg23 from '@/assets/23.png';
import searchimg24 from '@/assets/24.png';
import searchimg25 from '@/assets/25.png';
import searchimg26 from '@/assets/26.png';
import searchimg27 from '@/assets/27.png';
import searchimg28 from '@/assets/28.png';
import searchimg29 from '@/assets/29.png';
import searchimg30 from '@/assets/30.png';
import searchimg31 from '@/assets/31.png';
import searchimg32 from '@/assets/32.png';
import searchimg33 from '@/assets/33.png';
import searchimg34 from '@/assets/34.png';
import searchimg35 from '@/assets/35.png';
import searchimg36 from '@/assets/36.png';
import searchimg37 from '@/assets/37.png';
import searchimg38 from '@/assets/38.png';
import searchimg39 from '@/assets/39.png';
import searchimg40 from '@/assets/40.png';
import searchimg41 from '@/assets/41.png';
import searchimg42 from '@/assets/42.png';
import searchimg43 from '@/assets/43.png';
import searchimg44 from '@/assets/44.png';
import searchimg45 from '@/assets/45.png';
import searchimg46 from '@/assets/46.png';
import searchimg47 from '@/assets/47.png';
import searchimg48 from '@/assets/48.png';
import searchimg49 from '@/assets/49.png';
import searchimg50 from '@/assets/50.png';

export default {
  data() {
    return {
      dialog: false,
      text: '',
      toggleValue: false,
      toggleLabel: '공개',
      commentText: '',
      comments: [
        { text: '언제 마치나요?', author: '권동욱', showReply: false, replyText: '' },
        { text: '장소가 바뀌었나요?', author: '김원종', showReply: false, replyText: '' },
      ],
      item:{},
    };
  },
  created(){
    const url = new URL(window.location.href);
    const pathname = url.pathname; // "/search/id=1"
    const id = pathname.substring(pathname.lastIndexOf('=') + 1);
    //console.log(id);
    this.studentid = this.$store.state.studentId;
    this.fetchData(id);
  },
  watch: {
    toggleValue(value){
        this.toggleLabel = value ? '비공개' : '공개';
        this.item.isPrivate = value ? 1 : 0;
        console.log(`isPrivate 값: ${this.item.isPrivate}`);
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
    fetchData(id) {
      fetch(`http://localhost:8000/api/search/id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          this.item = {
            id: data.id,
            title: data.title,
            date: data.date,
            location: data.location,
            url: data.url,
            src: eval(`searchimg${id}`),
            // 필요한 항목들을 가져와서 객체에 저장
          };
          
        })
      
        .catch((error) => {
          console.error(error);
        });
    },
    addToMySchedule() {
    const userId = this.studentid; 
    const id = this.item.id;
    const isPrivate = this.toggleValue ? 1 : 0;
    const url = `http://127.0.0.1:8000/api/search/add?userid=${userId}&id=${id}&isPrivate=${isPrivate}`;
    
    console.log('PUT 요청 URL:', url);
    fetch(url, {
      method: 'PUT',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // 실패한 응답 처리
          throw new Error('요청이 실패했습니다.');
        }
      })
      .then((data) => {
        console.log('PUT 요청이 성공적으로 완료되었습니다.', data);
      })
      .catch((error) => {
        console.error(error);
      });
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
