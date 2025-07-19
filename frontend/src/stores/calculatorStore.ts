/**
 * NumLogic 计算器状态管理 Store
 * 使用 Pinia 管理计算器的所有状态和逻辑
 */

import { defineStore } from 'pinia'
import type {
  CalculatorState,
  OperatorType,
  CalculationHistory,
  MemoryState
} from '@/types/calculator'
import {
  INITIAL_STATE,
  ERROR_MESSAGES
} from '@/types/calculator'

export const useCalculatorStore = defineStore('calculator', {
  // 📊 状态定义
  state: (): CalculatorState => ({
    ...INITIAL_STATE
  }),

  // 🔍 计算属性 (Getters)
  getters: {
    /**
     * 格式化显示的数值
     */
    formattedDisplay: (state): string => {
      if (state.error) return state.error
      if (state.display === '0' && !state.hasDecimal) return '0'
      
      // 添加千位分隔符
      const parts = state.display.split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      return parts.join('.')
    },

    /**
     * 是否可以撤销操作
     */
    canUndo: (state): boolean => {
      return state.history.length > 0
    },

    /**
     * 内存状态显示
     */
    memoryStatus: (state): string => {
      return state.memory.hasValue ? 'M' : ''
    },

    /**
     * 是否显示小数点
     */
    shouldShowDecimal: (state): boolean => {
      return state.hasDecimal || state.display.includes('.')
    },

    /**
     * 当前计算表达式
     */
    currentExpression: (state): string => {
      if (state.previousNumber && state.operator) {
        return `${state.previousNumber} ${state.operator} ${state.currentNumber || ''}`
      }
      return state.currentNumber || state.display
    }
  },

  // ⚡ 操作方法 (Actions)
  actions: {
    /**
     * 输入数字
     */
    inputNumber(digit: string) {
      // 清除错误状态
      if (this.error) {
        this.clearError()
      }

      // 如果刚刚计算完成，开始新的计算
      if (this.justCalculated) {
        this.clear()
        this.justCalculated = false
      }

      // 如果正在等待操作数，清空当前数字
      if (this.waitingForOperand) {
        this.currentNumber = digit
        this.display = digit
        this.waitingForOperand = false
        this.hasDecimal = false
      } else {
        // 避免多个前导零
        if (this.currentNumber === '0' && digit === '0') return
        if (this.currentNumber === '0' && digit !== '.') {
          this.currentNumber = digit
        } else {
          this.currentNumber += digit
        }
        this.display = this.currentNumber
      }
    },

    /**
     * 输入小数点
     */
    inputDecimal() {
      if (this.error) {
        this.clearError()
      }

      if (this.justCalculated) {
        this.clear()
        this.justCalculated = false
      }

      if (this.waitingForOperand) {
        this.currentNumber = '0.'
        this.display = '0.'
        this.waitingForOperand = false
        this.hasDecimal = true
      } else if (!this.hasDecimal) {
        this.currentNumber += '.'
        this.display = this.currentNumber
        this.hasDecimal = true
      }
    },

    /**
     * 输入运算符
     */
    inputOperator(nextOperator: OperatorType) {
      if (this.error) return

      const inputValue = parseFloat(this.currentNumber || this.display)

      // 如果没有上一个数字，设置当前数字为上一个数字
      if (this.previousNumber === '') {
        this.previousNumber = String(inputValue)
      } else if (this.operator && !this.waitingForOperand) {
        // 如果有运算符且不在等待操作数状态，执行计算
        const result = this.performCalculation()
        if (result !== null) {
          this.display = String(result)
          this.previousNumber = String(result)
          this.addToHistory(`${this.previousNumber} ${this.operator} ${this.currentNumber}`, result)
        }
      }

      this.waitingForOperand = true
      this.operator = nextOperator
      this.currentNumber = ''
      this.hasDecimal = false
      this.justCalculated = false
    },

    /**
     * 执行计算
     */
    calculate() {
      if (this.error) return

      const inputValue = parseFloat(this.currentNumber || this.display)
      
      if (this.previousNumber !== '' && this.operator) {
        const result = this.performCalculation()
        if (result !== null) {
          const expression = `${this.previousNumber} ${this.operator} ${this.currentNumber}`
          this.display = String(result)
          this.addToHistory(expression, result)
          
          // 重置状态
          this.previousNumber = ''
          this.currentNumber = String(result)
          this.operator = null
          this.waitingForOperand = true
          this.justCalculated = true
          this.hasDecimal = String(result).includes('.')
        }
      }
    },

    /**
     * 执行具体的数学运算
     */
    performCalculation(): number | null {
      const prev = parseFloat(this.previousNumber)
      const current = parseFloat(this.currentNumber || this.display)

      if (isNaN(prev) || isNaN(current)) {
        this.setError(ERROR_MESSAGES.INVALID_INPUT)
        return null
      }

      let result: number

      switch (this.operator) {
        case '+':
          result = prev + current
          break
        case '-':
          result = prev - current
          break
        case '*':
          result = prev * current
          break
        case '/':
          if (current === 0) {
            this.setError(ERROR_MESSAGES.DIVISION_BY_ZERO)
            return null
          }
          result = prev / current
          break
        case '%':
          result = prev % current
          break
        default:
          return null
      }

      // 检查溢出
      if (!isFinite(result)) {
        this.setError(ERROR_MESSAGES.OVERFLOW)
        return null
      }

      // 限制精度
      const precision = 10
      return Math.round(result * Math.pow(10, precision)) / Math.pow(10, precision)
    },

    /**
     * 清除所有
     */
    clear() {
      this.display = '0'
      this.currentNumber = ''
      this.previousNumber = ''
      this.operator = null
      this.waitingForOperand = false
      this.justCalculated = false
      this.hasDecimal = false
      this.clearError()
    },

    /**
     * 清除当前输入 (CE)
     */
    clearEntry() {
      this.currentNumber = ''
      this.display = '0'
      this.hasDecimal = false
      this.clearError()
    },

    /**
     * 退格删除
     */
    backspace() {
      if (this.error || this.justCalculated) return

      if (this.currentNumber.length > 0) {
        const lastChar = this.currentNumber.slice(-1)
        if (lastChar === '.') {
          this.hasDecimal = false
        }
        
        this.currentNumber = this.currentNumber.slice(0, -1)
        this.display = this.currentNumber || '0'
        
        if (this.currentNumber === '') {
          this.display = '0'
        }
      }
    },

    /**
     * 正负号切换
     */
    toggleSign() {
      if (this.error) return

      const currentValue = parseFloat(this.display)
      if (currentValue !== 0) {
        const newValue = -currentValue
        this.display = String(newValue)
        this.currentNumber = String(newValue)
      }
    },

    /**
     * 平方根
     */
    squareRoot() {
      if (this.error) return

      const currentValue = parseFloat(this.display)
      if (currentValue < 0) {
        this.setError(ERROR_MESSAGES.INVALID_INPUT)
        return
      }

      const result = Math.sqrt(currentValue)
      this.display = String(result)
      this.currentNumber = String(result)
      this.addToHistory(`√${currentValue}`, result)
      this.justCalculated = true
    },

    /**
     * 内存操作 - 存储
     */
    memoryStore() {
      const currentValue = parseFloat(this.display)
      this.memory.value = currentValue
      this.memory.hasValue = true
    },

    /**
     * 内存操作 - 读取
     */
    memoryRecall() {
      if (this.memory.hasValue) {
        this.display = String(this.memory.value)
        this.currentNumber = String(this.memory.value)
        this.justCalculated = true
      }
    },

    /**
     * 内存操作 - 清除
     */
    memoryClear() {
      this.memory.value = 0
      this.memory.hasValue = false
    },

    /**
     * 内存操作 - 加法
     */
    memoryAdd() {
      const currentValue = parseFloat(this.display)
      this.memory.value += currentValue
      this.memory.hasValue = true
    },

    /**
     * 内存操作 - 减法
     */
    memorySubtract() {
      const currentValue = parseFloat(this.display)
      this.memory.value -= currentValue
      this.memory.hasValue = true
    },

    /**
     * 添加到历史记录
     */
    addToHistory(expression: string, result: number) {
      const historyItem: CalculationHistory = {
        id: Date.now().toString(),
        expression,
        result,
        timestamp: new Date()
      }
      
      this.history.unshift(historyItem)
      
      // 限制历史记录数量
      if (this.history.length > 50) {
        this.history = this.history.slice(0, 50)
      }
    },

    /**
     * 清除历史记录
     */
    clearHistory() {
      this.history = []
    },

    /**
     * 设置错误状态
     */
    setError(message: string) {
      this.error = message
      this.display = message
    },

    /**
     * 清除错误状态
     */
    clearError() {
      this.error = null
    },

    /**
     * 重置到初始状态
     */
    reset() {
      Object.assign(this, INITIAL_STATE)
    }
  }
})