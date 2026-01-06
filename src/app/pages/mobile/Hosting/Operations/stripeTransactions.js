import get_all_stripe_transactions from "app/backend/cloud/get_all_stripe_transactions";
import { useModal } from "app/sections/Modal/Parent/context";
import MKTypography from "components/MKTypography";
import { createContext, useContext, useState, useCallback } from "react";

const StripeTransactionsContext = createContext();

export const StripeTransactionsProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasAttempted, setHasAttempted] = useState(false); // New flag to track whether the attempt was made
    const { openModal } = useModal();

    const get_transactions = useCallback(async () => {
        // Prevent fetching if we have already tried once (success or failure)
        if (hasAttempted) return;

        setLoading(true);
        setHasAttempted(true); // Mark that we've made an attempt, whether successful or not

        try {
            const res = await get_all_stripe_transactions();
            if (res.data.error) {
                openModal('', [{
                    title: 'Error getting earnings',
                    component: [() => (
                        <MKTypography>{res?.data?.message || 'Unknown error. Please try again later.'}</MKTypography>
                    )]
                }]);
            } else {
                res?.data?.transactions?.sort((a, b) => (new Date(b?.created)) - (new Date(a?.created)))
                const cleanedTransactions = res?.data?.transactions?.map((transaction) => ({
                    ...transaction,
                    created: transaction.created * 1000, // Multiply `.created` by 1000
                    amount: parseFloat((transaction.amount / 100).toFixed(2)),   // Divide `amount` by 100
                    net: parseFloat((transaction.net / 100).toFixed(2)),         // Divide `net` by 100
                    fee: parseFloat((transaction.fee / 100).toFixed(2)),         // Divide `fee` by 100
                }));
                setTransactions(cleanedTransactions);
            }
        } catch (error) {
            openModal('', [{
                title: 'Error',
                component: [() => (
                    <MKTypography>Failed to fetch transactions: {error.message}</MKTypography>
                )]
            }]);
        } finally {
            setLoading(false);
        }
    }, [openModal, hasAttempted]);

    return (
        <StripeTransactionsContext.Provider
            value={{
                loading,
                transactions,
                get_transactions,
                hasAttempted, // Expose attempted flag if needed
            }}
        >
            {children}
        </StripeTransactionsContext.Provider>
    );
};

export const useStripeTransactions = () => {
    const context = useContext(StripeTransactionsContext);

    // Only fetch transactions if they haven't been fetched yet and we haven't already tried
    if (context.transactions.length === 0 && !context.loading && !context.hasAttempted) {
        context.get_transactions();
    }

    return context;
};
