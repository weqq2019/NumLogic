<template>
  <div class="calculator-view">
    <!-- 计算器标题 -->
    <header class="calculator-header">
      <h1 class="calculator-title">NumLogic</h1>
      <div class="calculator-subtitle">智能计算器</div>
    </header>

    <!-- 计算器主体 -->
    <main class="calculator-container">
      <!-- 显示屏区域 -->
      <section class="calculator-display-section">
        <!-- 表达式显示 -->
        <div class="expression-display">
          {{ calculatorStore.currentExpression }}
        </div>
        
        <!-- 主显示屏 -->
        <div class="main-display">
          {{ calculatorStore.formattedDisplay }}
        </div>
        
        <!-- 状态指示器 -->
        <div class="status-indicators">
          <span v-if="calculatorStore.memoryStatus" class="memory-indicator">
            {{ calculatorStore.memoryStatus }}
          </span>
          <span v-if="calculatorStore.error" class="error-indicator">
            ⚠️
          </span>
        </div>
      </section>

      <!-- 按钮区域 -->
      <section class="calculator-buttons">
        <!-- 第一行：功能键 -->
        <div class="button-row">
          <CalculatorButton
            label="MC"
            type="function"
            @click="calculatorStore.memoryClear()"
          />
          <CalculatorButton
            label="MR"
            type="function"
            @click="calculatorStore.memoryRecall()"
          />
          <CalculatorButton
            label="M+"
            type="function"
            @click="calculatorStore.memoryAdd()"
          />
          <CalculatorButton
            label="M-"
            type="function"
            @click="calculatorStore.memorySubtract()"
          />
        </div>

        <!-- 第二行：清除和退格 -->
        <div class="button-row">
          <CalculatorButton
            label="C"
            type="function"
            @click="calculatorStore.clear()"
          />
          <CalculatorButton
            label="CE"
            type="function"
            @click="calculatorStore.clearEntry()"
          />
          <CalculatorButton
            label="⌫"
            type="function"
            @click="calculatorStore.backspace()"
          />
          <CalculatorButton
            label="÷"
            value="/"
            type="operator"
            @click="handleOperatorClick"
          />
        </div>

        <!-- 第三行：数字和运算符 -->
        <div class="button-row">
          <CalculatorButton
            label="7"
            value="7"
            type="number"
            @click="handleNumberClick"
          />
          <CalculatorButton
            label="8"
            value="8"
            type="number"
            @click="handleNumberClick"
          />
          <CalculatorButton
            label="9"
            value="9"
            type="number"
            @click="handleNumberClick"
          />
          <CalculatorButton
            label="×"
            value="*"
            type="operator"
            @click="handleOperatorClick"
          />
        </div>

        <!-- 第四行 -->
        <div class="button-row">
          <CalculatorButton
            label="4"
            value="4"
            type="number"
            @click="handleNumberClick"
          />
          <CalculatorButton
            label="5"
            value="5"
            type="number"
            @click="handleNumberClick"
          />
          <CalculatorButton
            label="6"
            value="6"
            type="number"
            @click="handleNumberClick"
          />
          <CalculatorButton
            label="−"
            value="-"
            type="operator"
            @click="handleOperatorClick"
          />
        </div>

        <!-- 第五行 -->
        <div class="button-row">
          <CalculatorButton
            label="1"
            value="1"
            type="number"
            @click="handleNumberClick"
          />
          <CalculatorButton
            label="2"
            value="2"
            type="number"
            @click="handleNumberClick"
          />
          <CalculatorButton
            label="3"
            value="3"
            type="number"
            @click="handleNumberClick"
          />
          <CalculatorButton
            label="+"
            value="+"
            type="operator"
            @click="handleOperatorClick"
          />
        </div>

        <!-- 第六行：特殊按钮 -->
        <div class="button-row">
          <CalculatorButton
            label="±"
            type="function"
            @click="calculatorStore.toggleSign()"
          />
          <CalculatorButton
            label="0"
            value="0"
            type="number"
            @click="handleNumberClick"
          />
          <CalculatorButton
            label="."
            type="function"
            @click="calculatorStore.inputDecimal()"
          />
          <CalculatorButton
            label="="
            type="equals"
            @click="calculatorStore.calculate()"
          />
        </div>

        <!-- 扩展功能行 -->
        <div class="button-row extended-functions">
          <CalculatorButton
            label="√"
            type="function"
            @click="calculatorStore.squareRoot()"
          />
          <CalculatorButton
            label="%"
            value="%"
            type="operator"
            @click="handleOperatorClick"
          />
          <CalculatorButton
            label="MS"
            type="function"
            @click="calculatorStore.memoryStore()"
          />
          <CalculatorButton
            label="历史"
            type="function"
            @click="toggleHistory"
          />
        </div>
      </section>

      <!-- 历史记录面板 -->
      <aside 
        v-if="showHistory" 
        class="history-panel"
        :class="{ 'history-panel--visible': showHistory }"
      >
        <div class="history-header">
          <h3>计算历史</h3>
          <button 
            @click="calculatorStore.clearHistory()"
            class="clear-history-btn"
          >
            清除
          </button>
        </div>
        
        <div class="history-list">
          <div
            v-for="item in calculatorStore.history"
            :key="item.id"
            class="history-item"
            @click="useHistoryResult(item.result)"
          >
            <div class="history-expression">{{ item.expression }}</div>
            <div class="history-result">= {{ item.result }}</div>
            <div class="history-time">
              {{ formatTime(item.timestamp) }}
            </div>
          </div>
          
          <div v-if="calculatorStore.history.length === 0" class="no-history">
            暂无计算历史
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCalculatorStore } from '@/stores/calculatorStore'
import CalculatorButton from '@/components/CalculatorButton.vue'
import type { OperatorType } from '@/types/calculator'

