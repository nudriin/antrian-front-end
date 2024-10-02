export interface QueueAggregateResponse {
    total?: number
    currentQueue?: number
    nextQueue?: number
    queueRemainder?: number
    locket_id: number
}

export interface Queue {
    id: number
    createdAt: Date
    queue_number: number
    status: string
    updatedAt?: Date
    locket_id: number
    user_id: number
}

export interface QueueTotalStats {
    totalToday?: number
    totalWeek?: number
    totalMonth?: number
    totalSemester?: number
}

export interface DailyQueueTotalStats {
    date: Date
    count: number
}

export interface QueueDistributionByLocket {
    locket: string
    count: number
}
