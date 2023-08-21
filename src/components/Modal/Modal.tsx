import { FC, MouseEventHandler, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createContainer } from "../Portal/Portal";
import { MODAL_CONTAINER_ID } from "../../constants/constants";

import Portal from "../Portal/Portal";

import styles from './modal.module.css';

interface IModal {
    children: ReactNode;
    onCloseModalHandler?: () => void;
}

const Modal: FC<IModal> = ({ children, onCloseModalHandler }) => {
    const [isMounted, setIsMounted] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        createContainer({ id: MODAL_CONTAINER_ID });
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const onWrapperClickHandler = (e: MouseEvent) => {
            const { target } = e;

            if (target instanceof Node && rootRef.current === target) {
                onCloseModalHandler?.();
            }
        }

        const onEscapePressHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCloseModalHandler?.();
            }
        }

        window.addEventListener('click', onWrapperClickHandler);
        window.addEventListener('keydown', onEscapePressHandler);

        return () => {
            window.removeEventListener('click', onWrapperClickHandler);
            window.removeEventListener('keydown', onEscapePressHandler);
        }

    }, [onCloseModalHandler])

    const onCloseHandler: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
        onCloseModalHandler?.();
    }, [onCloseModalHandler]);

    return isMounted ? (
        <Portal id={MODAL_CONTAINER_ID}>
          <div className={styles.wrapper} ref={rootRef}>
            <div className={styles.content}>
              <button
              className={styles.close}
              onClick={onCloseHandler}
              >
                x
              </button>
              {children}
            </div>
          </div>
        </Portal>
    ): null;
}

export default Modal;