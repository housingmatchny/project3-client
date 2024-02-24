import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const data = {
    householdSize: {
        id: 1,
        options: ['1','2','3','4','5','6','7','8']
    },
    beds:
    {
        id: 2,
        options: ['Studio', '1', '2', '3', '4', '5','6','7','8']
    },
    baths:
    {
        id: 3,
        options: ['1', '2', '3', '4+']
    },
    pets: {
        id: 4,
        options: ["Allowed", "Not Allowed"]
    }
}

const Dropdown = ({section}) => {
    const [selected, setSelected] = useState('')

    return (
    <div>
    <p className="text-sm leading-6 text-gray-600">Select one.</p>
    <div className="relative w-72">
        <Listbox value={selected} onChange={setSelected}>
       
            <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:ring-2 focus:ring-inset focus:ring-purple-700">
                    <span className="block h-6">{selected}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white z-10 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {data[section] && data[section]?.options.map((el , elIdx) => (
                        <Listbox.Option
                          key={elIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active ? 'bg-purple-700 text-gray-200' : 'text-gray-900'
                            }`
                          }
                          value={el}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {el}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
        </Listbox>
    </div>
    </div>
    )
  }

export default Dropdown