// 状态管理
const calculatorStore = useCalculatorStore()

// 本地状态
const showHistory = ref(false)

// 事件处理函数
const handleNumberClick = (value: string | number) => {
  calculatorStore.inputNumber(String(value))
}

const handleOperatorClick = (value: string | number) => {
  calculatorStore.inputOperator(value as OperatorType)
}

const toggleHistory = () => {
  showHistory.value = !showHistory.value
}

const useHistoryResult = (result: number) => {
  calculatorStore.display = String(result)
  calculatorStore.currentNumber = String(result)
  calculatorStore.justCalculated = true
  showHistory.value = false
}

const formatTime = (timestamp: Date) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}
</script>

<style scoped>
.calculator-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.calculator-header {
  text-align: center;
  margin-bottom: 30px;
  color: white;
}

.calculator-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.calculator-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-top: 8px;
  font-weight: 300;
}

.calculator-container {
  position: relative;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

/* 显示屏样式 */
.calculator-display-section {
  background: #1a1a1a;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  color: white;
  position: relative;
}

.expression-display {
  font-size: 0.9rem;
  color: #888;
  min-height: 20px;
  text-align: right;
  margin-bottom: 8px;
  opacity: 0.8;
}

.main-display {
  font-size: 2.5rem;
  font-weight: 300;
  text-align: right;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.status-indicators {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  gap: 8px;
}

.memory-indicator {
  background: #4ade80;
  color: #064e3b;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
}

.error-indicator {
  color: #f87171;
  font-size: 1.2rem;
}

/* 按钮区域样式 */
.calculator-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.button-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.extended-functions {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

/* 历史记录面板 */
.history-panel {
  position: absolute;
  top: 0;
  right: -320px;
  width: 300px;
  height: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
  overflow: hidden;
  z-index: 10;
}

.history-panel--visible {
  transform: translateX(-320px);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
}

.history-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #374151;
}

.clear-history-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s;
}

.clear-history-btn:hover {
  background: #dc2626;
}

.history-list {
  padding: 12px;
  height: calc(100% - 80px);
  overflow-y: auto;
}

.history-item {
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: background 0.2s;
  border: 1px solid #e5e7eb;
}

.history-item:hover {
  background: #f3f4f6;
}

.history-expression {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 4px;
}

.history-result {
  font-size: 1.1rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.history-time {
  font-size: 0.75rem;
  color: #9ca3af;
}

.no-history {
  text-align: center;
  color: #9ca3af;
  padding: 40px 20px;
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .calculator-view {
    padding: 10px;
  }

  .calculator-title {
    font-size: 2.5rem;
  }

  .calculator-container {
    padding: 20px;
    max-width: 100%;
  }

  .main-display {
    font-size: 2rem;
    min-height: 50px;
  }

  .button-row {
    gap: 8px;
  }

  .history-panel {
    width: 250px;
    right: -270px;
  }

  .history-panel--visible {
    transform: translateX(-270px);
  }
}

@media (max-width: 480px) {
  .calculator-container {
    padding: 16px;
    border-radius: 16px;
  }

  .calculator-display-section {
    padding: 20px;
  }

  .main-display {
    font-size: 1.8rem;
  }

  .button-row {
    gap: 6px;
  }
}
</style>