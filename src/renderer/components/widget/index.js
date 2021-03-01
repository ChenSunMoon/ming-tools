import labelSelect from '@/components/widget/label/select'
import VForm from '@/components/widget/input/form'
import Vue from 'vue'
const components = [
    labelSelect,
    VForm
]
export default {
    install: () => {
        components.forEach(item => {
                Vue.component(item.name, item)
            }
        )
    }
}