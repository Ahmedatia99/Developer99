import classNames from 'classnames';
import Lottie from 'react-lottie';
import animationData from './strategy.animation.json'
import styles from './strategy.module.scss'

export const Strategy = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        renderer: 'canvas',
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
    }

    return (
        <div className={classNames("absolute right-0", styles.wrapper)} style={{ top: '50%', transform: "translateY(-50%)" }}>
            <div className={styles.strategy}>
                <Lottie
                    options={defaultOptions}
                    height={'100%'}
                    width={'100%'}
                />
            </div>
        </div>
    )
}