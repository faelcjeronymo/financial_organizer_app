"use client";

import { BookOpen01, Check, Copy01, Cube01, HelpCircle, Plus } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { UntitledLogoMinimal } from "@/components/foundations/logo/untitledui-logo-minimal";
import { useClipboard } from "@/hooks/use-clipboard";
import { Table, TableCard } from "@/components/application/table/table";

export const HomeScreen = () => {

    return (
        <TableCard.Root>
            <TableCard.Header
                title="Tabela de Gastos"
                className="pb-5"
                contentTrailing={
                    <div className="flex items-center gap-3">
                        <Button size="md" iconLeading={Plus}>Adicionar Transação</Button>
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
