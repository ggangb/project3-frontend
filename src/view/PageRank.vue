<template>
    <div class="wrap">
        <div class="container">
            <div class="content">
                <div class="select_tab">
                    <ul class="list">
                        <li>
                            <a v-on:click="changeData(select_menu)">
                                <sapn :class="select_menu == false ? 'active_menu' : null">팀 순위</sapn>
                            </a>
                        </li>
                        <li>
                            <a v-on:click="changeData(menu)">
                                <sapn :class="menu == false ? 'active_menu' : null "  id="menu">개인 순위</sapn>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="league_tab">
                    <ul class="list">
                        <li>
                            <a v-if="!default_league" v-on:click="changeLeague(this.set_league,idx)">
                                <sapn class="default"><img src="@/assets/pl1.png" /><span class="title">
                                        프리미어리그
                                    </span></sapn>
                            </a>
                            <a v-if="default_league" v-on:click="changeLeague(this.set_league,idx)">
                                <sapn class="menu_on"><img src="@/assets/pl.png" /><span class="title">
                                    프리미어리그
                                    </span></sapn>
                            </a>
                        </li>
                        <li v-for="(league, idx) in league_tab" :key="idx">
                            <a v-if="league_choice && index === idx" v-on:click="changeLeague(league.league_name, idx)">
                                <sapn class="menu_on"><img :src="league.url2" /><span class="title">
                                        {{ league.name }}
                                    </span></sapn>
                            </a>
                            <a v-else v-on:click="changeLeague(league.league_name, idx)">
                                <sapn class="menu"><img :src="league.url" /><span class="title">
                                        {{ league.name }}
                                    </span></sapn>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="date_season">
                    <h2 class="season_h" v-if="!select_menu" ><span>{{ this.season }} / {{ Number(this.season)+1 }} 시즌</span>팀 순위</h2> 
                    <h2 class="season_h" v-else ><span>{{ this.season }} / {{ Number(this.season)+1 }} 시즌</span>개인 순위</h2>
                </div>
                <div class="date_select_tab">
                    <div class="select_box">
                        <select autofocus class="select_season" @change="seasonChange($event)">
                            <option value="2023" class="season" selected>2023/2024</option>
                            <option value="2022">2022/2023</option>
                            <option value="2021">2021/2022</option>
                            <option value="2020">2020/2021</option>
                        </select>
                    </div>
                </div>
                <div class="record_table">
                    <table v-if="!select_menu">
                        <colgroup>
                            <col width="45">
                            <col width="*">
                            <col width="80">
                            <col width="80">
                            <col width="80">
                            <col width="80">
                            <col width="80">
                            <col width="80">
                            <col width="80">
                            <col width="80">
                        </colgroup>
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div><strong>순위</strong></div>
                                </th>
                                <th scope="col">
                                    <div class="team"><strong>팀</strong></div>
                                </th>
                                <th scope="col">
                                    <div><strong>경기수</strong></div>
                                </th>
                                <th scope="col">
                                    <div><strong>승점</strong></div>
                                </th>
                                <th scope="col">
                                    <div><strong>승</strong></div>
                                </th>
                                <th scope="col">
                                    <div><strong>무</strong></div>
                                </th>
                                <th scope="col">
                                    <div><strong>패</strong></div>
                                </th>
                                <th scope="col">
                                    <div><strong>득점</strong></div>
                                </th>
                                <th scope="col">
                                    <div><strong>실점</strong></div>
                                </th>
                                <th scope="col">
                                    <div><strong>득실차</strong></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(league, idx) in league_data" :key="idx">
                                <td>

                                    <div>
                                        <span class="champions"
                                            v-if="idx == 0 || idx == 1 || idx == 2 || idx == 3"></span><strong>{{ idx + 1 }}
                                        </strong>
                                        <span class="europa"
                                            v-if="idx == 4 || idx == 5"></span>
                                    </div>
                                </td>
                                <td class="team">
                                    <div><img :src="league.team.crest"><strong>{{ league.team.name }}</strong></div>
                                </td>
                                <td>
                                    <div><strong>{{ league.playedGames }}</strong></div>
                                </td>
                                <td>
                                    <div><strong>{{ league.points }}</strong></div>
                                </td>
                                <td>
                                    <div><strong>{{ league.won }}</strong></div>
                                </td>
                                <td>
                                    <div><strong>{{ league.draw }}</strong></div>
                                </td>
                                <td>
                                    <div><strong>{{ league.lost }}</strong></div>
                                </td>
                                <td>
                                    <div><strong>{{ league.goalsFor }}</strong></div>
                                </td>
                                <td>
                                    <div><strong>{{ league.goalsAgainst }}</strong></div>
                                </td>
                                <td>
                                    <div><strong>{{ league.goalDifference }}</strong></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                    <div v-if="select_menu" class="scorers_board">
                    <ul v-if="count != 0" class="scorers">
                        <li>
                            <strong class="scorers_title">최다 득점</strong>
                            <div class="scorers_area">
                                <div class="scorers_list">
                                    <div v-for="(scorers, idx) in scorers_data" :key="idx" class="text">
                                        <p class="rank_num">{{ Number(idx)+1 }}</p>
                                        <div class="info">
                                        <span class="name">{{ scorers.player.name }}</span>
                                        <span class="team">{{ scorers.team.shortName }}</span>
                                    </div>
                                    <div class="stat">
                                        <span>{{ scorers.goals }}</span>
                                        골
                                    </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </li>
                        <li>
                            <strong class="scorers_title">최다 도움</strong>
                            <div class="scorers_area">
                                <div class="scorers_list">
                                    <div v-for="(assists, idx) in assists_data" :key="idx" class="text">
                                        <p class="rank_num">{{ Number(idx)+1 }}</p>
                                        <div class="info">
                                        <span class="name">{{ assists.player.name }}</span>
                                        <span class="team">{{ assists.team.shortName }}</span>
                                    </div>
                                    <div class="stat">
                                        <span v-if="assists.assists!=null">{{ assists.assists }}</span>
                                        <span v-else >0</span>
                                        도움
                                    </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </li>
                        <li>
                            <strong class="scorers_title">최다 공격포인트</strong>
                            <div class="scorers_area">
                                <div class="scorers_list">
                                    <div v-for="(total, idx) in total_data" :key="idx" class="text">
                                        <p class="rank_num">{{ Number(idx)+1 }}</p>
                                        <div class="info">
                                        <span class="name">{{ total.player.name }}</span>
                                        <span class="team">{{ total.team.shortName }}</span>
                                    </div>
                                    <div class="stat">
                                        <span>{{ total.goals + total.assists }}</span>
                                        포인트
                                    </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </li>
                        <li>
                            <strong class="scorers_title">최다 패널티</strong>
                            <div class="scorers_area">
                                <div class="scorers_list">
                                    <div v-for="(penalti, idx) in penalti_data" :key="idx" class="text">
                                        <p class="rank_num">{{ Number(idx)+1 }}</p>
                                        <div class="info">
                                        <span class="name">{{ penalti.player.name }}</span>
                                        <span class="team">{{ penalti.team.shortName }}</span>
                                    </div>
                                    <div class="stat">
                                        <span v-if="penalti.penalties!=null">{{ penalti.penalties }}</span>
                                        <span v-else >0</span>
                                        패널티
                                    </div>
                                    </div>
                                   
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                    <ul v-if="count == 0" class="scorers">
                        <li>
                            <strong class="scorers_title">최다 득점</strong>
                            <div class="scorers_area">
                                <div class="scorers_list">
                                   <div class="empty">
                                        <span>기록된 정보가 없습니다.</span>
                                   </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <strong class="scorers_title">최다 도움</strong>
                            <div class="scorers_area">
                                <div class="scorers_list">
                                    <div class="empty">
                                        <span>기록된 정보가 없습니다.</span>
                                   </div>
                                   
                                </div>
                            </div>
                        </li>
                        <li>
                            <strong class="scorers_title">최다 공격포인트</strong>
                            <div class="scorers_area">
                                <div class="scorers_list">
                                    <div class="empty">
                                        <span>기록된 정보가 없습니다.</span>
                                   </div>
                                   
                                </div>
                            </div>
                        </li>
                        <li>
                            <strong class="scorers_title">최다 패널티</strong>
                            <div class="scorers_area">
                                <div class="scorers_list">
                                    <div class="empty">
                                        <span>기록된 정보가 없습니다.</span>
                                   </div>
                                   
                                </div>
                            </div>
                        </li>
                        
                    </ul>
                    </div>
                
            </div>
        </div>
    </div>
