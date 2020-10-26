import format from 'date-fns/format'

const mixins = {
    methods: {
        formatDate: (date) => {
            return format(new Date(date), 'MM/dd/yyyy')
        }
    }
}

export { mixins }