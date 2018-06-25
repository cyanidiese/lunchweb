import {Injectable} from '@angular/core';
import {ApiService} from '../api.service';

import {NotificationRequest} from '../../classes/requests/notification-request';

@Injectable()
export class NotificationsService {

    constructor(private api: ApiService) {
    }

    getNotifications() {
        return this.api.get('/notifications/index');
    }

    createNotification(data: NotificationRequest) {
        return this.api.post('/notifications/create', [], data);
    }

    approveNotification(notificationId: number) {
        return this.api.put('/notifications/' + notificationId + '/approve');
    }

    markNotification(notificationId: number) {
        return this.api.put('/notifications/' + notificationId + '/mark');
    }

    deleteNotification(notificationId: number) {
        return this.api.delete('/notifications/' + notificationId + '/delete');
    }
}
