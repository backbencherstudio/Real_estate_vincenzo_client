export const statusOptions = ["Accepted", "Rejected"].map((item) => ({
    value: item,
    label: item,
}));

export const statusOptionsForPaymentHistory = [ 'Received' , 'Not Get'].map((item) => ({
    value: item,
    label: item,
}));

const lastDueDateNumber = Array.from({ length: 21 }, (_, i) => i + 5);

export const lastDueDateNumberOptionas = lastDueDateNumber.map((number) => ({
    value: number,
    label: number,
}));