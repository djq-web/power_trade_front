<template>
  <div class="trading-desk-view">
    <v-card class="mx-auto my-4">
      <v-card-title class="text-h5"> 交易工作台 </v-card-title>
      <v-card-text>
        <v-tabs v-model="activeTab">
          <v-tab value="data-preparation">数据准备</v-tab>
          <v-tab value="trading-monitor">交易监盘</v-tab>
        </v-tabs>

        <v-window v-model="activeTab" class="mt-4">
          <!-- 数据准备 tab -->
          <v-window-item value="data-preparation">
            <div class="data-preparation-content">
              <!-- 替换为AI配置面板 -->
              <AIConfigPanel />
            </div>
          </v-window-item>

          <!-- 交易监盘 tab -->
          <v-window-item value="trading-monitor">
            <div class="trading-monitor-content">
              <!-- 筛选控件部分 - 右上角, 没有标题 -->
              <div class="d-flex justify-end align-center mb-4">
                <v-btn
                  color="primary"
                  class="mr-4"
                  prepend-icon="mdi-cart-plus"
                  @click="orderDrawer = true"
                >
                  下单
                </v-btn>
                <v-text-field
                  v-model="selectedDate"
                  label="交易日期"
                  type="date"
                  density="compact"
                  hide-details
                  class="date-select mr-4"
                  style="max-width: 150px"
                  :loading="isLoading"
                ></v-text-field>

                <v-select
                  v-model="selectedCodeType"
                  :items="codeTypes"
                  density="compact"
                  label="交易类型"
                  hide-details
                  class="code-type-select"
                  style="max-width: 150px"
                ></v-select>
              </div>

              <!-- 市场概览部分 -->
              <v-row>
                <v-col cols="12">
                  <v-card class="mb-4" variant="outlined">
                    <v-card-title class="text-subtitle-1 px-4 py-2">
                      市场数据概览
                      <div class="live-indicator ml-2">
                        <span class="live-dot"></span>
                        <span class="live-text">Live</span>
                      </div>
                    </v-card-title>
                    <v-card-text class="pa-0">
                      <!-- 第一行数据 -->
                      <v-row no-gutters>
                        <!-- 年度统计 -->
                        <v-col cols="12" sm="6" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              年度交易
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-calendar-month"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div
                                class="text-h6 text-primary font-weight-bold"
                              >
                                {{
                                  tradeAggregateData?.annual_total_volume?.toFixed(
                                    3
                                  ) || '0.000'
                                }}
                                MWh
                              </div>
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-cash"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div class="text-subtitle-2">
                                均价:
                                {{
                                  tradeAggregateData?.annual_avg_price?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>

                        <!-- 月度交易 -->
                        <v-col cols="12" sm="6" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              月度交易
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-calendar-month-outline"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div
                                class="text-h6 text-primary font-weight-bold"
                              >
                                {{
                                  tradeAggregateData?.monthly_market_total_volume?.toFixed(
                                    3
                                  ) || '0.000'
                                }}
                                MWh
                              </div>
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-cash"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div class="text-subtitle-2">
                                均价:
                                {{
                                  tradeAggregateData?.monthly_market_avg_price?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>

                        <!-- 月度分时交易 -->
                        <v-col cols="12" sm="6" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              月度分时交易
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-clock-outline"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div
                                class="text-h6 text-primary font-weight-bold"
                              >
                                {{
                                  tradeAggregateData?.monthly_hourly_total_volume?.toFixed(
                                    3
                                  ) || '0.000'
                                }}
                                MWh
                              </div>
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-cash"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div class="text-subtitle-2">
                                均价:
                                {{
                                  tradeAggregateData?.monthly_hourly_avg_price?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>

                        <!-- 当前交易日 -->
                        <v-col cols="12" sm="6" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              当前交易日
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                :icon="
                                  (tradeAggregateData?.current_session_total_volume ??
                                    0) < 0
                                    ? 'mdi-arrow-down'
                                    : 'mdi-arrow-up'
                                "
                                class="mr-1"
                                size="small"
                                :color="
                                  (tradeAggregateData?.current_session_total_volume ??
                                    0) < 0
                                    ? 'error'
                                    : 'success'
                                "
                              />
                              <div
                                class="text-h6"
                                :class="
                                  (tradeAggregateData?.current_session_total_volume ??
                                    0) < 0
                                    ? 'text-error'
                                    : 'text-success'
                                "
                              >
                                {{
                                  Math.abs(
                                    tradeAggregateData?.current_session_total_volume ??
                                      0
                                  ).toFixed(3)
                                }}
                                MWh
                              </div>
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-cash"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div class="text-subtitle-2">
                                均价:
                                {{
                                  tradeAggregateData?.current_session_avg_price?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>
                      </v-row>

                      <!-- 分隔线 -->
                      <v-divider></v-divider>

                      <!-- 第二行数据 - 关键指标 -->
                      <v-row no-gutters>
                        <!-- 净持仓 -->
                        <v-col cols="12" sm="3" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              净持仓
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-scale-balance"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div
                                class="text-h6 text-primary font-weight-bold"
                              >
                                {{
                                  tradeAggregateData?.net_position_volume?.toFixed(
                                    3
                                  ) || '0.000'
                                }}
                                MW
                              </div>
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-cash"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div class="text-subtitle-2">
                                均价:
                                {{
                                  tradeAggregateData?.net_position_avg_price?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>

                        <!-- 日前价格中值 -->
                        <v-col cols="12" sm="3" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              日前价格中值
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-chart-line"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div
                                class="text-h6 text-primary font-weight-bold"
                              >
                                {{
                                  tradeAggregateData?.day_ahead_price_median?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>

                        <!-- 全网电价 -->
                        <v-col cols="12" sm="3" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              电能量价格
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-flash"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div
                                class="text-h6 text-primary font-weight-bold"
                              >
                                {{
                                  tradeAggregateData?.overall_electricity_price?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>

                        <!-- 条件风险价值 (CVaR) -->
                        <v-col cols="12" sm="3" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              最大条件风险价值
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-alert-circle-outline"
                                class="mr-1"
                                size="small"
                                color="warning"
                              />
                              <div
                                class="text-h6 text-warning font-weight-bold"
                              >
                                {{
                                  tradeAggregateData?.max_conditional_value_at_risk?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>
                      </v-row>

                      <!-- 分隔线 -->
                      <v-divider></v-divider>

                      <!-- 第三行数据 - 待成交订单数据 -->
                      <v-row no-gutters>
                        <!-- 待成交买入订单 -->
                        <v-col cols="12" sm="3" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              待成交买入
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-cart-arrow-down"
                                class="mr-1"
                                size="small"
                                color="success"
                              />
                              <div
                                class="text-h6 text-success font-weight-bold"
                              >
                                {{
                                  tradeAggregateData?.pending_order_buy_volume?.toFixed(
                                    3
                                  ) || '0.000'
                                }}
                                MWh
                              </div>
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-cash"
                                class="mr-1"
                                size="small"
                                color="success"
                              />
                              <div class="text-subtitle-2">
                                均价:
                                {{
                                  tradeAggregateData?.pending_order_buy_avg_price?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>

                        <!-- 待成交卖出订单 -->
                        <v-col cols="12" sm="3" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              待成交卖出
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-cart-arrow-up"
                                class="mr-1"
                                size="small"
                                color="error"
                              />
                              <div class="text-h6 text-error font-weight-bold">
                                {{
                                  tradeAggregateData?.pending_order_sell_volume?.toFixed(
                                    3
                                  ) || '0.000'
                                }}
                                MWh
                              </div>
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-cash"
                                class="mr-1"
                                size="small"
                                color="error"
                              />
                              <div class="text-subtitle-2">
                                均价:
                                {{
                                  tradeAggregateData?.pending_order_sell_avg_price?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>

                        <!-- 待成交总量 -->
                        <v-col cols="12" sm="3" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              待成交总量
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-cart"
                                class="mr-1"
                                size="small"
                                color="primary"
                              />
                              <div
                                class="text-h6 text-primary font-weight-bold"
                              >
                                {{
                                  tradeAggregateData?.pending_order_total_volume?.toFixed(
                                    3
                                  ) || '0.000'
                                }}
                                MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>

                        <!-- AI优化价格 -->
                        <v-col cols="12" sm="3" md="3">
                          <v-sheet
                            class="pa-4 h-100 d-flex flex-column justify-center"
                          >
                            <div
                              class="text-caption font-weight-medium text-secondary"
                            >
                              AI优化价格
                            </div>
                            <div class="d-flex align-center mt-1">
                              <v-icon
                                icon="mdi-robot"
                                class="mr-1"
                                size="small"
                                color="info"
                              />
                              <div class="text-h6 text-info font-weight-bold">
                                {{
                                  tradeAggregateData?.ai_optimized_price?.toFixed(
                                    2
                                  ) || '0.00'
                                }}
                                元/MWh
                              </div>
                            </div>
                          </v-sheet>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- 持仓明细 -->
              <v-row
                v-if="
                  tradeAggregateData?.current_session_by_day?.length ||
                  tradeAggregateData?.net_position_by_day?.length
                "
              >
                <v-col cols="12">
                  <v-card class="mb-4" variant="outlined">
                    <v-card-title class="text-subtitle-1 px-4 py-2">
                      持仓明细
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <!-- 当前交易日分日数据 -->
                        <v-col cols="12" md="6">
                          <div class="text-subtitle-2 mb-2">
                            当前交易日分日数据
                          </div>
                          <v-table density="compact">
                            <thead>
                              <tr>
                                <th>日期</th>
                                <th class="text-right">交易量 (MWh)</th>
                                <th class="text-right">均价 (元/MWh)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(
                                  item, index
                                ) in tradeAggregateData?.current_session_by_day"
                                :key="index"
                              >
                                <td>
                                  {{ new Date(item.date).toLocaleDateString() }}
                                </td>
                                <td
                                  class="text-right"
                                  :class="
                                    item.volume < 0
                                      ? 'text-error'
                                      : 'text-success'
                                  "
                                >
                                  {{ item.volume.toFixed(3) }}
                                </td>
                                <td class="text-right">
                                  {{
                                    item.price ? item.price.toFixed(2) : '0.00'
                                  }}
                                </td>
                              </tr>
                              <tr
                                v-if="
                                  !tradeAggregateData?.current_session_by_day
                                    ?.length
                                "
                              >
                                <td colspan="3" class="text-center">
                                  暂无数据
                                </td>
                              </tr>
                            </tbody>
                          </v-table>
                        </v-col>

                        <!-- 净持仓分日数据 -->
                        <v-col cols="12" md="6">
                          <div class="text-subtitle-2 mb-2">净持仓分日数据</div>
                          <v-table density="compact">
                            <thead>
                              <tr>
                                <th>日期</th>
                                <th class="text-right">持仓量 (MWh)</th>
                                <th class="text-right">均价 (元/MWh)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(
                                  item, index
                                ) in tradeAggregateData?.net_position_by_day"
                                :key="index"
                              >
                                <td>
                                  {{ new Date(item.date).toLocaleDateString() }}
                                </td>
                                <td
                                  class="text-right"
                                  :class="
                                    item.volume < 0
                                      ? 'text-error'
                                      : 'text-success'
                                  "
                                >
                                  {{ item.volume.toFixed(3) }}
                                </td>
                                <td class="text-right">
                                  {{
                                    item.price ? item.price.toFixed(2) : '0.00'
                                  }}
                                </td>
                              </tr>
                              <tr
                                v-if="
                                  !tradeAggregateData?.net_position_by_day
                                    ?.length
                                "
                              >
                                <td colspan="3" class="text-center">
                                  暂无数据
                                </td>
                              </tr>
                            </tbody>
                          </v-table>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- 市场行情图表 -->
              <v-row>
                <v-col cols="9">
                  <v-card>
                    <v-card-title class="text-subtitle-1 d-flex align-center">
                      市场行情
                      <div class="live-indicator ml-2">
                        <span class="live-dot"></span>
                        <span class="live-text">Live</span>
                      </div>
                      <v-spacer></v-spacer>

                      <!-- 日期切换选项卡 - 当合并显示启用时显示 -->
                      <v-tabs
                        v-if="combinedView && availableDays.length > 0"
                        v-model="selectedDayTab"
                        density="compact"
                        color="primary"
                        slider-color="primary"
                        style="max-width: 400px"
                      >
                        <v-tab
                          v-for="day in availableDays"
                          :key="day"
                          :value="day"
                          class="text-caption"
                        >
                          {{ day }}
                        </v-tab>
                      </v-tabs>

                      <v-select
                        v-model="selectedCode"
                        :items="availableCodes"
                        density="compact"
                        label="代码"
                        hide-details
                        class="ml-2 mr-2"
                        style="max-width: 120px"
                      ></v-select>

                      <v-switch
                        v-model="combinedView"
                        label="合并显示"
                        density="compact"
                        hide-details
                        class="ml-0 mr-0"
                      ></v-switch>
                    </v-card-title>
                    <v-card-text>
                      <!-- 主K线图容器 -->
                      <div
                        id="candlestick-chart"
                        ref="candlestickChart"
                        style="width: 100%; height: 400px"
                      ></div>

                      <!-- 成交量图表容器 -->
                      <div
                        id="volume-chart"
                        ref="volumeChart"
                        style="width: 100%; height: 250px"
                      ></div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <!-- 右侧：买卖市场信息 -->
                <v-col cols="3">
                  <v-card class="market-depth-card" elevation="2">
                    <v-card-title
                      class="d-flex align-center text-subtitle-1 py-1 px-3"
                    >
                      <span class="font-weight-medium text-body-2"
                        >市场深度</span
                      >
                      <div class="live-indicator ms-1">
                        <span class="live-dot"></span>
                        <span class="live-text text-caption">Live</span>
                      </div>
                      <v-spacer></v-spacer>
                      <v-select
                        v-model="selectedCode"
                        :items="availableCodes"
                        density="compact"
                        variant="outlined"
                        label="代码"
                        hide-details
                        class="code-select"
                      ></v-select>
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-card-text class="pa-1">
                      <div class="market-depth">
                        <!-- 标题 -->
                        <div class="depth-header">
                          <div class="header-level">等级</div>
                          <div class="header-price">价格</div>
                          <div class="header-volume">数量</div>
                        </div>

                        <!-- 卖方信息 (ask) - 从高价到低价排序 -->
                        <div class="ask-section">
                          <div
                            v-for="i in 5"
                            :key="`ask${6 - i}`"
                            class="quote-level ask-level"
                          >
                            <div class="level-indicator">卖{{ 6 - i }}</div>
                            <div class="price">
                              {{
                                marketQuote
                                  ? formatPrice(
                                      marketQuote[`bid${6 - i}`]?.price
                                    )
                                  : '--'
                              }}
                            </div>
                            <div class="volume">
                              {{
                                marketQuote
                                  ? formatVolume(
                                      marketQuote[`bid${6 - i}`]?.volume
                                    )
                                  : '--'
                              }}
                            </div>
                            <div
                              class="volume-bar"
                              :style="{
                                width:
                                  marketQuote &&
                                  marketQuote[`bid${6 - i}`]?.volume
                                    ? calculateVolumeWidth(
                                        marketQuote[`bid${6 - i}`]?.volume,
                                        'ask'
                                      )
                                    : '0%',
                              }"
                            ></div>
                          </div>
                        </div>

                        <!-- 分隔线 -->
                        <div class="price-divider">
                          <div class="latest-price">
                            <span class="latest-price-value">{{
                              latestPrice ? formatPrice(latestPrice) : '--'
                            }}</span>
                          </div>
                        </div>

                        <!-- 买方信息 (bid) - 从高价到低价排序 -->
                        <div class="bid-section">
                          <div
                            v-for="i in 5"
                            :key="`bid${i}`"
                            class="quote-level bid-level"
                          >
                            <div class="level-indicator">买{{ i }}</div>
                            <div class="price">
                              {{
                                marketQuote
                                  ? formatPrice(marketQuote[`ask${i}`]?.price)
                                  : '--'
                              }}
                            </div>
                            <div class="volume">
                              {{
                                marketQuote
                                  ? formatVolume(marketQuote[`ask${i}`]?.volume)
                                  : '--'
                              }}
                            </div>
                            <div
                              class="volume-bar"
                              :style="{
                                width:
                                  marketQuote && marketQuote[`ask${i}`]?.volume
                                    ? calculateVolumeWidth(
                                        marketQuote[`ask${i}`]?.volume,
                                        'bid'
                                      )
                                    : '0%',
                              }"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>

                  <!-- 已提交的交易订单 -->
                  <v-card class="mt-4" style="width: 100%">
                    <v-card-title class="text-subtitle-1">
                      已提交订单
                      <v-spacer></v-spacer>
                      <v-chip size="small" color="primary" class="ml-2">
                        {{
                          submittedMarketOrders.length +
                          submittedConditionalOrders.length
                        }}
                      </v-chip>
                    </v-card-title>
                    <v-card-text class="pa-0">
                      <div class="submitted-orders-container">
                        <v-table
                          density="compact"
                          v-if="
                            submittedMarketOrders.length > 0 ||
                            submittedConditionalOrders.length > 0
                          "
                        >
                          <thead>
                            <tr>
                              <th class="text-left">代码</th>
                              <th class="text-center">类型</th>
                              <th class="text-center">方向</th>
                              <th class="text-right">数量</th>
                              <th class="text-right">价格</th>
                              <th class="text-right">条件价格</th>
                              <th class="text-center">状态</th>
                            </tr>
                          </thead>
                          <tbody>
                            <!-- 市场单 -->
                            <tr
                              v-for="order in submittedMarketOrders"
                              :key="'market-' + order.id"
                              :class="
                                order.direction === 'buy'
                                  ? 'bg-success-lighten-5'
                                  : 'bg-error-lighten-5'
                              "
                            >
                              <td>{{ order.code }}</td>
                              <td class="text-center">
                                <v-chip size="x-small" color="blue-grey" label
                                  >市场单</v-chip
                                >
                              </td>
                              <td class="text-center">
                                <v-chip
                                  size="x-small"
                                  :color="
                                    order.direction === 'buy'
                                      ? 'success'
                                      : 'error'
                                  "
                                  label
                                >
                                  {{
                                    order.direction === 'buy' ? '买入' : '卖出'
                                  }}
                                </v-chip>
                              </td>
                              <td class="text-right">
                                {{ order.volume.toFixed(3) }}
                              </td>
                              <td class="text-right">
                                {{ order.price.toFixed(2) }}
                              </td>
                              <td class="text-right">--</td>
                              <td class="text-center">
                                <v-chip
                                  size="x-small"
                                  :color="getStatusColor(order.status)"
                                  label
                                >
                                  {{ getStatusText(order.status) }}
                                </v-chip>
                              </td>
                            </tr>

                            <!-- 条件单 -->
                            <tr
                              v-for="order in submittedConditionalOrders"
                              :key="'conditional-' + order.id"
                              :class="
                                order.direction === 'buy'
                                  ? 'bg-success-lighten-5'
                                  : 'bg-error-lighten-5'
                              "
                            >
                              <td>{{ order.code }}</td>
                              <td class="text-center">
                                <v-chip size="x-small" color="indigo" label
                                  >条件单</v-chip
                                >
                              </td>
                              <td class="text-center">
                                <v-chip
                                  size="x-small"
                                  :color="
                                    order.direction === 'buy'
                                      ? 'success'
                                      : 'error'
                                  "
                                  label
                                >
                                  {{
                                    order.direction === 'buy' ? '买入' : '卖出'
                                  }}
                                </v-chip>
                              </td>
                              <td class="text-right">
                                {{ order.volume.toFixed(3) }}
                              </td>
                              <td class="text-right">
                                {{ order.price.toFixed(2) }}
                              </td>
                              <td class="text-right">
                                {{ order.conditionPrice?.toFixed(2) || '--' }}
                              </td>
                              <td class="text-center">
                                <v-chip
                                  size="x-small"
                                  :color="getStatusColor(order.status)"
                                  label
                                >
                                  {{ getStatusText(order.status) }}
                                </v-chip>
                              </td>
                            </tr>
                          </tbody>
                        </v-table>
                        <div
                          v-else
                          class="pa-4 text-center text-subtitle-2 text-medium-emphasis"
                        >
                          暂无提交的订单
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <!-- 下方空白区域 -->
              <v-row class="mt-4">
                <v-col cols="12">
                  <v-card>
                    <v-card-title class="text-subtitle-1">
                      附加信息
                    </v-card-title>
                    <v-card-text>
                      <p>下方信息将在此显示</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>

    <!-- 下单抽屉 -->
    <v-navigation-drawer
      v-model="orderDrawer"
      location="right"
      temporary
      width="800"
      class="order-drawer"
    >
      <v-toolbar color="primary" class="text-white">
        <v-toolbar-title>交易下单</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="orderDrawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-tabs v-model="activeOrderTab" bg-color="primary" class="order-tabs">
        <v-tab value="conditional">条件单</v-tab>
        <v-tab value="market">市场单</v-tab>
      </v-tabs>

      <v-window v-model="activeOrderTab">
        <!-- 条件单 Tab -->
        <v-window-item value="conditional">
          <v-container fluid class="pa-4">
            <!-- 已提交订单表格 -->
            <div class="text-subtitle-1 font-weight-bold mb-2">
              已提交条件单
            </div>
            <v-data-table
              :headers="conditionalOrderHeaders"
              :items="submittedConditionalOrders"
              :items-per-page="5"
              class="mb-6 elevation-1"
              density="compact"
              :loading="ordersLoading"
              item-value="id"
            >
              <template #no-data>
                <div class="text-center py-3 text-subtitle-2">
                  暂无已提交的条件单数据
                </div>
              </template>
              <template #[`item.direction`]="{ item }">
                <v-chip
                  v-if="item?.direction"
                  :color="item.direction === 'buy' ? 'success' : 'error'"
                  text-color="white"
                  size="small"
                >
                  {{ item.direction === 'buy' ? '买入' : '卖出' }}
                </v-chip>
                <span v-else>--</span>
              </template>
              <template #[`item.status`]="{ item }">
                <v-chip
                  v-if="item?.status"
                  :color="getStatusColor(item.status)"
                  text-color="white"
                  size="small"
                >
                  {{ getStatusText(item.status) }}
                </v-chip>
                <span v-else>--</span>
              </template>
            </v-data-table>

            <!-- 暂存区表格 -->
            <div
              class="text-subtitle-1 font-weight-bold mb-2 d-flex align-center"
            >
              暂存区
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                size="small"
                prepend-icon="mdi-send"
                @click="submitStagedOrders('conditional')"
                :disabled="conditionalStagingOrders.length === 0"
                class="mr-2"
              >
                提交所有
              </v-btn>
              <v-btn
                color="error"
                size="small"
                prepend-icon="mdi-delete"
                @click="clearStagedOrders('conditional')"
                :disabled="conditionalStagingOrders.length === 0"
              >
                清空
              </v-btn>
            </div>
            <v-data-table
              :headers="conditionalOrderHeaders"
              :items="conditionalStagingOrders"
              :items-per-page="5"
              class="mb-6 elevation-1"
              :loading="ordersLoading"
              density="compact"
              item-value="id"
            >
              <template #[`item.direction`]="{ item }">
                <v-chip
                  :color="item.direction === 'buy' ? 'success' : 'error'"
                  text-color="white"
                  size="small"
                >
                  {{ item.direction === 'buy' ? '买入' : '卖出' }}
                </v-chip>
              </template>
              <template #[`item.actions`]="{ item }">
                <div class="d-flex justify-center">
                  <v-btn
                    color="primary"
                    size="small"
                    icon
                    variant="text"
                    class="mr-1"
                    @click="submitDraft('conditional', String(item.id))"
                  >
                    <v-icon size="small">mdi-send</v-icon>
                    <v-tooltip activator="parent" location="top"
                      >提交</v-tooltip
                    >
                  </v-btn>
                  <v-btn
                    color="error"
                    size="small"
                    icon
                    variant="text"
                    @click="removeFromStaging('conditional', String(item.id))"
                  >
                    <v-icon size="small">mdi-delete</v-icon>
                    <v-tooltip activator="parent" location="top"
                      >删除</v-tooltip
                    >
                  </v-btn>
                </div>
              </template>
              <template #no-data>
                <div class="text-center pa-3">暂无草稿条件单</div>
              </template>
            </v-data-table>

            <!-- AI推荐表格 -->
            <div class="text-subtitle-1 font-weight-bold mb-2">AI推荐</div>
            <v-data-table
              :headers="conditionalAiHeaders"
              :items="aiRecommendedConditionalOrders"
              :items-per-page="5"
              class="mb-6 elevation-1"
              density="compact"
              :loading="ordersLoading"
              item-value="id"
            >
              <template #no-data>
                <div class="text-center py-3 text-subtitle-2">
                  暂无AI推荐的条件单
                </div>
              </template>
              <template #[`item.direction`]="{ item }">
                <v-chip
                  v-if="item?.direction"
                  :color="item.direction === 'buy' ? 'success' : 'error'"
                  text-color="white"
                  size="small"
                >
                  {{ item.direction === 'buy' ? '买入' : '卖出' }}
                </v-chip>
                <span v-else>--</span>
              </template>
              <template #[`item.actions`]="{ item }">
                <v-btn
                  v-if="item"
                  icon
                  size="small"
                  color="primary"
                  @click="addToStaging('conditional', item)"
                >
                  <v-icon size="small">mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-data-table>

            <!-- 订单表单 -->
            <v-divider class="my-4"></v-divider>
            <div class="text-subtitle-1 font-weight-bold mb-4">新建条件单</div>
            <v-form
              v-model="conditionalFormValid"
              @submit.prevent="addManualOrder('conditional')"
            >
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="conditionalForm.code"
                    :items="availableCodes"
                    label="交易代码"
                    required
                    variant="outlined"
                    density="comfortable"
                    :loading="ordersLoading"
                    :disabled="ordersLoading || availableCodes.length === 0"
                    hint="选择要交易的合约代码"
                    persistent-hint
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="conditionalForm.volume"
                    label="电量 (MW)"
                    type="number"
                    required
                    variant="outlined"
                    density="comfortable"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="conditionalForm.price"
                    label="挂单价格 (元/MWh)"
                    type="number"
                    required
                    variant="outlined"
                    density="comfortable"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="conditionalForm.conditionPrice"
                    label="条件价格 (元/MWh)"
                    type="number"
                    required
                    variant="outlined"
                    density="comfortable"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-radio-group
                    v-model="conditionalForm.direction"
                    inline
                    label="交易方向"
                    required
                  >
                    <v-radio value="buy" label="买入"></v-radio>
                    <v-radio value="sell" label="卖出"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="6" class="d-flex align-center">
                  <v-btn
                    color="primary"
                    class="mr-2"
                    type="submit"
                    :disabled="!conditionalFormValid"
                  >
                    添加到暂存区
                  </v-btn>
                  <v-btn color="secondary" @click="resetForm('conditional')">
                    重置
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item>

        <!-- 市场单 Tab -->
        <v-window-item value="market">
          <v-container fluid class="pa-4">
            <!-- 已提交订单表格 -->
            <div class="text-subtitle-1 font-weight-bold mb-2">
              已提交市场单
            </div>
            <v-data-table
              :headers="marketOrderHeaders"
              :items="submittedMarketOrders"
              :items-per-page="5"
              class="mb-6 elevation-1"
              density="compact"
              :loading="ordersLoading"
              item-value="id"
            >
              <template #no-data>
                <div class="text-center py-3 text-subtitle-2">
                  暂无已提交的市场单数据
                </div>
              </template>
              <template #[`item.direction`]="{ item }">
                <v-chip
                  v-if="item?.direction"
                  :color="item.direction === 'buy' ? 'success' : 'error'"
                  text-color="white"
                  size="small"
                >
                  {{ item.direction === 'buy' ? '买入' : '卖出' }}
                </v-chip>
                <span v-else>--</span>
              </template>
              <template #[`item.status`]="{ item }">
                <v-chip
                  v-if="item?.status"
                  :color="getStatusColor(item.status)"
                  text-color="white"
                  size="small"
                >
                  {{ getStatusText(item.status) }}
                </v-chip>
                <span v-else>--</span>
              </template>
            </v-data-table>

            <!-- 暂存区表格 -->
            <div
              class="text-subtitle-1 font-weight-bold mb-2 d-flex align-center"
            >
              暂存区
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                size="small"
                prepend-icon="mdi-send"
                @click="submitStagedOrders('market')"
                :disabled="marketStagingOrders.length === 0"
                class="mr-2"
              >
                提交所有
              </v-btn>
              <v-btn
                color="error"
                size="small"
                prepend-icon="mdi-delete"
                @click="clearStagedOrders('market')"
                :disabled="marketStagingOrders.length === 0"
              >
                清空
              </v-btn>
            </div>
            <v-data-table
              :headers="marketOrderHeaders"
              :items="marketStagingOrders"
              :items-per-page="5"
              class="mb-6 elevation-1"
              :loading="ordersLoading"
              density="compact"
              item-value="id"
            >
              <template #[`item.direction`]="{ item }">
                <v-chip
                  :color="item.direction === 'buy' ? 'success' : 'error'"
                  text-color="white"
                  size="small"
                >
                  {{ item.direction === 'buy' ? '买入' : '卖出' }}
                </v-chip>
              </template>
              <template #[`item.actions`]="{ item }">
                <div class="d-flex justify-center">
                  <v-btn
                    color="primary"
                    size="small"
                    icon
                    variant="text"
                    class="mr-1"
                    @click="submitDraft('market', String(item.id))"
                  >
                    <v-icon size="small">mdi-send</v-icon>
                    <v-tooltip activator="parent" location="top"
                      >提交</v-tooltip
                    >
                  </v-btn>
                  <v-btn
                    color="error"
                    size="small"
                    icon
                    variant="text"
                    @click="removeFromStaging('market', String(item.id))"
                  >
                    <v-icon size="small">mdi-delete</v-icon>
                    <v-tooltip activator="parent" location="top"
                      >删除</v-tooltip
                    >
                  </v-btn>
                </div>
              </template>
              <template #no-data>
                <div class="text-center pa-3">暂无草稿市场单</div>
              </template>
            </v-data-table>

            <!-- AI推荐表格 -->
            <div class="text-subtitle-1 font-weight-bold mb-2">AI推荐</div>
            <v-data-table
              :headers="marketAiHeaders"
              :items="aiRecommendedMarketOrders"
              :items-per-page="5"
              class="mb-6 elevation-1"
              density="compact"
              :loading="ordersLoading"
              item-value="id"
            >
              <template #no-data>
                <div class="text-center py-3 text-subtitle-2">
                  暂无AI推荐的市场单
                </div>
              </template>
              <template #[`item.direction`]="{ item }">
                <v-chip
                  v-if="item?.direction"
                  :color="item.direction === 'buy' ? 'success' : 'error'"
                  text-color="white"
                  size="small"
                >
                  {{ item.direction === 'buy' ? '买入' : '卖出' }}
                </v-chip>
                <span v-else>--</span>
              </template>
              <template #[`item.actions`]="{ item }">
                <v-btn
                  v-if="item"
                  icon
                  size="small"
                  color="primary"
                  @click="addToStaging('market', item)"
                >
                  <v-icon size="small">mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-data-table>

            <!-- 订单表单 -->
            <v-divider class="my-4"></v-divider>
            <div class="text-subtitle-1 font-weight-bold mb-4">新建市场单</div>
            <v-form
              v-model="marketFormValid"
              @submit.prevent="addManualOrder('market')"
            >
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="marketForm.code"
                    :items="availableCodes"
                    label="交易代码"
                    required
                    variant="outlined"
                    density="comfortable"
                    :loading="ordersLoading"
                    :disabled="ordersLoading || availableCodes.length === 0"
                    hint="选择要交易的合约代码"
                    persistent-hint
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="marketForm.volume"
                    label="电量 (MW)"
                    type="number"
                    required
                    variant="outlined"
                    density="comfortable"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="marketForm.price"
                    label="挂单价格 (元/MWh)"
                    type="number"
                    required
                    variant="outlined"
                    density="comfortable"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-radio-group
                    v-model="marketForm.direction"
                    inline
                    label="交易方向"
                    required
                  >
                    <v-radio value="buy" label="买入"></v-radio>
                    <v-radio value="sell" label="卖出"></v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" sm="6" class="d-flex align-center">
                  <v-btn
                    color="primary"
                    class="mr-2"
                    type="submit"
                    :disabled="!marketFormValid"
                  >
                    添加到暂存区
                  </v-btn>
                  <v-btn color="secondary" @click="resetForm('market')">
                    重置
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-window-item>
      </v-window>
    </v-navigation-drawer>

    <!-- 通知消息提示 -->
    <v-snackbar
      v-model="toast"
      :color="toastColor"
      :timeout="3000"
      location="top"
    >
      {{ toastText }}
      <template #actions>
        <v-btn variant="text" icon="mdi-close" @click="toast = false"></v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import AIConfigPanel from '../../components/ai/AIConfigPanel.vue';
import {
  getContractCodeApi,
  getPredictPriceApi,
} from '@/service/api/trading-workbench';

// Tab 控制
const activeTab = ref('data-preparation');

// 视图模式选择
const combinedView = ref(false);

// 标记组件是否完成初始化（用于防止重复API调用）
const isInitialized = ref(false);

// 加载状态指示器
const isLoading = ref(false);

// 可用的日期列表和选中的日期选项卡
const availableDays = ref<string[]>([]);
const selectedDayTab = ref('');

// 日期选择
const today = new Date();
const formattedToday = today.toISOString().split('T')[0];
const selectedDate = ref(formattedToday);

// 代码类型选择
const codeTypes = [
  { title: '日内分时', value: 'intra_month' },
  { title: '月度分时', value: 'monthly_hourly' },
  { title: '月度市场曲线', value: 'monthly_market_curve' },
];
const selectedCodeType = ref('intra_month');

// 可用的合约代码
const availableCodes = ref<string[]>([]);
const selectedCode = ref('');

// 获取可用的合约代码
const fetchAvailableCodes = async (): Promise<void> => {
  try {
    const { data } = (await getContractCodeApi()) as any;
    availableCodes.value = data;
  } catch (error) {
    console.error('获取可用合约代码失败:', error);
    // 设置默认值，以防API调用失败
    availableCodes.value = ['M202405SY24', 'M202406SY24', 'M202407SY24'];
  }
};

// 市场深度数据
interface QuoteLevel {
  price: number;
  volume: number;
}

interface MarketQuote {
  code: string;
  timestamp?: string;
  version: string;
  bid1?: QuoteLevel;
  bid2?: QuoteLevel;
  bid3?: QuoteLevel;
  bid4?: QuoteLevel;
  bid5?: QuoteLevel;
  ask1?: QuoteLevel;
  ask2?: QuoteLevel;
  ask3?: QuoteLevel;
  ask4?: QuoteLevel;
  ask5?: QuoteLevel;
  [key: string]: any; // 添加索引签名以允许动态属性访问
}

const marketQuote = ref<MarketQuote | null>(null);
const latestPrice = ref<number | null>(null);

// K线图数据
interface CandlestickData {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickResponse {
  code: string;
  candlesticks: CandlestickData[];
}

// 价格预测数据接口
interface PriceForecast {
  code: string;
  forecasts: Array<{
    timestamp: string;
    prediction: number;
    quantile_10: number;
    quantile_25: number;
    quantile_75: number;
    quantile_90: number;
  }>;
}

const candlestickData = ref<CandlestickResponse[]>([]);
const forecastData = ref<PriceForecast[] | any>([]);
const candlestickChart = ref<HTMLElement | null>(null);
const volumeChart = ref<HTMLElement | null>(null);
let mainChart: echarts.ECharts | null = null;
let volumeBarChart: echarts.ECharts | null = null;

// Material Design 3 颜色
const md3Colors = {
  primary: '#6750A4', // 主要颜色
  surface: '#FFFBFE', // 表面颜色
  surfaceVariant: '#E7E0EC', // 表面变体
  outline: '#79747E', // 轮廓
  onSurface: '#1C1B1F', // 在表面上的颜色
  onSurfaceVariant: '#49454F', // 在表面变体上的颜色
  positive: '#03A37E', // 正向变化 (绿色)
  negative: '#CF1B1B', // 负向变化 (红色)
  shadow: 'rgba(0, 0, 0, 0.08)', // 阴影
};

// 交易聚合数据接口
interface TradeSummaryItem {
  timestamp: string;
  annual_power: number | null;
  annual_price: number | null;
  monthly_market_power: number | null;
  monthly_market_price: number | null;
  monthly_hourly_power: number | null;
  monthly_hourly_price: number | null;
  current_session_volume: number | null;
  current_session_price: number | null;
  load_forecast_p10: number | null;
  load_forecast_p50: number | null;
  load_forecast_p90: number | null;
  day_ahead_price: number | null;
  pending_order_buy_volume: number | null;
  pending_order_buy_price: number | null;
  pending_order_sell_volume: number | null;
  pending_order_sell_price: number | null;
}

interface TradeAggregateResponse {
  trades: TradeSummaryItem[];
  annual_total_volume?: number;
  annual_avg_price?: number;
  monthly_market_total_volume?: number | null;
  monthly_market_avg_price?: number | null;
  monthly_hourly_total_volume?: number;
  monthly_hourly_avg_price?: number;
  monthly_hourly_by_hour?: Array<{
    hour: number;
    volume: number;
    price: number;
  }>;
  current_session_total_volume?: number;
  current_session_avg_price?: number;
  current_session_by_day?: Array<{
    date: string;
    volume: number;
    price: number;
  }>;
  net_position_volume?: number;
  net_position_avg_price?: number;
  net_position_by_day?: Array<{
    date: string;
    volume: number;
    price: number;
  }>;
  day_ahead_price_median?: number;
  overall_electricity_price?: number;
  max_conditional_value_at_risk?: number;
  pending_order_buy_volume?: number;
  pending_order_buy_avg_price?: number;
  pending_order_sell_volume?: number;
  pending_order_sell_avg_price?: number;
  pending_order_total_volume?: number;
  ai_optimized_price?: number;
}

const tradeAggregateData = ref<TradeAggregateResponse | null>(null);

// 应用筛选器并获取数据
const applyFilters = async () => {
  isLoading.value = true;
  try {
    await fetchCandlestickData();
    await fetchTradeAggregateData();
  } finally {
    isLoading.value = false;
  }
};

// 获取价格预测数据
const getPriceForecast = async () => {
  if (!selectedCode.value) return;

  try {
    // 从所有可用代码中提取日期范围
    let minDate: Date | null = null;
    let maxDate: Date | null = null;

    // 遍历所有可用代码，找出最早和最晚的日期
    for (const code of availableCodes.value) {
      if (/D\d+H\d+/.test(code)) {
        const match = code.match(/D(\d+)H(\d+)/);
        if (match) {
          const dateStr = match[1];

          // 格式化为 YYYY-MM-DD 格式
          const year = dateStr.slice(0, 4);
          const month = dateStr.slice(4, 6);
          const day = dateStr.slice(6, 8);

          const codeDate = new Date(`${year}-${month}-${day}`);

          // 更新最小和最大日期
          if (minDate === null || codeDate < minDate) {
            minDate = codeDate;
          }

          if (maxDate === null || codeDate > maxDate) {
            maxDate = codeDate;
          }
        }
      }
    }

    // 如果找不到有效的日期范围，使用默认逻辑
    let startDate = '';
    let endDate = '';

    if (minDate && maxDate) {
      // 使用找到的最小和最大日期
      const startYear = minDate.getFullYear();
      const startMonth = String(minDate.getMonth() + 1).padStart(2, '0');
      const startDay = String(minDate.getDate()).padStart(2, '0');
      startDate = `${startYear}-${startMonth}-${startDay}`;

      const endYear = maxDate.getFullYear();
      const endMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
      const endDay = String(maxDate.getDate()).padStart(2, '0');
      endDate = `${endYear}-${endMonth}-${endDay}`;
    } else if (/D\d+H\d+/.test(selectedCode.value)) {
      // 备选：如果没有范围但当前选中的代码符合格式
      const match = selectedCode.value.match(/D(\d+)H(\d+)/);
      if (match) {
        const dateStr = match[1];

        // 格式化为 YYYY-MM-DD 格式
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4, 6);
        const day = dateStr.slice(6, 8);

        // 设置开始日期
        startDate = `${year}-${month}-${day}`;

        // 计算结束日期 (简单设置为第二天)
        const nextDay = new Date(`${year}-${month}-${day}`);
        nextDay.setDate(nextDay.getDate() + 2); // 结束日期为开始日期+2天

        // 格式化为 YYYY-MM-DD
        const endYear = nextDay.getFullYear();
        const endMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
        const endDay = String(nextDay.getDate()).padStart(2, '0');

        endDate = `${endYear}-${endMonth}-${endDay}`;
      }
    } else {
      // 如果不是标准格式，使用当前选择的日期
      startDate = selectedDate.value;

      // 结束日期为第二天+1天
      const nextDay = new Date(selectedDate.value);
      nextDay.setDate(nextDay.getDate() + 2);
      const endYear = nextDay.getFullYear();
      const endMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
      const endDay = String(nextDay.getDate()).padStart(2, '0');
      endDate = `${endYear}-${endMonth}-${endDay}`;
    }

    console.log('请求价格预测数据:', {
      code: selectedCode.value,
      start_date: startDate,
      end_date: endDate,
    });

    let forecasts = null;

    try {
      const response = getPredictPriceApi({
        start_date: startDate,
        end_date: endDate,
        percentiles: JSON.stringify([0.1, 0.25, 0.5, 0.75, 0.9]),
      });

      if (response.data) {
        console.log('收到预测数据响应:', response.data);
        console.log('响应数据类型:', typeof response.data);
        console.log(
          '响应数据结构:',
          Array.isArray(response.data) ? 'Array' : 'Object'
        );
        console.log('响应数据顶层属性:', Object.keys(response.data));

        // 处理各种可能的数据格式
        if (Array.isArray(response.data)) {
          forecasts = response.data;
        } else if (typeof response.data === 'object') {
          if (response.data.code && Array.isArray(response.data.forecasts)) {
            forecasts = [response.data];
          } else if (response.data.data && Array.isArray(response.data.data)) {
            forecasts = response.data.data;
          } else {
            forecasts = [response.data];
          }
        }
      }
    } catch (apiError) {
      console.error('API调用失败，使用模拟数据:', apiError);
    }

    console.log('最终处理的预测数据:', forecasts);
    forecastData.value = forecasts;

    // 如果图表已存在，更新
    if (mainChart) {
      renderCandlestickChart();
    }
  } catch (error) {
    console.error('获取价格预测数据失败:', error);
    forecastData.value = [];
  }
};

// 获取K线数据
const fetchCandlestickData = async (): Promise<void> => {
  try {
    const response = await api.get('/api/trades/candlestick', {
      params: {
        date: selectedDate.value,
        code_type: selectedCodeType.value,
      },
    });

    if (!response.data) {
      candlestickData.value = [];
      availableCodes.value = [];
      selectedCode.value = '';
      return;
    }

    candlestickData.value = response.data;

    // 从数据中提取可用的代码
    availableCodes.value = candlestickData.value.map((item) => item.code);

    // 如果没有选择代码或选择的代码不在列表中，选择第一个
    if (
      !selectedCode.value ||
      !availableCodes.value.includes(selectedCode.value)
    ) {
      selectedCode.value =
        availableCodes.value.length > 0 ? availableCodes.value[0] : '';
    }

    // 更新图表
    renderCandlestickChart();

    // 获取选中代码的市场深度数据和价格预测
    if (selectedCode.value) {
      fetchMarketQuote();
      getPriceForecast();
    }

    // 更新可用交易代码
    setAvailableCodesFromCandlestickData();
  } catch (error: any) {
    console.error('获取K线数据失败:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    candlestickData.value = [];
    availableCodes.value = [];
    selectedCode.value = '';
  }
};

// 获取市场深度数据
const fetchMarketQuote = async () => {
  if (!selectedCode.value) return;

  try {
    const response = await api.get('/api/trades/latest_quotes', {
      params: {
        codes: selectedCode.value,
      },
    });

    if (response.data && response.data.length > 0) {
      marketQuote.value = response.data[0];

      // 设置最新价格 (使用 close 价格或第一个有效的买/卖价格)
      const selectedCandlestick = candlestickData.value.find(
        (item) => item.code === selectedCode.value
      );
      if (selectedCandlestick && selectedCandlestick.candlesticks.length > 0) {
        latestPrice.value = selectedCandlestick.candlesticks[0].close;
      } else if (marketQuote.value?.bid1?.price) {
        latestPrice.value = marketQuote.value.bid1.price;
      } else if (marketQuote.value?.ask1?.price) {
        latestPrice.value = marketQuote.value.ask1.price;
      }
    } else {
      marketQuote.value = null;
      latestPrice.value = null;
    }
  } catch (error) {
    console.error('获取市场深度数据失败:', error);
    marketQuote.value = null;
  }
};

// 获取交易聚合数据
const fetchTradeAggregateData = async () => {
  try {
    // 从所有可用代码中提取日期范围, 与getPriceForecast使用相同的日期范围逻辑
    let minDate: Date | null = null;
    let maxDate: Date | null = null;

    // 遍历所有可用代码，找出最早和最晚的日期
    for (const code of availableCodes.value) {
      if (/D\d+H\d+/.test(code)) {
        const match = code.match(/D(\d+)H(\d+)/);
        if (match) {
          const dateStr = match[1];

          // 格式化为 YYYY-MM-DD 格式
          const year = dateStr.slice(0, 4);
          const month = dateStr.slice(4, 6);
          const day = dateStr.slice(6, 8);

          const codeDate = new Date(`${year}-${month}-${day}`);

          // 更新最小和最大日期
          if (minDate === null || codeDate < minDate) {
            minDate = codeDate;
          }

          if (maxDate === null || codeDate > maxDate) {
            maxDate = codeDate;
          }
        }
      }
    }

    // 如果找不到有效的日期范围，使用默认逻辑
    let startDate = '';
    let endDate = '';

    if (minDate && maxDate) {
      // 使用找到的最小和最大日期
      const startYear = minDate.getFullYear();
      const startMonth = String(minDate.getMonth() + 1).padStart(2, '0');
      const startDay = String(minDate.getDate()).padStart(2, '0');
      startDate = `${startYear}-${startMonth}-${startDay}`;

      const endYear = maxDate.getFullYear();
      const endMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
      const endDay = String(maxDate.getDate()).padStart(2, '0');
      endDate = `${endYear}-${endMonth}-${endDay}`;
    } else if (/D\d+H\d+/.test(selectedCode.value)) {
      // 备选：如果没有范围但当前选中的代码符合格式
      const match = selectedCode.value.match(/D(\d+)H(\d+)/);
      if (match) {
        const dateStr = match[1];

        // 格式化为 YYYY-MM-DD 格式
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4, 6);
        const day = dateStr.slice(6, 8);

        // 设置开始日期
        startDate = `${year}-${month}-${day}`;

        // 计算结束日期 (简单设置为第二天)
        const nextDay = new Date(`${year}-${month}-${day}`);
        nextDay.setDate(nextDay.getDate() + 2); // 结束日期为开始日期+2天

        // 格式化为 YYYY-MM-DD
        const endYear = nextDay.getFullYear();
        const endMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
        const endDay = String(nextDay.getDate()).padStart(2, '0');

        endDate = `${endYear}-${endMonth}-${endDay}`;
      }
    } else {
      // 如果不是标准格式，使用当前选择的日期
      startDate = selectedDate.value;

      // 结束日期为第二天+1天
      const nextDay = new Date(selectedDate.value);
      nextDay.setDate(nextDay.getDate() + 2);
      const endYear = nextDay.getFullYear();
      const endMonth = String(nextDay.getMonth() + 1).padStart(2, '0');
      const endDay = String(nextDay.getDate()).padStart(2, '0');
      endDate = `${endYear}-${endMonth}-${endDay}`;
    }

    console.log('请求交易聚合数据:', {
      start_date: startDate,
      end_date: endDate,
      user: 'longma',
    });

    const response = await api.get('/api/trades/aggregate', {
      params: {
        start_date: startDate,
        end_date: endDate,
        user: 'longma',
      },
    });

    if (response.data) {
      tradeAggregateData.value = response.data;
      console.log('交易聚合数据:', tradeAggregateData.value);
    } else {
      tradeAggregateData.value = null;
    }

    // 更新成交量图表
    renderVolumeChart();
  } catch (error) {
    console.error('获取交易聚合数据失败:', error);
    tradeAggregateData.value = null;
  }
};

// 准备图表数据
const prepareChartData = () => {
  // 准备数据
  const seriesData: Array<any> = [];
  const volumeData: Array<any> = [];
  const xAxisData: Array<string> = [];
  const originalCodes: Array<string> = [];
  const closeData: Array<number> = [];
  const dayGroups = new Map<
    string,
    {
      seriesData: Array<any>;
      volumeData: Array<any>;
      xAxisData: Array<string>;
      originalCodes: Array<string>;
      closeData: Array<number>;
    }
  >();

  candlestickData.value.forEach((item) => {
    item.candlesticks.forEach((stick) => {
      let displayCode = item.code;
      let dayCode = null;

      // 提取日期部分，如果是 D<yyyymmdd>H<HH> 格式
      if (/D\d+H\d+/.test(item.code)) {
        const match = item.code.match(/D(\d+)H(\d+)/);
        if (match) {
          const dateStr = match[1];
          const hourStr = match[2];

          // 格式化为年-月-日 小时:00 格式
          const year = dateStr.slice(0, 4);
          const month = dateStr.slice(4, 6);
          const day = dateStr.slice(6, 8);

          if (combinedView.value) {
            // 合并模式下，显示小时作为标签
            displayCode = `${hourStr}:00`;
            dayCode = `${year}-${month}-${day}`;
          } else {
            // 分开模式下，完整显示时间
            displayCode = `${year}-${month}-${day} ${hourStr}:00`;
          }
        }
      }

      // ECharts 格式的K线数据 [open, close, low, high]
      const candleData = [stick.open, stick.close, stick.low, stick.high];
      // 成交量数据
      const volume = Math.abs(stick.close - stick.open);

      // 原始代码，用于点击事件
      originalCodes.push(item.code);

      // 收盘价数据，用于绘制收盘价曲线
      closeData.push(stick.close);

      // X轴标签数据
      xAxisData.push(displayCode);

      // K线数据
      seriesData.push(candleData);

      // 成交量数据 (模拟)
      volumeData.push(volume);

      // 在合并视图下按日期分组存储
      if (combinedView.value && dayCode) {
        if (!dayGroups.has(dayCode)) {
          dayGroups.set(dayCode, {
            seriesData: [],
            volumeData: [],
            xAxisData: [],
            originalCodes: [],
            closeData: [],
          });
        }

        const group = dayGroups.get(dayCode);
        if (group) {
          group.seriesData.push(candleData);
          group.volumeData.push(volume);
          group.xAxisData.push(displayCode);
          group.originalCodes.push(item.code);
          group.closeData.push(stick.close);
        }
      }
    });
  });

  // 更新可用的日期列表
  if (combinedView.value) {
    availableDays.value = Array.from(dayGroups.keys()).sort();

    // 如果没有选择日期或选择的日期不在列表中，选择第一个
    if (
      !selectedDayTab.value ||
      !availableDays.value.includes(selectedDayTab.value)
    ) {
      selectedDayTab.value =
        availableDays.value.length > 0 ? availableDays.value[0] : '';
    }

    // 只返回当前选择的日期数据
    if (selectedDayTab.value && dayGroups.has(selectedDayTab.value)) {
      const dayData = dayGroups.get(selectedDayTab.value);
      if (dayData) {
        return {
          xAxisData: dayData.xAxisData,
          seriesData: dayData.seriesData,
          volumeData: dayData.volumeData,
          originalCodes: dayData.originalCodes,
          closeData: dayData.closeData,
        };
      }
    }
  }

  // 排序数据
  if (
    !combinedView.value &&
    xAxisData.some((label) => /\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(label))
  ) {
    // 按照日期时间排序
    const sortedIndices = xAxisData
      .map((label, index) => ({ label, index }))
      .sort((a, b) => {
        try {
          return new Date(a.label).getTime() - new Date(b.label).getTime();
        } catch {
          return a.label.localeCompare(b.label);
        }
      })
      .map((item) => item.index);

    // 使用排序后的索引重排数组
    const sortedXAxisData: string[] = [];
    const sortedSeriesData: any[] = [];
    const sortedVolumeData: any[] = [];
    const sortedOriginalCodes: string[] = [];
    const sortedCloseData: number[] = [];

    sortedIndices.forEach((index) => {
      sortedXAxisData.push(xAxisData[index]);
      sortedSeriesData.push(seriesData[index]);
      sortedVolumeData.push(volumeData[index]);
      sortedOriginalCodes.push(originalCodes[index]);
      sortedCloseData.push(closeData[index]);
    });

    return {
      xAxisData: sortedXAxisData,
      seriesData: sortedSeriesData,
      volumeData: sortedVolumeData,
      originalCodes: sortedOriginalCodes,
      closeData: sortedCloseData,
    };
  }

  return {
    xAxisData,
    seriesData,
    volumeData,
    originalCodes,
    closeData,
  };
};

// 渲染K线图
const renderCandlestickChart = () => {
  if (!candlestickChart.value) return;

  // 如果图表已经存在，先销毁
  if (mainChart) {
    mainChart.dispose();
  }

  // 初始化图表
  mainChart = echarts.init(candlestickChart.value);

  // 准备数据
  const chartData = prepareChartData();

  if (chartData.seriesData.length === 0) return;

  // 主图表选中状态
  const selectedDataIndex = chartData.originalCodes.findIndex(
    (code) => code === selectedCode.value
  );

  // 准备预测数据系列
  const forecastSeries = prepareForecastSeries(chartData);

  // 计算Y轴范围，确保包含预测数据
  const yAxisRange = calculateYAxisRange(chartData, forecastSeries);

  // 主图表选项
  const option: echarts.EChartsOption = {
    animation: true,
    color: [
      md3Colors.primary,
      md3Colors.positive,
      md3Colors.negative,
      '#E91E63',
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: md3Colors.primary,
        },
      },
      backgroundColor: '#fff',
      borderRadius: 8,
      borderWidth: 0,
      padding: [12, 16],
      textStyle: {
        color: md3Colors.onSurface,
        fontSize: 14,
      },
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffsetY: 4,
      formatter: function (params: any) {
        // 格式化tooltip内容
        const index = params[0].dataIndex;
        const candleData = params.find((p: any) => p.seriesName === '蜡烛图');
        const forecastData = params.find(
          (p: any) => p.seriesName === '价格预测'
        );
        const netAvgPriceData = params.find(
          (p: any) => p.seriesName === '净合约均价'
        );

        // 如果是预测数据
        if (forecastData && !candleData) {
          // 获取分位数的数据
          const quantile10Data = params.find(
            (p: any) =>
              p.seriesName === '90%预测区间' && p.componentSubType !== 'line'
          );
          const quantile90Data = params.find(
            (p: any) =>
              p.seriesName === '90%预测区间' && p.componentSubType === 'line'
          );

          let prediction = '';
          let quantileInfo = '';

          if (forecastData && forecastData.data) {
            let predictionValue;

            // 确保我们可以从不同格式中获取值
            if (Array.isArray(forecastData.data)) {
              predictionValue = forecastData.data[1]; // [index, value] 格式
            } else if (typeof forecastData.data === 'number') {
              predictionValue = forecastData.data;
            } else if (forecastData.value !== undefined) {
              predictionValue = forecastData.value;
            }

            prediction = `<div style="color: ${
              md3Colors.onSurfaceVariant
            }; margin-right: 12px;">预测价格:</div>
            <div style="font-weight: 500">${
              typeof predictionValue === 'number'
                ? predictionValue.toFixed(2)
                : predictionValue
            }</div>`;
          }

          // 处理分位数数据
          let q10Value, q90Value;

          if (quantile10Data && quantile90Data) {
            // 从不同格式中提取分位数值
            if (Array.isArray(quantile10Data.data)) {
              q10Value = quantile10Data.data[1];
            } else if (typeof quantile10Data.data === 'number') {
              q10Value = quantile10Data.data;
            } else if (quantile10Data.value !== undefined) {
              q10Value = quantile10Data.value;
            }

            if (Array.isArray(quantile90Data.data)) {
              q90Value = quantile90Data.data[1];
            } else if (typeof quantile90Data.data === 'number') {
              q90Value = quantile90Data.data;
            } else if (quantile90Data.value !== undefined) {
              q90Value = quantile90Data.value;
            }

            if (q10Value !== undefined && q90Value !== undefined) {
              quantileInfo = `<div style="color: ${
                md3Colors.onSurfaceVariant
              }; margin-right: 12px;">90%置信区间:</div>
              <div style="font-weight: 500">${
                typeof q10Value === 'number' ? q10Value.toFixed(2) : q10Value
              } - ${
                typeof q90Value === 'number' ? q90Value.toFixed(2) : q90Value
              }</div>`;
            }
          }

          return `
          <div style="margin-bottom: 8px; font-weight: 500; color: #FF5722">价格预测</div>
          <div style="display: grid; grid-template-columns: auto auto; gap: 4px 12px;">
            ${prediction}
            ${quantileInfo}
            <div style="color: ${md3Colors.onSurfaceVariant}; margin-right: 12px;">时间点:</div>
            <div style="font-weight: 500">${forecastData.name}</div>
          </div>
          `;
        }

        // 基础K线+净合约均价显示
        let result = `
        <div style="margin-bottom: 8px; font-weight: 500; color: ${md3Colors.primary}">交易信息</div>
        <div style="display: grid; grid-template-columns: auto auto; gap: 4px 12px;">
          <div style="color: ${md3Colors.onSurfaceVariant}; margin-right: 12px;">代码:</div>
          <div style="font-weight: 500">${chartData.originalCodes[index]}</div>`;

        // 提取日期部分，如果是 D<yyyymmdd>H<HH> 格式
        const code = chartData.originalCodes[index];
        if (/D\d+H\d+/.test(code)) {
          const match = code.match(/D(\d+)H(\d+)/);
          if (match) {
            const dateStr = match[1];

            // 格式化为年-月-日 小时:00 格式
            const year = dateStr.slice(0, 4);
            const month = dateStr.slice(4, 6);
            const day = dateStr.slice(6, 8);

            result += `
            <div style="color: ${md3Colors.onSurfaceVariant}; margin-right: 12px;">日期:</div>
            <div style="font-weight: 500">${year}-${month}-${day}</div>`;
          }
        }

        // 添加K线数据
        if (candleData) {
          result += `
          <div style="color: ${
            md3Colors.onSurfaceVariant
          }; margin-right: 12px;">开盘价:</div>
          <div style="font-weight: 500">${candleData.data[0].toFixed(2)}</div>
          <div style="color: ${
            md3Colors.onSurfaceVariant
          }; margin-right: 12px;">收盘价:</div>
          <div style="font-weight: 500">${candleData.data[1].toFixed(2)}</div>
          <div style="color: ${
            md3Colors.onSurfaceVariant
          }; margin-right: 12px;">最低价:</div>
          <div style="font-weight: 500">${candleData.data[2].toFixed(2)}</div>
          <div style="color: ${
            md3Colors.onSurfaceVariant
          }; margin-right: 12px;">最高价:</div>
          <div style="font-weight: 500">${candleData.data[3].toFixed(2)}</div>`;
        }

        // 添加净合约均价（如果有）
        if (netAvgPriceData) {
          let avgPrice;
          // 确保从正确的格式中获取值
          if (Array.isArray(netAvgPriceData.data)) {
            avgPrice = netAvgPriceData.data[1]; // [index, value] 格式
          } else if (netAvgPriceData.value !== undefined) {
            avgPrice = netAvgPriceData.value;
          }

          if (avgPrice !== null && avgPrice !== undefined) {
            result += `
            <div style="color: ${
              md3Colors.onSurfaceVariant
            }; margin-right: 12px; font-weight: bold;">净合约均价:</div>
            <div style="font-weight: 500; color: #E91E63;">${
              typeof avgPrice === 'number' ? avgPrice.toFixed(2) : '--'
            }</div>`;
          }
        }

        result += `</div>`;
        return result;
      },
    },
    // 添加主图表的图例，使其可切换
    legend: {
      data: ['蜡烛图', '收盘价', '价格预测', '净合约均价'],
      top: 0,
      textStyle: {
        color: md3Colors.onSurfaceVariant,
        fontSize: 11,
      },
      itemWidth: 12,
      itemHeight: 12,
      inactiveColor: 'rgba(0, 0, 0, 0.2)',
      selector: false,
    },
    // 网格设置 - 调整为顶部图表
    grid: {
      left: 60,
      right: 20,
      top: 40,
      bottom: 20, // 减少底部空间，因为没有了dataZoom滑块
    },
    // X轴设置
    xAxis: {
      type: 'category',
      data: chartData.xAxisData,
      show: false, // 主图隐藏x轴，让底部图表显示
      boundaryGap: true,
      axisTick: { show: false },
      axisLabel: { show: false },
      axisLine: { show: false },
      splitLine: { show: false },
    },
    // Y轴设置 - MD3风格，使用计算的范围
    yAxis: {
      scale: true,
      splitNumber: 5,
      min: yAxisRange.min,
      max: yAxisRange.max,
      name: '元/MWh',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: md3Colors.onSurfaceVariant,
      },
      axisLine: {
        lineStyle: {
          color: md3Colors.outline,
        },
      },
      axisLabel: {
        color: md3Colors.onSurfaceVariant,
        fontSize: 11,
        formatter: '{value}',
      },
      axisPointer: {
        show: true,
      },
    },
    // Series 设置 - 移除了成交量柱状图
    series: [
      // K线图 - MD3风格
      {
        name: '蜡烛图',
        type: 'candlestick',
        data: chartData.seriesData,
        itemStyle: {
          color: md3Colors.positive, // 涨 - 绿色
          color0: md3Colors.negative, // 跌 - 红色
          borderColor: md3Colors.positive,
          borderColor0: md3Colors.negative,
          borderRadius: 2, // 圆角效果
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: selectedDataIndex > -1 ? 8 : 0,
          data: [
            {
              name: 'selected-point',
              xAxis: selectedDataIndex,
              yAxis:
                selectedDataIndex > -1
                  ? chartData.seriesData[selectedDataIndex][1]
                  : 0,
              itemStyle: {
                color: md3Colors.primary,
                borderColor: '#fff',
                borderWidth: 2,
              },
            },
          ],
        },
      },
      // 收盘价曲线
      {
        name: '收盘价',
        type: 'line',
        data: chartData.closeData,
        smooth: true,
        showSymbol: false,
        symbol: 'emptyCircle',
        symbolSize: 4,
        lineStyle: {
          width: 2,
          color: md3Colors.primary,
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: selectedDataIndex > -1 ? 8 : 0,
          data: [
            {
              name: 'selected-point',
              xAxis: selectedDataIndex,
              yAxis:
                selectedDataIndex > -1
                  ? chartData.closeData[selectedDataIndex]
                  : 0,
              itemStyle: {
                color: md3Colors.primary,
                borderColor: '#fff',
                borderWidth: 2,
              },
            },
          ],
        },
      },
      // 添加预测数据系列
      ...forecastSeries,
    ],
  };

  // 设置图表选项并渲染
  mainChart.setOption(option);

  // 添加点击事件处理
  mainChart.on('click', (params) => {
    if (params.componentType === 'series') {
      const dataIndex = params.dataIndex;
      const clickedCode = chartData.originalCodes[dataIndex];

      if (selectedCode.value !== clickedCode) {
        selectedCode.value = clickedCode;
        // 触发市场深度更新
        fetchMarketQuote();
        console.log(`Chart clicked: Selected code changed to ${clickedCode}`);
      }
    }
  });

  // 添加图例选择事件处理器，用于同步显示/隐藏预测区间
  mainChart.on('legendselectchanged', (params: any) => {
    const { name, selected } = params;

    // 当价格预测的可见性变化时，调整所有相关的预测区间系列
    if (name === '价格预测') {
      // 获取当前所有系列
      const series = mainChart?.getOption().series as any[];

      // 获取预测系列的索引
      const forecastSeriesIndices = [];
      for (let i = 0; i < series.length; i++) {
        // 通过系列名称识别所有与预测相关的系列
        if (
          series[i].name === '下界基准' ||
          series[i].name === '下置信区间' ||
          series[i].name === '上置信区间' ||
          series[i].name === '90%预测区间'
        ) {
          forecastSeriesIndices.push(i);
        }
      }

      // 设置预测区间系列的可见性与价格预测相同
      const newOption = {
        series: forecastSeriesIndices.map((index) => ({
          id: index,
          silent: !selected['价格预测'],
        })),
      };

      mainChart?.setOption(newOption);
    }
  });

  // 同步更新成交量图表
  renderVolumeChart();
};

// 渲染成交量图表
const renderVolumeChart = () => {
  if (!volumeChart.value) return;

  // 如果图表已经存在，先销毁
  if (volumeBarChart) {
    volumeBarChart.dispose();
  }

  // 初始化图表
  volumeBarChart = echarts.init(volumeChart.value);

  // 准备数据
  const chartData = prepareChartData();

  if (chartData.xAxisData.length === 0) return;

  // 准备交易聚合数据
  const volumeData = prepareVolumeData(chartData);

  // 计算净合约量和净合约均价
  const netVolume = chartData.xAxisData.map((_: any, index: number) => {
    return (
      (volumeData.yearlyVolume[index] || 0) +
      (volumeData.monthlyVolume[index] || 0) +
      (volumeData.monthlyHourlyVolume[index] || 0) +
      (volumeData.currentVolume[index] || 0) +
      (volumeData.pendingOrderBuyVolume[index] || 0) +
      (volumeData.pendingOrderSellVolume[index] || 0)
    );
  });

  // 计算净合约均价
  const netAvgPrice = chartData.xAxisData.map((_: any, index: number) => {
    const totalValue =
      (volumeData.yearlyValue[index] || 0) +
      (volumeData.monthlyValue[index] || 0) +
      (volumeData.monthlyHourlyValue[index] || 0) +
      (volumeData.currentValue[index] || 0);

    const totalVolume = netVolume[index] || 0;

    // 避免除以零
    return totalVolume > 0 ? totalValue / totalVolume : null;
  });

  // 将净合约均价添加到主图表中
  if (mainChart) {
    const existingSeries = mainChart.getOption().series as any[];
    const newSeries = [...existingSeries];

    // 添加净合约均价系列
    newSeries.push({
      name: '净合约均价',
      type: 'line',
      data: netAvgPrice.map((value, index) => [index, value]),
      smooth: true,
      showSymbol: false,
      symbol: 'circle',
      symbolSize: 4,
      lineStyle: {
        width: 2.5,
        color: '#E91E63',
        type: 'dashed',
      },
      itemStyle: {
        color: '#E91E63',
      },
      z: 11,
    });

    mainChart.setOption({ series: newSeries });
  }

  // 准备负荷预测数据系列
  const loadForecastSeries: echarts.SeriesOption[] = [];

  // 只有当至少有一个有效的预测数据点时才添加预测系列
  if (volumeData.loadForecastP50.some((val) => val !== null)) {
    // 准备预测数据
    const forecastP10Data: Array<[number, number]> = [];
    const forecastP50Data: Array<[number, number]> = [];
    const forecastP90Data: Array<[number, number]> = [];

    // 格式化预测数据
    for (let i = 0; i < volumeData.loadForecastP50.length; i++) {
      const p10 = volumeData.loadForecastP10[i];
      const p50 = volumeData.loadForecastP50[i];
      const p90 = volumeData.loadForecastP90[i];

      if (p50 !== null) {
        forecastP50Data.push([i, p50]);

        // 只有当p10和p90都存在时，才添加置信区间数据
        if (p10 !== null && p90 !== null) {
          forecastP10Data.push([i, p10]);
          forecastP90Data.push([i, p90]);
        }
      }
    }

    // 只有当有足够的数据点时才添加置信区间
    if (forecastP10Data.length > 0 && forecastP90Data.length > 0) {
      // 1. 下半部分置信区间基准线（P10）
      loadForecastSeries.push({
        name: '负荷预测下界',
        type: 'line',
        data: forecastP10Data,
        lineStyle: { opacity: 0 },
        symbol: 'none',
        stack: 'loadForecastLower',
        z: 5,
      });

      // 2. 下半部分填充区域 - 从P10到P50
      loadForecastSeries.push({
        name: '负荷预测下区间',
        type: 'line',
        data: forecastP50Data.map((p50Point) => {
          const xIndex = p50Point[0];
          const p50Value = p50Point[1];
          const lowerPoint = forecastP10Data.find((p) => p[0] === xIndex);
          if (lowerPoint) {
            return [xIndex, p50Value - lowerPoint[1]];
          }
          return [xIndex, 0];
        }),
        lineStyle: { opacity: 0 },
        symbol: 'none',
        stack: 'loadForecastLower',
        areaStyle: {
          color: 'rgba(25, 118, 210, 0.2)',
        },
        z: 6,
      });

      // 3. 负荷预测线（P50）
      loadForecastSeries.push({
        name: '负荷预测',
        type: 'line',
        data: forecastP50Data,
        smooth: true,
        symbol: 'circle',
        symbolSize: 3,
        lineStyle: {
          width: 1.5,
          color: '#1976D2',
        },
        itemStyle: {
          color: '#1976D2',
          borderColor: '#fff',
          borderWidth: 1,
        },
        stack: 'loadForecastUpper',
        z: 8,
      });

      // 4. 上半部分填充区域 - 从P50到P90
      loadForecastSeries.push({
        name: '负荷预测上区间',
        type: 'line',
        data: forecastP50Data.map((p50Point) => {
          const xIndex = p50Point[0];
          const p50Value = p50Point[1];
          const upperPoint = forecastP90Data.find((p) => p[0] === xIndex);
          if (upperPoint) {
            return [xIndex, upperPoint[1] - p50Value];
          }
          return [xIndex, 0];
        }),
        lineStyle: { opacity: 0 },
        symbol: 'none',
        stack: 'loadForecastUpper',
        areaStyle: {
          color: 'rgba(25, 118, 210, 0.2)',
        },
        z: 6,
      });

      // 5. 添加上下界指示线（淡色虚线）
      loadForecastSeries.push({
        name: '负荷预测区间',
        type: 'line',
        data: forecastP90Data,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
          color: '#1976D2',
          type: 'dotted',
          opacity: 0.5,
        },
        z: 7,
      });

      loadForecastSeries.push({
        name: '负荷预测区间',
        type: 'line',
        data: forecastP10Data,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 1,
          color: '#1976D2',
          type: 'dotted',
          opacity: 0.5,
        },
        z: 7,
      });
    } else {
      // 如果没有置信区间数据，只添加预测线
      loadForecastSeries.push({
        name: '负荷预测',
        type: 'line',
        data: forecastP50Data,
        smooth: true,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 3,
        lineStyle: {
          width: 1.5,
          color: '#1976D2',
        },
        itemStyle: {
          color: '#1976D2',
          borderColor: '#fff',
          borderWidth: 1,
        },
        z: 8,
      });
    }
  }

  // 成交量图表选项
  const option: echarts.EChartsOption = {
    animation: true,
    color: [
      '#8E24AA', // 年度 - 紫色
      '#2196F3', // 月度 - 蓝色
      '#009688', // 月度小时 - 青色
      '#FF9800', // 当前交易 - 橙色
      '#4CAF50', // 待成交买入 - 绿色
      '#F44336', // 待成交卖出 - 红色
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: function (params: any) {
        let result = `<div style="font-weight: 500; margin-bottom: 4px;">${params[0].name}</div>`;
        let total = 0;

        // 从后向前遍历，保持顺序与堆叠顺序一致
        for (let i = params.length - 1; i >= 0; i--) {
          const item = params[i];
          // 跳过负荷预测相关的系列
          if (
            item.seriesName === '负荷预测' ||
            item.seriesName === '负荷预测区间' ||
            item.seriesName === '负荷预测下界' ||
            item.seriesName === '负荷预测下区间' ||
            item.seriesName === '负荷预测上区间'
          ) {
            continue;
          }

          const value = item.value || 0;
          total += value;
          const colorEl = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${item.color};"></span>`;

          result += `<div style="display:flex;justify-content:space-between;margin-top:2px;">
            <span>${colorEl}${item.seriesName}:</span>
            <span style="margin-left:20px;font-weight:500;">${value.toFixed(
              2
            )}</span>
          </div>`;
        }

        // 找到净合约量并显示
        const netVolumeItem = params.find(
          (p: any) => p.seriesName === '净合约量'
        );
        if (netVolumeItem) {
          const colorEl = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:${netVolumeItem.color};"></span>`;
          result += `<div style="display:flex;justify-content:space-between;margin-top:2px;font-weight:bold;">
            <span>${colorEl}${netVolumeItem.seriesName}:</span>
            <span style="margin-left:20px;">${netVolumeItem.value.toFixed(
              2
            )}</span>
          </div>`;
        }

        result += `<div style="margin-top:5px;border-top:1px solid #eee;padding-top:5px;font-weight:500;">
          总计: ${total.toFixed(2)}
        </div>`;

        // 负荷预测数据处理
        const forecastItem = params.find(
          (p: any) => p.seriesName === '负荷预测'
        );
        if (forecastItem && forecastItem.value !== undefined) {
          const forecastValue =
            typeof forecastItem.value === 'number'
              ? forecastItem.value
              : Array.isArray(forecastItem.value)
              ? forecastItem.value[1]
              : null;

          if (forecastValue !== null) {
            // 查找P10和P90值
            const xIndex = Array.isArray(forecastItem.value)
              ? forecastItem.value[0]
              : params[0].dataIndex;
            const p10Value = volumeData.loadForecastP10[xIndex];
            const p90Value = volumeData.loadForecastP90[xIndex];

            const colorEl = `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:#1976D2;"></span>`;
            result += `<div style="margin-top:8px;border-top:1px solid #eee;padding-top:5px;">
              <div style="display:flex;justify-content:space-between;font-weight:bold;">
                <span>${colorEl}负荷预测 (P50):</span>
                <span style="margin-left:20px;">${forecastValue.toFixed(
                  2
                )}</span>
              </div>`;

            if (p10Value !== null && p90Value !== null) {
              result += `<div style="display:flex;justify-content:space-between;color:#666;font-size:12px;margin-top:2px;">
                <span style="margin-left:15px;">置信区间 (P10-P90):</span>
                <span style="margin-left:20px;">${p10Value.toFixed(
                  2
                )} - ${p90Value.toFixed(2)}</span>
              </div>`;
            }

            result += `</div>`;
          }
        }

        return result;
      },
    },
    legend: {
      data: [
        '年度交易量',
        '月度交易量',
        '月度小时交易量',
        '当前交易量',
        '待成交买入',
        '待成交卖出',
        '净合约量',
        '负荷预测',
      ],
      top: 0, // 移至顶部
      textStyle: {
        color: md3Colors.onSurfaceVariant,
        fontSize: 11,
      },
      itemWidth: 12,
      itemHeight: 12,
      inactiveColor: 'rgba(0, 0, 0, 0.2)',
    },
    grid: {
      left: 60,
      right: 20,
      top: 30, // 保持顶部空间，为图例腾出位置
      bottom: 90, // 增加底部空间，为x轴标签留出更多空间
    },
    xAxis: {
      type: 'category',
      data: chartData.xAxisData,
      boundaryGap: true,
      axisLine: {
        lineStyle: {
          color: md3Colors.outline,
        },
      },
      axisLabel: {
        color: md3Colors.onSurfaceVariant,
        fontSize: 11,
        rotate: 45, // 保持旋转角度为更易读
        formatter: function (value: string) {
          if (value.length > 12) {
            return '{smaller|' + value + '}';
          }
          return value;
        },
        rich: {
          smaller: {
            fontSize: 9,
          },
        },
        margin: 18, // 增加标签与轴线的距离
      },
      axisTick: {
        alignWithLabel: true,
        lineStyle: {
          color: md3Colors.outline,
        },
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      name: 'MWh',
      nameLocation: 'end',
      nameGap: 15,
      nameTextStyle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: md3Colors.onSurfaceVariant,
        padding: [0, 0, 0, 0],
      },
      axisLine: {
        lineStyle: {
          color: md3Colors.outline,
        },
      },
      axisLabel: {
        color: md3Colors.onSurfaceVariant,
        fontSize: 11,
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
    },
    series: [
      {
        name: '年度交易量',
        type: 'bar',
        stack: 'volume',
        emphasis: {
          focus: 'series',
        },
        data: volumeData.yearlyVolume,
        barMaxWidth: 20,
        barGap: '10%', // 添加小间距
        itemStyle: {
          color: 'rgba(142, 36, 170, 0.3)', // 紫色透明
          borderColor: '#8E24AA',
          borderType: 'dashed',
          borderWidth: 1,
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: '月度交易量',
        type: 'bar',
        stack: 'volume',
        emphasis: {
          focus: 'series',
        },
        data: volumeData.monthlyVolume,
        barMaxWidth: 20,
        itemStyle: {
          color: 'rgba(33, 150, 243, 0.3)', // 蓝色透明
          borderColor: '#2196F3',
          borderType: 'dashed',
          borderWidth: 1,
        },
      },
      {
        name: '月度小时交易量',
        type: 'bar',
        stack: 'volume',
        emphasis: {
          focus: 'series',
        },
        data: volumeData.monthlyHourlyVolume,
        barMaxWidth: 20,
        itemStyle: {
          color: 'rgba(0, 150, 136, 0.3)', // 青色透明
          borderColor: '#009688',
          borderType: 'dashed',
          borderWidth: 1,
        },
      },
      {
        name: '当前交易量',
        type: 'bar',
        stack: 'volume',
        emphasis: {
          focus: 'series',
        },
        data: volumeData.currentVolume,
        barMaxWidth: 20,
        itemStyle: {
          color: 'rgba(255, 152, 0, 0.3)', // 橙色透明
          borderColor: '#FF9800',
          borderType: 'dashed',
          borderWidth: 1,
        },
      },
      {
        name: '待成交买入',
        type: 'bar',
        stack: 'volume',
        emphasis: {
          focus: 'series',
        },
        data: volumeData.pendingOrderBuyVolume,
        barMaxWidth: 20,
        itemStyle: {
          color: 'rgba(76, 175, 80, 0.3)', // 绿色透明
          borderColor: '#4CAF50',
          borderType: 'dashed',
          borderWidth: 1,
        },
      },
      {
        name: '待成交卖出',
        type: 'bar',
        stack: 'volume',
        emphasis: {
          focus: 'series',
        },
        data: volumeData.pendingOrderSellVolume,
        barMaxWidth: 20,
        itemStyle: {
          color: 'rgba(244, 67, 54, 0.3)', // 红色透明
          borderColor: '#F44336',
          borderType: 'dashed',
          borderWidth: 1,
        },
      },
      {
        name: '净合约量',
        type: 'bar',
        // 移除 stack: 'netVolume' 使其不堆叠
        emphasis: {
          focus: 'series',
        },
        data: netVolume,
        barMaxWidth: 20, // 与其他柱状图宽度一致
        barGap: '10%', // 确保与堆叠的柱间有适当间距
        z: 10, // 保持高z-index确保在前景
        itemStyle: {
          color: 'rgba(233, 30, 99, 0.6)', // 粉色半透明
          borderColor: '#E91E63',
          borderWidth: 1,
          borderRadius: [2, 2, 0, 0],
        },
      },
      // 添加负荷预测系列
      ...loadForecastSeries,
    ],
  };

  // 设置图表选项并渲染
  volumeBarChart.setOption(option);

  // 添加交互事件
  volumeBarChart.on('click', (params) => {
    if (params.componentType === 'series') {
      const dataIndex = params.dataIndex;
      const clickedCode = chartData.originalCodes[dataIndex];

      if (selectedCode.value !== clickedCode) {
        selectedCode.value = clickedCode;
      }
    }
  });

  // 添加与主图表的联动
  if (mainChart) {
    // 内部缩放仍然保留同步
    mainChart.on('datazoom', (params: any) => {
      volumeBarChart?.dispatchAction({
        type: 'dataZoom',
        start: params.start,
        end: params.end,
      });
    });

    volumeBarChart.on('datazoom', (params: any) => {
      mainChart?.dispatchAction({
        type: 'dataZoom',
        start: params.start,
        end: params.end,
      });
    });
  }
};

// 准备成交量数据
const prepareVolumeData = (chartData: any) => {
  const yearlyVolume: number[] = Array(chartData.xAxisData.length).fill(0);
  const monthlyVolume: number[] = Array(chartData.xAxisData.length).fill(0);
  const monthlyHourlyVolume: number[] = Array(chartData.xAxisData.length).fill(
    0
  );
  const currentVolume: number[] = Array(chartData.xAxisData.length).fill(0);
  // 添加待成交订单数据数组
  const pendingOrderBuyVolume: number[] = Array(
    chartData.xAxisData.length
  ).fill(0);
  const pendingOrderSellVolume: number[] = Array(
    chartData.xAxisData.length
  ).fill(0);

  // 添加价格数据数组
  const yearlyValue: number[] = Array(chartData.xAxisData.length).fill(0);
  const monthlyValue: number[] = Array(chartData.xAxisData.length).fill(0);
  const monthlyHourlyValue: number[] = Array(chartData.xAxisData.length).fill(
    0
  );
  const currentValue: number[] = Array(chartData.xAxisData.length).fill(0);

  // 添加负荷预测数据数组 - 使用可空类型
  const loadForecastP10: (number | null)[] = Array(
    chartData.xAxisData.length
  ).fill(null);
  const loadForecastP50: (number | null)[] = Array(
    chartData.xAxisData.length
  ).fill(null);
  const loadForecastP90: (number | null)[] = Array(
    chartData.xAxisData.length
  ).fill(null);

  // 如果没有交易聚合数据，使用模拟数据或者从K线数据中生成
  if (
    !tradeAggregateData.value ||
    !tradeAggregateData.value.trades ||
    tradeAggregateData.value.trades.length === 0
  ) {
    // 使用K线数据的模拟数据
    console.log('没有交易聚合数据，使用K线数据的模拟数据');
    return {
      yearlyVolume,
      monthlyVolume,
      monthlyHourlyVolume,
      currentVolume,
      pendingOrderBuyVolume,
      pendingOrderSellVolume,
      yearlyValue,
      monthlyValue,
      monthlyHourlyValue,
      currentValue,
      loadForecastP10,
      loadForecastP50,
      loadForecastP90,
    };
  }

  // 从API数据中提取成交量数据
  console.log('tradeAggregateData.value', tradeAggregateData.value);
  console.log('chartData', chartData);
  for (const index in chartData.xAxisData) {
    const i = parseInt(index);
    const code = chartData.originalCodes[i];
    let timePoint: Date | null = null;

    // 尝试从代码中提取日期时间
    if (code && /D\d+H\d+/.test(code)) {
      const match = code.match(/D(\d+)H(\d+)/);
      if (match) {
        const dateStr = match[1];
        const hourStr = match[2];

        // 格式化为日期时间
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4, 6);
        const day = dateStr.slice(6, 8);

        timePoint = new Date(
          `${year}-${month}-${day}T${hourStr.padStart(2, '0')}:00:00`
        );
      }
    }

    // 寻找匹配的时间点
    if (timePoint) {
      // 查找最接近的时间点
      const matchingItem = tradeAggregateData.value.trades.find((item) => {
        const itemTime = new Date(item.timestamp);
        return Math.abs(itemTime.getTime() - timePoint!.getTime()) < 3600000; // 1小时内
      });

      if (matchingItem) {
        // 成交量数据
        yearlyVolume[i] = matchingItem.annual_power || 0;
        monthlyVolume[i] = matchingItem.monthly_market_power || 0;
        monthlyHourlyVolume[i] = matchingItem.monthly_hourly_power || 0;
        currentVolume[i] = matchingItem.current_session_volume || 0;
        // 添加待成交订单数据
        pendingOrderBuyVolume[i] = matchingItem.pending_order_buy_volume || 0;
        pendingOrderSellVolume[i] = matchingItem.pending_order_sell_volume || 0;

        // 价格数据 - 成交量 * 均价
        yearlyValue[i] =
          (matchingItem.annual_power || 0) * (matchingItem.annual_price || 0);
        monthlyValue[i] =
          (matchingItem.monthly_market_power || 0) *
          (matchingItem.monthly_market_price || 0);
        monthlyHourlyValue[i] =
          (matchingItem.monthly_hourly_power || 0) *
          (matchingItem.monthly_hourly_price || 0);
        currentValue[i] =
          (matchingItem.current_session_volume || 0) *
          (matchingItem.current_session_price || 0);

        // 负荷预测数据
        loadForecastP10[i] = matchingItem.load_forecast_p10 || null;
        loadForecastP50[i] = matchingItem.load_forecast_p50 || null;
        loadForecastP90[i] = matchingItem.load_forecast_p90 || null;
      }
    }
  }

  console.log('yearlyVolume', yearlyVolume);
  console.log('monthlyVolume', monthlyVolume);
  console.log('monthlyHourlyVolume', monthlyHourlyVolume);
  console.log('currentVolume', currentVolume);
  console.log('pendingOrderBuyVolume', pendingOrderBuyVolume);
  console.log('pendingOrderSellVolume', pendingOrderSellVolume);
  console.log('loadForecastP50', loadForecastP50);

  return {
    yearlyVolume,
    monthlyVolume,
    monthlyHourlyVolume,
    currentVolume,
    pendingOrderBuyVolume,
    pendingOrderSellVolume,
    yearlyValue,
    monthlyValue,
    monthlyHourlyValue,
    currentValue,
    loadForecastP10,
    loadForecastP50,
    loadForecastP90,
  };
};

// 计算Y轴范围，确保包含所有数据点和预测数据
const calculateYAxisRange = (chartData: any, forecastSeries: any[]) => {
  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  // 处理K线数据
  if (chartData.seriesData && chartData.seriesData.length > 0) {
    chartData.seriesData.forEach((item: any) => {
      if (item && item.length >= 4) {
        min = Math.min(min, item[2]); // 最低价
        max = Math.max(max, item[3]); // 最高价
      }
    });
  }

  // 处理预测数据和置信区间
  forecastSeries.forEach((series: any) => {
    if (series.data && series.data.length > 0) {
      series.data.forEach((point: any) => {
        if (Array.isArray(point) && point.length >= 2) {
          const value = point[1];
          if (typeof value === 'number') {
            min = Math.min(min, value);
            max = Math.max(max, value);
          }
        }
      });
    }
  });

  // 如果没有找到有效的最小/最大值，使用默认值
  if (min === Number.MAX_VALUE || max === Number.MIN_VALUE) {
    return { min: undefined, max: undefined };
  }

  // 添加一些边距
  const range = max - min;
  min = min - range * 0.1;
  max = max + range * 0.1;

  return { min, max };
};

// 准备预测数据系列
const prepareForecastSeries = (chartData: any) => {
  if (
    !forecastData.value ||
    !Array.isArray(forecastData.value) ||
    forecastData.value.length === 0
  ) {
    return [];
  }

  const series: echarts.SeriesOption[] = [];

  // 预测数据点 - 中位数 (0.5)
  const predictionData: Array<any> = [];
  // 10% 置信区间下限
  const quantile10Data: Array<any> = [];
  // 90% 置信区间上限
  const quantile90Data: Array<any> = [];

  // X轴标签映射 - 用于匹配日期时间和X轴位置
  const dateIndexMap = new Map<string, number>();

  // 创建日期到X轴索引的映射
  chartData.xAxisData.forEach((label: string, index: number) => {
    // 提取代码中的日期部分(如果有)
    const code = chartData.originalCodes[index];
    let dateKey = label; // 默认使用标签

    // 如果是 D<yyyymmdd>H<HH> 格式,提取日期
    if (code && /D\d+H\d+/.test(code)) {
      const match = code.match(/D(\d+)H(\d+)/);
      if (match) {
        const dateStr = match[1];
        const hourStr = match[2];

        // 格式化为 yyyy-MM-dd HH:00 格式(与预测数据相似)
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4, 6);
        const day = dateStr.slice(6, 8);

        dateKey = `${year}-${month}-${day}T${hourStr.padStart(2, '0')}:00:00`;
      }
    }

    dateIndexMap.set(dateKey, index);
  });

  // 处理数据格式 - 直接包含percentiles对象的扁平数组
  forecastData.value.forEach(
    (point: {
      timestamp: string;
      version: string;
      percentiles: {
        '0.1': number;
        '0.25': number;
        '0.5': number;
        '0.75': number;
        '0.9': number;
        [key: string]: number;
      };
    }) => {
      const timestamp = point.timestamp;
      let xIndex = dateIndexMap.get(timestamp);

      // 尝试不同的格式匹配
      if (xIndex === undefined) {
        // 尝试匹配日期部分
        const datePart = timestamp.split('T')[0];
        for (const [key, index] of dateIndexMap.entries()) {
          if (key.includes(datePart)) {
            xIndex = index;
            break;
          }
        }
      }

      // 如果找到匹配的X轴索引
      if (xIndex !== undefined) {
        // 检查是否有百分位数据
        if (point.percentiles) {
          // 预测值 (中位数 - 0.5分位)
          if (point.percentiles['0.5'] !== undefined) {
            predictionData.push([xIndex, point.percentiles['0.5']]);
          }

          // 10%分位
          if (point.percentiles['0.1'] !== undefined) {
            quantile10Data.push([xIndex, point.percentiles['0.1']]);
          }

          // 90%分位
          if (point.percentiles['0.9'] !== undefined) {
            quantile90Data.push([xIndex, point.percentiles['0.9']]);
          }
        }
      }
    }
  );

  // 添加置信区间
  if (quantile10Data.length > 0 && quantile90Data.length > 0) {
    // 类似于示例的堆叠方法实现

    // 1. 下半部分置信区间基准线（10%分位数）- 底部线
    series.push({
      name: '下界基准',
      type: 'line',
      data: quantile10Data,
      lineStyle: { opacity: 0 },
      symbol: 'none',
      stack: 'confidenceLower',
      z: 7,
      // 将这些系列与价格预测关联，实现同步显示/隐藏
      legendHoverLink: true,
    });

    // 2. 下半部分填充区域 - 从10%分位到预测值
    series.push({
      name: '下置信区间',
      type: 'line',
      data: predictionData.map((predPoint) => {
        const xIndex = predPoint[0];
        const predValue = predPoint[1];
        // 找对应的下界点
        const lowerPoint = quantile10Data.find((p) => p[0] === xIndex);
        if (lowerPoint) {
          return [xIndex, predValue - lowerPoint[1]];
        }
        return [xIndex, 0];
      }),
      lineStyle: { opacity: 0 },
      symbol: 'none',
      stack: 'confidenceLower',
      areaStyle: {
        color: 'rgba(255, 152, 0, 0.3)',
      },
      z: 8,
      // 将这些系列与价格预测关联，实现同步显示/隐藏
      legendHoverLink: true,
    });

    // 3. 预测线 - 主线
    series.push({
      name: '价格预测',
      type: 'line',
      data: predictionData,
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        color: '#FF5722',
        borderColor: '#fff',
        borderWidth: 2,
      },
      lineStyle: {
        width: 2.5,
        color: '#FF5722',
      },
      stack: 'confidenceUpper', // 作为上半部分的基准
      z: 10,
    });

    // 4. 上半部分填充区域 - 从预测值到90%分位
    series.push({
      name: '上置信区间',
      type: 'line',
      data: predictionData.map((predPoint) => {
        const xIndex = predPoint[0];
        const predValue = predPoint[1];
        // 找对应的上界点
        const upperPoint = quantile90Data.find((p) => p[0] === xIndex);
        if (upperPoint) {
          return [xIndex, upperPoint[1] - predValue];
        }
        return [xIndex, 0];
      }),
      lineStyle: { opacity: 0 },
      symbol: 'none',
      stack: 'confidenceUpper',
      areaStyle: {
        color: 'rgba(255, 152, 0, 0.3)',
      },
      z: 8,
      // 将这些系列与价格预测关联，实现同步显示/隐藏
      legendHoverLink: true,
    });

    // 添加上下界指示线（虚线）
    series.push({
      name: '90%预测区间',
      type: 'line',
      data: quantile90Data,
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1,
        color: '#FF9800',
        type: 'dotted',
      },
      z: 9,
      // 将这些系列与价格预测关联，实现同步显示/隐藏
      legendHoverLink: true,
    });

    series.push({
      name: '90%预测区间',
      type: 'line',
      data: quantile10Data,
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1,
        color: '#FF9800',
        type: 'dotted',
      },
      z: 9,
      // 将这些系列与价格预测关联，实现同步显示/隐藏
      legendHoverLink: true,
    });
  } else if (predictionData.length > 0) {
    // 如果没有置信区间数据，只添加预测线
    series.push({
      name: '价格预测',
      type: 'line',
      data: predictionData,
      smooth: true,
      showSymbol: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: {
        width: 2.5,
        color: '#FF5722', // 突出显示预测线
        type: 'dashed',
      },
      itemStyle: {
        color: '#FF5722',
        borderColor: '#fff',
        borderWidth: 2,
      },
      z: 10, // 确保预测线在最上层
    });
  }

  return series;
};

// 格式化价格和数量
const formatPrice = (price?: number) => {
  if (price === undefined || price === null) return '--';
  return price.toFixed(2);
};

const formatVolume = (volume?: number) => {
  if (volume === undefined || volume === null) return '--';
  return volume.toFixed(0);
};

// 计算成交量条形图宽度
const calculateVolumeWidth = (volume: number, type: 'bid' | 'ask') => {
  if (!volume || volume <= 0) return '0%';

  // 获取所有卖出或买入量
  let maxVolume = 0;
  if (marketQuote.value) {
    if (type === 'ask') {
      for (let i = 1; i <= 5; i++) {
        const vol = marketQuote.value[`bid${6 - i}`]?.volume || 0;
        maxVolume = Math.max(maxVolume, vol);
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        const vol = marketQuote.value[`ask${i}`]?.volume || 0;
        maxVolume = Math.max(maxVolume, vol);
      }
    }
  }

  // 防止除以零
  if (maxVolume === 0) return '0%';

  // 计算相对宽度，最大为85%（在紧凑视图中可以稍微增加宽度）
  return `${Math.min(85, (volume / maxVolume) * 85)}%`;
};

// 订单状态相关的辅助函数
const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    draft: 'grey',
    pending: 'warning',
    active: 'primary',
    filled: 'success',
    rejected: 'error',
    expired: 'grey-darken-1',
    canceled: 'grey-darken-2',
    ai: 'info',
  };
  return statusMap[status] || 'grey';
};

const getStatusText = (status: string): string => {
  const statusMap: Record<string, string> = {
    draft: '草稿',
    pending: '待确认',
    active: '活跃',
    filled: '已成交',
    rejected: '已拒绝',
    expired: '已过期',
    canceled: '已取消',
    ai: 'AI推荐',
  };
  return statusMap[status] || status;
};

// 监听数据变化
watch(
  [selectedDate, selectedCodeType],
  () => {
    if (isInitialized.value) {
      // 自动触发API调用当日期或代码类型变化时
      isLoading.value = true;
      applyFilters().finally(() => {
        isLoading.value = false;
      });
    }
  },
  { flush: 'post' }
);

watch(
  selectedCode,
  () => {
    // 获取市场深度数据和价格预测
    fetchMarketQuote();
    getPriceForecast();

    // 如果图表已存在，更新选中状态
    if (mainChart) {
      renderCandlestickChart();
    }
  },
  { flush: 'post' }
);

// 监听合并视图和日期切换
watch(
  [combinedView, selectedDayTab],
  () => {
    renderCandlestickChart();
  },
  { flush: 'post' }
);

// 监听窗口大小变化
window.addEventListener('resize', () => {
  if (mainChart) {
    mainChart.resize();
  }
  if (volumeBarChart) {
    volumeBarChart.resize();
  }
});

// 组件挂载时加载数据
onMounted(async () => {
  // 初始加载数据
  applyFilters();
  // 获取订单数据
  await fetchOrders();

  // 设置初始化完成标志
  isInitialized.value = true;
});

// 组件卸载前清理
onBeforeUnmount(() => {
  if (mainChart) {
    mainChart.dispose();
  }
  if (volumeBarChart) {
    volumeBarChart.dispose();
  }
  window.removeEventListener('resize', () => {});
});

// 下单抽屉相关
const orderDrawer = ref(false);
const activeOrderTab = ref('conditional');

// 表单接口
interface ConditionalFormModel {
  code: string;
  volume: number | null;
  price: number | null;
  conditionPrice: number | null;
  direction: string;
}

interface MarketFormModel {
  code: string;
  volume: number | null;
  price: number | null;
  direction: string;
}

// 表头接口
type HeaderItem = {
  title: string;
  key: string;
  align: 'start' | 'center' | 'end';
  sortable?: boolean;
};

// 条件单表单
const conditionalFormValid = ref(false);
const conditionalForm = ref<ConditionalFormModel>({
  code: '',
  volume: null,
  price: null,
  conditionPrice: null,
  direction: 'buy',
});

// 市场单表单
const marketFormValid = ref(false);
const marketForm = ref<MarketFormModel>({
  code: '',
  volume: null,
  price: null,
  direction: 'buy',
});

// 定义订单类型接口
interface BaseOrder {
  id: number;
  code: string;
  volume: number;
  price: number;
  direction: string;
}

interface ConditionalOrder extends BaseOrder {
  conditionPrice: number;
}

interface SubmittedOrder extends BaseOrder {
  createdAt: string;
  status: string;
}

interface SubmittedConditionalOrder extends ConditionalOrder, SubmittedOrder {}

interface AiRecommendedOrder extends BaseOrder {
  probability: number;
}

interface AiRecommendedConditionalOrder extends ConditionalOrder {
  probability: number;
}

// 条件单数据
const submittedConditionalOrders = ref<SubmittedConditionalOrder[]>([]);
const conditionalStagingOrders = ref<ConditionalOrder[]>([]);
const aiRecommendedConditionalOrders = ref<AiRecommendedConditionalOrder[]>([]);

// 市场单数据
const submittedMarketOrders = ref<SubmittedOrder[]>([]);
const marketStagingOrders = ref<BaseOrder[]>([]);
const aiRecommendedMarketOrders = ref<AiRecommendedOrder[]>([]);

// 表格表头
const conditionalOrderHeaders = ref<HeaderItem[]>([
  { title: '代码', key: 'code', align: 'start', sortable: true },
  { title: '方向', key: 'direction', align: 'center', sortable: true },
  { title: '数量', key: 'volume', align: 'end', sortable: true },
  { title: '价格', key: 'price', align: 'end', sortable: true },
  { title: '条件价格', key: 'conditionPrice', align: 'end', sortable: true },
  { title: '状态', key: 'status', align: 'center', sortable: true },
  { title: '创建时间', key: 'createdAt', align: 'start', sortable: true },
  { title: '操作', key: 'actions', align: 'center', sortable: false },
]);

const conditionalAiHeaders = ref<HeaderItem[]>([
  { title: '代码', key: 'code', align: 'start', sortable: true },
  { title: '方向', key: 'direction', align: 'center', sortable: true },
  { title: '数量', key: 'volume', align: 'end', sortable: true },
  { title: '价格', key: 'price', align: 'end', sortable: true },
  { title: '条件价格', key: 'conditionPrice', align: 'end', sortable: true },
  { title: '概率', key: 'probability', align: 'end', sortable: true },
  { title: '操作', key: 'actions', align: 'center', sortable: false },
]);

const marketOrderHeaders = ref<HeaderItem[]>([
  { title: '代码', key: 'code', align: 'start', sortable: true },
  { title: '方向', key: 'direction', align: 'center', sortable: true },
  { title: '数量', key: 'volume', align: 'end', sortable: true },
  { title: '价格', key: 'price', align: 'end', sortable: true },
  { title: '状态', key: 'status', align: 'center', sortable: true },
  { title: '创建时间', key: 'createdAt', align: 'start', sortable: true },
  { title: '操作', key: 'actions', align: 'center', sortable: false },
]);

const marketAiHeaders = ref<HeaderItem[]>([
  { title: '代码', key: 'code', align: 'start', sortable: true },
  { title: '方向', key: 'direction', align: 'center', sortable: true },
  { title: '数量', key: 'volume', align: 'end', sortable: true },
  { title: '价格', key: 'price', align: 'end', sortable: true },
  { title: '概率', key: 'probability', align: 'end', sortable: true },
  { title: '操作', key: 'actions', align: 'center', sortable: false },
]);

// 添加一个工具函数，从交易代码中提取时间戳
const extractTimestampFromCode = (code: string): string | null => {
  // 匹配 D<yyyymmdd>H<HH> 格式
  const match = code.match(/D(\d{4})(\d{2})(\d{2})H(\d{2})/);
  if (match) {
    const [, year, month, day, hour] = match;
    return `${year}-${month}-${day}T${hour}:00:00`;
  }
  return null;
};

// 修改 addToStaging 函数，添加 timestamp 字段
const addToStaging = async (
  type: 'conditional' | 'market',
  order: AiRecommendedOrder | AiRecommendedConditionalOrder
): Promise<void> => {
  try {
    // 除去概率字段，准备保存为草稿
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { probability, ...orderData } = order;

    // 处理方向 - 将direction转换为volume的正负值
    const volume =
      order.direction === 'sell'
        ? -Math.abs(order.volume)
        : Math.abs(order.volume);

    // 从交易代码中提取时间戳
    const timestamp = extractTimestampFromCode(order.code);

    // 准备API所需的数据格式
    const payload: Record<string, any> = {
      code: order.code,
      volume: volume,
      price: order.price,
      type: type === 'conditional' ? 'conditional' : 'ticket',
      status: 'draft',
      user: 'longma',
    };

    // 添加时间戳（如果提取成功）
    if (timestamp) {
      payload.timestamp = timestamp;
    }

    // 如果是条件单，添加条件价格
    if (type === 'conditional' && 'conditionPrice' in order) {
      payload.condition_price = order.conditionPrice;
    }

    console.log('Adding to staging with payload:', payload);

    // 调用API创建草稿订单
    await api.post('/api/trades/orders', payload);

    // 重新获取订单数据
    await fetchOrders();

    // 显示通知消息
    toast.value = true;
    toastText.value = `已添加到${
      type === 'conditional' ? '条件单' : '市场单'
    }暂存区`;
    toastColor.value = 'success';
  } catch (error) {
    console.error('添加到暂存区失败:', error);
    toast.value = true;
    toastText.value = '添加到暂存区失败';
    toastColor.value = 'error';
  }
};

const removeFromStaging = async (
  type: 'conditional' | 'market',
  orderId: string
): Promise<void> => {
  try {
    // 调用API删除草稿订单
    await api.delete(`/api/trades/orders/${orderId}`);

    // 重新获取订单数据
    await fetchOrders();

    // 显示通知消息
    toast.value = true;
    toastText.value = `已从${
      type === 'conditional' ? '条件单' : '市场单'
    }暂存区移除`;
    toastColor.value = 'success';
  } catch (error) {
    console.error('从暂存区移除失败:', error);
    toast.value = true;
    toastText.value = '从暂存区移除失败';
    toastColor.value = 'error';
  }
};

// 修改 addManualOrder 函数，添加 timestamp 字段
const addManualOrder = async (
  type: 'conditional' | 'market'
): Promise<void> => {
  try {
    // 获取表单数据
    const formData =
      type === 'conditional' ? conditionalForm.value : marketForm.value;

    // 处理方向 - 将direction转换为volume的正负值
    const volume =
      formData.direction === 'sell'
        ? -Math.abs(Number(formData.volume))
        : Math.abs(Number(formData.volume));

    // 从交易代码中提取时间戳
    const timestamp = extractTimestampFromCode(formData.code);

    // 创建基础订单数据
    const payload: Record<string, any> = {
      type: type === 'conditional' ? 'conditional' : 'ticket',
      status: 'draft',
      code: formData.code,
      volume: volume,
      price: Number(formData.price),
      user: 'longma',
    };

    // 添加时间戳（如果提取成功）
    if (timestamp) {
      payload.timestamp = timestamp;
    }

    // 条件单额外添加条件价格
    if (type === 'conditional' && 'conditionPrice' in formData) {
      payload.condition_price = Number(formData.conditionPrice);
    }

    console.log('Adding manual order with payload:', payload);

    // 调用API创建草稿订单
    await api.post('/api/trades/orders', payload);

    // 重新获取订单数据
    await fetchOrders();

    // 重置表单
    resetForm(type);

    // 显示通知消息
    toast.value = true;
    toastText.value = `已添加到${
      type === 'conditional' ? '条件单' : '市场单'
    }暂存区`;
    toastColor.value = 'success';
  } catch (error) {
    console.error('添加手动订单失败:', error);
    toast.value = true;
    toastText.value = '添加手动订单失败';
    toastColor.value = 'error';
  }
};

const submitStagedOrders = async (
  type: 'conditional' | 'market'
): Promise<void> => {
  try {
    // 获取待提交的订单ID列表
    const orderIds =
      type === 'conditional'
        ? conditionalStagingOrders.value.map((order) => order.id)
        : marketStagingOrders.value.map((order) => order.id);

    // 如果没有订单，则返回
    if (orderIds.length === 0) {
      toast.value = true;
      toastText.value = '暂存区没有订单可提交';
      toastColor.value = 'warning';
      return;
    }

    // 批量更新订单状态为pending
    await api.put('/api/trades/orders/bulk-status', {
      ids: orderIds,
      status: 'pending',
    });

    // 重新获取订单数据
    await fetchOrders();

    // 显示通知消息
    toast.value = true;
    toastText.value = `${type === 'conditional' ? '条件单' : '市场单'}已提交`;
    toastColor.value = 'success';
  } catch (error) {
    console.error('提交订单失败:', error);
    toast.value = true;
    toastText.value = '提交订单失败';
    toastColor.value = 'error';
  }
};

const clearStagedOrders = async (
  type: 'conditional' | 'market'
): Promise<void> => {
  try {
    // 获取待删除的订单ID列表
    const orderIds =
      type === 'conditional'
        ? conditionalStagingOrders.value.map((order) => order.id)
        : marketStagingOrders.value.map((order) => order.id);

    // 如果没有订单，则返回
    if (orderIds.length === 0) {
      toast.value = true;
      toastText.value = '暂存区已经是空的';
      toastColor.value = 'info';
      return;
    }

    // 批量删除订单
    await api.delete('/api/trades/orders/bulk', {
      data: { ids: orderIds },
    });

    // 重新获取订单数据
    await fetchOrders();

    // 显示通知消息
    toast.value = true;
    toastText.value = `${
      type === 'conditional' ? '条件单' : '市场单'
    }暂存区已清空`;
    toastColor.value = 'info';
  } catch (error) {
    console.error('清空暂存区失败:', error);
    toast.value = true;
    toastText.value = '清空暂存区失败';
    toastColor.value = 'error';
  }
};

const resetForm = (type: 'conditional' | 'market'): void => {
  if (type === 'conditional') {
    conditionalForm.value = {
      code: '',
      volume: null,
      price: null,
      conditionPrice: null,
      direction: 'buy',
    };
  } else {
    marketForm.value = {
      code: '',
      volume: null,
      price: null,
      direction: 'buy',
    };
  }
};

// 通知消息
const toast = ref<boolean>(false);
const toastText = ref<string>('');
const toastColor = ref<string>('');

// 数据加载状态
const ordersLoading = ref<boolean>(false);

// 定义API响应的订单类型
interface ApiOrder {
  id: number;
  code: string;
  volume: number;
  price: number;
  condition_price?: number;
  status: string;
  createtime: string;
  probability?: number;
  [key: string]: any; // 允许其他字段
}

// 添加API服务函数来获取订单数据
const fetchOrders = async (): Promise<void> => {
  try {
    // 设置加载状态
    ordersLoading.value = true;

    // 1. 获取所有条件单数据（只调用一次API）
    const { data: conditionalOrdersResponse } = await api.get(
      '/api/trades/orders',
      {
        params: {
          type: 'conditional',
        },
      }
    );

    // 确保我们有正确的数据结构
    const conditionalOrders = conditionalOrdersResponse?.orders || [];

    // 转换API响应数据为组件所需格式
    const transformedConditionalOrders = conditionalOrders.map(
      (order: ApiOrder) => {
        // 处理方向 - API中volume为负表示卖出，为正表示买入
        const direction = order.volume < 0 ? 'sell' : 'buy';
        // 确保volume始终为正数
        const volume = Math.abs(order.volume);

        return {
          id: order.id,
          code: order.code,
          volume: volume,
          price: order.price,
          conditionPrice: order.condition_price, // 转换snake_case为camelCase
          direction: direction,
          status: order.status,
          createdAt: new Date(order.createtime).toLocaleString(),
          probability: order.probability || 0.8, // 如果有概率字段则使用，否则默认值
        };
      }
    );

    console.log(
      'Transformed conditional orders:',
      transformedConditionalOrders
    );

    // 根据状态分类条件单
    if (Array.isArray(transformedConditionalOrders)) {
      // 已提交的条件单（状态为pending或active或filled等）
      submittedConditionalOrders.value = transformedConditionalOrders.filter(
        (order) =>
          ['pending', 'active', 'filled', 'rejected', 'expired'].includes(
            order.status
          )
      );

      // 条件单暂存区数据（状态为draft）
      conditionalStagingOrders.value = transformedConditionalOrders.filter(
        (order) => order.status === 'draft'
      );

      // AI推荐的条件单（状态为ai）
      aiRecommendedConditionalOrders.value =
        transformedConditionalOrders.filter((order) => order.status === 'ai');
    }

    // 2. 获取所有市场单数据（只调用一次API）
    const { data: marketOrdersResponse } = await api.get('/api/trades/orders', {
      params: {
        type: 'ticket',
      },
    });

    // 确保我们有正确的数据结构
    const marketOrders = marketOrdersResponse?.orders || [];

    // 转换API响应数据为组件所需格式
    const transformedMarketOrders = marketOrders.map((order: ApiOrder) => {
      // 处理方向 - API中volume为负表示卖出，为正表示买入
      const direction = order.volume < 0 ? 'sell' : 'buy';
      // 确保volume始终为正数
      const volume = Math.abs(order.volume);

      return {
        id: order.id,
        code: order.code,
        volume: volume,
        price: order.price,
        direction: direction,
        status: order.status,
        createdAt: new Date(order.createtime).toLocaleString(),
        probability: order.probability || 0.8, // 如果有概率字段则使用，否则默认值
      };
    });

    console.log('Transformed market orders:', transformedMarketOrders);

    // 根据状态分类市场单
    if (Array.isArray(transformedMarketOrders)) {
      // 已提交的市场单（状态为pending或active或filled等）
      submittedMarketOrders.value = transformedMarketOrders.filter((order) =>
        ['pending', 'active', 'filled', 'rejected', 'expired'].includes(
          order.status
        )
      );

      // 市场单暂存区数据（状态为draft）
      marketStagingOrders.value = transformedMarketOrders.filter(
        (order) => order.status === 'draft'
      );

      // AI推荐的市场单（状态为ai）
      aiRecommendedMarketOrders.value = transformedMarketOrders.filter(
        (order) => order.status === 'ai'
      );
    }
  } catch (error) {
    console.error('获取订单数据失败:', error);
    toast.value = true;
    toastText.value = '获取订单数据失败';
    toastColor.value = 'error';
  } finally {
    // 无论成功或失败，都结束加载状态
    ordersLoading.value = false;
  }
};

// 在组件初始化时获取订单数据
onMounted(async () => {
  // 初始加载数据
  applyFilters();

  // 获取可用的合约代码
  await fetchAvailableCodes();

  // 获取订单数据
  await fetchOrders();

  // 从蜡烛图数据中提取可用的交易代码
  setAvailableCodesFromCandlestickData();

  // 设置初始化完成标志
  isInitialized.value = true;
});

// 添加从蜡烛图数据中获取可用交易代码的函数
const setAvailableCodesFromCandlestickData = (): void => {
  // 如果已有蜡烛图数据
  if (candlestickData.value && candlestickData.value.length > 0) {
    // 提取所有独特的交易代码
    const codes = candlestickData.value
      .map((item) => item.code)
      .filter((value, index, self) => self.indexOf(value) === index); // 去重

    // 更新可用代码列表
    availableCodes.value = codes;

    // 如果表单的代码为空，并且有可用代码，则设置第一个可用代码为默认值
    if (conditionalForm.value.code === '' && codes.length > 0) {
      conditionalForm.value.code = codes[0];
    }
    if (marketForm.value.code === '' && codes.length > 0) {
      marketForm.value.code = codes[0];
    }
  }
};

const submitDraft = async (
  type: 'conditional' | 'market',
  orderId: string
): Promise<void> => {
  try {
    // 调用API更新草稿订单状态为pending
    await api.patch(`/api/trades/orders/${orderId}`, {
      status: 'pending',
    });

    // 重新获取订单数据
    await fetchOrders();

    // 显示通知消息
    toast.value = true;
    toastText.value = `${type === 'conditional' ? '条件单' : '市场单'}提交成功`;
    toastColor.value = 'success';
  } catch (error) {
    console.error('订单提交失败:', error);
    toast.value = true;
    toastText.value = '订单提交失败';
    toastColor.value = 'error';
  }
};
</script>

<style scoped>
.trading-desk-view {
  height: 100%;
}

.market-depth {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
  background-color: #fafafa;
  border-radius: 6px;
  padding: 8px;
  border: 1px solid #eeeeee;
}

.submitted-orders-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  background-color: #fafafa;
}

.submitted-orders-container .v-table {
  background-color: transparent !important;
}

.submitted-orders-container .v-table thead tr th {
  position: sticky;
  top: 0;
  background-color: #f5f5f5 !important;
  z-index: 1;
  font-size: 0.8rem;
  color: #666;
  border-bottom: 1px solid #eaeaea;
}

.submitted-orders-container .v-table tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
  transition: background-color 0.2s ease;
}

.submitted-orders-container::-webkit-scrollbar {
  width: 6px;
}

.submitted-orders-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.submitted-orders-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.submitted-orders-container::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.depth-header {
  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  padding: 4px 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  margin-bottom: 4px;
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
}

.header-level {
  text-align: left;
}

.header-price {
  text-align: right;
  padding-right: 16px;
}

.header-volume {
  text-align: right;
  padding-left: 12px;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}

.ask-section {
  display: flex;
  flex-direction: column;
}

.bid-section {
  display: flex;
  flex-direction: column;
}

.quote-level {
  display: grid;
  grid-template-columns: 40px 1fr 1fr;
  padding: 4px 8px;
  border-radius: 4px;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}

.quote-level:hover {
  transform: translateX(2px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.ask-level {
  background-color: rgba(255, 80, 80, 0.04);
  margin-bottom: 2px;
}

.bid-level {
  background-color: rgba(0, 176, 32, 0.04);
  margin-bottom: 2px;
}

.level-indicator {
  font-weight: 600;
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.7);
}

.price {
  font-weight: 600;
  text-align: right;
  padding-right: 16px;
}

.ask-level .price {
  color: #f44336;
}

.bid-level .price {
  color: #4caf50;
}

.volume {
  text-align: right;
  color: rgba(0, 0, 0, 0.7);
  border-left: 1px solid rgba(0, 0, 0, 0.05);
  padding-left: 12px;
  position: relative;
  z-index: 2;
}

.volume-bar {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  z-index: 1;
  opacity: 0.12;
  transition: width 0.5s ease;
}

.ask-level .volume-bar {
  background-color: #f44336;
}

.bid-level .volume-bar {
  background-color: #4caf50;
}

.price-divider {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 36px;
  border-top: 1px solid rgba(0, 0, 0, 0.09);
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  margin: 6px 0;
  background-color: rgba(0, 0, 0, 0.01);
}

.latest-price {
  font-size: 1rem;
  font-weight: 600;
  padding: 4px 12px;
  background: linear-gradient(to bottom, #ffffff, #f5f5f5);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  color: #1976d2;
  position: relative;
}

.price-label {
  font-size: 0.65rem;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.5);
  display: inline-block;
  margin-left: 4px;
  vertical-align: middle;
}

.market-depth-card {
  border-radius: 8px;
  overflow: hidden;
}

.live-indicator {
  display: flex;
  align-items: center;
}

.live-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #4caf50;
  margin-right: 3px;
  animation: pulse 1.5s infinite;
}

.live-text {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.65rem;
}

.code-select {
  max-width: 110px;
  font-size: 0.75rem;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4);
  }
  70% {
    box-shadow: 0 0 0 4px rgba(76, 175, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

.order-drawer {
  width: 800px;
}

.order-tabs {
  background-color: primary;
}

/* 新增样式 */
.order-drawer {
  .v-toolbar {
    background-color: rgba(var(--v-theme-primary), 1) !important;
    color: white;
  }

  .v-tabs {
    background-color: rgba(var(--v-theme-primary), 0.9) !important;
  }

  .v-tab {
    color: white !important;

    &--selected {
      color: white !important;
      font-weight: bold;
    }
  }

  .v-data-table {
    .v-data-table__th {
      font-weight: bold;
      background-color: rgba(var(--v-theme-surface-variant), 0.5);
    }
  }
}
</style> 