import { useWeather } from '@/hooks';
import { useStore } from '@/store';
import { QuickSettingTabUI } from '@cpns/features/quick-setting/QuickSettingTabUI';
import { LocationIcon, SettingIcon } from '@cpns/icons';
import { Button, InlineLoading, SwitchBtn } from '@cpns/shared';
import { Popover, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { DayWeather, HourWeather, WeatherCard } from '.';

export interface WeatherPanelSettingsType {
  showMoreInfo: boolean;
  showIcon: boolean;
}

export const WeatherPanel = () => {
  const weather = useStore((s) => s.weather);
  const setWeather = useStore((s) => s.setWeather);

  const [settings, setSettings] = useState<WeatherPanelSettingsType>({
    showMoreInfo: true,
    showIcon: true,
  });

  const { data, error, loading } = useWeather(weather.isFetch, weather.location || { lat: '', lon: '' });

  const dailyWeather = weather.data?.timelines[0] || undefined;
  const hourlyWeather = weather.data?.timelines[1] || undefined;
  const currentWeather = weather.data?.timelines[2] || undefined;

  useEffect(() => {
    if (error) {
      setWeather({ ...weather, isFetch: false, loading: false });
      return;
    }
    if (!data || loading) return;

    setWeather({ ...weather, data, isFetch: false, loading: false });
  }, [data, error, loading]);

  return (
    <div className="w-full">
      <div className="relative mx-auto mt-8 w-max px-6 text-center font-bold">
        <Popover as="div" className="absolute -right-4 top-0 z-[9] inline-block text-left">
          <Popover.Button>
            <SettingIcon className="absolute -right-4 top-0 z-[9] aspect-square w-8 cursor-pointer text-gray-400" />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel className="typo-4sm absolute -right-8 -top-6 mt-2 w-max origin-top-right divide-y divide-gray-400 rounded-md bg-gray-700/80 backdrop-blur-sm">
              <div className="mt-10 py-3 pl-4">
                <div className="flex w-full items-center justify-between py-1 pl-4">
                  <span>Show detail</span>
                  <SwitchBtn
                    containterClass="scale-50"
                    enable={settings.showMoreInfo}
                    onChange={() => setSettings((s) => ({ ...s, showMoreInfo: !s.showMoreInfo }))}
                  />
                </div>
                <div className="flex w-full items-center justify-between py-1 pl-4">
                  <span>Show icons</span>
                  <SwitchBtn
                    containterClass="scale-50"
                    enable={settings.showIcon}
                    onChange={() => setSettings((s) => ({ ...s, showIcon: !s.showIcon }))}
                  />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>

        <p>Weather Panel</p>
        <div className="flexcenter typo-4sm gap-3">
          <img className="aspect-square w-8" src="/brand-icons/tomorrow-icon.svg" alt="tomorrow_icon" />
          <p className="font-normal">Powered by Tomorrow.io</p>
        </div>
      </div>

      <div className="typo-2sm mb-16 mt-8">
        <Button
          className="itypo-3sm"
          content="Update"
          onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {
              const lat = position.coords.latitude.toFixed(9);
              const lon = position.coords.longitude.toFixed(9);
              if (!lat || !lon) return;

              setWeather({ ...weather, isFetch: true, location: { lat, lon } });
            });
          }}
        >
          <LocationIcon className="mr-2 aspect-square w-10" />
        </Button>
      </div>

      <div className="w-full">
        {loading ? (
          <InlineLoading />
        ) : (
          <QuickSettingTabUI
            tabList={['Current', 'Daily', 'Hourly']}
            panelList={[
              {
                _id: 'current',
                Component: !currentWeather ? (
                  <></>
                ) : (
                  <div className="typo-2sm mx-auto w-full max-w-full rounded-3xl bg-white px-6 py-4 text-black medmb:w-[30rem]">
                    <WeatherCard type="current" idx={0} settings={settings} data={currentWeather.intervals[0]} />
                  </div>
                ),
              },
              { _id: 'daily', Component: <DayWeather data={dailyWeather} settings={settings} /> },
              { _id: 'hourly', Component: <HourWeather data={hourlyWeather} settings={settings} /> },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherPanel;