</template>

<script>
const season_url = "http://localhost:3000/api/season"
const scorers_url = "http://localhost:3000/api/scorers"
export default {
    data() {
        return {
            league_data: [],
            scorers_data: [],
            assists_data: [],
            total_data: [],
            penalti_data: [],
            league: '',
            league_tab: [
            {league_name: 'PD', name: '라리가', url: require('@/assets/pd1.png'), url2: require('@/assets/pd.png')},
            {league_name: 'BL1', name: '분데스리가', url: require('@/assets/bl11.png'), url2: require('@/assets/bl1.png')},
            {league_name: 'SA', name: '세리에A', url: require('@/assets/sa1.png'), url2: require('@/assets/sa.png')},
            {league_name: 'FL1', name: '리그앙', url: require('@/assets/fr11.png'), url2: require('@/assets/fr1.png')}],
            league_choice: false,
            default_league: true,
            now_league : 'PL',
            set_league: 'PL',
            count: 0,
            index: 0,
            season: 2023,
            select_menu: false ,
            menu: true,
        }
    },
    methods: {
        getLeague() {
                this.$axios
                .get(season_url ,{params:  {league: this.now_league, season: this.season}})
                .then((res) => {
                    console.log(this.league_tab)
                    this.league_data = res.data.standings[0].table;
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error);
                    alert("잠시후 다시시도해 주세요.")
                })     
        },
        getScorers() {
                this.$axios
                .get(scorers_url ,{params:  {league: this.now_league, season: this.season}})
                .then((res) => {
                    console.log(this.league_tab)
                    this.scorers_data = {...res.data.scorers}
                    this.assists_data = {...res.data.scorers.sort((a, b) => {
                        return b.assists - a.assists;
                    })};
                    this.total_data ={...res.data.scorers.sort((a, b) => {
                        return b.assists+b.goals - a.assists+b.assists;
                    })};
                    this.penalti_data ={...res.data.scorers.sort((a, b) => {
                        return b.penalties - a.penalties;
                    })};
                    this.count = res.data.count;
                    console.log(this.scorers_data)
                    console.log(this.assists_data)
                    console.log(this.total_data)
                    console.log(this.penalti_data)
                    console.log( this.count)
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error);
                })     
        },
        changeLeague(league_name, idx) {
            console.log(league_name,idx)
            this.index = idx;
            this.now_league = league_name;
            console.log(this.default_league)
            if (idx === undefined && this.set_league === "PL") {
                this.league_choice = false;
                this.default_league = true;
                this.getLeague();
                this.getScorers();
            } else {
                this.index = idx;
                this.league_choice = true;
                this.default_league = false;
                this.getLeague();
                this.getScorers();
            }

        },
        seasonChange(event) {
            this.season = event.target.value;
            console.log(this.season)
            this.$axios
                .get(season_url ,{params:  {league: this.now_league, season: this.season}})
                .then((res) => {
                    this.league_data = res.data.standings[0].table;
                    console.log(res.data)
                })
                .catch((error) => {
                    console.log(error);
                    alert("잠시후 다시시도해 주세요.")
                })
            this.getScorers()
        },
        changeData(select) {
            console.log(select)
            if(select == this.select_menu) {
                this.menu = true;
                this.select_menu = false;
            } else {
                this.menu = false;
                this.select_menu = true;
            }
        }
    },

    created() {
        this.getLeague()
        this.getScorers()
    }

}
</script>

