export interface CharietyType {
    id: number;
    name: string;
    payment: number;
    paymentInWords: string;
}

export const charietyTypes: CharietyType[] = [
    {
        id: 1,
        name: "Seva 1 - 101",
        payment: 101,
        paymentInWords: 'One hundred and one'
    },
    {
        id: 2,
        name: "Seva 2 - 501",
        payment: 501,
        paymentInWords: 'Five hundred and one'
    },
    {
        id: 3,
        name: "Seva 3 - 1001",
        payment: 1001,
        paymentInWords: 'One thousand and one'
    }
];