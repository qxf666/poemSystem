<template>
  <div class="wrap">
    <div class="play_wrap" id="player">
      <div class="search_bar">
        <img class="titleimg" src="http://qajy096t3.bkt.clouddn.com/player_title.png" />
        <!-- 搜索歌曲 -->
        <div class="inputContent">
          <el-input placeholder="请输入歌曲信息" clearable v-model="query">
            <el-button slot="append" icon="el-icon-search" @click="searchMusic"></el-button>
          </el-input>
        </div>
      </div>
      <div class="center_con">
        <!-- 搜索歌曲列表 -->
        <div class="song_wrapper">
          <ul class="song_list">
            <li v-for="(item,index) in musicList" :key="index">
              <a href="javascript:;" @click="playMusic(item.id)"></a>
              <b>{{item.musicName}}</b>
              <!---->
            </li>
          </ul>
          <img src="http://qajy096t3.bkt.clouddn.com/line.png" class="switch_btn" alt />
        </div>
        <!-- 歌曲信息容器 -->
        <div class="player_con" :class="{playing:isPlaying}">
          <img src="http://qajy096t3.bkt.clouddn.com/player_bar.png" class="play_bar" />
          <!-- 黑胶碟片 -->
          <img src="http://qajy096t3.bkt.clouddn.com/disc.png" class="disc autoRotate" />
          <img :src="url+musicImg" class="cover autoRotate" />
        </div>
        <!-- 评论容器 -->
        <div class="comment_wrapper">
          <h5 class="title">热门留言</h5>
          <div class="comment_list">
            <dl>
              <dt>
                <img src="http://qajy096t3.bkt.clouddn.com/person.png" alt />
              </dt>
              <dd class="name">盐焗西兰花</dd>
              <dd class="detail">绝对值得一听，吹爆</dd>
            </dl>
          </div>
          <img src="http://qajy096t3.bkt.clouddn.com/line.png" class="right_line" />
        </div>
      </div>
      <div class="audio_con">
        <audio ref="audio" @play="play" @pause="pause" :src="url+musicUrl" controls autoplay loop class="myaudio"></audio>
      </div>
      <div class="video_con" style="display: none;">
        <video controls="controls"></video>
        <div class="mask"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      musicList: [],
      musicUrl:"line.png",
      url:"http://qajy096t3.bkt.clouddn.com/",
      musicImg:"cover.png",
      isPlaying:false
    };
  },
  created() {
    this.searchMusic();
  },
  methods: {
    async searchMusic() {
      const { data: res } = await this.$http.get(
        "music/musicList?musicName=" + this.query
      );
      console.log(this.query);
      if (res.meta.status != 200) {
        return this.$message.error("获取歌曲信息失败");
      }
      console.log(res);

      this.musicList = res.data.songs;
    },
    async playMusic(musicId) {
      console.log(musicId);
      const { data: res } = await this.$http.get(
        "music/musicUrl?id=" + musicId
      );
     this.musicUrl=res.data.musicUrl.musicID;
     this.musicImg=res.data.musicUrl.musicIMG;
     console.log(this.musicImg);
    },
    play(){
      this.isPlaying=true
    },
    pause(){
      this.isPlaying=false
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../../assets/css/music.less");
</style>
