import { classnames } from '@/utils';
import { RadioGroup, Transition } from '@headlessui/react';
import { FC, SVGProps, useState } from 'react';

const plans = [
  {
    name: 'Free',
    themes: '5 default clock themes',
    price: '$0',
    message: "No need to purchase, it's totally free",
  },
  {
    name: 'Lite',
    themes: '10+ clock themes, transparent effect',
    price: '$5',
    message: "No need to purchase, it's totally free",
  },
  {
    name: 'Pro',
    themes: 'Unlimited clock themes, full features of Lite Plan',
    price: '$7',
    message: "No need to purchase, it's totally free",
  },
];

const CheckIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
    <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon2: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke-width="1.8" stroke="#808080" {...props}>
    <g>
      <title></title>
      <path
        d="M14.6667 7.38656V7.99989C14.6659 9.4375 14.2004 10.8363 13.3396 11.9878C12.4788 13.1392 11.2689 13.9815 9.89028 14.3892C8.51166 14.7968 7.03821 14.7478 5.68969 14.2496C4.34116 13.7514 3.18981 12.8306 2.40735 11.6246C1.62488 10.4186 1.25323 8.99193 1.34783 7.55743C1.44242 6.12293 1.99818 4.75744 2.93223 3.6646C3.86628 2.57177 5.12856 1.81014 6.53083 1.49332C7.9331 1.1765 9.40022 1.32145 10.7134 1.90656"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M14.6667 2.66669L8 9.34002L6 7.34002" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </g>
  </svg>
);

export const PlanPurchase = () => {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  classnames(
                    'relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none',
                    checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label as="p" className={`font-bold  ${checked ? 'text-white' : 'text-gray-900'}`}>
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'}`}
                          >
                            <span>{plan.themes}</span>
                            <span aria-hidden="true"> &middot; </span>
                            <span>{plan.price}</span>

                            <Transition
                              show
                              enter="transition-opacity duration-75"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition-opacity duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <span className="font-semibold">{plan.message}</span>
                            </Transition>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