<style scoped>
.container {
    min-width: 1020px;
    min-height: 700px;
    margin-bottom: 30px;
    overflow: hidden;
}

.content {
    position: relative;
    width: 1000px;
    margin: 0 auto;
}

.select_tab {
    position: relative;
    height: 75px;
}

.league_tab {
    margin-bottom: 48px;
    border-top: 3px solid black;
}

.date_select_tab {
    position: relative;
    padding: 37px 0 13px;
    text-align: center;
}

.select_tab .list {
    display: flex;
    padding-top: 17px;
}

.select_tab .list a {
    display: block;
    padding: 10px 9px 10px 0;
    color: #777;
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
}

.select_tab .list .menu::before,  .select_tab .list #menu::before{
    display: inline-block;
    width: 1px;
    height: 14px;
    margin: -1px 9px 1px 0;
    background: #e3e3e3;
    vertical-align: middle;
    content: '';
}

.league_tab .list {
    display: table;
    width: 100%;
    table-layout: fixed;
}

.league_tab li {
    display: table-cell;
}

.league_tab a {
    display: block;
    background: #f7f7f9;
    color: #3f4044;
    text-decoration: none;
}

.league_tab .menu {
    display: block;
    position: relative;
    height: 51px;
    border-bottom: 1px solid #b4b5c0;
    line-height: 49px;
    text-align: center;
}

