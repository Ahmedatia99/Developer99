import { Button } from "components/atoms/Button";
import { Heading } from "components/atoms/Heading";
import Overlay from "components/atoms/overlay/Overlay";

interface ModalProps {
    title?: string;
    children: JSX.Element | JSX.Element[];
    isOpen: boolean;
    loading?: boolean;
    onClose: () => any;
    onSubmit?: () => any;
}

export const Modal = ({ title, isOpen, onClose, onSubmit, loading, children }: ModalProps) => {

    return isOpen ? (
        <>
            <Overlay className="z-10" pointer onClick={onClose} blur />
            <div className="fixed top-[50%] left-[50%] right-0 z-50 p-4 overflow-x-hidden overflow-y-auto w-full h-fit flex justify-center" style={{transform: 'translate(-50%, -50%)'}}>
                <div className="relative m-auto w-full max-w-2xl">
                    <div className="relative bg-white rounded-lg shadow">
                        <div className="flex items-start justify-between p-4 border-b rounded-t gap-2">
                            <Heading style={{ fontSize: '35px', padding: 0 }}>{title}</Heading>
                            <button onClick={onClose} type="button" className="text-eclipse bg-transparent hover:text-sunset rounded-lg p-1.5 ml-auto inline-flex items-center text-3xl transition">
                                <i className="fa fa-close"></i>
                            </button>
                        </div>
                        {children && <div className="p-6 space-y-6">
                            {children}
                        </div>}
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b max-w-2xl">
                            {onSubmit ?  <Button loading={loading} onClick={onSubmit}>Ok</Button> :  <Button onClick={onClose}>Understood</Button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : <></>
}