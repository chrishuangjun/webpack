import vue from 'vue'

// 这里就是我们刚刚创建的那个静态组件
import toastComponent from './toast.vue'

// 返回一个 扩展实例构造器
const ToastConstructor = vue.extend(toastComponent)

// 定义弹出组件的函数 参数option和vue实例化参数一致
function showToast(option) {
  // 实例化一个 toast.vue
  const toastVM = new ToastConstructor({
    data() {
      return option
    },
  })

  // 把 实例化的 toast.vue 添加到 body 里
  document.body.appendChild(toastVM.$mount().$el)
}

// 注册为全局组件的函数
function registryToast() {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$toast()
  vue.prototype.$toast = showToast
  ;['top', 'bottom', 'center'].forEach(item => {
    vue.prototype.$toast[item] = function(opt) {
      vue.prototype.$toast(
        Object.assign(opt, {
          position: item,
        })
      )
    }
  })
}

export default registryToast
