import { Bank } from "./bank";

export interface Transaction {
    id: number;
    transaction_type: string; // "E" for Expense, maybe "R" for Revenue?
    description: string;
    amount: string; // It's a string from the API, you might want to parse it to a number
    due_date: string | null;
    transaction_date: string;
    annotations: string;
    payment_type: string; // "C" for Credit Card?
    bank: Bank;
    is_payed: boolean;
    is_received: boolean;
    current_installment: number | null;
    total_installments: number | null;
    is_salary: boolean;
    created_at: string;
    updated_at: string;
}
