import {sharedType} from '../../components/shared/common/styles';

export enum NOTIFICATION_TYPES {
  RIDER_ARRIVAL = 'riderArrival',
  LANDMARK_CROSSED = 'landmarkCrossed',
  PACKAGE_DROPPED = 'packageDropped',
  NEW_MESSAGE = 'newMessage',
}

export type NotificationItemsType = {
  [key: string]: Array<Notification>;
};

export interface NotificationListProps {
  items: NotificationItemsType;
  screenType: sharedType;
}

export type NotificationDateHeader = {
  id: string;
  text: string;
};

export interface Notification {
  id: string;
  date: string;
  title: string;
  content?: string;
  type: NOTIFICATION_TYPES;
}

export interface NotificationItemProps extends Omit<Notification, 'id'> {
  screenType: sharedType;
}
