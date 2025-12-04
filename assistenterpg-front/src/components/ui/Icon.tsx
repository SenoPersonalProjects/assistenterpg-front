'use client';

import {
  BellIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  PlusIcon,
  XMarkIcon,
  TrashIcon,
  PencilSquareIcon,
  CheckIcon,
  Squares2X2Icon,
  UserGroupIcon,
  Cog6ToothIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

export type IconName =
  | 'bell'
  | 'search'
  | 'back'
  | 'add'
  | 'close'
  | 'delete'
  | 'edit'
  | 'check'
  | 'campaign'  
  | 'characters'   
  | 'settings'     
  | 'rules';       

type Props = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: Props) {
  switch (name) {
    case 'bell':
      return <BellIcon className={className} />;
    case 'search':
      return <MagnifyingGlassIcon className={className} />;
    case 'back':
      return <ArrowLeftIcon className={className} />;
    case 'add':
      return <PlusIcon className={className} />;
    case 'close':
      return <XMarkIcon className={className} />;
    case 'delete':
      return <TrashIcon className={className} />;
    case 'edit':
      return <PencilSquareIcon className={className} />;
    case 'check':
      return <CheckIcon className={className} />;
    case 'campaign':
      return <Squares2X2Icon className={className} />;
    case 'characters':
      return <UserGroupIcon className={className} />;
    case 'settings':
      return <Cog6ToothIcon className={className} />;
    case 'rules':
      return <BookOpenIcon className={className} />;
    default:
      return null;
  }
}
