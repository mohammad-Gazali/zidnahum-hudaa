import { IconBaseProps } from 'react-icons';

declare module 'react-icons' {
    interface IconBaseProps {
        slot?: string;
    }
}