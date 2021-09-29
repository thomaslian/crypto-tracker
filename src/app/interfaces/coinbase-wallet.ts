export interface CoinbaseWallet {
    id: string,
    name: string,
    balance: {
        amount: number,
        currency: string
    },
    native_balance: {
        amount: number,
        currency: string
    }

}
