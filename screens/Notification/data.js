import {NOTIFICATION_TYPES} from './typings';

export const notifications = {
  today: [
    {
      id: '1',
      type: NOTIFICATION_TYPES.PACKAGE_DROPPED,
      title: 'Your package has been dropped off',
      date: '5 mins ago',
    },
    {
      id: '2',
      type: NOTIFICATION_TYPES.LANDMARK_CROSSED,
      title: 'Rider has crossed Landmark 1',
      date: '10 mins ago',
    },
    {
      id: '3',
      type: NOTIFICATION_TYPES.RIDER_ARRIVAL,
      title: 'Rider has arrived',
      date: '6 mins ago',
    },
    {
      id: '11',
      type: NOTIFICATION_TYPES.NEW_MESSAGE,
      title: 'Ahmed messaged you',
      content: 'Oga I don reach',
      date: '25 mins ago',
    },
  ],
  'Oct 2021': [
    {
      id: '4',
      type: NOTIFICATION_TYPES.LANDMARK_CROSSED,
      title: 'Rider has crossed Landmark 1',
      date: '10 Oct 2021',
    },
    {
      id: '5',
      type: NOTIFICATION_TYPES.PACKAGE_DROPPED,
      title: 'Your package has been dropped off',
      date: '11 Oct 2021',
    },
    {
      id: '6',
      type: NOTIFICATION_TYPES.RIDER_ARRIVAL,
      title: 'Rider has crossed Landmark 1',
      content: 'Rider (JJC243QC) has arrived at pickup location.',
      date: '13 Oct 2021',
    },
  ],
  'Sept 2021': [
    {
      id: '7',
      type: NOTIFICATION_TYPES.RIDER_ARRIVAL,
      title: 'Rider has crossed Landmark 1',
      date: '13 Sept 2021',
    },
    {
      id: '8',
      type: NOTIFICATION_TYPES.PACKAGE_DROPPED,
      title: 'Your package has been dropped off',
      date: '18 Sept 2021',
    },
    {
      id: '9',
      type: NOTIFICATION_TYPES.LANDMARK_CROSSED,
      title: 'Rider has crossed Landmark 1',
      date: '20 Sept 2021',
    },
    {
      id: '10',
      type: NOTIFICATION_TYPES.NEW_MESSAGE,
      title: 'Chuckwuemeka messaged you',
      content: 'Please give me 10mins',
      date: '25 Sept 2021',
    },
  ],
};
