import { Menu, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { iMenuItem } from "./types";

interface DropdownProps {
  items: iMenuItem[];
}

const Dropdown: FunctionComponent<DropdownProps> = ({ items }) => {
  return (
    <div className="text-white">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
          <HiDotsHorizontal />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {items.map((item, index) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-red-400 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={item.cb}
                    >
                      {active ? item.icon.active : item.icon.inactive}
                      {item.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
