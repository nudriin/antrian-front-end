export interface QueueTotal {
    total: number | undefined | null;
    locket_id: number;
}

export interface Queue {
    id: number;
    createdAt: Date;
    queue_number: number;
    status: string;
    updatedAt?: Date;
    locket_id: number;
    user_id: number;
}
