import fetcher from "@/utils/fetchers";
import useSWR from "swr";

function useTransactions(month: number, year: number) {
    const { data, error, isLoading} = useSWR(`//127.0.0.1:8000/api/transactions/?month=${month}&year=${year}`, fetcher);

    return {
        data,
        isLoading,
        error
    }
}

export default useTransactions;