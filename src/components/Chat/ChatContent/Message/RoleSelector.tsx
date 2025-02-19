import React, { useState } from 'react';
import useStore from '@store/store';

import DownChevronArrow from '@icon/DownChevronArrow';
import { MessageInterface, Role, roles } from '@type/chat';

const RoleSelector = ({
  role,
  messageIndex,
  sticky,
}: {
  role: Role;
  messageIndex: number;
  sticky?: boolean;
}) => {
  const [messages, setMessages, setInputRole] = useStore((state) => [
    state.messages,
    state.setMessages,
    state.setInputRole,
  ]);

  const [dropDown, setDropDown] = useState<boolean>(false);

  return (
    <div className='prose dark:prose-invert relative'>
      <button
        className='btn btn-neutral btn-small flex gap-1'
        type='button'
        onClick={() => setDropDown((prev) => !prev)}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
        <DownChevronArrow />
      </button>
      <div
        id='dropdown'
        className={`${
          dropDown ? '' : 'hidden'
        } absolute top-100 bottom-100 z-10 bg-white rounded-lg shadow-xl border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800 opacity-90`}
      >
        <ul
          className='text-sm text-gray-700 dark:text-gray-200 p-0 m-0'
          aria-labelledby='dropdownDefaultButton'
        >
          {roles.map((r) => (
            <li
              className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
              onClick={() => {
                if (!sticky) {
                  const updatedMessages: MessageInterface[] = JSON.parse(
                    JSON.stringify(messages)
                  );
                  updatedMessages[messageIndex].role = r;
                  setMessages(updatedMessages);
                } else {
                  setInputRole(r);
                }
                setDropDown(false);
              }}
              key={r}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoleSelector;
