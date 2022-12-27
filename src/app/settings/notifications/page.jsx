"use client";
import Loading from "@/app/components/loading";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@headlessui/react";
import { getMySettings } from "@/utils/user";
export default function Page() {
  const queryClient = useQueryClient();
  const {
    isLoading,
    isError,
    data: settings,
    error,
  } = useQuery(["user-settings"], getMySettings);
  const mutation = useMutation(
    async ([setting_name, setting_value]) => {
      return await axios.patch(`/api/user/settings`, {
        data: JSON.stringify({
          setting_name,
          setting_value,
        }),
      });
    },
    {
      onMutate: (data) => {
        queryClient.setQueryData(["user-settings"], (oldData) => {
          return { ...oldData, [data[0]]: data[1] };
        });
      },
    }
  );

  return (
    <div className="flex flex-col space-x-2 p-6 space-y-5">
      <h1 className="text-3xl font-bold">Settings</h1>
      {isError ? (
        <span className="text-lg">{error}</span>
      ) : isLoading ? (
        <Loading />
      ) : (
        <div className="grid switches-list justify-start gap-x-2 gap-y-4 leading-snug mt-5">
          <Switch
            checked={settings.interests_email}
            onChange={() =>
              mutation.mutate(["interests_email", !settings.interests_email])
            }
            className={`${
              settings.interests_email ? "bg-emerald-500" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                settings.interests_email ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <div>I{`'`}m open to receiving emails about my interests</div>
          <Switch
            checked={settings.news_email}
            onChange={() =>
              mutation.mutate(["news_email", !settings.news_email])
            }
            className={`${
              settings.news_email ? "bg-emerald-500" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable recieve emails</span>
            <span
              className={`${
                settings.news_email ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <div>I{`'`}m open to receiving emails about ourplaces news</div>
        </div>
      )}
    </div>
  );
}
