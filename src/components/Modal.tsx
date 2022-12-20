import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AppContext } from '../store';
import { deleteComment, saveToLocalStorage } from '../utils';

type ModalProps = {
    id: number;
    isOpen: boolean;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Modal({ isOpen, closeModal, id }: ModalProps): JSX.Element {
    const {
        dispatch,
        state: { data },
    } = React.useContext(AppContext);

    return (
        <Transition appear show={isOpen} as={React.Fragment}>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto font-rubik">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-xl font-medium leading-6 text-gray-900"
                                >
                                    Delete comment
                                </Dialog.Title>
                                <div className="mt-4">
                                    <p className=" text-gray-500">
                                        Are you sure you want to delete this
                                        comment? This will remove the comment
                                        and can&apos;t be undone.
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center bg-grayish-blue uppercase text-white font-medium rounded-md p-3 px-5"
                                        onClick={() => closeModal(false)}
                                    >
                                        No, cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center bg-soft-red uppercase text-white font-medium rounded-md p-3 px-5"
                                        onClick={() => {
                                            const payload = deleteComment(
                                                id,
                                                data,
                                            );
                                            dispatch({
                                                type: 'UPDATE_DATA',
                                                payload,
                                            });
                                            saveToLocalStorage(payload);
                                        }}
                                    >
                                        Yes, delete
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
