
'use client';

import { Disclosure } from '@headlessui/react'; 
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm sm:text-base font-medium text-left text-gray-800 bg-gray-100 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-hostel-gold">
            <span>{title}</span>
            <ChevronDownIcon className={`w-5 h-5 text-hostel-gold transform ${open ? 'rotate-180' : ''}`} />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
