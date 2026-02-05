import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

const bulkSuspendStudents = async ({ yearOfAdmission, rejectionReason }: { yearOfAdmission: string, rejectionReason: string }) => {
    const response = await api.post('/api/admin/approve/students/bulk-suspend', { yearOfAdmission, rejectionReason });
    return response.data;
};

export const useBulkSuspend = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bulkSuspendStudents,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
    });
};
