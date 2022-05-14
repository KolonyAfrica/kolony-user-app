import {ICON_NAME} from '../../components/shared';
import {tooltipsInfoTypes} from './components/modals/vehicle-types.modal';

export const recentActivities = [
  {
    id: '1',
    title: 'Pickup request',
    date: '12 days ago',
    deliveryType: 'Multiple Delivery',
    description: '6 items - 2 locations',
  },
  {
    id: '2',
    title: 'Delivery',
    date: '6 days ago',
    deliveryType: 'Single Delivery',
    description: '6 items',
  },
  {
    id: '3',
    title: 'Pickup request',
    date: 'Yesterday',
    deliveryType: 'Multiple Delivery',
    description: '2 items - 1 location',
  },
  {
    id: '4',
    title: 'Pickup request',
    date: 'Today',
    deliveryType: 'Multiple Delivery',
    description: '3 items - 2 locations',
  },
];

/** vehicle modal data */
export const vehicleTypes = [
  {
    title: 'Motor Bike',
    description: 'Ideal for lightweight items: documents',
    icon: ICON_NAME.bike,
    tooltip: {
      title: 'Motorbike',
      description:
        'Ideal for lightweight items such as documents, food, clothing items and smaller household appliances.',
      ctrlId: tooltipsInfoTypes.bike,
    },
  },
  {
    title: 'Car',
    description: 'Ideal for larger items: bag of clothes, shoes',
    icon: ICON_NAME.car,
    tooltip: {
      title: 'Car',
      description: 'Ideal for larger items: bag of clothes, shoes',
      ctrlId: tooltipsInfoTypes.car,
    },
  },
  {
    title: 'Mini Van',
    description: 'Ideal for big/bulky items: refrigerator, washing machine',
    icon: ICON_NAME.miniVan,
    tooltip: {
      title: 'Minivan',
      description: 'Ideal for big/bulky items: refrigerator, washing machine',
      ctrlId: tooltipsInfoTypes.miniVan,
    },
  },
  {
    title: 'Truck',
    description: ' Ideal for moving large items: home or office furniture',
    icon: ICON_NAME.truck,
    tooltip: {
      title: 'Truck',
      description: 'Ideal for moving large items: home or office furniture',
      ctrlId: tooltipsInfoTypes.truck,
    },
  },
];
