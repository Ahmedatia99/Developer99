import classNames from 'classnames'
import styles from './Overlay.module.scss'
interface OverlayProps {
    gradient?: boolean;
    blur?: boolean;
    pointer?: boolean;
    onClick?: () => void;
    className?: string
}

export default function Overlay({ className, gradient, blur, pointer,  onClick }: OverlayProps) {
    return (
        <div
            onClick={onClick}
            className={classNames("fixed top-0 left-0 w-full h-full", gradient ? styles['gradient-overlay'] : 'bg-black/50',  blur && 'backdrop-blur-md', pointer && 'cursor-pointer', className)}
        />
    )
}