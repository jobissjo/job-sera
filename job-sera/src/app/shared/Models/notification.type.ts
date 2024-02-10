export interface NotificationType {
    title: string,
    message: string,
    from: string,
    date: string, 
    position: string,
    type:NotificationEnum
}

export enum NotificationEnum{
    JobRecommendation = 1,
    MessageToEmployer = 2

}