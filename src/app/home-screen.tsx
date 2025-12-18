"use client";

import { Bank, BankNote01, CheckCircle, CreditCard01, CreditCard02, CreditCardDown, CreditCardPlus, CreditCardUp, Minus, Plus, ReceiptCheck } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Table, TableCard } from "@/components/application/table/table";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { useState } from "react";
import { DateValue } from "react-aria";
import { getLocalTimeZone, today } from "@internationalized/date";
import useTransactions from "@/hooks/useTransactions";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Transaction } from "@/types/transaction";
import { Badge, BadgeIcon, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import BankBadge from "@/components/custom/bank-badge/bank-badge";

const now = today(getLocalTimeZone());
//teste
export const HomeScreen = () => {
    const [dateFilter, setDateFilter] = useState<DateValue>(now)
    const { data, isLoading, error } = useTransactions(dateFilter?.month, dateFilter?.year, true);

    if (!isLoading) {
        console.log(data.transactions);
    }

    return (
        <div className="container mx-auto my-5">
            <TableCard.Root>
                <TableCard.Header
                    title="Organizador Financeiro 💵"
                    className="pb-5"
                    contentTrailing={
                        <div className="flex items-center gap-3">
                            <DatePicker value={dateFilter} onChange={setDateFilter} aria-label="Date Picker" />
                            <Dropdown.Root>
                                <Button size="md" iconLeading={CreditCardPlus}>Nova Transação</Button>
                                <Dropdown.Popover>
                                    <Dropdown.Menu>
                                        <Dropdown.Section>
                                            <Dropdown.Item icon={CreditCardDown}>Despesa</Dropdown.Item>
                                            <Dropdown.Item icon={CreditCardUp}>Receita</Dropdown.Item>
                                        </Dropdown.Section>
                                    </Dropdown.Menu>
                                </Dropdown.Popover>
                            </Dropdown.Root>
                        </div>
                    }
                />
                <Table aria-label="Transactions" selectionMode="multiple">
                    <Table.Header>
                        <Table.Head id={`description`} label="Descrição" isRowHeader />
                        <Table.Head id={`amount`} label="Valor (R$)" />
                        <Table.Head id={`due_date`} label="Data de vencimento" />
                        <Table.Head id={`bank`} label="Banco" />
                        <Table.Head id={`status`} label="Status"/>
                    </Table.Header>
                    <Table.Body items={!isLoading ? data.transactions : []}>
                        {(transaction: Transaction) => (
                            <Table.Row key={transaction.id} className={`cursor-pointer`}>
                                <Table.Cell>
                                    <div className="flex items-center">
                                        {transaction.description}
                                        {transaction.payment_type !== "" && 
                                            <BadgeWithIcon className="ml-2" type="pill-color" size="sm" iconLeading={transaction.payment_type === "C" ? CreditCard02 : BankNote01}>
                                                <span className="ml-0.5">{transaction.payment_type === "C" ? "Crédito" : "Débito"} {transaction.total_installments !== null ? `${transaction.current_installment}/${transaction.total_installments}` : null}</span>
                                            </BadgeWithIcon>
                                        }
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center">
                                        {transaction.transaction_type === "E" ? 
                                            <FeaturedIcon className="mr-2" color="error" icon={Minus} theme="gradient" size="xs"/>
                                            :
                                            <FeaturedIcon className="mr-2" color="success" icon={Plus} theme="gradient" size="xs"/>
                                        }
                                        <span>{formatCurrency(transaction.amount)}</span>
                                    </div>                                    
                                </Table.Cell>
                                <Table.Cell>{formatDate(transaction.due_date)}</Table.Cell>
                                <Table.Cell>
                                    <BankBadge color={transaction.bank.color} label={transaction.bank.name}/>
                                </Table.Cell>
                                <Table.Cell>
                                    {transaction.is_payed || transaction.is_received ? 
                                        <BadgeWithDot type="pill-color" color="brand" size="sm">{transaction.transaction_type === "E" ? "Pago" : "Recebido"}</BadgeWithDot>
                                        :
                                        <BadgeWithDot type="pill-color" color="warning" size="sm">Pendente</BadgeWithDot>
                                    }
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </TableCard.Root>

        </div>
    );
};
