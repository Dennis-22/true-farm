const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: 'USD', style: 'currency'
})

export function formatCurrency(price: number){
    return currencyFormatter.format(price)
}