export default {
    defaultTimeout: 1000,
    data () {
        return {
            timeouts: {}
        }
    },
    methods: {
        $debounce (key, fn, timeout = this.$options.defaultTimeout) {
            this.$debounceClear(key)
            this.$debounceDelay(key, fn, timeout)
        },
        $debounceDelay (key, fn, timeout = this.$options.defaultTimeout) {
            this.timeouts[key] = setTimeout(fn, timeout)
        },
        $debounceClear (key) {
            clearTimeout(this.timeouts[key])
        }
    }
}