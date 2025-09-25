
const InvoicesFormatter = {
    invoiceStatus: (sStatus: string, A: string, B: string, C: string): string => {        
        switch (sStatus) {
            case 'A': return A;
            case 'B': return B;
            case 'C': return C;
            default: return sStatus;
        }
    }
}
export default InvoicesFormatter;