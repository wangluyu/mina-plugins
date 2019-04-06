// plugin/components/calendar/calendar.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '日历',
    },
    show: { // 属性名
      type: Boolean,
      value: true,
      observer(newVal, oldVal, changedPath) {
        console.log("select_times:" + this.data.select_times)
        this.setData({
          select_times: 0
        })
      }
    },
    color: {
      type: String,
      value: 'cyan'
    },
    week: {
      type: Array,
      value: ['日', '一', '二', '三', '四', '五', '六']
    },
    start: {
      type: Number,
      value: 0
    },
    end: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    select_times: 0,
    year: 0,
    month: 0,
    day_list: []
  },
  pageLifetimes: {
    show() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      this.dateInit(year, month)
      let timestamp = new Date(year, month - 1, day).getTime()
      this.setData({
        start: timestamp,
        end: timestamp
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //  隐藏日历
    hide(e) {
      this.setData({
        show: false
      })
    },
    //  显示日历
    show(e) {
      this.setData({
        show: true
      })
    },
    dateInit(year, month) {
      //存放每天的数据
      let day_list = []
      //选中月1号的date
      let date = new Date(year, month - 1)
      //获取选中月1号的时间戳
      let timestamp = date.getTime()
      //获取选中月1号的周几
      let week = date.getDay()
      //控制1号在周几
      for (let i = 0; i < week; i++) {
        day_list.push({})
      }

      //选中月下个月的年份
      let next_year = (month == 12) ? (year + 1) : year
      //选中月下个月的月份
      let next_month = (month == 12) ? 1 : (month + 1)
      //选中月下个月1号的date
      let next_date = new Date(next_year, next_month - 1)
      //获取选中月下个月1号的时间戳
      let next_timestamp = next_date.getTime()
      
      let curr_day = 1
      for (let i = timestamp; i < next_timestamp; i+=(1000*60*60*24)) {
        day_list.push({
          year: year,
          month: month,
          day: curr_day,
          date: '' + year + month + curr_day,
          timestamp: i
        })
        curr_day++
      }

      this.setData({
        year: year,
        month: month,
        day_list: day_list
      })
    },
    //上个月
    lastMonth: function () {
      let year = this.data.month == 1 ? this.data.year - 1 : this.data.year
      let month = this.data.month == 1 ? 12 : this.data.month - 1;
      this.dateInit(year, month)
    },
    //下个月
    nextMonth: function () {
      let year = this.data.month == 12 ? this.data.year + 1 : this.data.year
      let month = this.data.month == 12 ? 1 : this.data.month + 1
      this.dateInit(year, month)
    },
    //选择日期范围
    selectDays(e) {
      let time = e.target.dataset.time
      let select_times = this.data.select_times + 1
      let start = this.data.start
      let end = this.data.end
      if (select_times != 2) {
        start = time
        end = time
        if (select_times > 2) {
          select_times = 1
        }
      } else {
        if (time >= start) {
          end = time
        } else {
          end = start
          start = time
        }
      }
      this.setData({
        start: start,
        end: end,
        select_times: select_times
      })
      console.log("click_times:" + select_times)
      console.log("select:" + time, "start:" + start, "end: " + end)
    }
  }
})
