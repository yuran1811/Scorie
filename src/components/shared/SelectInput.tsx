import { ArrowDownIcon, ArrowUpIcon } from '@cpns/icons';
import { Listbox } from '@headlessui/react';
import { FC, useEffect, useState } from 'react';

interface SelectInputProps {
  defaultSelected: any;
  setWhenSelected: any;
  list: { _id: string; data: any }[];
}

export const SelectInput: FC<SelectInputProps> = ({ list, defaultSelected, setWhenSelected }) => {
  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    setWhenSelected(selected);
  }, [selected]);

  return (
    <Listbox defaultValue={defaultSelected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="flexcenter w-max gap-3 rounded-xl bg-violet-800 px-4 py-1 font-bold capitalize text-violet-200">
          <span className="inline-block truncate">{selected}</span>
          <div className="flexcentercol">
            <ArrowUpIcon className="aspect-square w-5" />
            <ArrowDownIcon className="aspect-square w-5" />
          </div>
        </Listbox.Button>
        <Listbox.Options className="scrollY absolute right-0 z-10 mt-4 max-h-60 w-full rounded-xl bg-white">
          {list.map(({ _id, data }) => (
            <Listbox.Option
              key={_id}
              className={({ active }) =>
                `isAnimated cursor-pointer px-4 py-2 font-semibold capitalize ${
                  active ? 'bg-violet-500 text-violet-100' : ' text-violet-900'
                }`
              }
              value={data}
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{data}</span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
