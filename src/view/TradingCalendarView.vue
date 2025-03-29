<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="12">
        <v-card class="fill-height">
          <v-card-title class="text-h5 font-weight-bold d-flex align-center py-4 px-6">
            <v-icon start class="mr-2">mdi-calendar-month</v-icon>
            广东电力市场2025年3月交易安排
          </v-card-title>
          <v-card-text class="px-4">
            <v-sheet height="64" class="d-flex align-center mb-4">
              <v-btn-group rounded="lg" class="mr-4">
                <v-btn @click="calendarType = 'month'" :color="calendarType === 'month' ? 'primary' : ''">月</v-btn>
                <v-btn @click="calendarType = 'week'" :color="calendarType === 'week' ? 'primary' : ''">周</v-btn>
                <v-btn @click="calendarType = 'day'" :color="calendarType === 'day' ? 'primary' : ''">日</v-btn>
              </v-btn-group>
              <v-spacer></v-spacer>
              <v-btn
                prepend-icon="mdi-chevron-left"
                variant="text"
                @click="previousMonth"
              >
                上个月
              </v-btn>
              <div class="text-h6 mx-4">
                {{ currentMonthText }}
              </div>
              <v-btn
                append-icon="mdi-chevron-right"
                variant="text"
                @click="nextMonth"
              >
                下个月
              </v-btn>
            </v-sheet>
            
            <v-sheet class="calendar-container">
              <div class="calendar-header">
                <div v-for="day in weekDays" :key="day" class="calendar-header-cell">
                  {{ day }}
                </div>
              </div>
              <div class="calendar-body">
                <div
                  v-for="(week, weekIndex) in calendar"
                  :key="weekIndex"
                  class="calendar-row"
                >
                  <div
                    v-for="(day, dayIndex) in week"
                    :key="dayIndex"
                    class="calendar-cell"
                    :class="{
                      'current-month': day.currentMonth,
                      'today': isToday(day.date),
                      'selected': isSelected(day.date)
                    }"
                    @click="selectDate(day.date)"
                  >
                    <div class="date-number">{{ day.date.getDate() }}</div>
                    <div class="events-container">
                      <template v-for="event in getEventsForDate(day.date)" :key="event.name">
                        <div 
                          class="event-item" 
                          :style="{ backgroundColor: event.color }"
                          :title="`${event.name}\n${event.details}`"
                        >
                          <span class="event-time">{{ formatTime(event.start) }}</span>
                          <span class="event-name">{{ event.name }}</span>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </v-sheet>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface TradingEvent {
  name: string
  start: Date
  end: Date
  details: string
  color?: string
  category?: string
  timed?: boolean
}

interface CalendarDay {
  date: Date
  currentMonth: boolean
}

const selectedDate = ref(new Date('2025-03-01'))
const calendarType = ref('month')

const weekDays = ['一', '二', '三', '四', '五', '六', '日']

const currentMonthText = computed(() => {
  return selectedDate.value.toLocaleString('zh-CN', { year: 'numeric', month: 'long' })
})

const calendar = computed(() => {
  const date = new Date(selectedDate.value)
  const year = date.getFullYear()
  const month = date.getMonth()
  
  // 获取当月第一天
  const firstDay = new Date(year, month, 1)
  // 获取当月最后一天
  const lastDay = new Date(year, month + 1, 0)
  
  // 获取第一天是星期几（0是星期日）
  let firstDayOfWeek = firstDay.getDay() || 7
  firstDayOfWeek = firstDayOfWeek === 7 ? 0 : firstDayOfWeek
  
  const weeks: CalendarDay[][] = []
  let currentWeek: CalendarDay[] = []
  
  // 添加上个月的日期
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    currentWeek.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      currentMonth: false
    })
  }
  
  // 添加当月的日期
  for (let day = 1; day <= lastDay.getDate(); day++) {
    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
    currentWeek.push({
      date: new Date(year, month, day),
      currentMonth: true
    })
  }
  
  // 添加下个月的日期
  let nextMonthDay = 1
  while (currentWeek.length < 7) {
    currentWeek.push({
      date: new Date(year, month + 1, nextMonthDay++),
      currentMonth: false
    })
  }
  weeks.push(currentWeek)
  
  // 如果不足6行，添加下个月的日期
  while (weeks.length < 6) {
    const extraWeek: CalendarDay[] = []
    for (let i = 0; i < 7; i++) {
      extraWeek.push({
        date: new Date(year, month + 1, nextMonthDay++),
        currentMonth: false
      })
    }
    weeks.push(extraWeek)
  }
  
  return weeks
})

