/**
 * NumLogic 计算器类型定义
 * 定义计算器相关的所有 TypeScript 类型和接口
 */

// 操作符类型
export type OperatorType = '+' | '-' | '*' | '/' | '=' | '%' | '±' | '√'

// 功能键类型
export type FunctionType = 'C' | 'CE' | '⌫' | '.' | 'M+' | 'M-' | 'MC' | 'MR'

// 按钮类型
export type ButtonType = 'number' | 'operator' | 'function' | 'equals'

// 计算模式
export type CalculatorMode = 'standard' | 'scientific' | 'programmer'

// 数字系统 (为后续扩展准备)
export type NumberSystem = 'decimal' | 'binary' | 'octal' | 'hexadecimal'

// 按钮配置接口
export interface ButtonConfig {
  id: string
  label: string
  value: string | number
  type: ButtonType
  gridColumn?: number
  gridRow?: number
  colspan?: number
  rowspan?: number
  disabled?: boolean
}

// 计算历史记录
export interface CalculationHistory {
  id: string
  expression: string
  result: number
  timestamp: Date
}

// 内存存储
export interface MemoryState {
  value: number
  hasValue: boolean
}

// 计算器状态接口
export interface CalculatorState {
  // 当前显示值
  display: string
  
  // 当前输入的数字
  currentNumber: string
  
  // 上一个数字
  previousNumber: string
  
  // 当前操作符
  operator: OperatorType | null
  
  // 是否等待新的操作数
  waitingForOperand: boolean
  
  // 是否刚刚计算完成
  justCalculated: boolean
  
  // 是否有小数点
  hasDecimal: boolean
  
  // 错误状态
  error: string | null
  
  // 内存状态
  memory: MemoryState
  
  // 计算历史
  history: CalculationHistory[]
  
  // 当前模式
  mode: CalculatorMode
  
  // 数字系统
  numberSystem: NumberSystem
}

// 计算操作接口
export interface CalculationOperation {
  type: 'number' | 'operator' | 'function' | 'equals'
  value: string | number
  timestamp: Date
}

// 按钮布局配置
export interface ButtonLayout {
  mode: CalculatorMode
  buttons: ButtonConfig[][]
}

// 计算器设置
export interface CalculatorSettings {
  // 精度设置
  precision: number
  
  // 是否使用千位分隔符
  useThousandsSeparator: boolean
  
  // 角度单位 (为科学计算器准备)
  angleUnit: 'degree' | 'radian'
  
  // 主题设置
  theme: 'light' | 'dark' | 'auto'
  
  // 是否启用音效
  soundEnabled: boolean
  
  // 是否启用触觉反馈
  hapticEnabled: boolean
}

// API 响应类型 (为未来扩展准备)
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

// 导出常量
export const OPERATORS: OperatorType[] = ['+', '-', '*', '/', '=', '%', '±', '√']

export const FUNCTIONS: FunctionType[] = ['C', 'CE', '⌫', '.', 'M+', 'M-', 'MC', 'MR']

export const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// 默认设置
export const DEFAULT_SETTINGS: CalculatorSettings = {
  precision: 10,
  useThousandsSeparator: true,
  angleUnit: 'degree',
  theme: 'auto',
  soundEnabled: false,
  hapticEnabled: true
}

// 初始状态
export const INITIAL_STATE: CalculatorState = {
  display: '0',
  currentNumber: '',
  previousNumber: '',
  operator: null,
  waitingForOperand: false,
  justCalculated: false,
  hasDecimal: false,
  error: null,
  memory: {
    value: 0,
    hasValue: false
  },
  history: [],
  mode: 'standard',
  numberSystem: 'decimal'
}

// 错误消息常量
export const ERROR_MESSAGES = {
  DIVISION_BY_ZERO: '除零错误',
  INVALID_INPUT: '无效输入',
  OVERFLOW: '数值溢出',
  UNDERFLOW: '数值下溢',
  SYNTAX_ERROR: '语法错误',
  MEMORY_ERROR: '内存错误'
} as const

// 键盘映射 (为键盘输入准备)
export const KEYBOARD_MAP: Record<string, string> = {
  '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
  '+': '+', '-': '-', '*': '*', '/': '/',
  '=': '=', 'Enter': '=',
  '.': '.', ',': '.',
  'Backspace': '⌫',
  'Delete': 'C',
  'Escape': 'CE'
}