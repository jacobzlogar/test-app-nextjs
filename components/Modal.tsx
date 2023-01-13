import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

type ModalState = {
  open: boolean;
  userName: string;
  loggedIn: boolean;
};

type ModalProps = {
  userName?: string;
  userId?: String;
  loggedIn: boolean;
  handleUserNameUpdate(v: string): void;
  termsAccept(): void;
};

export class MyModal extends React.Component<ModalProps, ModalState> {
  constructor(props) {
    super(props);
    this.handleUserNameUpdate = this.handleUserNameUpdate.bind(this);
    this.termsAccept = this.termsAccept.bind(this);
    this.state = {
      open: true,
      userName: props.userName,
      loggedIn: props.loggedIn,
    };
  }

  closeModal() {
    this.setState({ open: false });
  }

  openModal() {
    this.setState({ open: true });
  }
  termsAccept() {
    this.props.termsAccept();
    this.setState({ loggedIn: true });
    this.closeModal();
  }

  handleUserNameUpdate(event) {
    this.props.handleUserNameUpdate(event.target.value);
    this.setState({ userName: event.target.value });
  }

  render() {
    return (
      <>
        <Transition appear show={this.state.open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={this.closeModal.bind(this)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 mb-3"
                    >
                      What's your name?
                    </Dialog.Title>
                    <div>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <input
                          type="text"
                          name="userName"
                          id="userName"
                          value={this.state.userName}
                          onChange={this.handleUserNameUpdate.bind(this)}
                          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        disabled={!this.state.userName}
                        onClick={this.termsAccept.bind(this)}
                        className="disabled:bg-gray-100 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Submit
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
}