.league_tab .default {
    display: block;
    position: relative;
    height: 51px;
    border-bottom: 1px solid #b4b5c0;
    line-height: 49px;
    text-align: center;
}
.league_tab .menu_on {
    display: block;
    position: relative;
    color: #255fbe;
    height: 51px;
    border-bottom: 1px solid #b4b5c0;
    line-height: 49px;
    text-align: center;
}

.league_tab .menu_on::before {
    display: inline-block;
    position: absolute;
    top: 16px;
    left: 0;
    width: 1px;
    height: 18px;
    background: #d3d3d3;
    content: ''
}

.league_tab .menu::before {
    display: inline-block;
    position: absolute;
    top: 16px;
    left: 0;
    width: 1px;
    height: 18px;
    background: #d3d3d3;
    content: ''
}

.league_tab .title {
    font-size: 15px;
    font-weight: bold;
    letter-spacing: -1px;
    vertical-align: middle;
}

.league_tab .select_box {
    position: relative;
    display: inline-block;
    font-size: 12px;
    vertical-align: top;
}

.date_select_tab {
    margin-top: -90px;
}

.select_box .select_season {
    width: 150px;
    height: 47px;
    font-size: larger;
    text-align: center;
    border-color: #d6d6db;
}

.record_table table {
    width: 100%;
    border-width: 1px;
    border-style: solid;
    border-color: #777784 #e0e0e0 #d4d4d4;
    margin-top: -1px;
    table-layout: fixed;
    border-collapse: collapse;
}

.record_table th {
    height: 40px;
    background: #f7f7f9;
    font-size: 12px;
    font-weight: bold;
    color: #636469;
    letter-spacing: -1px;
    vertical-align: middle;
}

.record_table td {
    position: relative;
    font-size: 12px;
    text-align: center;
    vertical-align: middle;
}

.record_table td div {
    padding: 8px 0 7px;
}

.record_table tbody td img {
    width: 25px;
    height: 25px;
    vertical-align: middle;
}
.league_tab img {
    width: 20px;
    height: 23px;
    vertical-align: middle;
}

.record_table .team {
    text-align: left;
}

.record_table tbody tr {
    border-bottom: 1px solid #d4d4d4;
}

.record_table .team strong {
    padding-left: 20px;
}

.champions {
    position: absolute;
    width: 5px;
    left: -1px;
    top: 1px;
    right: auto;
    bottom: 0;
    background-color: #6f8dd9;
}
.europa {
    position: absolute;
    width: 5px;
    left: -1px;
    top: 1px;
    right: auto;
    bottom: 0;
    background-color: #80d882;
}
.scorers_board {
    border-width: 1px;
    border-style: solid;
    border-color: #777784 #e0e0e0 #d4d4d4;
}
.scorers_board .scorers {
    position: relative;
    display: table;
    width: 100%;
    table-layout: fixed;
}
.scorers_board .scorers li {
    position: relative;
    display: table-cell;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    padding-top: 43px;
    vertical-align: top;
}
.scorers_board .scorers_title {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    min-height: 42px;
    border-bottom: 1px solid #cbcbd0;
    border-right:  1px solid #cbcbd0;
    background: #f7f7f9;
    font-size: 13px;
    line-height: 42px;
    color: #636469;
    text-align: center;
}
.scorers_board .scorers_list {
    position: relative;
    padding: 0 14px 0 14px;
    border-right: 1px solid #f4f4f4;
}
.scorers_board .text {
    padding: 13px 44px 10px 17px;
    border-top: 1px solid #f4f4f4;
    position: relative;
    min-height: 30px;

}
.scorers_board .rank_num {
    position: absolute;
    top: 11px;
    left: -5px;
    font-family: Arial,sans-serif;
    font-size: 15px;
    color: #444;
}

.scorers_board .team {
    display: block;
    margin-top: 2px;
    font-size: 11px;
    color: #9e9e9e;
    letter-spacing: -1px; 
}
.scorers_board .name {
    display: block;
    font-size: 12px;
    color: #222;
}
.scorers_board .stat {
    position: absolute;
    top: 9px;
    right: 16px;
    font-size: 11px;
    color: #444;
}
.active_menu {
    color: #255fbe !important;
}

.date_season {
    position: relative;
    margin-top: 60px;
    padding-bottom: 17px;
}
.date_season .season_h {
        font-size: 16px;
    color: #000;
    letter-spacing: -1px;
 }

 .date_season .season_h span {
    color: #2f6bda;
    font-weight: bold;
 }

 </style>