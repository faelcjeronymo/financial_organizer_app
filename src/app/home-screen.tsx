"use client";

import { CheckCircle, CreditCardDown, CreditCardPlus, CreditCardUp, Plus } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Table, TableCard, TableCell } from "@/components/application/table/table";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { useState } from "react";
import { DateValue } from "react-aria";
import { getLocalTimeZone, today } from "@internationalized/date";
import useTransactions from "@/hooks/useTransactions";

const now = today(getLocalTimeZone());
//teste
export const HomeScreen = () => {
    const [dateFilter, setDateFilter] = useState<DateValue>(now)
    const { data, isLoading, error } = useTransactions(dateFilter?.month, dateFilter?.year);

    if (!isLoading) {
        console.log(data.transactions);
    }

    return (
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
                    <Table.Head id={`is_payed`} label="Pago/Recebido" />
                </Table.Header>
                <Table.Body items={!isLoading ? data.transactions : []}>
                    {(item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell>{item.amount}</Table.Cell>
                            <Table.Cell>{item.due_date}</Table.Cell>
                            <Table.Cell>{item.bank}</Table.Cell>
                            <Table.Cell>{item.is_payed ? <CheckCircle/> : <></>}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};
