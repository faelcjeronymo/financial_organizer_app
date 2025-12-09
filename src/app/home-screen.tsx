"use client";

import { CreditCardDown, CreditCardPlus, CreditCardUp, Plus } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Table, TableCard } from "@/components/application/table/table";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { DatePicker } from "@/components/application/date-picker/date-picker";
import { useState } from "react";
import { DateValue } from "react-aria";
import { getLocalTimeZone, today } from "@internationalized/date";

const now = today(getLocalTimeZone());

export const HomeScreen = () => {
    const [dateFilter, setDateFilter] = useState<DateValue | null>(now)

    return (
        <TableCard.Root>
            <TableCard.Header
                title="Organizador Financeiro 💵"
                className="pb-5"
                contentTrailing={
                    <div className="flex items-center gap-3">
                        <DatePicker value={dateFilter} onChange={setDateFilter} />
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
                    <Table.Head id={`description`} label="Descrição" isRowHeader/>
                    <Table.Head id={`amount`} label="Valor (R$)" />
                    <Table.Head id={`due_date`} label="Data de vencimento" />
                    <Table.Head id={`bank`} label="Banco" />
                    <Table.Head id={`is_payed`} label="Pago/Recebido" />
                </Table.Header>
                <Table.Body>
                </Table.Body>
            </Table>
        </TableCard.Root>
    );
};
