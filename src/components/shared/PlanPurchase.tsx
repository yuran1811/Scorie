import { classnames } from '@/utils';
import { RadioGroup } from '@headlessui/react';
import { FC, SVGProps, useState } from 'react';

const plans = [
  {
    name: 'Free',
    desc: ['5 default clock themes'],
    price: '$0',
    message: "No need to purchase, it's totally free",
  },
  {
    name: 'Lite',
    desc: ['10+ clock themes, transparent effect'],
    price: '$5',
    message: "No need to purchase, it's totally free",
  },
  {
    name: 'Pro',
    desc: ['Unlimited clock themes, full features of Lite Plan'],
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
  <svg viewBox="0 0 16 16" fill="none" strokeWidth="1.8" stroke="#fff" {...props}>
    <g>
      <title></title>
      <path
        d="M14.6667 7.38656V7.99989C14.6659 9.4375 14.2004 10.8363 13.3396 11.9878C12.4788 13.1392 11.2689 13.9815 9.89028 14.3892C8.51166 14.7968 7.03821 14.7478 5.68969 14.2496C4.34116 13.7514 3.18981 12.8306 2.40735 11.6246C1.62488 10.4186 1.25323 8.99193 1.34783 7.55743C1.44242 6.12293 1.99818 4.75744 2.93223 3.6646C3.86628 2.57177 5.12856 1.81014 6.53083 1.49332C7.9331 1.1765 9.40022 1.32145 10.7134 1.90656"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.6667 2.66669L8 9.34002L6 7.34002" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

export const PlanPurchase = () => {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <div className="w-full px-2 py-16">
      <div className="mx-auto w-full lgmb:max-w-lg">
        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className="sr-only">Plan Purchase</RadioGroup.Label>
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
                  <div className="w-full">
                    <div className="flexcentercol">
                      <RadioGroup.Label
                        as="div"
                        className={`typo-sm flexcenter w-full gap-4 font-bold  ${checked ? 'text-white' : 'text-gray-900'}`}
                      >
                        {plan.name}
                        {checked && <CheckIcon2 className="h-8 w-8" />}
                      </RadioGroup.Label>

                      <RadioGroup.Description
                        as="div"
                        className={`typo-4sm w-full ${checked ? 'text-gray-100' : 'text-gray-500'}`}
                      >
                        <div className="typo-3xl text-center font-bold">{plan.price}</div>
                        <ul className="mx-auto w-4/5 list-disc">
                          {plan.desc.map((_, idx) => (
                            <li key={idx} className={`${checked ? 'text-gray-300' : 'text-gray-700'}`}>
                              {_}
                            </li>
                          ))}
                        </ul>
                        {checked && <div className={`mt-8 text-center font-bold`}>{plan.message}</div>}
                      </RadioGroup.Description>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
