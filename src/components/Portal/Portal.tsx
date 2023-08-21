import { ReactNode, useEffect, useState } from "react";

import { PORTAL_ERROR_MSG } from "../../constants/constants";
import { createPortal } from "react-dom";

type ContainerOptions = {
    id: string;
    mountNode?: HTMLElement;
}

type PortalOptions = {
    id: string;
    children: ReactNode;
}

const createContainer = (options: ContainerOptions) => {
    if (document.getElementById(options.id)) return;

    const { id, mountNode = document.body } = options;

    const portalContainer = document.createElement('div');

    portalContainer.setAttribute('id', id);
    mountNode.appendChild(portalContainer);
}

const Portal = ({ id, children }: PortalOptions) => {
    const [container, setContainer] = useState<HTMLElement>(null);

    useEffect(() => {
        if (id) {
            const portalContainer = document.getElementById(id);

            if (!portalContainer) {
                throw new Error(PORTAL_ERROR_MSG)
            }

            setContainer(portalContainer);
        }
    }, [id]);

    return container ? createPortal(children, container) : null;
}

export { createContainer }
export default Portal;