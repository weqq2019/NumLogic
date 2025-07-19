<template>
  <button
    :class="[
      'calculator-button',
      `calculator-button--${type}`,
      { 'calculator-button--pressed': isPressed }
    ]"
    @click="handleClick"
    @mousedown="isPressed = true"
    @mouseup="isPressed = false"
    @mouseleave="isPressed = false"
    :disabled="disabled"
  >
    <span class="calculator-button__text">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  label: string
  value?: string | number
  type?: 'number' | 'operator' | 'function' | 'equals'
  disabled?: boolean
}

interface Emits {
  (e: 'click', value: string | number, type: string): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'number',
  disabled: false,
  value: undefined
})

const emit = defineEmits<Emits>()

const isPressed = ref(false)

const handleClick = () => {
  if (props.disabled) return
  
  const clickValue = props.value ?? props.label
  emit('click', clickValue, props.type)
}
</script>

<style scoped>
.calculator-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #1e293b;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
}

.calculator-button:hover {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.06);
}

.calculator-button--pressed {
  transform: translateY(1px);
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.1),
    inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.calculator-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.calculator-button:disabled:hover {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-color: #e2e8f0;
  transform: none;
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
}

/* 数字按钮样式 */
.calculator-button--number {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  color: #1e293b;
}

.calculator-button--number:hover {
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
}

/* 运算符按钮样式 */
.calculator-button--operator {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border-color: #2563eb;
}

.calculator-button--operator:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border-color: #1d4ed8;
}

/* 功能按钮样式 */
.calculator-button--function {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  color: white;
  border-color: #475569;
}

.calculator-button--function:hover {
  background: linear-gradient(135deg, #475569 0%, #334155 100%);
  border-color: #334155;
}

/* 等号按钮样式 */
.calculator-button--equals {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-color: #059669;
}

.calculator-button--equals:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  border-color: #047857;
}

.calculator-button__text {
  pointer-events: none;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .calculator-button {
    height: 56px;
    font-size: 18px;
    border-radius: 8px;
  }
}

@media (max-width: 480px) {
  .calculator-button {
    height: 48px;
    font-size: 16px;
  }
}
</style>