const events = ref<TradingEvent[]>([
  {
    name: '月度绿电双边协商交易（3-12月）',
    start: new Date('2025-02-24T09:00:00'),
    end: new Date('2025-02-24T10:00:00'),
    details: '交易标的：2025年3-12月绿电电能量及绿色环境价值',
    color: '#4CAF50',
    timed: true
  },
  {
    name: '绿电集中交易（事前）',
    start: new Date('2025-02-24T14:30:00'),
    end: new Date('2025-02-24T15:30:00'),
    details: '交易标的：2025年3-5月绿色环境价值',
    color: '#4CAF50',
    timed: true
  },
  {
    name: '代购市场电量挂牌交易',
    start: new Date('2025-02-24T14:30:00'),
    end: new Date('2025-02-24T15:30:00'),
    details: '交易标的：2025年3月代购市场电量',
    color: '#2196F3',
    timed: true
  },
  {
    name: '外送市场电量挂牌交易',
    start: new Date('2025-02-24T16:00:00'),
    end: new Date('2025-02-24T17:00:00'),
    details: '交易标的：2025年3月外送市场电量',
    color: '#2196F3',
    timed: true
  },
  {
    name: '代购市场电量双边协商转让',
    start: new Date('2025-02-25T09:00:00'),
    end: new Date('2025-02-25T10:00:00'),
    details: '交易标的：2025年3月代购市场电量',
    color: '#2196F3',
    timed: true
  },
  {
    name: '发电侧合同挂牌转让交易',
    start: new Date('2025-02-25T10:30:00'),
    end: new Date('2025-02-25T11:30:00'),
    details: '交易标的：2025年3月市场电量',
    color: '#2196F3',
    timed: true
  },
  {
    name: '月度双边协商交易（3-12月）',
    start: new Date('2025-02-26T09:00:00'),
    end: new Date('2025-02-26T10:30:00'),
    details: '交易标的：2025年3-12月市场电量',
    color: '#2196F3',
    timed: true
  },
  {
    name: '月度集中竞争交易（市场用户负荷曲线）',
    start: new Date('2025-02-26T14:00:00'),
    end: new Date('2025-02-26T15:30:00'),
    details: '交易标的：2025年3月市场电量',
    color: '#9C27B0',
    timed: true
  },
  {
    name: '月度分时集中竞争交易',
    start: new Date('2025-02-26T16:00:00'),
    end: new Date('2025-02-26T17:30:00'),
    details: '交易标的：2025年3月市场电量',
    color: '#9C27B0',
    timed: true
  },
  {
    name: '合同价格调整截止',
    start: new Date('2025-02-27T12:00:00'),
    end: new Date('2025-02-27T12:00:00'),
    details: '年度、多月双边协商合同价格调整截止',
    color: '#F44336',
    timed: true
  },
  {
    name: '绿电集中交易（事后）',
    start: new Date('2025-03-09T10:00:00'),
    end: new Date('2025-03-09T11:30:00'),
    details: '交易标的：2025年2月绿色环境价值',
    color: '#4CAF50',
    timed: true
  }
])

// 添加周期性事件
const startDate = new Date('2025-03-01')
const endDate = new Date('2025-03-31')

// 添加每周二和周四的近月集中竞争交易
for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
  if (date.getDay() === 2 || date.getDay() === 4) { // 周二或周四
    events.value.push({
      name: '近月集中竞争交易（M+1月）',
      start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 0),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 30),
      details: '交易标的：近月市场电量',
      color: '#9C27B0',
      timed: true
    })
    events.value.push({
      name: '远月集中竞争交易（M+2~M+4月）',
      start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 16, 0),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 30),
      details: '交易标的：远月市场电量',
      color: '#9C27B0',
      timed: true
    })
  }
}

// 添加工作日的周双边协商交易
for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
  if (date.getDay() !== 0 && date.getDay() !== 6) { // 周一至周五
    events.value.push({
      name: '周双边协商交易（工作日）',
      start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 0),
      end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 30),
      details: '交易标的：本周市场电量',
      color: '#2196F3',
      timed: true
    })
  }
}

const getEventsForDate = (date: Date) => {
  return events.value.filter(event => {
    return event.start.getFullYear() === date.getFullYear() &&
           event.start.getMonth() === date.getMonth() &&
           event.start.getDate() === date.getDate()
  })
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const isToday = (date: Date) => {
  const today = new Date()
  return date.getFullYear() === today.getFullYear() &&
         date.getMonth() === today.getMonth() &&
         date.getDate() === today.getDate()
}

const isSelected = (date: Date) => {
  return date.getFullYear() === selectedDate.value.getFullYear() &&
         date.getMonth() === selectedDate.value.getMonth() &&
         date.getDate() === selectedDate.value.getDate()
}

const selectDate = (date: Date) => {
  selectedDate.value = date
  if (calendarType.value !== 'month') {
    calendarType.value = 'day'
  }
}

const previousMonth = () => {
  const date = new Date(selectedDate.value)
  date.setMonth(date.getMonth() - 1)
  selectedDate.value = date
}

const nextMonth = () => {
  const date = new Date(selectedDate.value)
  date.setMonth(date.getMonth() + 1)
  selectedDate.value = date
}
</script>

<style scoped>
.calendar-container {
  height: 100%;
  min-height: 600px;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: rgb(var(--v-theme-primary));
  color: white;
}

.calendar-header-cell {
  padding: 12px;
  text-align: center;
  font-weight: 500;
}

.calendar-body {
  display: flex;
  flex-direction: column;
  height: calc(100% - 48px);
}

.calendar-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  flex: 1;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.calendar-cell {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  padding: 8px;
  min-height: 100px;
  cursor: pointer;
  position: relative;
  background-color: white;
  transition: background-color 0.2s;
}

.calendar-cell:not(.current-month) {
  background-color: #f5f5f5;
  color: #999;
}

.calendar-cell:hover {
  background-color: #f5f5f5;
}

.calendar-cell.selected {
  background-color: #e3f2fd;
}

.calendar-cell.today {
  font-weight: bold;
}

.calendar-cell.today .date-number {
  color: rgb(var(--v-theme-primary));
}

.date-number {
  font-size: 14px;
  margin-bottom: 4px;
}

.events-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
  max-height: calc(100% - 24px);
}

.event-item {
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 2px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}

.event-time {
  font-size: 11px;
  opacity: 0.9;
}

.event-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 